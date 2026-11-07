/**
 * MD4 Message-Digest Algorithm (RFC 1320)
 * Ronald Rivest, 1990.
 * Pure TypeScript implementation for educational inspection.
 */

function rotateLeft(value: number, shift: number): number {
  return ((value << shift) | (value >>> (32 - shift))) >>> 0;
}

function F(x: number, y: number, z: number): number {
  return ((x & y) | (~x & z)) >>> 0;
}

function G(x: number, y: number, z: number): number {
  return ((x & y) | (x & z) | (y & z)) >>> 0;
}

function H(x: number, y: number, z: number): number {
  return (x ^ y ^ z) >>> 0;
}

export function md4(data: Uint8Array): Uint8Array {
  const origLen = data.length;
  const bitLen = origLen * 8;

  // Padding: append 1 bit (0x80), then zeros, then 64-bit length in little endian
  const padLen = (origLen % 64 < 56) ? (56 - (origLen % 64)) : (120 - (origLen % 64));
  const totalLen = origLen + padLen + 8;
  const padded = new Uint8Array(totalLen);
  padded.set(data);
  padded[origLen] = 0x80;

  // Length in little-endian 64-bit
  const view = new DataView(padded.buffer);
  view.setUint32(totalLen - 8, bitLen >>> 0, true);
  view.setUint32(totalLen - 4, Math.floor(bitLen / 0x100000000), true);

  // Initial registers (little-endian words)
  let A = 0x67452301;
  let B = 0xefcdab89;
  let C = 0x98badcfe;
  let D = 0x10325476;

  // Process each 16-word (64-byte) block
  for (let offset = 0; offset < totalLen; offset += 64) {
    const X = new Uint32Array(16);
    for (let j = 0; j < 16; j++) {
      X[j] = view.getUint32(offset + j * 4, true);
    }

    const AA = A;
    const BB = B;
    const CC = C;
    const DD = D;

    // Round 1
    const S1 = [3, 7, 11, 19];
    for (let i = 0; i < 16; i++) {
      const idx = i;
      const s = S1[i % 4];
      if (i % 4 === 0) A = rotateLeft((A + F(B, C, D) + X[idx]) >>> 0, s);
      else if (i % 4 === 1) D = rotateLeft((D + F(A, B, C) + X[idx]) >>> 0, s);
      else if (i % 4 === 2) C = rotateLeft((C + F(D, A, B) + X[idx]) >>> 0, s);
      else if (i % 4 === 3) B = rotateLeft((B + F(C, D, A) + X[idx]) >>> 0, s);
    }

    // Round 2
    const S2 = [3, 5, 9, 13];
    const order2 = [0, 4, 8, 12, 1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15];
    for (let i = 0; i < 16; i++) {
      const idx = order2[i];
      const s = S2[i % 4];
      const K2 = 0x5a827999;
      if (i % 4 === 0) A = rotateLeft((A + G(B, C, D) + X[idx] + K2) >>> 0, s);
      else if (i % 4 === 1) D = rotateLeft((D + G(A, B, C) + X[idx] + K2) >>> 0, s);
      else if (i % 4 === 2) C = rotateLeft((C + G(D, A, B) + X[idx] + K2) >>> 0, s);
      else if (i % 4 === 3) B = rotateLeft((B + G(C, D, A) + X[idx] + K2) >>> 0, s);
    }

    // Round 3
    const S3 = [3, 9, 11, 15];
    const order3 = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];
    for (let i = 0; i < 16; i++) {
      const idx = order3[i];
      const s = S3[i % 4];
      const K3 = 0x6ed9eba1;
      if (i % 4 === 0) A = rotateLeft((A + H(B, C, D) + X[idx] + K3) >>> 0, s);
      else if (i % 4 === 1) D = rotateLeft((D + H(A, B, C) + X[idx] + K3) >>> 0, s);
      else if (i % 4 === 2) C = rotateLeft((C + H(D, A, B) + X[idx] + K3) >>> 0, s);
      else if (i % 4 === 3) B = rotateLeft((B + H(C, D, A) + X[idx] + K3) >>> 0, s);
    }

    A = (A + AA) >>> 0;
    B = (B + BB) >>> 0;
    C = (C + CC) >>> 0;
    D = (D + DD) >>> 0;
  }

  const result = new Uint8Array(16);
  const outView = new DataView(result.buffer);
  outView.setUint32(0, A, true);
  outView.setUint32(4, B, true);
  outView.setUint32(8, C, true);
  outView.setUint32(12, D, true);

  return result;
}
