/**
 * CBC-MAC implementation using AES-128.
 * Formula: C_0 = 0, C_i = E_k(C_{i-1} ⊕ M_i), Tag = C_n.
 * Reference: Rapport ENSPY 3GI, Chapitre 4, Section 4.4.1, pp. 25-26.
 */

import { ecb } from '@noble/ciphers/aes';
import {
  BitOperation,
  ByteOperation,
  CalculationResult,
  CryptoStep,
  TextEncoding,
} from '../types';
import { bytesToHex, stringToBytes, toBinary8, xorBytes } from '../utils';

export function calculateCbcMac(
  messageStr: string,
  keyStr: string,
  encoding: TextEncoding,
  paddingMode: 'pkcs7' | 'zeros' = 'pkcs7',
  truncateBits?: number
): CalculationResult {
  const startTime = performance.now();

  // AES-128 requires 16 bytes key
  let rawKeyBytes = stringToBytes(keyStr, encoding);
  const keyBytes = new Uint8Array(16);
  if (rawKeyBytes.length >= 16) {
    keyBytes.set(rawKeyBytes.slice(0, 16));
  } else {
    keyBytes.set(rawKeyBytes);
    // remaining is zero-padded
  }

  const rawMessageBytes = stringToBytes(messageStr, encoding);

  // Apply padding to make message a multiple of 16 bytes
  const blockSize = 16;
  let paddedMessage: Uint8Array;
  const rem = rawMessageBytes.length % blockSize;
  const padNeeded = rem === 0 ? (paddingMode === 'pkcs7' ? 16 : 0) : blockSize - rem;

  if (padNeeded === 0) {
    paddedMessage = new Uint8Array(rawMessageBytes);
  } else {
    paddedMessage = new Uint8Array(rawMessageBytes.length + padNeeded);
    paddedMessage.set(rawMessageBytes);
    if (paddingMode === 'pkcs7') {
      paddedMessage.fill(padNeeded, rawMessageBytes.length);
    } else {
      // zeros padding
      paddedMessage.fill(0, rawMessageBytes.length);
    }
  }

  // Number of blocks
  const numBlocks = Math.max(1, paddedMessage.length / blockSize);
  const cipher = ecb(keyBytes, { disablePadding: true });

  const steps: CryptoStep[] = [];
  const byteOperations: ByteOperation[] = [];
  const bitOperations: BitOperation[] = [];

  // Step 1: Key setup
  steps.push({
    stepNumber: 1,
    title: 'Préparation de la clé de chiffrement AES-128',
    description: 'La clé secrète partagée k est normalisée sur 128 bits (16 octets) pour le chiffrement par blocs AES.',
    formula: 'k \\in \\{0,1\\}^{128}',
    sourceCitation: 'Rapport ENSPY 3GI, Chapitre 4, Section 4.4.1, p. 25',
    operationType: 'encode',
    outputBytes: keyBytes,
    outputHex: bytesToHex(keyBytes),
    details: [
      { label: 'Clé d\'entrée', value: keyStr },
      { label: 'Taille de clé', value: '16 octets (128 bits)' },
      { label: 'Clé AES-128 (hex)', value: bytesToHex(keyBytes) },
    ],
  });

  // Step 2: Message division & padding
  steps.push({
    stepNumber: 2,
    title: 'Découpage en blocs de 16 octets & Remplissage',
    description: `Le message est découpé en blocs M_1, ..., M_n de 128 bits (16 octets) avec un bourrage ${paddingMode.toUpperCase()}.`,
    formula: 'm = M_1 \\parallel M_2 \\parallel \\dots \\parallel M_n',
    sourceCitation: 'Rapport ENSPY 3GI, Chapitre 4, Section 4.4.1, p. 25',
    operationType: 'pad',
    inputBytes: rawMessageBytes,
    inputHex: bytesToHex(rawMessageBytes),
    outputBytes: paddedMessage,
    outputHex: bytesToHex(paddedMessage),
    details: [
      { label: 'Longueur originale', value: `${rawMessageBytes.length} octets` },
      { label: 'Mode de remplissage', value: paddingMode === 'pkcs7' ? 'PKCS#7 (NIST SP 800-38B)' : 'Zero-padding' },
      { label: 'Octets de bourrage ajoutés', value: `${padNeeded} octets` },
      { label: 'Nombre total de blocs', value: `${numBlocks} blocs (16 octets chacun)` },
    ],
  });

  // Step 3: Initialization vector C_0 = 0
  let state = new Uint8Array(16); // C_0 = 0
  steps.push({
    stepNumber: 3,
    title: 'Vecteur d\'initialisation C_0 = 0',
    description: 'Dans le CBC-MAC standard, l\'état initial est fixé à un vecteur nul de 16 octets de zéros.',
    formula: 'C_0 = 0^{128}',
    sourceCitation: 'Rapport ENSPY 3GI, Chapitre 4, Section 4.4.1, p. 25',
    operationType: 'pad',
    outputBytes: state,
    outputHex: bytesToHex(state),
    details: [
      { label: 'État C_0', value: '16 octets 0x00' },
      { label: 'Hex C_0', value: bytesToHex(state) },
    ],
  });

  // Steps 4..: Process each block
  for (let i = 0; i < numBlocks; i++) {
    const blockIndex = i + 1;
    const block = paddedMessage.slice(i * blockSize, (i + 1) * blockSize);

    // XOR: X_i = C_{i-1} ^ M_i
    const xorResult = xorBytes(state, block);

    // AES encryption: C_i = E_k(X_i)
    const encryptedBlock = cipher.encrypt(xorResult);

    // Record byte operations for this block
    for (let b = 0; b < 16; b++) {
      byteOperations.push({
        index: i * 16 + b,
        byteA: state[b],
        byteB: block[b],
        operation: `C_${i}[${b}] ⊕ M_${blockIndex}[${b}]`,
        result: xorResult[b],
      });
    }

    // Record bit operations for first block
    if (i === 0) {
      for (let b = 0; b < Math.min(4, 16); b++) {
        for (let bit = 7; bit >= 0; bit--) {
          const bitA = (state[b] >> bit) & 1;
          const bitB = (block[b] >> bit) & 1;
          bitOperations.push({
            position: b * 8 + (7 - bit),
            operandA: bitA,
            operandB: bitB,
            operation: 'XOR',
            result: bitA ^ bitB,
            label: `B1.o${b}.b${bit}`,
          });
        }
      }
    }

    steps.push({
      stepNumber: 4 + i * 2,
      title: `Bloc M_${blockIndex} : Opération OU exclusif (C_${i} ⊕ M_${blockIndex})`,
      description: `Combinaison bit-à-bit XOR entre l'état précédent C_${i} et le bloc de message courant M_${blockIndex}.`,
      formula: `X_${blockIndex} = C_${i} \\oplus M_${blockIndex}`,
      sourceCitation: 'Rapport ENSPY 3GI, Chapitre 4, Section 4.4.1, p. 25',
      operationType: 'xor',
      inputBytes: block,
      inputHex: bytesToHex(block),
      outputBytes: xorResult,
      outputHex: bytesToHex(xorResult),
      stateBefore: bytesToHex(state),
      stateAfter: bytesToHex(xorResult),
      details: [
        { label: `Bloc courant M_${blockIndex}`, value: bytesToHex(block) },
        { label: `État précédent C_${i}`, value: bytesToHex(state) },
        { label: `Résultat XOR X_${blockIndex}`, value: bytesToHex(xorResult) },
      ],
    });

    steps.push({
      stepNumber: 5 + i * 2,
      title: `Bloc M_${blockIndex} : Chiffrement AES-128 E_k(X_${blockIndex})`,
      description: `Chiffrement par blocs AES-128 du résultat XOR avec la clé secrète k pour produire l'état chaîné C_${blockIndex}.`,
      formula: `C_${blockIndex} = E_k(X_${blockIndex})`,
      sourceCitation: 'Rapport ENSPY 3GI, Chapitre 4, Section 4.4.1, p. 25',
      operationType: 'aes',
      inputBytes: xorResult,
      inputHex: bytesToHex(xorResult),
      outputBytes: encryptedBlock,
      outputHex: bytesToHex(encryptedBlock),
      details: [
        { label: `Entrée chiffrement X_${blockIndex}`, value: bytesToHex(xorResult) },
        { label: `État chaîné C_${blockIndex}`, value: bytesToHex(encryptedBlock) },
      ],
    });

    state = new Uint8Array(encryptedBlock);
  }

  // Tag = C_n (with optional truncation)
  let tagBytes = state;
  if (truncateBits && truncateBits > 0 && truncateBits < 128) {
    const keepBytes = Math.ceil(truncateBits / 8);
    tagBytes = state.slice(0, keepBytes);
  }

  const tagHex = bytesToHex(tagBytes);
  const endTime = performance.now();

  steps.push({
    stepNumber: 4 + numBlocks * 2,
    title: 'Extraction du Tag final t = C_n & Analyse de Sécurité',
    description:
      'Le tag final correspond au dernier état chiffré C_n. ' +
      'LIMITATION MAJEURE DU RAPPORT : CBC-MAC est sûr pour des messages de longueur FIXE [7], mais devient falsifiable pour des messages de longueur variable ' +
      '(Rapport, p. 26 : un attaquant peut forger le tag pour m\'\' = M_1||...||M_n||(M\'_1 ⊕ t)||M\'_2... avec seulement 2 requêtes). ' +
      'Les correctifs sont le préfixage de longueur, ECBC-MAC ou le CMAC (NIST SP 800-38B).',
    formula: 't = C_n',
    sourceCitation: 'Rapport ENSPY 3GI, Chapitre 4, Section 4.4.1, pp. 25-26',
    operationType: 'truncate',
    outputBytes: tagBytes,
    outputHex: tagHex,
    details: [
      { label: 'Dernier état chaîné (C_n)', value: bytesToHex(state) },
      { label: 'Tag extrait (Hex)', value: tagHex },
      { label: 'Taille du Tag', value: `${tagBytes.length * 8} bits (${tagBytes.length} octets)` },
      { label: 'Statut de sécurité', value: 'Sûr sur longueur fixe ; Vulnérable sur longueurs variables' },
    ],
  });

  return {
    mechanism: 'cbc_mac',
    mechanismName: 'CBC-MAC (AES-128)',
    messageRaw: messageStr,
    keyRaw: keyStr,
    encoding,
    messageBytes: rawMessageBytes,
    keyBytes,
    tag: tagBytes,
    tagHex,
    tagBits: tagBytes.length * 8,
    steps,
    executionTimeMs: parseFloat((endTime - startTime).toFixed(3)),
    byteOperations,
    bitOperations,
    securityStatus: 'legacy',
    securityNote: 'CBC-MAC : Sûr uniquement pour des messages de longueur fixe connue à l\'avance. Vulnérable sur longueur variable sans extension CMAC (NIST SP 800-38B).',
    sourceCitation: 'Rapport ENSPY 3GI, Chapitre 4, Section 4.4.1, pp. 25-26',
  };
}
