/**
 * HMAC implementation (RFC 2104, FIPS 198-1) with full educational instrumentation.
 * Formula: HMAC(k, m) = H((K' ⊕ opad) || H((K' ⊕ ipad) || m))
 * Reference: Rapport ENSPY 3GI, Chapitre 5, Sections 5.1–5.7, pp. 29–33.
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
import { bytesToHex, stringToBytes, toBinary8, xorBytes } from '../utils';

export function calculateHmac(
  messageStr: string,
  keyStr: string,
  messageEncoding: TextEncoding = 'utf8',
  keyEncoding: TextEncoding = 'utf8',
  hashAlgo: HashAlgorithm = 'sha256',
  truncateBits?: number
): CalculationResult {
  const startTime = performance.now();
  const hashInfo = HASH_REGISTRY[hashAlgo];
  const B = hashInfo.blockSizeBytes; // 64 or 128 bytes
  const L = hashInfo.digestSizeBytes;

  const rawKeyBytes = stringToBytes(keyStr, keyEncoding);
  const rawMessageBytes = stringToBytes(messageStr, messageEncoding);

  const steps: CryptoStep[] = [];
  const byteOperations: ByteOperation[] = [];
  const bitOperations: BitOperation[] = [];

  // Étape 1 : Prétraitement de la clé K'
  let K_prime = new Uint8Array(B);
  let keyProcessNote = '';
  if (rawKeyBytes.length > B) {
    const hashedKey = computeHash(hashAlgo, rawKeyBytes);
    K_prime.set(hashedKey);
    keyProcessNote = `La clé (${rawKeyBytes.length} octets) dépasse la taille de bloc B (${B} octets). Elle a d'abord été condensée par ${hashInfo.name} (${hashedKey.length} octets) puis complétée par des zéros.`;
  } else {
    K_prime.set(rawKeyBytes);
    keyProcessNote = `La clé (${rawKeyBytes.length} octets) est complétée à droite par ${B - rawKeyBytes.length} octets 0x00 pour atteindre la taille de bloc B = ${B} octets.`;
  }

  steps.push({
    stepNumber: 1,
    title: `Prétraitement de la clé K' (Taille de bloc B = ${B} octets)`,
    description: keyProcessNote,
    formula: "K' = \\text{si } |k| > B \\text{ alors } H(k) \\parallel 0^{B-L} \\text{ sinon } k \\parallel 0^{B-|k|}",
    sourceCitation: 'Rapport ENSPY 3GI, Chapitre 5, Section 5.2, p. 30',
    operationType: 'pad',
    inputBytes: rawKeyBytes,
    inputHex: bytesToHex(rawKeyBytes),
    outputBytes: K_prime,
    outputHex: bytesToHex(K_prime),
    details: [
      { label: 'Clé originale saisie', value: keyStr },
      { label: 'Taille originale', value: `${rawKeyBytes.length} octets (${rawKeyBytes.length * 8} bits)` },
      { label: 'Taille de bloc requise (B)', value: `${B} octets (${B * 8} bits)` },
      { label: "Clé normalisée K' (hex)", value: bytesToHex(K_prime) },
    ],
  });

  // Étape 2 : Masque interne ipad (0x36 répété B fois) et XOR Ki = K' ⊕ ipad
  const ipad = new Uint8Array(B);
  ipad.fill(0x36);
  const Ki = xorBytes(K_prime, ipad);

  for (let i = 0; i < Math.min(16, B); i++) {
    byteOperations.push({
      index: i,
      byteA: K_prime[i],
      byteB: ipad[i],
      operation: `K'[${i}] ⊕ ipad`,
      result: Ki[i],
    });
  }

  // Bit operations on byte 0 of K' ⊕ ipad
  for (let bit = 7; bit >= 0; bit--) {
    const bitA = (K_prime[0] >> bit) & 1;
    const bitB = (ipad[0] >> bit) & 1;
    bitOperations.push({
      position: 7 - bit,
      operandA: bitA,
      operandB: bitB,
      operation: 'XOR',
      result: bitA ^ bitB,
      label: `K'[0].b${bit} ⊕ ipad.b${bit}`,
    });
  }

  steps.push({
    stepNumber: 2,
    title: "Dérivation de la clé interne : K_i = K' ⊕ ipad",
    description: `L'octet constant 0x36 (00110110₂) est répété ${B} fois pour former l'inner pad (ipad). On effectue le XOR bit-à-bit avec K'.`,
    formula: "K_i = K' \\oplus ipad, \\quad ipad = 0x36^{B}",
    sourceCitation: 'Rapport ENSPY 3GI, Chapitre 5, Section 5.2 & 5.3, p. 30',
    operationType: 'xor',
    inputBytes: K_prime,
    inputHex: bytesToHex(K_prime),
    outputBytes: Ki,
    outputHex: bytesToHex(Ki),
    details: [
      { label: 'Inner Pad (ipad)', value: `0x36 répété ${B} fois` },
      { label: 'Exemple binaire ipad', value: '00110110₂ (0x36)' },
      { label: 'Clé interne K_i (hex)', value: bytesToHex(Ki) },
    ],
  });

  // Étape 3 : Concaténation interne (Ki || m)
  const innerConcat = new Uint8Array(Ki.length + rawMessageBytes.length);
  innerConcat.set(Ki, 0);
  innerConcat.set(rawMessageBytes, Ki.length);

  steps.push({
    stepNumber: 3,
    title: 'Concaténation interne : K_i ∥ m',
    description: 'La clé interne K_i est préfixée au message pour lier cryptographiquement le message au secret partagé.',
    formula: '\\text{flux}_{int} = K_i \\parallel m',
    sourceCitation: 'Rapport ENSPY 3GI, Chapitre 5, Section 5.3, p. 31',
    operationType: 'concat',
    outputBytes: innerConcat,
    outputHex: bytesToHex(innerConcat),
    details: [
      { label: 'Longueur K_i', value: `${Ki.length} octets` },
      { label: 'Longueur Message m', value: `${rawMessageBytes.length} octets` },
      { label: 'Longueur totale flux interne', value: `${innerConcat.length} octets` },
    ],
  });

  // Étape 4 : Hachage interne hint = H(Ki || m)
  const h_int = computeHash(hashAlgo, innerConcat);

  steps.push({
    stepNumber: 4,
    title: `Passe interne : h_{int} = ${hashInfo.name}(K_i ∥ m)`,
    description: `Calcul de la première passe de hachage. Le résultat h_{int} est un état intermédiaire secret qui N'EST JAMAIS exposé sur le canal de transmission, neutralisant l'attaque par extension de longueur.`,
    formula: 'h_{int} = H(K_i \\parallel m)',
    sourceCitation: 'Rapport ENSPY 3GI, Chapitre 5, Section 5.3 & 5.4, p. 31',
    operationType: 'hash',
    inputBytes: innerConcat,
    inputHex: bytesToHex(innerConcat),
    outputBytes: h_int,
    outputHex: bytesToHex(h_int),
    details: [
      { label: 'Condensat interne h_{int}', value: bytesToHex(h_int) },
      { label: 'Taille de h_{int}', value: `${h_int.length} octets (${h_int.length * 8} bits)` },
      { label: 'Visibilité externe', value: 'NON (reste interne, secret)' },
    ],
  });

  // Étape 5 : Masque externe opad (0x5C répété B fois) et XOR Ko = K' ⊕ opad
  const opad = new Uint8Array(B);
  opad.fill(0x5C);
  const Ko = xorBytes(K_prime, opad);

  // Demonstrate 0x36 ^ 0x5C = 0x6A (Section 5.3 p. 30)
  steps.push({
    stepNumber: 5,
    title: "Dérivation de la clé externe : K_o = K' ⊕ opad",
    description: `L'octet constant 0x5C (01011100₂) est répété ${B} fois pour former l'outer pad (opad). Noter que 0x36 ⊕ 0x5C = 0x6A : K_i et K_o diffèrent sur exactement la moitié de leurs bits !`,
    formula: "K_o = K' \\oplus opad, \\quad opad = 0x5C^{B}",
    sourceCitation: 'Rapport ENSPY 3GI, Chapitre 5, Section 5.3, p. 30',
    operationType: 'xor',
    inputBytes: K_prime,
    inputHex: bytesToHex(K_prime),
    outputBytes: Ko,
    outputHex: bytesToHex(Ko),
    details: [
      { label: 'Outer Pad (opad)', value: `0x5C répété ${B} fois` },
      { label: 'Propriété fondamentale', value: '0x36 ⊕ 0x5C = 0x6A (50% de bits différents)' },
      { label: 'Clé externe K_o (hex)', value: bytesToHex(Ko) },
    ],
  });

  // Étape 6 : Concaténation externe (Ko || hint)
  const outerConcat = new Uint8Array(Ko.length + h_int.length);
  outerConcat.set(Ko, 0);
  outerConcat.set(h_int, Ko.length);

  steps.push({
    stepNumber: 6,
    title: 'Concaténation externe : K_o ∥ h_{int}',
    description: `La clé externe K_o est préfixée à l'empreinte interne h_{int}. Ce bloc a une taille fixe : ${B} octets de clé + ${h_int.length} octets de hash = ${outerConcat.length} octets.`,
    formula: '\\text{flux}_{ext} = K_o \\parallel h_{int}',
    sourceCitation: 'Rapport ENSPY 3GI, Chapitre 5, Section 5.3, p. 31',
    operationType: 'concat',
    outputBytes: outerConcat,
    outputHex: bytesToHex(outerConcat),
    details: [
      { label: 'Taille K_o', value: `${Ko.length} octets` },
      { label: 'Taille h_{int}', value: `${h_int.length} octets` },
      { label: 'Taille totale entrée externe', value: `${outerConcat.length} octets (taille fixe)` },
    ],
  });

  // Étape 7 : Hachage externe et production du Tag
  let finalTag = computeHash(hashAlgo, outerConcat);

  steps.push({
    stepNumber: 7,
    title: `Passe externe : Tag = ${hashInfo.name}(K_o ∥ h_{int})`,
    description: `La fonction ${hashInfo.name} scelle le résultat interne sous la clé K_o. L'adversaire ne connaissant ni K_o ni l'état de h_{int}, il lui est impossible de prolonger le message.`,
    formula: 'HMAC(k, m) = H(K_o \\parallel h_{int})',
    sourceCitation: 'Rapport ENSPY 3GI, Chapitre 5, Section 5.3 & 5.4, p. 31',
    operationType: 'hash',
    inputBytes: outerConcat,
    inputHex: bytesToHex(outerConcat),
    outputBytes: finalTag,
    outputHex: bytesToHex(finalTag),
    details: [
      { label: 'Tag complet calculé (hex)', value: bytesToHex(finalTag) },
      { label: 'Longueur du tag complet', value: `${finalTag.length} octets (${finalTag.length * 8} bits)` },
      { label: 'Visibilité externe', value: 'OUI (transmis avec le message sur le canal)' },
    ],
  });

  // Étape 8 : Troncature éventuelle
  if (truncateBits && truncateBits > 0 && truncateBits < finalTag.length * 8) {
    const keepBytes = Math.ceil(truncateBits / 8);
    const minRecommended = Math.max(80, Math.floor((finalTag.length * 8) / 2));
    const isTruncationSafe = truncateBits >= minRecommended;

    finalTag = finalTag.slice(0, keepBytes);

    steps.push({
      stepNumber: 8,
      title: `Troncature du Tag (${truncateBits} bits)`,
      description: isTruncationSafe
        ? `Le tag a été tronqué à ${truncateBits} bits. Cette valeur respecte la recommandation RFC 2104 (au moins 80 bits et la moitié du condensat).`
        : `ATTENTION (RFC 2104) : La troncature à ${truncateBits} bits descend sous le seuil minimal recommandé (${minRecommended} bits). La probabilité de devinette passe à 2^{-${truncateBits}}.`,
      formula: `\\text{Tag}_{tronqué} = \\text{Tag}[0..${keepBytes - 1}]`,
      sourceCitation: 'Rapport ENSPY 3GI, Chapitre 4, Section 4.5.4 & Chapitre 5, Section 5.6, pp. 28, 33',
      operationType: 'truncate',
      outputBytes: finalTag,
      outputHex: bytesToHex(finalTag),
      details: [
        { label: 'Bits conservés', value: `${truncateBits} bits (${keepBytes} octets)` },
        { label: 'Seuil RFC 2104 minimal', value: `${minRecommended} bits` },
        { label: 'Conformité RFC 2104', value: isTruncationSafe ? 'Conforme' : 'Avertissement de sécurité' },
      ],
    });
  }

  const tagHex = bytesToHex(finalTag);
  const endTime = performance.now();

  const isHashBroken = hashInfo.isBroken;
  const securityStatus = isHashBroken ? (hashAlgo === 'md4' ? 'broken' : 'legacy') : 'secure';
  const securityNote = isHashBroken
    ? `Note pédagogique (Rapport p. 32) : Bellare (2006) a démontré que HMAC résiste même si la fonction H sous-jacente a des collisions (comme MD5), tant que sa compression agit comme une PRF. Cependant, par prudence moderne, ${hashInfo.name} est ${hashInfo.statusInReport}.`
    : `SÛR : HMAC-${hashInfo.name} est standardisé (FIPS 198-1, NIST SP 800-224), offre une sécurité de ${hashInfo.digestSizeBits} bits contre la contrefaçon et résiste aux attaques par extension de longueur.`;

  return {
    mechanism: `hmac_${hashAlgo}` as any,
    mechanismName: `HMAC-${hashInfo.name}`,
    messageRaw: messageStr,
    keyRaw: keyStr,
    encoding: messageEncoding,
    messageBytes: rawMessageBytes,
    keyBytes: rawKeyBytes,
    tag: finalTag,
    tagHex,
    tagBits: finalTag.length * 8,
    steps,
    executionTimeMs: parseFloat((endTime - startTime).toFixed(3)),
    byteOperations,
    bitOperations,
    securityStatus,
    securityNote,
    sourceCitation: 'Rapport ENSPY 3GI, Chapitre 5, pp. 29-33',
  };
}
