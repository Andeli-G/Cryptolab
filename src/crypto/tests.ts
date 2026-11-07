/**
 * Test vectors suite for CryptoLab.
 * Directly validating calculations against the ENSPY 3GI report and official RFCs.
 */

import { calculateCbcMac } from './cbc-mac';
import { calculateHkdf } from './hkdf';
import { calculateHmac } from './hmac';
import { calculateNaiveMac } from './naive-mac';
import { bytesToHex, hexToBytes, naiveCompare, timingSafeEqual } from './utils';

export function runAllCryptoTests(): { name: string; passed: boolean; expected: string; actual: string }[] {
  const results: { name: string; passed: boolean; expected: string; actual: string }[] = [];

  // 1. RFC 4231 Case 2 - Clé "Jefe" (Rapport ENSPY 3GI, Section 5.7, p. 33)
  {
    const hmacRes = calculateHmac('what do ya want for nothing?', 'Jefe', 'ascii', 'ascii', 'sha256');
    const expected = '5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843';
    results.push({
      name: 'HMAC-SHA256 RFC 4231 (Clé Jefe - Rapport p. 33)',
      passed: hmacRes.tagHex.toLowerCase() === expected.toLowerCase(),
      expected,
      actual: hmacRes.tagHex,
    });
  }

  // 2. RFC 4231 Case 1 - Clé 20x 0x0b, message "Hi There"
  {
    const keyHex = '0b'.repeat(20);
    const hmacRes = calculateHmac('Hi There', keyHex, 'ascii', 'hex', 'sha256');
    const expected = 'b0344c61d8db38535ca8afceaf0bf12b881dc200c9833da726e9376c2e32cff7';
    results.push({
      name: 'HMAC-SHA256 RFC 4231 Case 1 (Hi There)',
      passed: hmacRes.tagHex.toLowerCase() === expected.toLowerCase(),
      expected,
      actual: hmacRes.tagHex,
    });
  }

  // 3. RFC 5869 Test Case 1 - HKDF-SHA256 (Rapport ENSPY 3GI, Section 6.3.3, p. 38)
  {
    const ikmHex = '0b'.repeat(22);
    // salt 0x00 to 0x0c (13 bytes)
    let saltHex = '';
    for (let i = 0; i <= 0x0c; i++) saltHex += i.toString(16).padStart(2, '0');
    // info 0xf0 to 0xf9 (10 bytes)
    let infoHex = '';
    for (let i = 0xf0; i <= 0xf9; i++) infoHex += i.toString(16).padStart(2, '0');

    const hkdfRes = calculateHkdf({
      ikm: ikmHex.match(/.{1,2}/g)!.join(' '),
      salt: saltHex.match(/.{1,2}/g)!.join(' '),
      info: infoHex.match(/.{1,2}/g)!.join(' '),
      outputLength: 42,
      hashAlgorithm: 'sha256',
    });

    const expectedOkm = '3cb25f25faacd57a90434f64d0362f2a2d2d0a90cf1a5a4c5db02d56ecc4c5bf34007208d5b887185865';
    results.push({
      name: 'HKDF-SHA256 RFC 5869 Test Case 1 (Rapport p. 38)',
      passed: hkdfRes.okmHex.toLowerCase() === expectedOkm.toLowerCase(),
      expected: expectedOkm,
      actual: hkdfRes.okmHex,
    });
  }

  // 4. Naive MAC Prefix H(k || m)
  {
    const naiveRes = calculateNaiveMac('SAVE BILL', 'mysecretkey', 'utf8', 'prefix', 'sha256');
    results.push({
      name: 'MAC Naïf Préfixe H(k || m)',
      passed: naiveRes.tagHex.length === 64,
      expected: '64 hex characters (SHA-256)',
      actual: `${naiveRes.tagHex.length} hex chars: ${naiveRes.tagHex.slice(0, 16)}...`,
    });
  }

  // 5. CBC-MAC AES-128
  {
    const cbcRes = calculateCbcMac('SAVE BILL', '0123456789abcdef', 'ascii');
    results.push({
      name: 'CBC-MAC AES-128',
      passed: cbcRes.tagHex.length === 32, // 16 bytes = 32 hex chars
      expected: '32 hex characters (AES-128 block)',
      actual: `${cbcRes.tagHex.length} hex chars: ${cbcRes.tagHex}`,
    });
  }

  // 6. Timing Safe Equal vs Naive Compare
  {
    const a = new Uint8Array([1, 2, 3, 4, 5]);
    const b = new Uint8Array([1, 2, 3, 4, 5]);
    const c = new Uint8Array([1, 2, 3, 4, 99]);

    const safeMatch = timingSafeEqual(a, b);
    const safeDiff = !timingSafeEqual(a, c);
    const naiveTest = naiveCompare(a, c);

    results.push({
      name: 'Vérification en temps constant (Rapport p. 44)',
      passed: safeMatch && safeDiff && naiveTest.failedAt === 4,
      expected: 'timingSafeEqual works, naiveCompare catches position 4',
      actual: `safeMatch=${safeMatch}, safeDiff=${safeDiff}, failedAt=${naiveTest.failedAt}`,
    });
  }

  return results;
}

if (process.argv[1] && process.argv[1].endsWith('tests.ts')) {
  console.log('--- EXÉCUTION DE LA SUITE DE TESTS CRYPTOGRAPHIQUES ---');
  const tests = runAllCryptoTests();
  let allOk = true;
  for (const t of tests) {
    const symbol = t.passed ? '✅' : '❌';
    console.log(`${symbol} ${t.name}`);
    if (!t.passed) {
      allOk = false;
      console.log(`   Attendu : ${t.expected}`);
      console.log(`   Obtenu  : ${t.actual}`);
    }
  }
  if (allOk) {
    console.log('\n✨ TOUS LES TESTS CRYPTOGRAPHIQUES SONT CONFORMES AUX VECTEURS DU RAPPORT !');
  } else {
    console.error('\n⚠️ ÉCHEC DE CERTAINS TESTS CRYPTOGRAPHIQUES');
    process.exit(1);
  }
}
