'use client';

import React, { useState, useEffect } from 'react';
import { CalculationResult, CryptoStep } from '../../crypto/types';
import { KatexFormula } from '../common/KatexFormula';
import { ByteViewer } from '../byte-viewer/ByteViewer';

interface StepViewerProps {
  result: CalculationResult;
  className?: string;
}

export const StepViewer: React.FC<StepViewerProps> = ({ result, className = '' }) => {
  const steps = result.steps;
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showAllSteps, setShowAllSteps] = useState<boolean>(false);
  const [copiedTag, setCopiedTag] = useState<boolean>(false);
  const [copiedHex, setCopiedHex] = useState<boolean>(false);

  // Auto-play effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  const handleNext = () => {
    setIsPlaying(false);
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleCopyTag = () => {
    navigator.clipboard.writeText(result.tagHex);
    setCopiedTag(true);
    setTimeout(() => setCopiedTag(false), 2000);
  };

  const handleCopyHex = () => {
    const details = result.steps
      .map((s) => `Étape ${s.stepNumber} : ${s.title}\nRésultat: ${s.outputHex || 'N/A'}`)
      .join('\n\n');
    navigator.clipboard.writeText(details);
    setCopiedHex(true);
    setTimeout(() => setCopiedHex(false), 2000);
  };

  const handleExportTxt = () => {
    let txt = `====================================================\n`;
    txt += `CRYPTOLAB // RAPPORT D'EXÉCUTION PÉDAGOGIQUE\n`;
    txt += `Mécanisme : ${result.mechanismName}\n`;
    txt += `Source : ${result.sourceCitation}\n`;
    txt += `Statut de sécurité : ${result.securityStatus.toUpperCase()} - ${result.securityNote}\n`;
    txt += `Date : ${new Date().toLocaleString('fr-FR')}\n`;
    txt += `Message : "${result.messageRaw}" (${result.messageBytes.length} octets)\n`;
    txt += `Clé secrète : "${result.keyRaw}" (${result.keyBytes.length} octets)\n`;
    txt += `Tag final : ${result.tagHex} (${result.tagBits} bits)\n`;
    txt += `Temps d'exécution : ${result.executionTimeMs} ms\n`;
    txt += `====================================================\n\n`;

    result.steps.forEach((s) => {
      txt += `[ÉTAPE ${s.stepNumber}] ${s.title}\n`;
      txt += `Description : ${s.description}\n`;
      if (s.formula) txt += `Formule : ${s.formula}\n`;
      if (s.sourceCitation) txt += `Source : ${s.sourceCitation}\n`;
      if (s.outputHex) txt += `Hex sortie : ${s.outputHex}\n`;
      if (s.details) {
        s.details.forEach((d) => {
          txt += `  - ${d.label} : ${d.value}\n`;
        });
      }
      txt += `\n`;
    });

    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cryptolab-${result.mechanism}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const activeStep = steps[currentStepIndex] || steps[0];
  const progressPercent = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      {/* Top Controls & Navigation Bar */}
      <div className="bg-surface-container-lowest dark:bg-zinc-900 rounded-xl p-4 sm:p-5 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-4">
        {/* Title and Step Counter */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-mono font-bold text-sm">
              {currentStepIndex + 1}
            </span>
            <div>
              <h2 className="font-headline-md text-base sm:text-lg font-bold text-on-surface dark:text-zinc-100">
                Mode Pas-à-Pas : Étape {currentStepIndex + 1} sur {steps.length}
              </h2>
              <span className="font-label-sm text-xs text-on-surface-variant dark:text-zinc-400">
                {result.mechanismName} // {result.executionTimeMs} ms
              </span>
            </div>
          </div>

          {/* Quick Action Buttons: Show All & Exports */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setShowAllSteps(!showAllSteps)}
              type="button"
              className={`px-3 py-1.5 rounded-lg border font-medium flex items-center gap-1 transition-colors ${
                showAllSteps
                  ? 'bg-primary-container text-white border-primary-container'
                  : 'bg-surface-container-low dark:bg-zinc-800 text-on-surface dark:text-zinc-200 border-outline-variant/40 hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {showAllSteps ? 'view_carousel' : 'list_alt'}
              </span>
              <span>{showAllSteps ? 'Mode Carrousel' : 'Tout Afficher'}</span>
            </button>

            <button
              onClick={handleCopyTag}
              type="button"
              className="px-2.5 py-1.5 rounded-lg bg-surface-container-low dark:bg-zinc-800 text-on-surface dark:text-zinc-200 border border-outline-variant/40 hover:bg-surface-container transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">content_copy</span>
              <span>{copiedTag ? 'Tag Copié !' : 'Copier Tag'}</span>
            </button>

            <button
              onClick={handleExportTxt}
              type="button"
              className="px-2.5 py-1.5 rounded-lg bg-surface-container-low dark:bg-zinc-800 text-on-surface dark:text-zinc-200 border border-outline-variant/40 hover:bg-surface-container transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Exporter TXT</span>
            </button>

            <button
              onClick={handlePrint}
              type="button"
              className="px-2.5 py-1.5 rounded-lg bg-surface-container-low dark:bg-zinc-800 text-on-surface dark:text-zinc-200 border border-outline-variant/40 hover:bg-surface-container transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Rapport PDF</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant dark:text-zinc-400">
            <span>Progression du calcul</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-surface-container-high dark:bg-zinc-800 rounded-full overflow-hidden flex">
            <div
              className="bg-primary-container h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-outline-variant/20 dark:border-zinc-800">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleReset}
              title="Recommencer"
              type="button"
              className="p-2 rounded-lg bg-surface-container-low dark:bg-zinc-800 text-on-surface dark:text-zinc-200 hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">replay</span>
            </button>
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              type="button"
              className="px-3 py-1.5 rounded-lg bg-surface-container-low dark:bg-zinc-800 text-on-surface dark:text-zinc-200 disabled:opacity-40 hover:bg-surface-container transition-colors flex items-center gap-1 text-xs font-medium"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              <span>Précédent</span>
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              type="button"
              className="px-3.5 py-1.5 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
              <span>{isPlaying ? 'Pause' : 'Lecture Auto'}</span>
            </button>
            <button
              onClick={handleNext}
              disabled={currentStepIndex >= steps.length - 1}
              type="button"
              className="px-3 py-1.5 rounded-lg bg-surface-container-low dark:bg-zinc-800 text-on-surface dark:text-zinc-200 disabled:opacity-40 hover:bg-surface-container transition-colors flex items-center gap-1 text-xs font-medium"
            >
              <span>Suivant</span>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>

          {/* Tag Quick Display */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-on-surface-variant dark:text-zinc-400">Tag calculé :</span>
            <span className="font-bold text-primary dark:text-amber-400 select-all">
              {result.tagHex.slice(0, 16)}... ({result.tagBits} bits)
            </span>
          </div>
        </div>
      </div>

      {/* Main Step Display: Single Carousel Mode vs Show All */}
      {!showAllSteps ? (
        <div className="bg-surface-container-lowest dark:bg-zinc-900 rounded-xl p-5 sm:p-6 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-4">
          {/* Step Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-outline-variant/20 dark:border-zinc-800">
            <div className="flex items-start gap-3">
              <span className="w-9 h-9 rounded-lg bg-primary-fixed dark:bg-primary-container/30 text-on-primary-fixed dark:text-primary-fixed font-mono font-bold flex items-center justify-center text-base flex-shrink-0">
                {activeStep.stepNumber}
              </span>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="font-headline-md text-lg sm:text-xl font-bold text-on-surface dark:text-zinc-100">
                    {activeStep.title}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-mono uppercase font-semibold">
                    {activeStep.operationType}
                  </span>
                </div>
                {activeStep.sourceCitation && (
                  <span className="text-xs text-primary font-mono mt-0.5">
                    Source : {activeStep.sourceCitation}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-on-surface-variant dark:text-zinc-300 leading-relaxed">
            {activeStep.description}
          </p>

          {/* Formula Display if present */}
          {activeStep.formula && (
            <div className="p-3 rounded-lg bg-surface-container-low dark:bg-zinc-800/60 border border-outline-variant/30 dark:border-zinc-700 flex items-center justify-between overflow-x-auto">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase font-semibold text-primary">Formule :</span>
                <KatexFormula formula={activeStep.formula} display={false} className="text-base text-on-surface dark:text-zinc-100" />
              </div>
            </div>
          )}

          {/* Key-Value Details Table */}
          {activeStep.details && activeStep.details.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {activeStep.details.map((detail, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded bg-surface-container-low dark:bg-zinc-800/50 border border-outline-variant/20 dark:border-zinc-800 flex flex-col gap-0.5"
                >
                  <span className="text-[11px] text-on-surface-variant dark:text-zinc-400 uppercase font-semibold">
                    {detail.label}
                  </span>
                  <span className="text-on-surface dark:text-zinc-100 font-bold break-all select-all">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Hex Data Stream if present */}
          {activeStep.outputBytes && activeStep.outputBytes.length > 0 && (
            <div className="flex flex-col gap-2 pt-2">
              <span className="text-xs font-mono uppercase font-semibold text-on-surface-variant dark:text-zinc-400">
                Inspection Hexadécimale du résultat d'étape :
              </span>
              <ByteViewer
                bytes={activeStep.outputBytes}
                title={`Buffer d'étape ${activeStep.stepNumber}`}
              />
            </div>
          )}
        </div>
      ) : (
        /* Show All Steps Mode (Accordion list) */
        <div className="flex flex-col gap-4">
          {steps.map((step) => (
            <div
              key={step.stepNumber}
              className="bg-surface-container-lowest dark:bg-zinc-900 rounded-xl p-5 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20 dark:border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded bg-primary text-white font-mono font-bold text-xs flex items-center justify-center">
                    {step.stepNumber}
                  </span>
                  <h4 className="font-headline-md text-base font-bold text-on-surface dark:text-zinc-100">
                    {step.title}
                  </h4>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container text-xs font-mono">
                  {step.operationType}
                </span>
              </div>

              <p className="text-sm text-on-surface-variant dark:text-zinc-300">
                {step.description}
              </p>

              {step.formula && (
                <div className="p-2.5 rounded bg-surface-container-low dark:bg-zinc-800/60 font-mono text-xs flex items-center gap-2">
                  <span className="text-primary font-bold">Formule :</span>
                  <KatexFormula formula={step.formula} />
                </div>
              )}

              {step.outputHex && (
                <div className="p-2 rounded bg-surface-container-low dark:bg-zinc-800 font-mono text-xs text-on-surface dark:text-zinc-200 break-all select-all">
                  <strong className="text-primary">Hex : </strong>
                  {step.outputHex}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pedagogical Security Warning Banner */}
      <div
        className={`p-4 rounded-xl border flex items-start gap-3 ${
          result.securityStatus === 'secure'
            ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
            : result.securityStatus === 'vulnerable'
            ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
            : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 text-red-900 dark:text-red-200'
        }`}
      >
        <span className="material-symbols-outlined text-[22px] flex-shrink-0 mt-0.5">
          {result.securityStatus === 'secure' ? 'verified_user' : 'warning'}
        </span>
        <div className="flex flex-col gap-0.5 text-xs sm:text-sm">
          <strong className="font-semibold uppercase tracking-wide">
            Statut Cryptographique Pédagogique : {result.securityStatus}
          </strong>
          <p className="leading-relaxed opacity-90">{result.securityNote}</p>
        </div>
      </div>
    </div>
  );
};
