'use client';

import React, { useState } from 'react';
import { toBinary8 } from '../../crypto/utils';

interface ByteViewerProps {
  bytes: Uint8Array;
  title?: string;
  comparedBytes?: Uint8Array;
  className?: string;
}

export const ByteViewer: React.FC<ByteViewerProps> = ({
  bytes,
  title = 'Inspecteur d\'Octets (16 colonnes)',
  comparedBytes,
  className = '',
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(0);

  const selectedByte = selectedIdx !== null && selectedIdx < bytes.length ? bytes[selectedIdx] : null;
  const comparedByte = comparedBytes && selectedIdx !== null && selectedIdx < comparedBytes.length ? comparedBytes[selectedIdx] : null;

  return (
    <div className={`bg-surface-container-lowest dark:bg-zinc-900 rounded-xl p-4 sm:p-5 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-3 font-mono ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-primary">data_array</span>
          <span className="font-headline-md text-sm font-semibold text-on-surface dark:text-zinc-100">
            {title}
          </span>
        </div>
        <span className="text-xs text-on-surface-variant dark:text-zinc-400">
          {bytes.length} octets ({bytes.length * 8} bits)
        </span>
      </div>

      {/* Hex Grid 16 columns */}
      <div className="bg-surface-container-low dark:bg-zinc-800/60 p-3 rounded-lg overflow-x-auto text-xs">
        {/* Column offset headers */}
        <div className="grid grid-cols-[3.5rem_repeat(16,1.8rem)] gap-1 text-[11px] text-on-surface-variant dark:text-zinc-500 font-semibold border-b border-outline-variant/30 dark:border-zinc-700 pb-1.5 mb-1.5 min-w-[34rem]">
          <span>Offset</span>
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="text-center">
              {i.toString(16).toUpperCase().padStart(2, '0')}
            </span>
          ))}
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-1 min-w-[34rem]">
          {Array.from({ length: Math.ceil(bytes.length / 16) }).map((_, rowIdx) => {
            const rowOffset = rowIdx * 16;
            return (
              <div
                key={rowIdx}
                className="grid grid-cols-[3.5rem_repeat(16,1.8rem)] gap-1 items-center"
              >
                <span className="text-[11px] text-on-surface-variant dark:text-zinc-500">
                  {rowOffset.toString(16).padStart(4, '0')}
                </span>
                {Array.from({ length: 16 }).map((_, colIdx) => {
                  const idx = rowOffset + colIdx;
                  if (idx >= bytes.length) {
                    return <span key={colIdx} className="text-center opacity-20">..</span>;
                  }
                  const val = bytes[idx];
                  const isSelected = selectedIdx === idx;
                  const isDiff = comparedBytes && idx < comparedBytes.length && val !== comparedBytes[idx];

                  return (
                    <button
                      key={colIdx}
                      type="button"
                      onClick={() => setSelectedIdx(idx)}
                      className={`h-6 rounded text-center text-xs font-mono font-medium transition-colors ${
                        isSelected
                          ? 'bg-amber-200 dark:bg-amber-900/60 text-primary-container dark:text-amber-200 font-bold ring-1 ring-primary'
                          : isDiff
                          ? 'bg-red-100 dark:bg-red-950/60 text-error font-semibold'
                          : 'hover:bg-surface-container-high dark:hover:bg-zinc-700 text-on-surface dark:text-zinc-200'
                      }`}
                    >
                      {val.toString(16).padStart(2, '0')}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Byte Micro-Inspector */}
      {selectedByte !== null && selectedIdx !== null && (
        <div className="p-3 bg-surface-container-low dark:bg-zinc-800/80 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-primary text-white font-bold">
              Octet #{selectedIdx} (0x{selectedIdx.toString(16).padStart(2, '0')})
            </span>
            <span className="text-on-surface dark:text-zinc-300">
              Caractère : <strong>{selectedByte >= 32 && selectedByte <= 126 ? `'${String.fromCharCode(selectedByte)}'` : '(non-imprimable)'}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono">
            <span>Hex: <strong className="text-primary font-bold">0x{selectedByte.toString(16).padStart(2, '0').toUpperCase()}</strong></span>
            <span>Décimal: <strong>{selectedByte}</strong></span>
            <span>Binaire: <strong className="text-tertiary">{toBinary8(selectedByte)}</strong></span>
            {comparedByte !== null && comparedByte !== selectedByte && (
              <span className="text-error font-semibold">
                (Altéré vs 0x{comparedByte.toString(16).padStart(2, '0')})
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
