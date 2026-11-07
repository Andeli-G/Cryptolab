/**
 * Cryptographic utility functions for byte/hex/binary conversions and side-channel safe comparisons.
 * Reference: Rapport ENSPY 3GI, Chapitre 7, Section 7.4.
 */

import { TextEncoding } from './types';

export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function hexToBytes(hex: string): Uint8Array {
  const cleanHex = hex.replace(/\s+/g, '').toLowerCase();
  if (cleanHex.length % 2 !== 0) {
    throw new Error('La chaîne hexadécimale doit contenir un nombre pair de caractères.');
  }
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    const val = parseInt(cleanHex.substring(i * 2, i * 2 + 2), 16);
    if (isNaN(val)) {
      throw new Error(`Caractère hexadécimal invalide à l'octet ${i}.`);
    }
    bytes[i] = val;
  }
  return bytes;
}

export function stringToBytes(input: string, encoding: TextEncoding): Uint8Array {
  if (encoding === 'hex') {
    return hexToBytes(input);
  }
  if (encoding === 'ascii') {
    const bytes = new Uint8Array(input.length);
    for (let i = 0; i < input.length; i++) {
      bytes[i] = input.charCodeAt(i) & 0xff;
    }
    return bytes;
  }
  // Default utf8
  return new TextEncoder().encode(input);
}

export function bytesToString(bytes: Uint8Array): string {
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    return Array.from(bytes)
      .map((b) => (b >= 32 && b <= 126 ? String.fromCharCode(b) : '.'))
      .join('');
  }
}

export function toBinary8(byte: number): string {
  return (byte & 0xff).toString(2).padStart(8, '0');
}

export function xorBytes(a: Uint8Array, b: Uint8Array): Uint8Array {
  const len = Math.min(a.length, b.length);
  const out = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    out[i] = a[i] ^ b[i];
  }
  return out;
}

/**
 * Compares two byte arrays in constant time to prevent side-channel timing attacks.
 * Reference: Rapport ENSPY 3GI, Chapitre 7, Section 7.4, p. 44 (compare_digest).
 */
export function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}

/**
 * Naive comparison that terminates early on the first differing byte.
 * Used for demonstrating side-channel leakage.
 * Reference: Rapport ENSPY 3GI, Section 7.4.
 */
export function naiveCompare(a: Uint8Array, b: Uint8Array): { match: boolean; comparisons: number; failedAt: number } {
  const maxLen = Math.min(a.length, b.length);
  if (a.length !== b.length) {
    return { match: false, comparisons: 1, failedAt: 0 };
  }
  for (let i = 0; i < maxLen; i++) {
    if (a[i] !== b[i]) {
      return { match: false, comparisons: i + 1, failedAt: i };
    }
  }
  return { match: true, comparisons: maxLen, failedAt: -1 };
}

/**
 * Computes bit differences (Hamming distance) to measure Strict Avalanche Criterion (SAC).
 * Reference: Rapport ENSPY 3GI, Chapitre 3, Section 3.1.2, p. 14.
 */
export function bitDiffCount(a: Uint8Array, b: Uint8Array): { diffBits: number; totalBits: number; percentage: number } {
  const minLen = Math.min(a.length, b.length);
  let diffBits = 0;
  for (let i = 0; i < minLen; i++) {
    let xor = a[i] ^ b[i];
    while (xor > 0) {
      diffBits += xor & 1;
      xor >>= 1;
    }
  }
  // Account for difference in length
  if (a.length !== b.length) {
    const maxLen = Math.max(a.length, b.length);
    diffBits += (maxLen - minLen) * 8;
  }
  const totalBits = Math.max(a.length, b.length) * 8;
  const percentage = totalBits > 0 ? (diffBits / totalBits) * 100 : 0;
  return { diffBits, totalBits, percentage: parseFloat(percentage.toFixed(2)) };
}
