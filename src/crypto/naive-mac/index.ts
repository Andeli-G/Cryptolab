/**
 * Naive MAC implementations: H(k || m) and H(m || k).
 * Reference: Rapport ENSPY 3GI, Chapitre 4, Section 4.5.1 & 4.5.2, pp. 26-27.
 */

import { computeHash, HASH_REGISTRY } from '../hashes';
import {
  BitOperation,
  ByteOperation,
  CalculationResult,
  CryptoStep,
  HashAlgorithm,
  TextEncoding,
} from '../types';
import { bytesToHex, stringToBytes, toBinary8 } from '../utils';

export function calculateNaiveMac(
  messageStr: string,
  keyStr: string,
  encoding: TextEncoding,
  variant: 'prefix' | 'suffix',
  hashAlgo: HashAlgorithm = 'sha256'
): CalculationResult {
  const startTime = performance.now();
  const hashInfo = HASH_REGISTRY[hashAlgo];

  const keyBytes = stringToBytes(keyStr, encoding);
  const messageBytes = stringToBytes(messageStr, encoding);

  // Concatenation
  let concatenated: Uint8Array;
  if (variant === 'prefix') {
    concatenated = new Uint8Array(keyBytes.length + messageBytes.length);
    concatenated.set(keyBytes, 0);
    concatenated.set(messageBytes, keyBytes.length);
  } else {
    concatenated = new Uint8Array(messageBytes.length + keyBytes.length);
    concatenated.set(messageBytes, 0);
    concatenated.set(keyBytes, messageBytes.length);
  }

  // Hash calculation
  const tagBytes = computeHash(hashAlgo, concatenated);
  const tagHex = bytesToHex(tagBytes);
  const endTime = performance.now();

  const isPrefix = variant === 'prefix';
  const mechanismName = isPrefix ? `MAC Naïf Préfixe : ${hashInfo.name}(k ∥ m)` : `MAC Naïf Suffixe : ${hashInfo.name}(m ∥ k)`;
  const formula = isPrefix ? `t = ${hashInfo.name}(k \\parallel m)` : `t = ${hashInfo.name}(m \\parallel k)`;

  const steps: CryptoStep[] = [
    {
      stepNumber: 1,
      title: 'Conversion de la clé secrète en octets',
      description: `La clé secrète est encodée en format brut selon l'encodage sélectionné (${encoding.toUpperCase()}).`,
      sourceCitation: 'Rapport ENSPY 3GI, Chapitre 4, Section 4.5.1, p. 26',
      operationType: 'encode',
      outputBytes: keyBytes,
      outputHex: bytesToHex(keyBytes),
      details: [
        { label: 'Clé saisie', value: keyStr },
        { label: 'Longueur de la clé', value: `${keyBytes.length} octets (${keyBytes.length * 8} bits)` },
        { label: 'Représentation hexadécimale', value: bytesToHex(keyBytes) },
      ],
    },
    {
      stepNumber: 2,
      title: 'Conversion du message en octets',
      description: `Le message clair à authentifier est transformé en séquence d'octets (${encoding.toUpperCase()}).`,
      sourceCitation: 'Rapport ENSPY 3GI, Chapitre 2, Section 2.1, p. 9',
      operationType: 'encode',
      outputBytes: messageBytes,
      outputHex: bytesToHex(messageBytes),
      details: [
        { label: 'Message saisi', value: messageStr },
        { label: 'Longueur du message', value: `${messageBytes.length} octets (${messageBytes.length * 8} bits)` },
        { label: 'Représentation hexadécimale', value: bytesToHex(messageBytes) },
      ],
    },
    {
      stepNumber: 3,
      title: isPrefix ? 'Concaténation préfixe (k ∥ m)' : 'Concaténation suffixe (m ∥ k)',
      description: isPrefix
        ? 'La clé secrète est placée en tête et le message est concaténé directement à sa suite.'
        : 'Le message est placé en tête et la clé secrète est concaténée à sa fin.',
      formula: isPrefix ? 'données = k \\parallel m' : 'données = m \\parallel k',
      sourceCitation: isPrefix
        ? 'Rapport ENSPY 3GI, Chapitre 4, Section 4.5.1, p. 26'
        : 'Rapport ENSPY 3GI, Chapitre 4, Section 4.5.2, p. 27',
      operationType: 'concat',
      outputBytes: concatenated,
      outputHex: bytesToHex(concatenated),
      details: [
        { label: 'Taille totale concaténée', value: `${concatenated.length} octets` },
        { label: 'Ordre des octets', value: isPrefix ? `Clé (${keyBytes.length}o) + Message (${messageBytes.length}o)` : `Message (${messageBytes.length}o) + Clé (${keyBytes.length}o)` },
        { label: 'Flux résultant (hex)', value: bytesToHex(concatenated) },
      ],
    },
    {
      stepNumber: 4,
      title: `Calcul du condensat ${hashInfo.name}`,
      description: `La fonction de hachage itérative ${hashInfo.name} absorbe le bloc concaténé et produit l'empreinte de taille fixe (${hashInfo.digestSizeBits} bits).`,
      formula,
      sourceCitation: 'Rapport ENSPY 3GI, Chapitre 3, Section 3.1.1, p. 13',
      operationType: 'hash',
      inputBytes: concatenated,
      inputHex: bytesToHex(concatenated),
      outputBytes: tagBytes,
      outputHex: tagHex,
      details: [
        { label: 'Fonction de hachage', value: hashInfo.name },
        { label: 'Taille du bloc interne (B)', value: `${hashInfo.blockSizeBytes} octets` },
        { label: 'Taille de l\'empreinte (n)', value: `${hashInfo.digestSizeBits} bits (${hashInfo.digestSizeBytes} octets)` },
      ],
    },
    {
      stepNumber: 5,
      title: 'Tag d\'authentification final & Analyse de sécurité',
      description: isPrefix
        ? 'ATTENTION : Cette construction est VULNÉRABLE à l\'attaque par extension de longueur (length-extension attack). Un attaquant observant ce tag peut forger un tag valide pour un message prolongé sans connaître la clé k (Rapport, p. 26).'
        : 'ATTENTION : Cette construction est VULNÉRABLE à la substitution par collision. Si un attaquant trouve H(m) = H(m\'), alors H(m ∥ k) = H(m\' ∥ k) pour TOUTE clé k (Rapport, p. 27).',
      formula: 'T = tag',
      sourceCitation: isPrefix
        ? 'Rapport ENSPY 3GI, Chapitre 4, Section 4.5.1 & Chapitre 7, Section 7.3, pp. 26, 43'
        : 'Rapport ENSPY 3GI, Chapitre 4, Section 4.5.2, p. 27',
      operationType: 'truncate',
      outputBytes: tagBytes,
      outputHex: tagHex,
      details: [
        { label: 'Tag Final (Hex)', value: tagHex },
        { label: 'Longueur du Tag', value: `${tagBytes.length * 8} bits (${tagBytes.length} octets)` },
        { label: 'Vulnérabilité majeure', value: isPrefix ? 'Attaque par extension de longueur (Flickr 2009)' : 'Attaque par collision hors-ligne' },
      ],
    },
  ];

  // Byte operations for detail view
  const byteOperations: ByteOperation[] = Array.from(concatenated).map((b, idx) => ({
    index: idx,
    byteA: b,
    operation: idx < (isPrefix ? keyBytes.length : messageBytes.length)
      ? (isPrefix ? 'Clé' : 'Message')
      : (isPrefix ? 'Message' : 'Clé'),
    result: b,
    charA: b >= 32 && b <= 126 ? String.fromCharCode(b) : '·',
  }));

  // Bit operations for first 16 bytes
  const bitOperations: BitOperation[] = [];
  const inspectBytes = Math.min(concatenated.length, 8);
  for (let b = 0; b < inspectBytes; b++) {
    const val = concatenated[b];
    for (let bit = 7; bit >= 0; bit--) {
      bitOperations.push({
        position: b * 8 + (7 - bit),
        operandA: (val >> bit) & 1,
        operandB: 0,
        operation: 'SHIFT',
        result: (val >> bit) & 1,
        label: `Octet ${b} [bit ${bit}]`,
      });
    }
  }

  return {
    mechanism: isPrefix ? 'naive_prefix' : 'naive_suffix',
    mechanismName,
    messageRaw: messageStr,
    keyRaw: keyStr,
    encoding,
    messageBytes,
    keyBytes,
    tag: tagBytes,
    tagHex,
    tagBits: tagBytes.length * 8,
    steps,
    executionTimeMs: parseFloat((endTime - startTime).toFixed(3)),
    byteOperations,
    bitOperations,
    securityStatus: 'vulnerable',
    securityNote: isPrefix
      ? 'VULNÉRABLE : Exposé aux attaques par extension de longueur avec les fonctions de type Merkle-Damgård (MD5, SHA-1, SHA-256, SHA-512).'
      : 'VULNÉRABLE : Hérite directement des collisions du hachage ; une collision sur m permet de forger le tag pour tout k.',
    sourceCitation: 'Rapport ENSPY 3GI, Chapitre 4, Section 4.5, pp. 26-27',
  };
}
