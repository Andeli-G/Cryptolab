/**
 * HKDF: HMAC-based Extract-and-Expand Key Derivation Function (RFC 5869).
 * Formula:
 *   PRK = HMAC(salt, IKM)
 *   T(0) = empty, T(i) = HMAC(PRK, T(i-1) || info || i)
 *   OKM = T(1) || T(2) || ... truncated to L bytes.
 * Reference: Rapport ENSPY 3GI, Chapitre 6, Section 6.3, pp. 36–38.
 */

import { calculateHmac } from '../hmac';
import { CryptoStep, HkdfParams, HkdfResult } from '../types';
import { bytesToHex, stringToBytes } from '../utils';

export function calculateHkdf(params: HkdfParams): HkdfResult {
  const startTime = performance.now();
  const hashAlgo = params.hashAlgorithm || 'sha256';
  const hashLen = hashAlgo === 'sha512' ? 64 : 32;

  // IKM
  let ikmBytes: Uint8Array;
  if (/^[0-9a-fA-F\s]+$/.test(params.ikm) && params.ikm.replace(/\s+/g, '').length % 2 === 0 && params.ikm.includes(' ')) {
    ikmBytes = stringToBytes(params.ikm, 'hex');
  } else {
    ikmBytes = stringToBytes(params.ikm, 'utf8');
  }

  // Salt
  let saltBytes: Uint8Array;
  let saltWasDefault = false;
  if (!params.salt || params.salt.trim().length === 0) {
    saltBytes = new Uint8Array(hashLen); // string of zeros
    saltWasDefault = true;
  } else if (/^[0-9a-fA-F\s]+$/.test(params.salt) && params.salt.replace(/\s+/g, '').length % 2 === 0 && params.salt.includes(' ')) {
    saltBytes = stringToBytes(params.salt, 'hex');
  } else {
    saltBytes = stringToBytes(params.salt, 'utf8');
  }

  // Info
  let infoBytes: Uint8Array;
  if (params.info && /^[0-9a-fA-F\s]+$/.test(params.info) && params.info.replace(/\s+/g, '').length % 2 === 0 && params.info.includes(' ')) {
    infoBytes = stringToBytes(params.info, 'hex');
  } else {
    infoBytes = stringToBytes(params.info || '', 'utf8');
  }

  const requestedLen = params.outputLength > 0 ? params.outputLength : 32;
  const maxLen = 255 * hashLen;
  if (requestedLen > maxLen) {
    throw new Error(`La longueur demandée L (${requestedLen} octets) dépasse le maximum théorique de 255 × HashLen (${maxLen} octets).`);
  }

  const steps: CryptoStep[] = [];

  // Step 1: IKM & Salt
  steps.push({
    stepNumber: 1,
    title: 'Matériau initial de clé (IKM) & Préparation du Sel',
    description: saltWasDefault
      ? `Le sel n'ayant pas été fourni, une chaîne de ${hashLen} zéros hexadécimaux (0x00) a été utilisée par défaut conformément à la RFC 5869 et à la section 6.3.1 du rapport.`
      : `Le sel (${saltBytes.length} octets) est une valeur aléatoire publique qui rend la dérivation unique et neutralise les attaques par tables précalculées.`,
    sourceCitation: 'Rapport ENSPY 3GI, Chapitre 6, Section 6.1.3 & 6.3.1, pp. 35-36',
    operationType: 'pad',
    details: [
      { label: 'IKM (Source secrète)', value: bytesToHex(ikmBytes) },
      { label: 'Taille IKM', value: `${ikmBytes.length} octets` },
      { label: 'Sel utilisé', value: saltWasDefault ? `Chaîne par défaut (${hashLen} octets 0x00)` : bytesToHex(saltBytes) },
    ],
  });

  // Step 2: Extraction Phase -> PRK
  // PRK = HMAC(salt, IKM) where salt is HMAC key, IKM is message
  const extractHmac = calculateHmac(
    bytesToHex(ikmBytes),
    bytesToHex(saltBytes),
    'hex',
    'hex',
    hashAlgo
  );
  // Re-run directly with bytes for exactness
  const prk = extractHmac.tag;
  const prkHex = bytesToHex(prk);

  steps.push({
    stepNumber: 2,
    title: `Phase 1 : Extraction HKDF-Extract → Clé PRK (${hashLen * 8} bits)`,
    description: `On concentre l'entropie du secret initial IKM pour obtenir une clé pseudo-aléatoire uniforme PRK. Le sel joue ici le rôle de clé HMAC.`,
    formula: '\\text{PRK} = \\text{HMAC}_{\\text{salt}}(\\text{IKM})',
    sourceCitation: 'Rapport ENSPY 3GI, Chapitre 6, Section 6.3.1, p. 36',
    operationType: 'hash',
    inputBytes: ikmBytes,
    inputHex: bytesToHex(ikmBytes),
    outputBytes: prk,
    outputHex: prkHex,
    details: [
      { label: 'Formule', value: 'PRK = HMAC(salt, IKM)' },
      { label: 'Clé PRK extraite (hex)', value: prkHex },
      { label: 'Propriété PRK', value: 'Pseudo-aléatoire uniforme (Rapport p. 36)' },
    ],
  });

  // Step 3: Context / Info Setup
  steps.push({
    stepNumber: 3,
    title: 'Paramètre de Contexte (info) & Séparation de Domaine',
    description: `L'étiquette de contexte 'info' lie la clé dérivée à un protocole ou un rôle spécifique (ex: cle-AES ou cle-HMAC). Deux contextes distincts produisent des clés cryptographiquement indépendantes.`,
    formula: '\\text{info} \\in \\{0,1\\}^*',
    sourceCitation: 'Rapport ENSPY 3GI, Chapitre 6, Section 6.1.3 & 6.3.2, pp. 35, 37',
    operationType: 'encode',
    outputBytes: infoBytes,
    outputHex: bytesToHex(infoBytes),
    details: [
      { label: 'Contexte saisi', value: params.info || '(vide)' },
      { label: 'Contexte en hex', value: bytesToHex(infoBytes) },
      { label: 'Rôle', value: 'Garantit la séparation de domaine' },
    ],
  });

  // Step 4: Expansion Phase -> OKM
  const numIterations = Math.ceil(requestedLen / hashLen);
  const iterations: { iteration: number; inputHex: string; outputHex: string }[] = [];
  const okmBlocks: Uint8Array[] = [];

  let t_prev = new Uint8Array(0);

  for (let i = 1; i <= numIterations; i++) {
    // T(i) = HMAC(PRK, T(i-1) || info || i)
    const counterByte = new Uint8Array([i]);
    const inputBlock = new Uint8Array(t_prev.length + infoBytes.length + 1);
    inputBlock.set(t_prev, 0);
    inputBlock.set(infoBytes, t_prev.length);
    inputBlock.set(counterByte, t_prev.length + infoBytes.length);

    // Compute HMAC(PRK, inputBlock)
    const stepHmac = calculateHmac(
      bytesToHex(inputBlock),
      prkHex,
      'hex',
      'hex',
      hashAlgo
    );
    const t_i = stepHmac.tag;
    okmBlocks.push(t_i);
    t_prev = new Uint8Array(t_i);

    iterations.push({
      iteration: i,
      inputHex: bytesToHex(inputBlock),
      outputHex: bytesToHex(t_i),
    });

    steps.push({
      stepNumber: 3 + i,
      title: `Phase 2 : Expansion HKDF-Expand (Itération ${i}/${numIterations})`,
      description: `Calcul du bloc T(${i}) = HMAC(PRK, T(${i - 1}) ∥ info ∥ 0x${i.toString(16).padStart(2, '0')}).`,
      formula: `T(${i}) = \\text{HMAC}(\\text{PRK}, T(${i - 1}) \\parallel \\text{info} \\parallel ${i})`,
      sourceCitation: 'Rapport ENSPY 3GI, Chapitre 6, Section 6.3.2, p. 37',
      operationType: 'expand',
      inputBytes: inputBlock,
      inputHex: bytesToHex(inputBlock),
      outputBytes: t_i,
      outputHex: bytesToHex(t_i),
      details: [
        { label: `Bloc T(${i}) (Hex)`, value: bytesToHex(t_i) },
        { label: 'Compteur d\'itération', value: `0x${i.toString(16).padStart(2, '0')} (${i})` },
      ],
    });
  }

  // Concatenate T(1) || T(2) ... and truncate to requestedLen
  const concatenatedT = new Uint8Array(okmBlocks.reduce((acc, b) => acc + b.length, 0));
  let curOffset = 0;
  for (const b of okmBlocks) {
    concatenatedT.set(b, curOffset);
    curOffset += b.length;
  }

  const okm = concatenatedT.slice(0, requestedLen);
  const okmHex = bytesToHex(okm);

  steps.push({
    stepNumber: 4 + numIterations,
    title: `Clé finale OKM (${requestedLen} octets / ${requestedLen * 8} bits)`,
    description: `Les blocs successifs T(1) ∥ T(2) sont concaténés puis tronqués exactement à la longueur souhaitée L = ${requestedLen} octets pour l'algorithme visé.`,
    formula: '\\text{OKM} = (T(1) \\parallel T(2) \\parallel \\dots)[0..L-1]',
    sourceCitation: 'Rapport ENSPY 3GI, Chapitre 6, Section 6.3.2, p. 37',
    operationType: 'truncate',
    outputBytes: okm,
    outputHex: okmHex,
    details: [
      { label: 'Clé finale dérivée (OKM)', value: okmHex },
      { label: 'Longueur finale', value: `${requestedLen} octets (${requestedLen * 8} bits)` },
      { label: 'Applications typiques', value: 'TLS 1.3 (RFC 8446), Protocole Signal Double Ratchet (Rapport p. 41)' },
    ],
  });

  const endTime = performance.now();

  return {
    ikmBytes,
    saltBytes,
    infoBytes,
    prk,
    prkHex,
    okm,
    okmHex,
    requestedLength: requestedLen,
    iterations,
    steps,
    executionTimeMs: parseFloat((endTime - startTime).toFixed(3)),
    sourceCitation: 'Rapport ENSPY 3GI, Chapitre 6, Section 6.3, pp. 36-38',
  };
}
