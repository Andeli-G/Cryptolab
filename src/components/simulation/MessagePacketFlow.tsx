'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SimulationResultRecord } from '../../simulation/types';
import { CharacterCard } from '../characters/CharacterCard';

interface MessagePacketFlowProps {
  simulationRecord: SimulationResultRecord;
  onReset?: () => void;
  className?: string;
}

export const MessagePacketFlow: React.FC<MessagePacketFlowProps> = ({
  simulationRecord,
  onReset,
  className = '',
}) => {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const isWithAuth = simulationRecord.mode === 'with_auth';

  const scenes = [
    { number: 1, title: 'Scène 1 : Préparation', icon: 'edit_note' },
    { number: 2, title: 'Scène 2 : Transmission Réseau', icon: 'send' },
    { number: 3, title: 'Scène 3 : Interception MitM', icon: 'radar' },
    { number: 4, title: 'Scène 4 : Réception & Contrôle', icon: 'mark_email_read' },
    { number: 5, title: 'Scène 5 : Conséquence Narrative', icon: 'theater_comedy' },
    { number: 6, title: 'Scène 6 : Bilan Pédagogique', icon: 'assessment' },
  ];

  return (
    <div className={`bg-surface-container-lowest dark:bg-zinc-900 rounded-xl p-4 sm:p-6 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-5 ${className}`}>
      {/* Scenario Progress Ribbon */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-xs font-semibold uppercase tracking-wider text-primary">
              {isWithAuth ? 'Scénario avec Authentification' : 'Scénario sans Authentification'}
            </span>
          </div>
          <span className="font-mono text-xs text-on-surface-variant dark:text-zinc-400">
            Scène {currentScene} sur 6
          </span>
        </div>

        {/* Scene Steps Bar */}
        <div className="grid grid-cols-6 gap-1 sm:gap-2">
          {scenes.map((s) => (
            <button
              key={s.number}
              type="button"
              onClick={() => setCurrentScene(s.number)}
              className={`py-1.5 px-1 rounded flex flex-col items-center justify-center transition-all ${
                currentScene === s.number
                  ? 'bg-primary text-white font-bold shadow-xs'
                  : currentScene > s.number
                  ? 'bg-surface-container-high dark:bg-zinc-800 text-tertiary'
                  : 'bg-surface-container-low dark:bg-zinc-800/40 text-on-surface-variant/50'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{s.icon}</span>
              <span className="text-[10px] hidden md:inline truncate">{s.title.split(':')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Scene Canvas */}
      <div className="relative min-h-[22rem] bg-surface-container-low dark:bg-zinc-800/50 rounded-xl p-4 sm:p-6 border border-outline-variant/20 dark:border-zinc-800 flex flex-col justify-between overflow-hidden">
        {/* SCÈNE 1 : PRÉPARATION */}
        {currentScene === 1 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface dark:text-zinc-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">edit_note</span>
                Scène 1 : Préparation du message par l'Agent A
              </h3>
              <span className="px-2 py-0.5 rounded bg-primary-fixed dark:bg-primary-container/40 text-on-primary-fixed text-xs font-mono font-semibold">
                CANAL LOCAL SÉCURISÉ
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <CharacterCard
                id="agent_a"
                dialogue={
                  isWithAuth
                    ? `Je scelle l'ordre vital "${simulationRecord.originalMessage}" avec notre clé secrète partagée via ${simulationRecord.mechanismName}. Le tag calculé accompagne le paquet.`
                    : `J'envoie l'ordre vital "${simulationRecord.originalMessage}" en clair à l'Agent B via le canal public.`
                }
              />

              {/* Message Payload Card */}
              <div className="bg-surface-container-lowest dark:bg-zinc-900 p-4 rounded-xl border border-outline-variant/30 flex flex-col gap-2.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-on-surface-variant dark:text-zinc-400 uppercase">
                    Charge Utile Originale (m)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-mono text-[11px] font-bold">
                    ORIGINAL
                  </span>
                </div>
                <div className="p-3 bg-surface-container-low dark:bg-zinc-800 rounded-lg flex items-center justify-between">
                  <span className="font-mono text-lg font-bold text-tertiary">
                    « {simulationRecord.originalMessage} »
                  </span>
                  <span className="text-xs text-on-surface-variant font-mono">
                    {simulationRecord.originalMessage.length} octets ASCII
                  </span>
                </div>

                {isWithAuth && simulationRecord.originalTag && (
                  <div className="flex flex-col gap-1 mt-1 text-xs font-mono">
                    <span className="text-on-surface-variant dark:text-zinc-400">
                      Tag d'Authentification ({simulationRecord.mechanismName}) :
                    </span>
                    <div className="p-2 rounded bg-primary-fixed/20 text-primary dark:text-amber-300 break-all select-all font-semibold">
                      {simulationRecord.originalTag}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SCÈNE 2 : TRANSMISSION */}
        {currentScene === 2 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface dark:text-zinc-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">send</span>
                Scène 2 : Acheminement sur le canal de transmission
              </h3>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-xs font-mono font-semibold">
                CANAL NON SÉCURISÉ (TCP/IP)
              </span>
            </div>

            {/* Network Pipe Animation */}
            <div className="relative py-8 px-4 flex flex-col items-center justify-center gap-4">
              <div className="w-full flex items-center justify-between">
                <CharacterCard id="agent_a" compact className="w-40" />
                <div className="flex-1 mx-4 relative flex items-center justify-center">
                  <div className="w-full h-1 bg-gradient-to-r from-primary via-secondary to-secondary rounded-full"></div>
                  {/* Digital Packet floating in transit */}
                  <div className="absolute px-3 py-1.5 rounded-lg bg-surface-container-lowest dark:bg-zinc-900 border-2 border-secondary shadow-md flex items-center gap-2 animate-bounce">
                    <span className="material-symbols-outlined text-secondary text-[18px]">drafts</span>
                    <span className="font-mono text-xs font-bold text-on-surface dark:text-zinc-100">
                      {isWithAuth ? 'Paquet (m, t)' : 'Paquet (m)'}
                    </span>
                  </div>
                </div>
                <CharacterCard id="agent_b" compact className="w-40" />
              </div>

              <div className="p-3 bg-surface-container-lowest dark:bg-zinc-900 rounded-lg border border-outline-variant/30 text-xs text-on-surface-variant dark:text-zinc-300 max-w-xl text-center leading-relaxed">
                Le paquet transite par des nœuds et routeurs ouverts. N'importe quelle entité connectée au réseau peut observer et intercepter les trames circulant sur ce canal.
              </div>
            </div>
          </div>
        )}

        {/* SCÈNE 3 : INTERCEPTION MITM */}
        {currentScene === 3 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <h3 className="font-headline-md text-base sm:text-lg font-bold text-error flex items-center gap-2">
                <span className="material-symbols-outlined text-error">sensors_off</span>
                Scène 3 : Interception & Altération par The Spy
              </h3>
              <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container text-xs font-mono font-bold uppercase">
                MESSAGE INTERCEPTÉ !
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <CharacterCard
                id="the_spy"
                dialogue={`J'intercepte le flux ! J'ouvre l'enveloppe et je remplace "${simulationRecord.originalMessage}" par "${simulationRecord.modifiedMessage}". ${
                  isWithAuth
                    ? 'Mais attention : il y a un tag d\'authentification ! Puis-je forger un tag valide sans la clé secrète ?'
                    : 'Aucun code d\'authentification n\'est attaché : ma falsification passera totalement inaperçue !'
                }`}
              />

              {/* Substitution diff card */}
              <div className="bg-surface-container-lowest dark:bg-zinc-900 p-4 rounded-xl border border-error/30 flex flex-col gap-3 shadow-xs">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-on-surface-variant dark:text-zinc-400">Substitution de contenu :</span>
                  <span className="text-error font-bold">1-word critical drift</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-emerald-50 dark:bg-emerald-950/30 text-xs font-mono text-tertiary">
                  <span>Message original :</span>
                  <span className="font-bold line-through">« {simulationRecord.originalMessage} »</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-error-container/30 dark:bg-error-container/20 text-xs font-mono text-error">
                  <span>Message injecté :</span>
                  <span className="font-bold text-sm">« {simulationRecord.modifiedMessage} »</span>
                </div>

                <div className="p-2 bg-surface-container-low dark:bg-zinc-800 rounded text-[11px] font-mono text-on-surface-variant dark:text-zinc-400">
                  {isWithAuth ? (
                    <span>
                      Tag transmis : <strong className="text-on-surface dark:text-zinc-100">{simulationRecord.transmittedTag?.slice(0, 20)}...</strong>
                      <br />
                      {simulationRecord.spyForgedSuccessfullyInSimulation
                        ? '⚠️ Simulation : L\'espion a simulé un nouveau tag valide.'
                        : '🔒 Réalité : L\'espion ne possède pas la clé secrète k et réutilise l\'ancien tag.'}
                    </span>
                  ) : (
                    <span className="text-error font-semibold">
                      Authentification : ABSENTE (aucun tag attaché).
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCÈNE 4 : RÉCEPTION & CONTRÔLE */}
        {currentScene === 4 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface dark:text-zinc-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">mark_email_read</span>
                Scène 4 : Réception par l'Agent B & Contrôle d'Intégrité
              </h3>
              <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold uppercase ${
                !isWithAuth || simulationRecord.spyForgedSuccessfullyInSimulation
                  ? 'bg-red-100 text-error'
                  : 'bg-emerald-100 text-tertiary'
              }`}>
                {!isWithAuth
                  ? 'ACCEPTATION CRÉDULE'
                  : simulationRecord.spyForgedSuccessfullyInSimulation
                  ? 'ALERTE SIMULATION'
                  : 'MESSAGE REJETÉ (403)'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <CharacterCard
                id="agent_b"
                dialogue={
                  !isWithAuth
                    ? `J'ai reçu l'ordre "${simulationRecord.modifiedMessage}". Aucun mécanisme ne me permet de savoir s'il est authentique ou altéré. Je suis obligé de lui faire confiance...`
                    : simulationRecord.spyForgedSuccessfullyInSimulation
                    ? `Dans cette simulation pédagogique, le tag a semblé correspondre. Le message altéré a été accepté.`
                    : `ALERTE SÉCURITÉ ! Le message reçu est "${simulationRecord.modifiedMessage}". J'ai recalculé le tag avec ma clé secrète k : il NE CORRESPOND PAS au tag reçu ! MESSAGE REJETÉ IMMÉDIATEMENT !`
                }
              />

              {/* Verification Audit Terminal */}
              <div className="bg-surface-container-lowest dark:bg-zinc-900 p-4 rounded-xl border border-outline-variant/30 flex flex-col gap-2.5 font-mono text-xs shadow-xs">
                <div className="flex items-center justify-between pb-1 border-b border-outline-variant/20">
                  <span className="text-on-surface-variant uppercase font-semibold">Audit de Contrôle Cryptographique</span>
                  <span className="text-tertiary font-bold">TEMPS CONSTANT</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">Message Reçu :</span>
                  <span className="font-bold text-error">« {simulationRecord.modifiedMessage} »</span>
                </div>

                {isWithAuth ? (
                  <>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-on-surface-variant">Tag Reçu du réseau :</span>
                      <span className="text-[11px] text-on-surface break-all bg-surface-container-low p-1.5 rounded">
                        {simulationRecord.transmittedTag}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-on-surface-variant">Tag Recalculé avec k :</span>
                      <span className="text-[11px] text-tertiary break-all bg-surface-container-low p-1.5 rounded">
                        {simulationRecord.recalculatedTag}
                      </span>
                    </div>
                    <div className="pt-1 flex items-center justify-between font-bold">
                      <span>Vérification mathématique :</span>
                      <span className={simulationRecord.realCryptoValid ? 'text-tertiary' : 'text-error'}>
                        {simulationRecord.realCryptoValid ? 'VALIDE' : 'INVALIDE (NON-CONCORDANCE)'}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 text-error rounded-lg flex flex-col gap-1">
                    <span className="font-bold">AUCUN TAG REÇU</span>
                    <span>Impossible d'effectuer une vérification Vrfy_k(m, t).</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SCÈNE 5 : CONSÉQUENCE NARRATIVE */}
        {currentScene === 5 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface dark:text-zinc-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">theater_comedy</span>
                Scène 5 : Conséquence Narrative sur Bill
              </h3>
              <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold uppercase ${
                simulationRecord.billFate === 'saved'
                  ? 'bg-emerald-100 text-tertiary'
                  : 'bg-red-100 text-error'
              }`}>
                {simulationRecord.billFate === 'saved' ? 'BILL EST SAUVÉ' : 'BILL EST PERDU'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Cinematic Art Display */}
              <div className="relative w-full h-56 rounded-xl overflow-hidden border border-outline-variant/30 flex items-center justify-center bg-zinc-950 shadow-md">
                {simulationRecord.billFate === 'saved' ? (
                  <Image
                    src="/characters/bill-saved.svg"
                    alt="Bill est sauvé !"
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <Image
                    src="/characters/bill-coat.svg"
                    alt="Veste laissée au sol - Conséquence narrative"
                    fill
                    className="object-contain p-2"
                  />
                )}
              </div>

              {/* Consequence Narrative Text */}
              <div className="flex flex-col gap-3">
                <h4 className="font-headline-md text-lg font-bold text-on-surface dark:text-zinc-100">
                  {simulationRecord.billFate === 'saved'
                    ? '🎉 Mission Réussie : Bill est indemne !'
                    : '🌑 Tragédie : La veste de Bill abandonnée au sol...'}
                </h4>

                <p className="text-sm text-on-surface-variant dark:text-zinc-300 leading-relaxed">
                  {simulationRecord.billFate === 'saved'
                    ? `Grâce à l'authentification ${simulationRecord.mechanismName || 'HMAC'}, l'Agent B a immédiatement repéré l'altération du paquet. L'ordre malveillant « KILL BILL » a été rejeté sans être exécuté. L'équipe a pu sécuriser Bill à temps !`
                    : `L'Agent B a cru de bonne foi à l'authenticité de l'ordre « KILL BILL ». Dans la narration, la scène se coupe avec un fondu au noir et seule la veste marron de Bill reste au sol dans la ruelle déserte. Cette conséquence illustre les dangers catastrophiques d'un canal sans authentification.`}
                </p>

                <div className="p-3 bg-surface-container-lowest dark:bg-zinc-900 rounded-lg border border-outline-variant/30 text-xs text-on-surface-variant dark:text-zinc-400 font-mono">
                  {simulationRecord.billFate === 'saved'
                    ? '✅ Intégrité garantie : Tag cryptographique inviolé.'
                    : '❌ Échec d\'intégrité : Aucune preuve d\'authenticité.'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCÈNE 6 : BILAN PÉDAGOGIQUE */}
        {currentScene === 6 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface dark:text-zinc-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">assessment</span>
                Scène 6 : Bilan Pédagogique Officiel
              </h3>
              <span className="px-2 py-0.5 rounded bg-primary-fixed dark:bg-primary-container/40 text-on-primary-fixed text-xs font-mono font-semibold">
                RAPPORT D'ANALYSE
              </span>
            </div>

            {/* Official Summary Table from Cahier des charges (Sections 6.3 & 7.4) */}
            <div className="overflow-x-auto rounded-lg border border-outline-variant/30 text-xs font-mono">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-high dark:bg-zinc-800 text-on-surface dark:text-zinc-200">
                    <th className="p-2.5 border-b border-outline-variant/30">Indicateur</th>
                    <th className="p-2.5 border-b border-outline-variant/30">Résultat de la Simulation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 text-on-surface-variant dark:text-zinc-300">
                  <tr>
                    <td className="p-2.5 font-semibold text-on-surface dark:text-zinc-100">Message original</td>
                    <td className="p-2.5 text-tertiary font-bold">{simulationRecord.originalMessage}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-on-surface dark:text-zinc-100">Message intercepté</td>
                    <td className="p-2.5">{simulationRecord.originalMessage}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-on-surface dark:text-zinc-100">Message modifié par l'espion</td>
                    <td className="p-2.5 text-error font-bold">{simulationRecord.modifiedMessage}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-on-surface dark:text-zinc-100">Mécanisme d'authentification</td>
                    <td className="p-2.5">{isWithAuth ? simulationRecord.mechanismName : 'Aucun (transmission brute)'}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-on-surface dark:text-zinc-100">Tag d'origine (Agent A)</td>
                    <td className="p-2.5 break-all select-all">{simulationRecord.originalTag || 'Non applicable'}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-on-surface dark:text-zinc-100">Tag reçu (Agent B)</td>
                    <td className="p-2.5 break-all select-all">{simulationRecord.transmittedTag || 'Non applicable'}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-on-surface dark:text-zinc-100">Vérification cryptographique réelle</td>
                    <td className="p-2.5 font-bold">
                      {isWithAuth ? (
                        simulationRecord.realCryptoValid ? (
                          <span className="text-tertiary">VALIDE</span>
                        ) : (
                          <span className="text-error">INVALIDE (Échec du tag)</span>
                        )
                      ) : (
                        <span className="text-error">Absente (non vérifiable)</span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-on-surface dark:text-zinc-100">Résultat de la simulation</td>
                    <td className="p-2.5 font-bold">
                      {simulationRecord.billFate === 'saved' ? (
                        <span className="text-tertiary">ÉCHEC DE L'ESPION (Message rejeté)</span>
                      ) : (
                        <span className="text-error">RÉUSSITE DE L'ESPION (Message altéré accepté)</span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-on-surface dark:text-zinc-100">Destin de Bill</td>
                    <td className="p-2.5 font-bold">
                      {simulationRecord.billFate === 'saved' ? (
                        <span className="text-tertiary">Bill est SAUVÉ</span>
                      ) : (
                        <span className="text-error">Bill est PERDU dans la narration</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3.5 bg-surface-container-lowest dark:bg-zinc-900 rounded-lg border border-outline-variant/30 text-xs text-on-surface-variant dark:text-zinc-300 leading-relaxed">
              <strong className="text-primary block mb-1">Conclusion Scientifique (Rapport ENSPY 3GI, p. 24) :</strong>
              {simulationRecord.technicalExplanation}
            </div>
          </div>
        )}

        {/* Bottom Scene Control Buttons */}
        <div className="flex items-center justify-between pt-4 mt-2 border-t border-outline-variant/20">
          <button
            type="button"
            disabled={currentScene === 1}
            onClick={() => setCurrentScene((prev) => Math.max(1, prev - 1))}
            className="px-3 py-1.5 rounded-lg bg-surface-container-lowest dark:bg-zinc-900 text-on-surface dark:text-zinc-200 border border-outline-variant/40 hover:bg-surface-container disabled:opacity-30 transition-colors flex items-center gap-1 text-xs font-semibold"
          >
            <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            <span>Scène Précédente</span>
          </button>

          {currentScene < 6 ? (
            <button
              type="button"
              onClick={() => setCurrentScene((prev) => Math.min(6, prev + 1))}
              className="px-4 py-1.5 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors flex items-center gap-1 text-xs font-bold shadow-xs"
            >
              <span>Scène Suivante</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setCurrentScene(1);
                if (onReset) onReset();
              }}
              className="px-4 py-1.5 rounded-lg bg-tertiary text-white hover:opacity-90 transition-opacity flex items-center gap-1 text-xs font-bold shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">replay</span>
              <span>Rejouer la Simulation</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
