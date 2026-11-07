'use client';

import React, { useState } from 'react';
import { bitDiffCount, bytesToHex, toBinary8 } from '../../crypto/utils';
import { sha256 } from '@noble/hashes/sha256';

interface BinaryViewerProps {
  initialText?: string;
  className?: string;
}

export const BinaryViewer: React.FC<BinaryViewerProps> = ({
  initialText = 'SAVE BILL',
  className = '',
}) => {
  const [text, setText] = useState<string>(initialText);
  const [flippedBitIndex, setFlippedBitIndex] = useState<number | null>(3); // initial bit flipped for demo

  // Original bytes and hash
  const origBytes = new TextEncoder().encode(text);
  const origHash = sha256(origBytes);

  // Modified bytes with flipped bit
  const modifiedBytes = new Uint8Array(origBytes.length || 1);
  modifiedBytes.set(origBytes);

  if (flippedBitIndex !== null && modifiedBytes.length > 0) {
    const byteIdx = Math.floor(flippedBitIndex / 8) % modifiedBytes.length;
    const bitPos = 7 - (flippedBitIndex % 8);
    modifiedBytes[byteIdx] ^= (1 << bitPos);
  }

  const modifiedHash = sha256(modifiedBytes);
  const avalanche = bitDiffCount(origHash, modifiedHash);

  const handleBitClick = (bitIndex: number) => {
    if (flippedBitIndex === bitIndex) {
      setFlippedBitIndex(null);
    } else {
      setFlippedBitIndex(bitIndex);
    }
  };

  const firstByte = origBytes.length > 0 ? origBytes[0] : 0x53; // 'S' = 0x53 (01010011)

  return (
    <div className={`bg-surface-container-lowest dark:bg-zinc-900 rounded-xl p-4 sm:p-5 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-4 ${className}`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-container/10 dark:bg-primary/20 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">flash_on</span>
          </div>
          <div>
            <h3 className="font-headline-md text-base sm:text-lg text-on-surface dark:text-zinc-100 font-semibold leading-tight">
              Simulateur d'Avalanche & Registre Binaire
            </h3>
            <span className="font-label-sm text-xs text-on-surface-variant dark:text-zinc-400">
              Strict Avalanche Criterion (SAC) — Inversion bit-à-bit (Rapport p. 14)
            </span>
          </div>
        </div>
        <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-primary-fixed dark:bg-primary-container/40 text-on-primary-fixed dark:text-primary-fixed">
          Δ {avalanche.diffBits} / {avalanche.totalBits} bits ({avalanche.percentage}%)
        </span>
      </div>

      <p className="text-xs sm:text-sm text-on-surface-variant dark:text-zinc-300">
        Touchez l'un des bits du premier octet (<strong>'{String.fromCharCode(firstByte)}' = 0x{firstByte.toString(16).padStart(2, '0')}</strong>) pour inverser un unique bit et observer la dispersion chaotique immédiate de l'empreinte SHA-256 :
      </p>

      {/* Bit Register Tape */}
      <div className="bg-surface-container-low dark:bg-zinc-800/60 p-3 rounded-lg flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-on-surface-variant dark:text-zinc-400 font-mono">
          <span>Octet 0 : bits b7 .. b0</span>
          <span>{flippedBitIndex !== null ? `Bit b${7 - (flippedBitIndex % 8)} inversé` : 'Aucun bit altéré'}</span>
        </div>
        <div className="flex items-center justify-center sm:justify-start gap-1.5 overflow-x-auto py-1">
          {Array.from({ length: 8 }).map((_, bitPos) => {
            const actualBit = (firstByte >> (7 - bitPos)) & 1;
            const isFlipped = flippedBitIndex === bitPos;
            const displayBit = isFlipped ? actualBit ^ 1 : actualBit;

            return (
              <button
                key={bitPos}
                onClick={() => handleBitClick(bitPos)}
                type="button"
                className={`w-10 h-11 rounded font-mono text-sm font-semibold flex flex-col items-center justify-center transition-all ${
                  isFlipped
                    ? 'bg-error text-white scale-105 shadow-md ring-2 ring-error/50'
                    : 'bg-surface-container-lowest dark:bg-zinc-700 text-on-surface dark:text-zinc-100 hover:bg-surface-container-high'
                }`}
              >
                <span className="text-[10px] opacity-60">b{7 - bitPos}</span>
                <span className="text-base">{displayBit}{isFlipped ? '*' : ''}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Avalanche Visual Progress Metric */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-on-surface-variant dark:text-zinc-400">Diffusion Avalanche observée</span>
          <span className="text-primary font-semibold">{avalanche.percentage}% (Idéal théorique : ~50%)</span>
        </div>
        <div className="h-2.5 w-full bg-surface-container-high dark:bg-zinc-700 rounded-full overflow-hidden flex">
          <div
            className={`h-full transition-all duration-300 ${
              avalanche.percentage >= 40 && avalanche.percentage <= 60
                ? 'bg-tertiary'
                : 'bg-primary'
            }`}
            style={{ width: `${Math.min(100, avalanche.percentage)}%` }}
          />
        </div>
      </div>

      {/* Hash Comparison View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
        <div className="p-2.5 rounded bg-surface-container-low dark:bg-zinc-800/70 border border-outline-variant/20 dark:border-zinc-700 flex flex-col gap-1">
          <span className="text-[11px] text-tertiary font-bold uppercase tracking-wide">
            Digest Original SHA-256 (256 bits)
          </span>
          <span className="text-on-surface dark:text-zinc-200 break-all select-all">
            {bytesToHex(origHash)}
          </span>
        </div>
        <div className="p-2.5 rounded bg-error-container/20 dark:bg-error-container/10 border border-error/20 flex flex-col gap-1">
          <span className="text-[11px] text-error font-bold uppercase tracking-wide">
            Digest avec 1-bit Altéré (256 bits)
          </span>
          <span className="text-on-surface dark:text-zinc-200 break-all select-all">
            {bytesToHex(modifiedHash)}
          </span>
        </div>
      </div>
    </div>
  );
};
