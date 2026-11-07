/**
 * Types and interfaces for the CryptoLab cryptographic engine.
 * Fully aligned with "Hachage : MAC, HMAC et dérivation des clés" (Groupe 23, ENSPY 3GI).
 */

export type TextEncoding = 'utf8' | 'ascii' | 'hex';

export type HashAlgorithm = 'md4' | 'md5' | 'sha1' | 'sha256' | 'sha512';

export type MacMechanism =
  | 'naive_prefix'  // H(k || m)
  | 'naive_suffix'  // H(m || k)
  | 'cbc_mac'       // AES-128 CBC-MAC
  | 'hmac_md4'      // HMAC with MD4
  | 'hmac_md5'      // HMAC with MD5
  | 'hmac_sha1'     // HMAC with SHA-1
  | 'hmac_sha256'   // HMAC with SHA-256
  | 'hmac_sha512'   // HMAC with SHA-512
  | 'hkdf';         // Key derivation (distinct space)

export interface CryptoStepDetail {
  label: string;
  value: string;
  hex?: string;
  binary?: string;
  highlight?: boolean;
}

export interface CryptoStep {
  stepNumber: number;
  title: string;
  description: string;
  formula?: string;
  sourceCitation?: string;
  operationType: 'encode' | 'pad' | 'xor' | 'concat' | 'hash' | 'aes' | 'expand' | 'truncate';
  inputBytes?: Uint8Array;
  inputHex?: string;
  outputBytes?: Uint8Array;
  outputHex?: string;
  details?: CryptoStepDetail[];
  stateBefore?: string;
  stateAfter?: string;
}

export interface BitOperation {
  position: number;
  operandA: number; // 0 or 1
  operandB: number;
  operation: 'XOR' | 'AND' | 'OR' | 'NOT' | 'SHIFT';
  result: number;
  label?: string;
}

export interface ByteOperation {
  index: number;
  byteA: number;
  byteB?: number;
  operation: string;
  result: number;
  charA?: string;
  charResult?: string;
}

export interface CalculationResult {
  mechanism: MacMechanism;
  mechanismName: string;
  messageRaw: string;
  keyRaw: string;
  encoding: TextEncoding;
  messageBytes: Uint8Array;
  keyBytes: Uint8Array;
  tag: Uint8Array;
  tagHex: string;
  tagBits: number;
  steps: CryptoStep[];
  executionTimeMs: number;
  byteOperations: ByteOperation[];
  bitOperations: BitOperation[];
  securityStatus: 'broken' | 'vulnerable' | 'legacy' | 'secure';
  securityNote: string;
  sourceCitation: string;
}

export interface CbcMacParams {
  padding: 'pkcs7' | 'zeros' | 'none';
  blockSizeBytes: number; // 16 for AES
}

export interface HkdfParams {
  ikm: string;
  salt: string;
  info: string;
  outputLength: number;
  hashAlgorithm: 'sha256' | 'sha512';
}

export interface HkdfResult {
  ikmBytes: Uint8Array;
  saltBytes: Uint8Array;
  infoBytes: Uint8Array;
  prk: Uint8Array;
  prkHex: string;
  okm: Uint8Array;
  okmHex: string;
  requestedLength: number;
  iterations: {
    iteration: number;
    inputHex: string;
    outputHex: string;
  }[];
  steps: CryptoStep[];
  executionTimeMs: number;
  sourceCitation: string;
}
