/**
 * Cryptographic Hash Primitives Wrapper.
 * Provides MD4, MD5, SHA-1, SHA-256, SHA-512 with metadata from the report.
 * Reference: Rapport ENSPY 3GI, Chapitre 3, Section 3.5, p. 20.
 */

import { md5 } from '@noble/hashes/legacy';
import { sha1 } from '@noble/hashes/sha1';
import { sha256 } from '@noble/hashes/sha256';
import { sha512 } from '@noble/hashes/sha512';
import { md4 } from './md4';
import { HashAlgorithm } from './types';

export interface HashInfo {
  id: HashAlgorithm;
  name: string;
  blockSizeBytes: number; // B (64 bytes for MD4..SHA256, 128 for SHA512)
  digestSizeBytes: number; // n (in bytes)
  digestSizeBits: number;
  year: number;
  statusInReport: string;
  isBroken: boolean;
  reference: string;
}

export const HASH_REGISTRY: Record<HashAlgorithm, HashInfo> = {
  md4: {
    id: 'md4',
    name: 'MD4',
    blockSizeBytes: 64,
    digestSizeBytes: 16,
    digestSizeBits: 128,
    year: 1990,
    statusInReport: 'Cassé : collisions calculables en quelques opérations depuis 2004 (Wang)',
    isBroken: true,
    reference: 'RFC 1320 / Rapport p. 20',
  },
  md5: {
    id: 'md5',
    name: 'MD5',
    blockSizeBytes: 64,
    digestSizeBytes: 16,
    digestSizeBits: 128,
    year: 1991,
    statusInReport: 'Cassé : collisions en secondes, certificats falsifiés (2008, 2012)',
    isBroken: true,
    reference: 'RFC 1321 / Rapport p. 20',
  },
  sha1: {
    id: 'sha1',
    name: 'SHA-1',
    blockSizeBytes: 64,
    digestSizeBytes: 20,
    digestSizeBits: 160,
    year: 1995,
    statusInReport: 'Cassé en pratique (SHAttered, 2017) ; à abandonner d\'ici 2030 (NIST)',
    isBroken: true,
    reference: 'FIPS 180-1 / Rapport p. 20',
  },
  sha256: {
    id: 'sha256',
    name: 'SHA-256',
    blockSizeBytes: 64,
    digestSizeBytes: 32,
    digestSizeBits: 256,
    year: 2001,
    statusInReport: 'Sûr : aucune attaque pratique ; sensible à l\'extension de longueur dans Merkle-Damgård',
    isBroken: false,
    reference: 'FIPS 180-2 / Rapport p. 20, 21',
  },
  sha512: {
    id: 'sha512',
    name: 'SHA-512',
    blockSizeBytes: 128,
    digestSizeBytes: 64,
    digestSizeBits: 512,
    year: 2001,
    statusInReport: 'Sûr : aucune attaque pratique ; résistance 256 bits aux collisions',
    isBroken: false,
    reference: 'FIPS 180-2 / Rapport p. 20, 21',
  },
};

export function computeHash(algo: HashAlgorithm, data: Uint8Array): Uint8Array {
  switch (algo) {
    case 'md4':
      return md4(data);
    case 'md5':
      return md5(data);
    case 'sha1':
      return sha1(data);
    case 'sha256':
      return sha256(data);
    case 'sha512':
      return sha512(data);
    default:
      throw new Error(`Algorithme de hachage non supporté: ${algo}`);
  }
}
