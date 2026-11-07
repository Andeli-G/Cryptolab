'use client';

import React, { useState, useMemo } from 'react';
import { calculateCbcMac } from '../../crypto/cbc-mac';
import { calculateHkdf } from '../../crypto/hkdf';
import { calculateHmac } from '../../crypto/hmac';
import { calculateNaiveMac } from '../../crypto/naive-mac';
import { CalculationResult, HkdfResult, MacMechanism, TextEncoding } from '../../crypto/types';
import { StepViewer } from '../../components/crypto-steps/StepViewer';
import { ByteViewer } from '../../components/byte-viewer/ByteViewer';
import { BinaryViewer } from '../../components/binary-viewer/BinaryViewer';
import { KatexFormula } from '../../components/common/KatexFormula';
import { bytesToHex } from '../../crypto/utils';

export default function LaboratoryPage() {
  // Input parameters
  const [mechanism, setMechanism] = useState<MacMechanism>('hmac_sha256');
  const [message, setMessage] = useState<string>('SAVE BILL');
  const [key, setKey] = useState<string>('SecretKey2026!');
  const [encoding, setEncoding] = useState<TextEncoding>('utf8');
  const [truncateBits, setTruncateBits] = useState<string>('');
  const [cbcPadding, setCbcPadding] = useState<'pkcs7' | 'zeros'>('pkcs7');
  const [calcDisplayMode, setCalcDisplayMode] = useState<'global' | 'byte' | 'bit'>('global');

  // HKDF distinct space parameters
  const [hkdfIkm, setHkdfIkm] = useState<string>('0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b');
  const [hkdfSalt, setHkdfSalt] = useState<string>('00 01 02 03 04 05 06 07 08 09 0a 0b 0c');
  const [hkdfInfo, setHkdfInfo] = useState<string>('f0 f1 f2 f3 f4 f5 f6 f7 f8 f9');
  const [hkdfLen, setHkdfLen] = useState<number>(42);
  const [hkdfHash, setHkdfHash] = useState<'sha256' | 'sha512'>('sha256');

  // Load Presets
  const applyPreset = (type: string) => {
    if (type === 'jefe') {
      // RFC 4231 Case 2 (Report p. 33)
      setMechanism('hmac_sha256');
      setMessage('what do ya want for nothing?');
      setKey('Jefe');
      setEncoding('ascii');
      setTruncateBits('');
    } else if (type === 'rfc4231_case1') {
      // RFC 4231 Case 1
      setMechanism('hmac_sha256');
      setMessage('Hi There');
      setKey('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b');
      setEncoding('ascii');
      setTruncateBits('');
    } else if (type === 'save_bill') {
      setMessage('SAVE BILL');
      setKey('SecretKey2026!');
      setEncoding('utf8');
    } else if (type === 'kill_bill') {
      setMessage('KILL BILL');
      setKey('SecretKey2026!');
      setEncoding('utf8');
    } else if (type === 'rfc5869') {
      // RFC 5869 Test Case 1 (Report p. 38)
      setMechanism('hkdf');
      setHkdfIkm('0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b');
      setHkdfSalt('00 01 02 03 04 05 06 07 08 09 0a 0b 0c');
      setHkdfInfo('f0 f1 f2 f3 f4 f5 f6 f7 f8 f9');
      setHkdfLen(42);
      setHkdfHash('sha256');
    }
  };

  // Run calculation
  const parsedTruncate = truncateBits ? parseInt(truncateBits, 10) : undefined;

  const result = useMemo<CalculationResult | null>(() => {
    if (mechanism === 'hkdf') return null; // handled separately

    try {
      if (mechanism === 'naive_prefix') {
        return calculateNaiveMac(message, key, encoding, 'prefix', 'sha256');
      }
      if (mechanism === 'naive_suffix') {
        return calculateNaiveMac(message, key, encoding, 'suffix', 'sha256');
      }
      if (mechanism === 'cbc_mac') {
        return calculateCbcMac(message, key, encoding, cbcPadding, parsedTruncate);
      }
      const hashAlgo = mechanism.replace('hmac_', '') as any;
      return calculateHmac(message, key, encoding, encoding, hashAlgo, parsedTruncate);
    } catch (err: any) {
      console.error(err);
      return null;
    }
  }, [mechanism, message, key, encoding, cbcPadding, parsedTruncate]);

  // HKDF calculation
  const hkdfResult = useMemo<HkdfResult | null>(() => {
    if (mechanism !== 'hkdf') return null;
    try {
      return calculateHkdf({
        ikm: hkdfIkm,
        salt: hkdfSalt,
        info: hkdfInfo,
        outputLength: hkdfLen,
        hashAlgorithm: hkdfHash,
      });
    } catch (err: any) {
      console.error(err);
      return null;
    }
  }, [mechanism, hkdfIkm, hkdfSalt, hkdfInfo, hkdfLen, hkdfHash]);

  return (
    <div className="py-6 sm:py-8 flex flex-col gap-6">
      {/* Header Banner */}
      <div className="bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-6 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed dark:bg-primary-container/30 text-on-primary-fixed dark:text-primary-fixed">
            <span className="material-symbols-outlined text-[16px]">science</span>
            <span className="font-label-sm text-xs font-semibold uppercase tracking-wider">
              Banc d'Essai Cryptographique Pas-à-Pas
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            <span className="text-on-surface-variant dark:text-zinc-400">Exécution locale pure</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-headline-xl text-2xl sm:text-3xl font-bold text-on-surface dark:text-zinc-100">
              Laboratoire de Calcul &amp; Registres
            </h1>
            <p className="text-sm text-on-surface-variant dark:text-zinc-300 mt-0.5">
              Dissection microscopique bit par bit et octet par octet des opérations cryptographiques réelles.
            </p>
          </div>

          {/* Presets Quick Selector */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            <span className="text-on-surface-variant dark:text-zinc-400 font-semibold mr-1">Vecteurs :</span>
            <button
              onClick={() => applyPreset('jefe')}
              type="button"
              className="px-2 py-1 rounded bg-surface-container-low dark:bg-zinc-800 hover:bg-primary hover:text-white border border-outline-variant/30 transition-colors"
            >
              RFC 4231 (Jefe)
            </button>
            <button
              onClick={() => applyPreset('rfc5869')}
              type="button"
              className="px-2 py-1 rounded bg-surface-container-low dark:bg-zinc-800 hover:bg-primary hover:text-white border border-outline-variant/30 transition-colors"
            >
              RFC 5869 (HKDF)
            </button>
            <button
              onClick={() => applyPreset('save_bill')}
              type="button"
              className="px-2 py-1 rounded bg-surface-container-low dark:bg-zinc-800 hover:bg-primary hover:text-white border border-outline-variant/30 transition-colors"
            >
              SAVE BILL
            </button>
            <button
              onClick={() => applyPreset('kill_bill')}
              type="button"
              className="px-2 py-1 rounded bg-surface-container-low dark:bg-zinc-800 hover:bg-primary hover:text-white border border-outline-variant/30 transition-colors"
            >
              KILL BILL
            </button>
          </div>
        </div>
      </div>

      {/* Mechanism Selector Bar */}
      <div className="bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-4 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-on-surface-variant dark:text-zinc-400">
            Sélectionnez la Primitive Cryptographique :
          </span>
          <span className="text-xs font-mono text-primary font-semibold">
            {mechanism === 'hkdf' ? 'Espace Dérivation Distinct' : 'Mécanisme d\'Authentification'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 gap-1.5 text-xs font-mono">
          <button
            type="button"
            onClick={() => setMechanism('naive_prefix')}
            className={`p-2 rounded-lg text-center font-semibold transition-all ${
              mechanism === 'naive_prefix'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-surface-container-low dark:bg-zinc-800 hover:bg-surface-container text-on-surface dark:text-zinc-200'
            }`}
          >
            H(k ∥ m)
          </button>
          <button
            type="button"
            onClick={() => setMechanism('naive_suffix')}
            className={`p-2 rounded-lg text-center font-semibold transition-all ${
              mechanism === 'naive_suffix'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-surface-container-low dark:bg-zinc-800 hover:bg-surface-container text-on-surface dark:text-zinc-200'
            }`}
          >
            H(m ∥ k)
          </button>
          <button
            type="button"
            onClick={() => setMechanism('cbc_mac')}
            className={`p-2 rounded-lg text-center font-semibold transition-all ${
              mechanism === 'cbc_mac'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-surface-container-low dark:bg-zinc-800 hover:bg-surface-container text-on-surface dark:text-zinc-200'
            }`}
          >
            CBC-MAC
          </button>
          <button
            type="button"
            onClick={() => setMechanism('hmac_md4')}
            className={`p-2 rounded-lg text-center font-semibold transition-all ${
              mechanism === 'hmac_md4'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-surface-container-low dark:bg-zinc-800 hover:bg-surface-container text-on-surface dark:text-zinc-200'
            }`}
          >
            HMAC-MD4
          </button>
          <button
            type="button"
            onClick={() => setMechanism('hmac_md5')}
            className={`p-2 rounded-lg text-center font-semibold transition-all ${
              mechanism === 'hmac_md5'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-surface-container-low dark:bg-zinc-800 hover:bg-surface-container text-on-surface dark:text-zinc-200'
            }`}
          >
            HMAC-MD5
          </button>
          <button
            type="button"
            onClick={() => setMechanism('hmac_sha1')}
            className={`p-2 rounded-lg text-center font-semibold transition-all ${
              mechanism === 'hmac_sha1'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-surface-container-low dark:bg-zinc-800 hover:bg-surface-container text-on-surface dark:text-zinc-200'
            }`}
          >
            HMAC-SHA1
          </button>
          <button
            type="button"
            onClick={() => setMechanism('hmac_sha256')}
            className={`p-2 rounded-lg text-center font-semibold transition-all ${
              mechanism === 'hmac_sha256'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-surface-container-low dark:bg-zinc-800 hover:bg-surface-container text-on-surface dark:text-zinc-200'
            }`}
          >
            HMAC-SHA256
          </button>
          <button
            type="button"
            onClick={() => setMechanism('hmac_sha512')}
            className={`p-2 rounded-lg text-center font-semibold transition-all ${
              mechanism === 'hmac_sha512'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-surface-container-low dark:bg-zinc-800 hover:bg-surface-container text-on-surface dark:text-zinc-200'
            }`}
          >
            HMAC-SHA512
          </button>
          <button
            type="button"
            onClick={() => setMechanism('hkdf')}
            className={`p-2 rounded-lg text-center font-semibold transition-all ${
              mechanism === 'hkdf'
                ? 'bg-secondary text-white shadow-xs'
                : 'bg-secondary/10 dark:bg-secondary/20 hover:bg-secondary/20 text-secondary'
            }`}
          >
            HKDF (KDF)
          </button>
        </div>
      </div>

      {/* Input Parameters Configuration Grid */}
      <div className="bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-6 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-5">
        <h2 className="font-headline-md text-base sm:text-lg font-bold text-on-surface dark:text-zinc-100 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">tune</span>
          Paramètres d'Entrée {mechanism === 'hkdf' ? '(Espace Dérivation HKDF)' : '(Authentification)'}
        </h2>

        {mechanism !== 'hkdf' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Message input */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <label className="font-semibold text-on-surface dark:text-zinc-200">
                  Message à authentifier (m) :
                </label>
                <span className="text-on-surface-variant dark:text-zinc-400">
                  {message.length} caractères ({encoding.toUpperCase()})
                </span>
              </div>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="ex: SAVE BILL"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/40 font-mono text-sm text-on-surface dark:text-zinc-100 focus:outline-none focus:border-primary"
              />
            </div>

            {/* Secret key input */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <label className="font-semibold text-on-surface dark:text-zinc-200">
                  Clé secrète (k) :
                </label>
                <span className="text-primary font-semibold">Symétrique</span>
              </div>
              <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="ex: SecretKey2026!"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/40 font-mono text-sm text-on-surface dark:text-zinc-100 focus:outline-none focus:border-primary"
              />
            </div>

            {/* Encoding selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono font-semibold text-on-surface dark:text-zinc-200">
                Encodage :
              </label>
              <select
                value={encoding}
                onChange={(e) => setEncoding(e.target.value as TextEncoding)}
                className="px-3.5 py-2.5 rounded-xl bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/40 font-mono text-sm text-on-surface dark:text-zinc-100 focus:outline-none focus:border-primary"
              >
                <option value="utf8">UTF-8 (standard)</option>
                <option value="ascii">ASCII</option>
                <option value="hex">Hexadécimal brut</option>
              </select>
            </div>

            {/* CBC-MAC specific padding */}
            {mechanism === 'cbc_mac' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono font-semibold text-on-surface dark:text-zinc-200">
                  Remplissage CBC-MAC :
                </label>
                <select
                  value={cbcPadding}
                  onChange={(e) => setCbcPadding(e.target.value as any)}
                  className="px-3.5 py-2.5 rounded-xl bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/40 font-mono text-sm text-on-surface dark:text-zinc-100 focus:outline-none focus:border-primary"
                >
                  <option value="pkcs7">PKCS#7 (16 octets multiples)</option>
                  <option value="zeros">Zero Padding</option>
                </select>
              </div>
            )}

            {/* Truncation option */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <label className="font-semibold text-on-surface dark:text-zinc-200">
                  Troncature du tag (optionnel) :
                </label>
                <span className="text-xs text-on-surface-variant font-mono">Min 80 bits</span>
              </div>
              <input
                type="number"
                value={truncateBits}
                onChange={(e) => setTruncateBits(e.target.value)}
                placeholder="ex: 128 (vide = tag complet)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/40 font-mono text-sm text-on-surface dark:text-zinc-100 focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        ) : (
          /* HKDF Specific Inputs */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono font-semibold text-on-surface dark:text-zinc-200">
                IKM (Input Key Material - Matériau initial) :
              </label>
              <input
                type="text"
                value={hkdfIkm}
                onChange={(e) => setHkdfIkm(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/40 font-mono text-xs text-on-surface dark:text-zinc-100 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono font-semibold text-on-surface dark:text-zinc-200">
                Sel (salt - public, optionnel) :
              </label>
              <input
                type="text"
                value={hkdfSalt}
                onChange={(e) => setHkdfSalt(e.target.value)}
                placeholder="Chaîne de zéros par défaut si vide"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/40 font-mono text-xs text-on-surface dark:text-zinc-100 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono font-semibold text-on-surface dark:text-zinc-200">
                Contexte (info - étiquette de domaine) :
              </label>
              <input
                type="text"
                value={hkdfInfo}
                onChange={(e) => setHkdfInfo(e.target.value)}
                placeholder="ex: cle-chiffrement-session"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/40 font-mono text-xs text-on-surface dark:text-zinc-100 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono font-semibold text-on-surface dark:text-zinc-200">
                  Longueur sortie L (octets) :
                </label>
                <input
                  type="number"
                  value={hkdfLen}
                  onChange={(e) => setHkdfLen(parseInt(e.target.value || '32', 10))}
                  min={1}
                  max={8160}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/40 font-mono text-xs text-on-surface dark:text-zinc-100 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono font-semibold text-on-surface dark:text-zinc-200">
                  HMAC sous-jacent :
                </label>
                <select
                  value={hkdfHash}
                  onChange={(e) => setHkdfHash(e.target.value as any)}
                  className="px-3.5 py-2.5 rounded-xl bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/40 font-mono text-xs text-on-surface dark:text-zinc-100 focus:outline-none focus:border-primary"
                >
                  <option value="sha256">HMAC-SHA256 (HashLen = 32o)</option>
                  <option value="sha512">HMAC-SHA512 (HashLen = 64o)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Display Mode Tabs (Global, Octet par octet, Bit par bit) */}
        {mechanism !== 'hkdf' && (
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant/20">
            <span className="text-xs font-mono uppercase font-semibold text-on-surface-variant dark:text-zinc-400">
              Mode de visualité d'exécution :
            </span>
            <div className="flex items-center gap-1.5 bg-surface-container-low dark:bg-zinc-800 p-1 rounded-xl text-xs font-mono">
              <button
                type="button"
                onClick={() => setCalcDisplayMode('global')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  calcDisplayMode === 'global'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-on-surface dark:text-zinc-300 hover:text-primary'
                }`}
              >
                1. Calcul Global
              </button>
              <button
                type="button"
                onClick={() => setCalcDisplayMode('byte')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  calcDisplayMode === 'byte'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-on-surface dark:text-zinc-300 hover:text-primary'
                }`}
              >
                2. Octet par Octet
              </button>
              <button
                type="button"
                onClick={() => setCalcDisplayMode('bit')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  calcDisplayMode === 'bit'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-on-surface dark:text-zinc-300 hover:text-primary'
                }`}
              >
                3. Bit par Bit (XOR)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RESULT VIEWPORT */}
      {result && (
        <div className="flex flex-col gap-6">
          {/* Mode 1: Calcul Global */}
          {calcDisplayMode === 'global' && (
            <div className="flex flex-col gap-6">
              {/* Global Result Highlight Card */}
              <div className="bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-6 border border-primary/30 dark:border-primary/40 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
                  <span className="font-mono text-xs uppercase font-bold text-primary">
                    Résultat Global du Calcul Cryptographique
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-tertiary font-mono text-xs font-bold">
                    {result.executionTimeMs} ms
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                  <div className="p-3 bg-surface-container-low dark:bg-zinc-800 rounded-xl flex flex-col gap-1">
                    <span className="text-on-surface-variant dark:text-zinc-400 font-semibold uppercase">
                      Message d'Origine (m) :
                    </span>
                    <span className="text-sm font-bold text-on-surface dark:text-zinc-100">
                      « {result.messageRaw} » ({result.messageBytes.length} octets)
                    </span>
                  </div>

                  <div className="p-3 bg-surface-container-low dark:bg-zinc-800 rounded-xl flex flex-col gap-1">
                    <span className="text-on-surface-variant dark:text-zinc-400 font-semibold uppercase">
                      Clé Secrète (k) :
                    </span>
                    <span className="text-sm font-bold text-primary dark:text-amber-400">
                      « {result.keyRaw} » ({result.keyBytes.length} octets)
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-primary-fixed/20 dark:bg-primary-container/20 border border-primary/30 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-primary uppercase">
                      Tag Final d'Authentification (t = MAC_k(m)) :
                    </span>
                    <span className="font-mono text-xs text-on-surface-variant font-semibold">
                      {result.tagBits} bits ({result.tag.length} octets)
                    </span>
                  </div>
                  <div className="p-2.5 bg-surface-container-lowest dark:bg-zinc-900 rounded-lg font-mono text-base sm:text-lg font-bold text-primary dark:text-amber-300 break-all select-all">
                    {result.tagHex}
                  </div>
                </div>
              </div>

              {/* Step By Step Interactive Viewer */}
              <StepViewer result={result} />
            </div>
          )}

          {/* Mode 2: Calcul Octet par Octet */}
          {calcDisplayMode === 'byte' && (
            <div className="flex flex-col gap-5">
              <ByteViewer
                bytes={result.messageBytes}
                title="Octets du Message (m)"
              />
              <ByteViewer
                bytes={result.keyBytes}
                title="Octets de la Clé Secrète (k)"
              />
              {result.steps[1]?.outputBytes && (
                <ByteViewer
                  bytes={result.steps[1].outputBytes}
                  title="Octets de la Clé Interne Masquée K_i (K' ⊕ ipad)"
                />
              )}
              <ByteViewer
                bytes={result.tag}
                title="Octets du Tag Final d'Authentification (t)"
              />
            </div>
          )}

          {/* Mode 3: Calcul Bit par Bit (XOR) */}
          {calcDisplayMode === 'bit' && (
            <div className="flex flex-col gap-5">
              <div className="bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-6 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
                  <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface dark:text-zinc-100 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">grain</span>
                    Opérations Binaires Élémentaires (Bit-à-Bit)
                  </h3>
                  <span className="text-xs font-mono text-on-surface-variant">
                    {result.bitOperations.length} bits inspectés
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-on-surface-variant dark:text-zinc-300">
                  Visualisation de la table d'opération OU exclusif (XOR) élémentaire : 0 ⊕ 0 = 0, 0 ⊕ 1 = 1, 1 ⊕ 0 = 1, 1 ⊕ 1 = 0.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 font-mono text-xs">
                  {result.bitOperations.map((b, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/20 flex flex-col items-center gap-1 text-center"
                    >
                      <span className="text-[10px] text-on-surface-variant opacity-70">
                        {b.label || `b#${b.position}`}
                      </span>
                      <div className="flex items-center gap-1 font-bold">
                        <span className="text-on-surface dark:text-zinc-200">{b.operandA}</span>
                        <span className="text-primary">⊕</span>
                        <span className="text-on-surface dark:text-zinc-200">{b.operandB}</span>
                        <span>=</span>
                        <span className="text-tertiary">{b.result}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avalanche live viewer */}
              <BinaryViewer initialText={result.messageRaw} />
            </div>
          )}
        </div>
      )}

      {/* HKDF RESULT VIEWPORT */}
      {hkdfResult && (
        <div className="flex flex-col gap-6">
          <div className="bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-6 border border-secondary/40 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <span className="font-mono text-xs uppercase font-bold text-secondary">
                Résultat HKDF (RFC 5869) : Extraction &amp; Expansion
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-mono text-xs font-bold">
                {hkdfResult.executionTimeMs} ms
              </span>
            </div>

            <div className="p-3 bg-surface-container-low dark:bg-zinc-800 rounded-xl flex flex-col gap-1 font-mono text-xs">
              <span className="text-on-surface-variant font-semibold uppercase">
                Phase 1 : Clé Extraite PRK = HMAC(salt, IKM)
              </span>
              <span className="text-sm font-bold text-primary dark:text-amber-300 break-all select-all">
                {hkdfResult.prkHex}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-secondary-fixed/20 border border-secondary/30 flex flex-col gap-2 font-mono">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-secondary uppercase">
                  Phase 2 : Clé Finale Dérivée OKM ({hkdfResult.requestedLength} octets) :
                </span>
                <span className="text-on-surface-variant font-semibold">
                  {hkdfResult.requestedLength * 8} bits
                </span>
              </div>
              <div className="p-2.5 bg-surface-container-lowest dark:bg-zinc-900 rounded-lg text-base sm:text-lg font-bold text-secondary dark:text-sky-300 break-all select-all">
                {hkdfResult.okmHex}
              </div>
            </div>
          </div>

          <ByteViewer
            bytes={hkdfResult.okm}
            title="Inspecteur de la Clé Dérivée OKM"
          />
        </div>
      )}
    </div>
  );
}
