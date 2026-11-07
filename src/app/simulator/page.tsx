'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { runSimulationAttack } from '../../simulation/engine';
import { SimulationResultRecord } from '../../simulation/types';
import { MessagePacketFlow } from '../../components/simulation/MessagePacketFlow';

export default function SimulatorPage() {
  const [originalMessage, setOriginalMessage] = useState<string>('SAVE BILL');
  const [modifiedMessage, setModifiedMessage] = useState<string>('KILL BILL');

  // Simulation run state
  const [simulationRecord, setSimulationRecord] = useState<SimulationResultRecord>(() =>
    runSimulationAttack({
      mode: 'without_auth',
      originalMessage: 'SAVE BILL',
      modifiedMessage: 'KILL BILL',
    })
  );

  const handleRerun = () => {
    setSimulationRecord(
      runSimulationAttack({
        mode: 'without_auth',
        originalMessage,
        modifiedMessage,
      })
    );
  };

  return (
    <div className="py-6 sm:py-8 flex flex-col gap-6">
      {/* Scenario Header Banner */}
      <div className="bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-6 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-error-container text-on-error-container">
            <span className="material-symbols-outlined text-[16px] text-error">sensors_off</span>
            <span className="font-label-sm text-xs font-semibold uppercase tracking-wider">
              Scénario d'Attaque 01 : Sans Authentification
            </span>
          </div>

          <span className="font-mono text-xs text-error font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
            Canal Non Sécurisé // Vulnérabilité Majeure
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-headline-xl text-2xl sm:text-3xl font-bold text-on-surface dark:text-zinc-100">
              Le Message Intercepté (SAVE BILL → KILL BILL)
            </h1>
            <p className="text-sm text-on-surface-variant dark:text-zinc-300 mt-0.5">
              Démonstration visuelle et narrative des conséquences critiques liées à la transmission d'un message sans code d'authentification.
            </p>
          </div>

          <Link
            href="/authentification"
            className="px-4 py-2 rounded-xl bg-tertiary text-white hover:opacity-90 font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-opacity flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span>Passer à la Simulation avec Authentification</span>
          </Link>
        </div>
      </div>

      {/* Input Message Controls */}
      <div className="bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-5 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 font-mono text-xs">
          <div className="flex flex-col gap-1">
            <label className="text-on-surface-variant font-semibold uppercase">
              Message émis par Agent A :
            </label>
            <input
              type="text"
              value={originalMessage}
              onChange={(e) => setOriginalMessage(e.target.value)}
              className="px-3 py-2 rounded-lg bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/30 text-on-surface dark:text-zinc-100 font-bold"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-error font-semibold uppercase">
              Message altéré par The Spy :
            </label>
            <input
              type="text"
              value={modifiedMessage}
              onChange={(e) => setModifiedMessage(e.target.value)}
              className="px-3 py-2 rounded-lg bg-error-container/20 border border-error/30 text-error font-bold"
            />
          </div>
        </div>

        <button
          onClick={handleRerun}
          type="button"
          className="px-4 py-2.5 rounded-xl bg-primary text-white font-semibold text-xs sm:text-sm hover:bg-primary-hover transition-colors flex items-center justify-center gap-1.5 shadow-xs flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">play_circle</span>
          <span>Actualiser la Scène</span>
        </button>
      </div>

      {/* Interactive 6-Scene Message Packet Flow */}
      <MessagePacketFlow
        simulationRecord={simulationRecord}
        onReset={handleRerun}
      />
    </div>
  );
}
