'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const authors = [
    { name: 'AKAMBA Ghislaine Lucie', matricule: '24P536' },
    { name: 'BEKIMA WANDJI Rodrigue Hazael', matricule: '24P139' },
    { name: 'DJUISSI BOUMI Myriam', matricule: '24P077' },
    { name: 'MANGASSO MINGA Hamdi', matricule: '24P589' },
    { name: 'MO-TSANGA Olive Zita', matricule: '21P404' },
  ];

  return (
    <div className="py-6 sm:py-8 flex flex-col gap-6">
      {/* Header Banner */}
      <div className="bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-6 sm:p-8 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed dark:bg-primary-container/30 text-on-primary-fixed dark:text-primary-fixed">
            <span className="material-symbols-outlined text-[16px]">school</span>
            <span className="font-label-sm text-xs font-semibold uppercase tracking-wider">
              Projet Académique Officiel // ENSPY 3GI
            </span>
          </div>

          <span className="font-mono text-xs text-primary font-bold">
            7 novembre 2026
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-headline-xl text-2xl sm:text-4xl font-bold text-on-surface dark:text-zinc-100">
            À Propos de CryptoLab
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant dark:text-zinc-300 leading-relaxed max-w-3xl">
            Cette application web éducative constitue la mise en application interactive, visuelle et expérimentale du rapport de recherche universitaire intitulé <strong>« Hachage : MAC, HMAC et dérivation des clés »</strong>.
          </p>
        </div>
      </div>

      {/* Authors Card */}
      <section className="bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-6 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-5">
        <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
          <div>
            <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
              Auteurs du Rapport Scientifique
            </span>
            <h2 className="font-headline-lg text-xl sm:text-2xl font-bold text-on-surface dark:text-zinc-100">
              Groupe 23 — ENSPY 3GI
            </h2>
          </div>
          <span className="text-xs font-mono text-on-surface-variant">
            École Nationale Supérieure Polytechnique de Yaoundé
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {authors.map((author, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-surface-container-low dark:bg-zinc-800/60 border border-outline-variant/20 flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-full bg-primary text-white font-mono font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-xs">
                {idx + 1}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-sm text-on-surface dark:text-zinc-100 truncate">
                  {author.name}
                </span>
                <span className="font-mono text-xs text-primary dark:text-amber-400 font-semibold">
                  Matricule : {author.matricule}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The 3 Core Pillars of Implementation */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-surface-container-lowest dark:bg-zinc-900 p-6 rounded-2xl border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-fixed dark:bg-primary-container/30 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">verified</span>
          </div>
          <h3 className="font-headline-md text-base font-bold text-on-surface dark:text-zinc-100">
            Règle Absolue : Zéro Invention
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant dark:text-zinc-400 leading-relaxed">
            Toutes les définitions, explications, démonstrations (2ⁿ et 2ⁿ/²), failles et formules proviennent exclusivement du rapport du Groupe 23.
          </p>
        </div>

        <div className="bg-surface-container-lowest dark:bg-zinc-900 p-6 rounded-2xl border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary-fixed dark:bg-secondary-container/30 text-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">lock</span>
          </div>
          <h3 className="font-headline-md text-base font-bold text-on-surface dark:text-zinc-100">
            Zero Server Leak (100% Client)
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant dark:text-zinc-400 leading-relaxed">
            Tous les calculs cryptographiques s'exécutent localement dans votre navigateur via la WebCrypto API et des primitives auditées. Aucune clé secrète n'est transmise sur le réseau.
          </p>
        </div>

        <div className="bg-surface-container-lowest dark:bg-zinc-900 p-6 rounded-2xl border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-tertiary-fixed dark:bg-tertiary-container/30 text-tertiary flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">calculate</span>
          </div>
          <h3 className="font-headline-md text-base font-bold text-on-surface dark:text-zinc-100">
            Moteur de Calcul Réel
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant dark:text-zinc-400 leading-relaxed">
            Pas de réponses préprogrammées : chaque transformation bit-à-bit et octet-par-octet est calculée en temps réel à partir de vos saisies.
          </p>
        </div>
      </section>

      {/* Traceability Files Links */}
      <section className="bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-6 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-4">
        <h2 className="font-headline-md text-lg font-bold text-on-surface dark:text-zinc-100 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">description</span>
          Traçabilité Documentaire &amp; Conformité
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-surface-container-low dark:bg-zinc-800/60 border border-outline-variant/30 flex flex-col gap-1.5">
            <span className="font-bold text-primary text-sm">SOURCE_MAPPING.md</span>
            <p className="text-on-surface-variant dark:text-zinc-400">
              Table de correspondance établissant le lien entre chaque page/notion de l'application et les sections et numéros de page précis du rapport PDF.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low dark:bg-zinc-800/60 border border-outline-variant/30 flex flex-col gap-1.5">
            <span className="font-bold text-primary text-sm">DOCUMENTATION_GAPS.md</span>
            <p className="text-on-surface-variant dark:text-zinc-400">
              Fichier de suivi des adaptations techniques pour CBC-MAC (AES-128 FIPS 197), MD4 (RFC 1320) et le découplage du modèle probabiliste de démonstration.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
