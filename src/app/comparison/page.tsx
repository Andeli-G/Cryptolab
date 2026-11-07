'use client';

import React, { useState, useEffect } from 'react';
import { PRIMITIVES_COMPARISON_DATA, PrimitiveComparison } from '../../comparison/data';
import { calculateNaiveMac } from '../../crypto/naive-mac';
import { calculateCbcMac } from '../../crypto/cbc-mac';
import { calculateHmac } from '../../crypto/hmac';
import { calculateHkdf } from '../../crypto/hkdf';

export default function ComparisonPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [benchmarkTimes, setBenchmarkTimes] = useState<Record<string, number>>({});
  const [isRunningBench, setIsRunningBench] = useState<boolean>(false);

  // Filter primitives
  const filteredPrimitives = PRIMITIVES_COMPARISON_DATA.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'hash' && p.category === 'hash_mac') return true;
    if (activeFilter === 'block' && p.category === 'block_mac') return true;
    if (activeFilter === 'kdf' && p.category === 'kdf') return true;
    if (activeFilter === 'keccak' && p.category === 'keccak') return true;
    return false;
  });

  // Run live benchmark on client machine
  const runMicroBenchmark = () => {
    setIsRunningBench(true);
    setTimeout(() => {
      const times: Record<string, number> = {};
      const payload = 'A'.repeat(1024); // 1 KB payload
      const key = 'SecretBenchmarkKey128Bits!!';
      const iterations = 50;

      // 1. Naive H(k || m)
      const t0 = performance.now();
      for (let i = 0; i < iterations; i++) {
        calculateNaiveMac(payload, key, 'utf8', 'prefix', 'sha256');
      }
      times['naive_prefix'] = parseFloat(((performance.now() - t0) / iterations).toFixed(3));

      // 2. CBC-MAC AES-128
      const t1 = performance.now();
      for (let i = 0; i < iterations; i++) {
        calculateCbcMac(payload, key, 'utf8');
      }
      times['cbc_mac'] = parseFloat(((performance.now() - t1) / iterations).toFixed(3));

      // 3. HMAC-MD4
      const t2 = performance.now();
      for (let i = 0; i < iterations; i++) {
        calculateHmac(payload, key, 'utf8', 'utf8', 'md4');
      }
      times['hmac_md4'] = parseFloat(((performance.now() - t2) / iterations).toFixed(3));

      // 4. HMAC-MD5
      const t3 = performance.now();
      for (let i = 0; i < iterations; i++) {
        calculateHmac(payload, key, 'utf8', 'utf8', 'md5');
      }
      times['hmac_md5'] = parseFloat(((performance.now() - t3) / iterations).toFixed(3));

      // 5. HMAC-SHA-1
      const t4 = performance.now();
      for (let i = 0; i < iterations; i++) {
        calculateHmac(payload, key, 'utf8', 'utf8', 'sha1');
      }
      times['hmac_sha1'] = parseFloat(((performance.now() - t4) / iterations).toFixed(3));

      // 6. HMAC-SHA-256
      const t5 = performance.now();
      for (let i = 0; i < iterations; i++) {
        calculateHmac(payload, key, 'utf8', 'utf8', 'sha256');
      }
      times['hmac_sha256'] = parseFloat(((performance.now() - t5) / iterations).toFixed(3));

      // 7. HMAC-SHA-512
      const t6 = performance.now();
      for (let i = 0; i < iterations; i++) {
        calculateHmac(payload, key, 'utf8', 'utf8', 'sha512');
      }
      times['hmac_sha512'] = parseFloat(((performance.now() - t6) / iterations).toFixed(3));

      // 8. HKDF-SHA256
      const t7 = performance.now();
      for (let i = 0; i < iterations; i++) {
        calculateHkdf({
          ikm: key,
          salt: 'salt1234',
          info: 'info-bench',
          outputLength: 32,
          hashAlgorithm: 'sha256',
        });
      }
      times['hkdf_sha256'] = parseFloat(((performance.now() - t7) / iterations).toFixed(3));

      setBenchmarkTimes(times);
      setIsRunningBench(false);
    }, 50);
  };

  useEffect(() => {
    runMicroBenchmark();
  }, []);

  return (
    <div className="py-6 sm:py-8 flex flex-col gap-6">
      {/* Header Banner */}
      <div className="bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-6 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed dark:bg-primary-container/30 text-on-primary-fixed dark:text-primary-fixed">
            <span className="material-symbols-outlined text-[16px]">compare_arrows</span>
            <span className="font-label-sm text-xs font-semibold uppercase tracking-wider">
              Analyse Comparative des Primitives
            </span>
          </div>

          <span className="font-mono text-xs text-on-surface-variant dark:text-zinc-400">
            Normes NIST, RFC 2104, RFC 5869 &amp; Rapport ENSPY 3GI
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-headline-xl text-2xl sm:text-3xl font-bold text-on-surface dark:text-zinc-100">
              Comparateur &amp; Banc de Mesures
            </h1>
            <p className="text-sm text-on-surface-variant dark:text-zinc-300 mt-0.5">
              Évaluation rigoureuse des constructions MAC, CBC-MAC, HMAC et HKDF : sécurité théorique, failles connues et latences.
            </p>
          </div>

          <button
            onClick={runMicroBenchmark}
            disabled={isRunningBench}
            type="button"
            className="px-4 py-2.5 rounded-xl bg-primary text-white font-semibold text-xs sm:text-sm hover:bg-primary-hover disabled:opacity-50 transition-colors flex items-center gap-1.5 shadow-xs flex-shrink-0"
          >
            <span className={`material-symbols-outlined text-[18px] ${isRunningBench ? 'animate-spin' : ''}`}>
              refresh
            </span>
            <span>{isRunningBench ? 'Mesure en cours...' : 'Relancer Micro-Benchmark'}</span>
          </button>
        </div>
      </div>

      {/* Mandatory Pedagogical Warning Alert (Cahier des charges 8.3) */}
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 flex items-start gap-3 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
        <span className="material-symbols-outlined text-[22px] flex-shrink-0 mt-0.5 text-amber-600">
          warning
        </span>
        <div className="flex flex-col gap-0.5">
          <strong className="font-bold uppercase tracking-wider">
            Avertissement Pédagogique Fondamental (Cahier des charges, Section 8.3) :
          </strong>
          <p className="leading-relaxed opacity-95">
            <strong>Ne jamais confondre temps d'exécution et sécurité cryptographique !</strong> Une primitive plus rapide (comme le MAC naïf ou MD4) n'est absolument pas plus sûre. Au contraire, les algorithmes cassés s'exécutent souvent plus vite mais offrent zéro bit de sécurité face à un attaquant. La sécurité réelle dépend des preuves mathématiques et du respect rigoureux des conditions d'utilisation.
          </p>
        </div>
      </div>

      {/* Visual Metrics Bento Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Avalanche Effect (SAC) Benchmark Card */}
        <div className="bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-5 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">query_stats</span>
              <h2 className="font-headline-md text-sm sm:text-base font-bold text-on-surface dark:text-zinc-100">
                Effet Avalanche (Strict Avalanche Criterion)
              </h2>
            </div>
            <span className="font-mono text-xs text-on-surface-variant">Δ = 1 bit</span>
          </div>

          <p className="text-xs text-on-surface-variant dark:text-zinc-300">
            Mesure de la proportion de bits modifiés dans le condensat résultant lors de l'inversion d'un unique bit en entrée :
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">HMAC-SHA256</span>
                <span className="text-tertiary font-bold">✓ Idéal</span>
              </div>
              <div className="flex items-baseline gap-1 my-1">
                <span className="font-headline-lg text-2xl font-bold text-tertiary">50.2%</span>
                <span className="text-xs font-mono text-on-surface-variant">SAC</span>
              </div>
              <div className="w-full h-1.5 bg-emerald-200 dark:bg-emerald-900 rounded-full overflow-hidden">
                <div className="h-full bg-tertiary" style={{ width: '50.2%' }}></div>
              </div>
              <span className="text-[10px] text-on-surface-variant font-mono mt-0.5">
                Dispersion cryptographique uniforme (Rapport p. 14)
              </span>
            </div>

            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-red-800 dark:text-red-300">Somme Linéaire (CRC)</span>
                <span className="text-error font-bold">⚠ Biais</span>
              </div>
              <div className="flex items-baseline gap-1 my-1">
                <span className="font-headline-lg text-2xl font-bold text-error">12.5%</span>
                <span className="text-xs font-mono text-on-surface-variant">SAC</span>
              </div>
              <div className="w-full h-1.5 bg-red-200 dark:bg-red-900 rounded-full overflow-hidden">
                <div className="h-full bg-error" style={{ width: '12.5%' }}></div>
              </div>
              <span className="text-[10px] text-on-surface-variant font-mono mt-0.5">
                Fonction non cryptographique sans résistance
              </span>
            </div>
          </div>
        </div>

        {/* Live Micro-Benchmark Execution Latencies */}
        <div className="bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-5 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-3 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">speed</span>
              <h2 className="font-headline-md text-sm sm:text-base font-bold text-on-surface dark:text-zinc-100 font-sans">
                Latence Réelle d'Exécution (Micro-Bench 1KB)
              </h2>
            </div>
            <span className="text-on-surface-variant">Moyenne 50 passes</span>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            {[
              { id: 'naive_prefix', name: 'H(k || m)', color: 'bg-red-500' },
              { id: 'cbc_mac', name: 'CBC-MAC AES', color: 'bg-amber-500' },
              { id: 'hmac_md4', name: 'HMAC-MD4', color: 'bg-red-400' },
              { id: 'hmac_sha1', name: 'HMAC-SHA1', color: 'bg-amber-400' },
              { id: 'hmac_sha256', name: 'HMAC-SHA256', color: 'bg-primary' },
              { id: 'hmac_sha512', name: 'HMAC-SHA512', color: 'bg-tertiary' },
              { id: 'hkdf_sha256', name: 'HKDF-SHA256', color: 'bg-secondary' },
            ].map((item) => {
              const time = benchmarkTimes[item.id] ?? 0.15;
              const maxTime = Math.max(...Object.values(benchmarkTimes), 0.5);
              const barPercent = Math.min(100, Math.max(10, (time / maxTime) * 100));

              return (
                <div key={item.id} className="flex items-center gap-2">
                  <span className="w-28 text-on-surface dark:text-zinc-200 font-semibold truncate">
                    {item.name}
                  </span>
                  <div className="flex-1 bg-surface-container-high dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${barPercent}%` }}
                    />
                  </div>
                  <span className="w-16 text-right font-bold text-on-surface-variant dark:text-zinc-300">
                    {time} ms
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
            activeFilter === 'all'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-surface-container-lowest dark:bg-zinc-900 border border-outline-variant/30 text-on-surface dark:text-zinc-300 hover:bg-surface-container'
          }`}
        >
          Toutes les Primitives ({PRIMITIVES_COMPARISON_DATA.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('hash')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
            activeFilter === 'hash'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-surface-container-lowest dark:bg-zinc-900 border border-outline-variant/30 text-on-surface dark:text-zinc-300 hover:bg-surface-container'
          }`}
        >
          Basées sur Hachage (MAC Naïf &amp; HMAC)
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('block')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
            activeFilter === 'block'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-surface-container-lowest dark:bg-zinc-900 border border-outline-variant/30 text-on-surface dark:text-zinc-300 hover:bg-surface-container'
          }`}
        >
          Chiffrement par Blocs (CBC-MAC &amp; CMAC)
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('kdf')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
            activeFilter === 'kdf'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-surface-container-lowest dark:bg-zinc-900 border border-outline-variant/30 text-on-surface dark:text-zinc-300 hover:bg-surface-container'
          }`}
        >
          Dérivation HKDF
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('keccak')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
            activeFilter === 'keccak'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-surface-container-lowest dark:bg-zinc-900 border border-outline-variant/30 text-on-surface dark:text-zinc-300 hover:bg-surface-container'
          }`}
        >
          Éponge Keccak (KMAC)
        </button>
      </div>

      {/* Comprehensive Comparison Data Grid Cards */}
      <div className="flex flex-col gap-4">
        {filteredPrimitives.map((prim) => {
          const isBroken = prim.currentSecurityStatus === 'broken';
          const isVulnerable = prim.currentSecurityStatus === 'vulnerable';
          const isLegacy = prim.currentSecurityStatus === 'legacy';
          const isSecure = prim.currentSecurityStatus === 'secure';

          return (
            <div
              key={prim.id}
              className={`bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 border shadow-sm flex flex-col gap-4 ${
                isBroken
                  ? 'border-red-300 dark:border-red-900/60'
                  : isVulnerable
                  ? 'border-amber-300 dark:border-amber-900/60'
                  : isSecure
                  ? 'border-emerald-300 dark:border-emerald-900/60'
                  : 'border-outline-variant/30 dark:border-zinc-800'
              }`}
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-outline-variant/20 dark:border-zinc-800">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline-lg text-lg sm:text-xl font-bold text-on-surface dark:text-zinc-100">
                      {prim.name}
                    </h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-mono text-xs font-bold uppercase ${
                        isBroken
                          ? 'bg-red-100 text-error'
                          : isVulnerable
                          ? 'bg-amber-100 text-amber-900'
                          : isSecure
                          ? 'bg-emerald-100 text-tertiary'
                          : 'bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      {prim.statusLabel}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-primary mt-0.5">
                    {prim.pdfReference}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-2 py-1 rounded bg-surface-container-low dark:bg-zinc-800 text-on-surface dark:text-zinc-300">
                    Bloc B : {prim.blockSizeBytes}o ({prim.blockSizeBits} bits)
                  </span>
                  <span className="px-2 py-1 rounded bg-surface-container-low dark:bg-zinc-800 text-on-surface dark:text-zinc-300">
                    Tag : {prim.tagSizeBytes}o ({prim.tagSizeBits} bits)
                  </span>
                </div>
              </div>

              {/* Technical Specifications Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-surface-container-low dark:bg-zinc-800/60 flex flex-col gap-0.5">
                  <span className="text-[11px] text-on-surface-variant font-semibold uppercase">Type de Construction :</span>
                  <span className="font-bold text-on-surface dark:text-zinc-100">{prim.constructionType}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low dark:bg-zinc-800/60 flex flex-col gap-0.5">
                  <span className="text-[11px] text-on-surface-variant font-semibold uppercase">Primitive Sous-Jacente :</span>
                  <span className="font-bold text-on-surface dark:text-zinc-100">{prim.underlyingPrimitive}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low dark:bg-zinc-800/60 flex flex-col gap-0.5">
                  <span className="text-[11px] text-on-surface-variant font-semibold uppercase">Résistance Collision :</span>
                  <span className="font-bold text-primary">{prim.securityBitsGeneric} bits génériques</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low dark:bg-zinc-800/60 flex flex-col gap-0.5">
                  <span className="text-[11px] text-on-surface-variant font-semibold uppercase">Usage Recommandé :</span>
                  <span className="font-bold text-on-surface dark:text-zinc-100 truncate">{prim.recommendedUse}</span>
                </div>
              </div>

              {/* Advantages and Limitations Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                {/* Pros */}
                <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 flex flex-col gap-2">
                  <span className="font-bold text-tertiary flex items-center gap-1 font-mono uppercase text-xs">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Avantages (Rapport du groupe 23) :
                  </span>
                  <ul className="flex flex-col gap-1 list-disc list-inside text-on-surface-variant dark:text-zinc-300">
                    {prim.advantages.map((adv, i) => (
                      <li key={i}>{adv}</li>
                    ))}
                  </ul>
                </div>

                {/* Cons / Limits */}
                <div className="p-3.5 rounded-xl bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 flex flex-col gap-2">
                  <span className="font-bold text-error flex items-center gap-1 font-mono uppercase text-xs">
                    <span className="material-symbols-outlined text-[16px]">cancel</span>
                    Limites &amp; Failles (Rapport du groupe 23) :
                  </span>
                  <ul className="flex flex-col gap-1 list-disc list-inside text-on-surface-variant dark:text-zinc-300">
                    {prim.limitations.map((lim, i) => (
                      <li key={i}>{lim}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
