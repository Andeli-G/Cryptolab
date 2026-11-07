'use client';

import React, { useState } from 'react';
import { PEDAGOGICAL_PROFILES, runSimulationAttack } from '../../simulation/engine';
import { SimulationResultRecord } from '../../simulation/types';
import { MacMechanism } from '../../crypto/types';
import { MessagePacketFlow } from '../../components/simulation/MessagePacketFlow';
import { calculateHkdf } from '../../crypto/hkdf';
import { bytesToHex } from '../../crypto/utils';

export default function AuthenticationSimulatorPage() {
  const [mechanism, setMechanism] = useState<MacMechanism>('hmac_sha256');
  const [originalMessage, setOriginalMessage] = useState<string>('SAVE BILL');
  const [modifiedMessage, setModifiedMessage] = useState<string>('KILL BILL');
  const [key, setKey] = useState<string>('SecretAgentKey2026!');

  // Advanced option: Derive key with HKDF before authentication
  const [useHkdfDerivation, setUseHkdfDerivation] = useState<boolean>(false);
  const [hkdfSalt, setHkdfSalt] = useState<string>('c0 de se cr et 01');
  const [hkdfInfo, setHkdfInfo] = useState<string>('cle-authentification-bill');

  // Probabilistic demo model parameters
  const defaultProb = PEDAGOGICAL_PROFILES[mechanism]?.defaultSuccessProb ?? 1;
  const [customProb, setCustomProb] = useState<number>(defaultProb);

  // Simulation history & batch stats
  const [simulationHistory, setSimulationHistory] = useState<SimulationResultRecord[]>([]);
  const [batchStats, setBatchStats] = useState<{ total: number; blocked: number; forged: number } | null>(null);

  // Active current simulation
  const [currentRecord, setCurrentRecord] = useState<SimulationResultRecord>(() => {
    return runSimulationAttack({
      mode: 'with_auth',
      mechanism: 'hmac_sha256',
      keyStr: 'SecretAgentKey2026!',
      originalMessage: 'SAVE BILL',
      modifiedMessage: 'KILL BILL',
      customProb: 1,
    });
  });

  const handleMechanismChange = (mech: MacMechanism) => {
    setMechanism(mech);
    const newProb = PEDAGOGICAL_PROFILES[mech]?.defaultSuccessProb ?? 1;
    setCustomProb(newProb);
  };

  const handleDeriveKeyWithHkdf = () => {
    try {
      const derived = calculateHkdf({
        ikm: key,
        salt: hkdfSalt,
        info: hkdfInfo,
        outputLength: 32,
        hashAlgorithm: 'sha256',
      });
      setKey(derived.okmHex.slice(0, 32)); // Derived key
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleRunSimulation = (forcedSpySuccess?: boolean) => {
    const record = runSimulationAttack({
      mode: 'with_auth',
      mechanism,
      keyStr: key,
      originalMessage,
      modifiedMessage,
      customProb,
      forcedSpySuccess,
    });
    setCurrentRecord(record);
    setSimulationHistory((prev) => [record, ...prev.slice(0, 19)]);
  };

  const handleRunBatch = (count: number = 100) => {
    let blocked = 0;
    let forged = 0;
    for (let i = 0; i < count; i++) {
      const rec = runSimulationAttack({
        mode: 'with_auth',
        mechanism,
        keyStr: key,
        originalMessage,
        modifiedMessage,
        customProb,
      });
      if (rec.billFate === 'saved') {
        blocked++;
      } else {
        forged++;
      }
    }
    setBatchStats({ total: count, blocked, forged });
  };

  return (
    <div className="py-6 sm:py-8 flex flex-col gap-6">
      {/* Header Banner */}
      <div className="bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-6 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-fixed dark:bg-tertiary-container/30 text-on-tertiary-fixed dark:text-tertiary-fixed">
            <span className="material-symbols-outlined text-[16px] text-tertiary">verified_user</span>
            <span className="font-label-sm text-xs font-semibold uppercase tracking-wider">
              Scénario d'Attaque 02 : Avec Code d'Authentification (MAC / HMAC)
            </span>
          </div>

          <span className="font-mono text-xs text-tertiary font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            Canal Non Sécurisé Scellé par Tag Cryptographique
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-headline-xl text-2xl sm:text-3xl font-bold text-on-surface dark:text-zinc-100">
              Simulateur d'Authentification (Protection Anti-Falsification)
            </h1>
            <p className="text-sm text-on-surface-variant dark:text-zinc-300 mt-0.5">
              Observez comment le recalcul indépendant du tag par l'Agent B détecte immédiatement toute altération de message injectée par l'espion.
            </p>
          </div>
        </div>
      </div>

      {/* Mechanism & Key Configuration Console */}
      <div className="bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-6 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-5">
        <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
          <h2 className="font-headline-md text-base sm:text-lg font-bold text-on-surface dark:text-zinc-100 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">security</span>
            Étape 1 &amp; 2 : Choix du Mécanisme &amp; Configuration de la Clé
          </h2>
          <span className="text-xs font-mono text-on-surface-variant">
            {PEDAGOGICAL_PROFILES[mechanism]?.name}
          </span>
        </div>

        {/* Mechanism Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-xs font-mono">
          {[
            { id: 'naive_prefix', label: 'MAC Naïf H(k∥m)' },
            { id: 'cbc_mac', label: 'CBC-MAC (AES)' },
            { id: 'hmac_md4', label: 'HMAC-MD4' },
            { id: 'hmac_md5', label: 'HMAC-MD5' },
            { id: 'hmac_sha1', label: 'HMAC-SHA-1' },
            { id: 'hmac_sha256', label: 'HMAC-SHA-256' },
            { id: 'hmac_sha512', label: 'HMAC-SHA-512' },
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => handleMechanismChange(m.id as MacMechanism)}
              className={`p-2.5 rounded-xl font-semibold transition-all text-center flex flex-col items-center justify-center gap-1 ${
                mechanism === m.id
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-surface-container-low dark:bg-zinc-800 hover:bg-surface-container text-on-surface dark:text-zinc-200'
              }`}
            >
              <span>{m.label}</span>
              <span className="text-[10px] opacity-80">
                Pédag : {PEDAGOGICAL_PROFILES[m.id as MacMechanism]?.defaultSuccessProb}%
              </span>
            </button>
          ))}
        </div>

        {/* Input Parameters: Original Message, Modified Message, Key */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="flex flex-col gap-1.5">
            <label className="text-on-surface-variant font-semibold uppercase">
              Message émis par Agent A :
            </label>
            <input
              type="text"
              value={originalMessage}
              onChange={(e) => setOriginalMessage(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/30 text-on-surface dark:text-zinc-100 font-bold"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-error font-semibold uppercase">
              Message altéré par The Spy :
            </label>
            <input
              type="text"
              value={modifiedMessage}
              onChange={(e) => setModifiedMessage(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-error-container/20 border border-error/30 text-error font-bold"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-on-surface-variant font-semibold uppercase">
              Clé secrète partagée (k) :
            </label>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/30 text-primary dark:text-amber-400 font-bold"
            />
          </div>
        </div>

        {/* Advanced Option: HKDF Key Derivation Option */}
        <div className="p-4 rounded-xl bg-surface-container-low dark:bg-zinc-800/60 border border-outline-variant/30 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useHkdfDerivation}
                onChange={(e) => setUseHkdfDerivation(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary"
              />
              <span className="font-bold text-xs sm:text-sm text-on-surface dark:text-zinc-100">
                Option Avancée : Dériver une clé avant authentification (HKDF RFC 5869)
              </span>
            </label>
            <span className="text-[11px] font-mono text-secondary font-semibold">
              Séparation de Domaine
            </span>
          </div>

          {useHkdfDerivation && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
              <div className="flex flex-col gap-1">
                <span className="text-on-surface-variant">Sel de dérivation :</span>
                <input
                  type="text"
                  value={hkdfSalt}
                  onChange={(e) => setHkdfSalt(e.target.value)}
                  className="p-2 rounded bg-surface-container-lowest dark:bg-zinc-900 border border-outline-variant/30 text-on-surface dark:text-zinc-100"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-on-surface-variant">Contexte (info) :</span>
                <input
                  type="text"
                  value={hkdfInfo}
                  onChange={(e) => setHkdfInfo(e.target.value)}
                  className="p-2 rounded bg-surface-container-lowest dark:bg-zinc-900 border border-outline-variant/30 text-on-surface dark:text-zinc-100"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleDeriveKeyWithHkdf}
                  type="button"
                  className="w-full py-2 px-3 rounded-lg bg-secondary text-white font-semibold hover:bg-secondary/90 transition-colors flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">key</span>
                  <span>Dériver avec HKDF</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pedagogical Probabilistic Model Controls */}
        <div className="p-4 rounded-xl bg-surface-container-low dark:bg-zinc-800/60 border border-outline-variant/30 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">casino</span>
              <span className="font-bold text-xs sm:text-sm text-on-surface dark:text-zinc-100">
                Modèle Probabiliste Pédagogique de Démonstration
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-primary-fixed dark:bg-primary-container/40 text-on-primary-fixed text-xs font-mono font-bold">
              Chances de falsification de l'espion : {customProb}%
            </span>
          </div>

          <p className="text-xs text-on-surface-variant dark:text-zinc-400 leading-relaxed">
            <strong>Règle technique impérative :</strong> Ce tirage probabiliste est un modèle de jeu pédagogique totalement découplé de la vérification cryptographique réelle. En réalité mathématique, un message altéré sans recalcul de clé est <strong>systématiquement rejeté à 100%</strong>.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-on-surface-variant">0.1%</span>
            <input
              type="range"
              min={0.1}
              max={100}
              step={0.5}
              value={customProb}
              onChange={(e) => setCustomProb(parseFloat(e.target.value))}
              className="flex-1 accent-primary"
            />
            <span className="text-xs font-mono text-on-surface-variant">100%</span>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-outline-variant/20">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleRunSimulation()}
                type="button"
                className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs sm:text-sm hover:bg-primary-hover shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                <span>Lancer Simulation Aléatoire</span>
              </button>

              <button
                onClick={() => handleRunSimulation(false)}
                type="button"
                className="px-3 py-2 rounded-xl bg-emerald-600 text-white font-medium text-xs hover:bg-emerald-700 flex items-center gap-1 transition-colors"
                title="Simule le cas normal où l'espion échoue"
              >
                <span className="material-symbols-outlined text-[16px]">shield</span>
                <span>Forcer Rejet (Bill Sauvé)</span>
              </button>

              <button
                onClick={() => handleRunSimulation(true)}
                type="button"
                className="px-3 py-2 rounded-xl bg-red-600 text-white font-medium text-xs hover:bg-red-700 flex items-center gap-1 transition-colors"
                title="Simule le cas où l'espion parvient à forger un tag dans la narration"
              >
                <span className="material-symbols-outlined text-[16px]">gpp_bad</span>
                <span>Forcer Succès Espion</span>
              </button>
            </div>

            {/* Run 100 simulations batch test */}
            <button
              onClick={() => handleRunBatch(100)}
              type="button"
              className="px-3 py-2 rounded-xl bg-surface-container dark:bg-zinc-700 text-on-surface dark:text-zinc-200 text-xs font-mono hover:bg-surface-container-high transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">stacked_line_chart</span>
              <span>Tester 100 simulations</span>
            </button>
          </div>

          {/* Batch Stats Readout if run */}
          {batchStats && (
            <div className="p-3 bg-surface-container-lowest dark:bg-zinc-900 rounded-lg border border-outline-variant/30 flex items-center justify-between font-mono text-xs">
              <span className="text-on-surface-variant font-semibold">
                Résultat sur {batchStats.total} tirages avec P = {customProb}% :
              </span>
              <div className="flex items-center gap-4">
                <span className="text-tertiary font-bold">
                  Bloqués : {batchStats.blocked} ({((batchStats.blocked / batchStats.total) * 100).toFixed(1)}%)
                </span>
                <span className="text-error font-bold">
                  Simulés acceptés : {batchStats.forged} ({((batchStats.forged / batchStats.total) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive 6-Scene Message Packet Flow */}
      <MessagePacketFlow
        simulationRecord={currentRecord}
        onReset={() => handleRunSimulation()}
      />

      {/* Multi-Simulations History Table */}
      {simulationHistory.length > 0 && (
        <div className="bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-5 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-3 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
            <span className="font-bold uppercase tracking-wider text-on-surface dark:text-zinc-100">
              Historique des Dernières Simulations ({simulationHistory.length})
            </span>
            <span className="text-on-surface-variant text-[11px]">Enregistré en mémoire navigateur</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high dark:bg-zinc-800 text-on-surface dark:text-zinc-200 font-bold">
                  <th className="p-2 border-b border-outline-variant/30">Heure</th>
                  <th className="p-2 border-b border-outline-variant/30">Méthode</th>
                  <th className="p-2 border-b border-outline-variant/30">Prob. Démo</th>
                  <th className="p-2 border-b border-outline-variant/30">Vérif Réelle</th>
                  <th className="p-2 border-b border-outline-variant/30">Simulation</th>
                  <th className="p-2 border-b border-outline-variant/30">Destin de Bill</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-on-surface-variant dark:text-zinc-300">
                {simulationHistory.map((rec) => (
                  <tr key={rec.id} className="hover:bg-surface-container-low dark:hover:bg-zinc-800/50">
                    <td className="p-2">{rec.timestamp}</td>
                    <td className="p-2 font-semibold text-on-surface dark:text-zinc-100">{rec.mechanismName}</td>
                    <td className="p-2">{rec.pedagogicalProbabilityUsed}%</td>
                    <td className="p-2 font-bold text-error">INVALIDE (Attaque Bloquée)</td>
                    <td className="p-2 font-semibold">
                      {rec.spyForgedSuccessfullyInSimulation ? (
                        <span className="text-error">Succès Espion</span>
                      ) : (
                        <span className="text-tertiary">Échec Espion</span>
                      )}
                    </td>
                    <td className="p-2 font-bold">
                      {rec.billFate === 'saved' ? (
                        <span className="text-tertiary">SAUVÉ</span>
                      ) : (
                        <span className="text-error">PERDU</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
