'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BinaryViewer } from '../components/binary-viewer/BinaryViewer';

export default function HomePage() {
  return (
    <div className="py-6 sm:py-8 flex flex-col gap-8">
      {/* Hero / Context Header Banner */}
      <section className="bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-6 sm:p-8 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-4 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed dark:bg-primary-container/30 text-on-primary-fixed dark:text-primary-fixed">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-xs uppercase tracking-wider font-semibold">
              Console d'Observation // v2.4
            </span>
          </div>

          <span className="font-mono text-xs text-on-surface-variant dark:text-zinc-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
            Norme FIPS 198-1 / RFC 2104 / RFC 5869
          </span>
        </div>

        <div className="max-w-3xl flex flex-col gap-3">
          <h1 className="font-headline-xl text-2xl sm:text-4xl text-on-surface dark:text-zinc-100 font-bold tracking-tight leading-tight">
            CryptoLab — Message Authentication Laboratory
          </h1>
          <p className="font-headline-md text-base sm:text-lg text-primary font-medium italic">
            « Un message peut-il arriver intact à destination sans que personne ne puisse en modifier le contenu ? Explorez les mécanismes cryptographiques qui permettent de vérifier son authenticité. »
          </p>
          <p className="text-sm sm:text-base text-on-surface-variant dark:text-zinc-300 leading-relaxed">
            Plateforme interactive conçue pour l'étude microscopique, le calcul pas-à-pas et la simulation visuelle des codes d'authentification de message (MAC, CBC-MAC, HMAC) et de la dérivation des clés (HKDF).
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/laboratory"
            className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-hover shadow-sm transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">science</span>
            <span>Accéder au Laboratoire</span>
          </Link>
          <Link
            href="/simulator"
            className="px-5 py-2.5 rounded-xl bg-surface-container-low dark:bg-zinc-800 text-on-surface dark:text-zinc-200 border border-outline-variant/40 hover:bg-surface-container font-semibold text-sm transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">radar</span>
            <span>Lancer la Simulation d'Attaque</span>
          </Link>
          <Link
            href="/documentation"
            className="px-5 py-2.5 rounded-xl bg-surface-container-low dark:bg-zinc-800 text-on-surface dark:text-zinc-200 border border-outline-variant/40 hover:bg-surface-container font-semibold text-sm transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">menu_book</span>
            <span>Consulter la Documentation</span>
          </Link>
        </div>
      </section>

      {/* The 3 Core Pillars (Comprendre, Expérimenter, Simuler) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Pillar 1 : Comprendre */}
        <Link
          href="/documentation"
          className="bg-surface-container-lowest dark:bg-zinc-900 p-6 rounded-2xl border border-outline-variant/30 dark:border-zinc-800 shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between group"
        >
          <div className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed dark:bg-primary-container/30 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">menu_book</span>
            </div>
            <div>
              <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
                Volet 01
              </span>
              <h2 className="font-headline-lg text-xl font-bold text-on-surface dark:text-zinc-100 group-hover:text-primary transition-colors">
                Comprendre
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant dark:text-zinc-300 leading-relaxed">
              Découvrir les concepts fondamentaux, les démonstrations de complexité (2ⁿ et 2ⁿ/²), les architectures Merkle-Damgård vs Éponge Keccak, et les faiblesses des constructions naïves.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs font-semibold text-primary">
            <span>Explorer les 8 chapitres</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </div>
        </Link>

        {/* Pillar 2 : Expérimenter */}
        <Link
          href="/laboratory"
          className="bg-surface-container-lowest dark:bg-zinc-900 p-6 rounded-2xl border border-outline-variant/30 dark:border-zinc-800 shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between group"
        >
          <div className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-secondary-fixed dark:bg-secondary-container/30 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">science</span>
            </div>
            <div>
              <span className="font-mono text-xs text-secondary font-bold uppercase tracking-wider">
                Volet 02
              </span>
              <h2 className="font-headline-lg text-xl font-bold text-on-surface dark:text-zinc-100 group-hover:text-primary transition-colors">
                Expérimenter
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant dark:text-zinc-300 leading-relaxed">
              Calculer les fonctions cryptographiques en mode global, octet par octet et bit par bit avec dissection interactive des masques ipad/opad, chaînage CBC-MAC et HKDF.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs font-semibold text-secondary">
            <span>Ouvrir le banc de calcul</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </div>
        </Link>

        {/* Pillar 3 : Simuler */}
        <Link
          href="/simulator"
          className="bg-surface-container-lowest dark:bg-zinc-900 p-6 rounded-2xl border border-outline-variant/30 dark:border-zinc-800 shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between group"
        >
          <div className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-error-container text-error flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">radar</span>
            </div>
            <div>
              <span className="font-mono text-xs text-error font-bold uppercase tracking-wider">
                Volet 03
              </span>
              <h2 className="font-headline-lg text-xl font-bold text-on-surface dark:text-zinc-100 group-hover:text-primary transition-colors">
                Simuler
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant dark:text-zinc-300 leading-relaxed">
              Observer une interception Man-in-the-Middle en direct (SAVE BILL → KILL BILL) et comparer l'issue dramatique sans authentification versus la protection hermétique par tag HMAC.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs font-semibold text-error">
            <span>Découvrir le scénario</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </div>
        </Link>
      </section>

      {/* Interactive Avalanche Playground (Live on Home Page!) */}
      <BinaryViewer initialText="SAVE BILL" />

      {/* Operational Triad Spotlight (The Characters) */}
      <section className="bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-6 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-outline-variant/20">
          <div>
            <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
              Dramaturgie Pédagogique
            </span>
            <h2 className="font-headline-lg text-xl sm:text-2xl font-bold text-on-surface dark:text-zinc-100">
              Les Acteurs de la Simulation
            </h2>
          </div>
          <span className="text-xs text-on-surface-variant dark:text-zinc-400 font-mono">
            Protagonistes du Scénario
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Agent A */}
          <div className="p-4 rounded-xl bg-surface-container-low dark:bg-zinc-800/60 border border-outline-variant/20 flex flex-col items-center text-center gap-3">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary shadow-xs">
              <Image src="/characters/agent-a.png" alt="Agent A" fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-on-surface dark:text-zinc-100">Agent A</h3>
              <span className="text-xs text-primary font-mono font-semibold">Émettrice Légitime</span>
            </div>
            <p className="text-xs text-on-surface-variant dark:text-zinc-400 leading-snug">
              Détentrice de la clé secrète partagée <code>k</code>. Elle scelle le message avec le tag HMAC.
            </p>
          </div>

          {/* The Spy */}
          <div className="p-4 rounded-xl bg-surface-container-low dark:bg-zinc-800/60 border border-error/30 flex flex-col items-center text-center gap-3">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-error shadow-xs">
              <Image src="/characters/the-spy.png" alt="The Spy" fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-error">The Spy</h3>
              <span className="text-xs text-error font-mono font-semibold">Intercepteur MitM</span>
            </div>
            <p className="text-xs text-on-surface-variant dark:text-zinc-400 leading-snug">
              Surveille le canal et substitue l'ordre vital « SAVE BILL » par « KILL BILL ».
            </p>
          </div>

          {/* Agent B */}
          <div className="p-4 rounded-xl bg-surface-container-low dark:bg-zinc-800/60 border border-secondary/30 flex flex-col items-center text-center gap-3">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-secondary shadow-xs">
              <Image src="/characters/agent-b.png" alt="Agent B" fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-on-surface dark:text-zinc-100">Agent B</h3>
              <span className="text-xs text-secondary font-mono font-semibold">Destinataire Vérificateur</span>
            </div>
            <p className="text-xs text-on-surface-variant dark:text-zinc-400 leading-snug">
              Recalcule indépendamment le tag avec sa copie de <code>k</code> en temps constant.
            </p>
          </div>

          {/* Bill */}
          <div className="p-4 rounded-xl bg-surface-container-low dark:bg-zinc-800/60 border border-amber-400/40 flex flex-col items-center text-center gap-3">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-amber-500 shadow-xs bg-amber-50 dark:bg-amber-950/20">
              <Image src="/characters/bill.svg" alt="Bill" fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-on-surface dark:text-zinc-100">Bill</h3>
              <span className="text-xs text-amber-700 dark:text-amber-300 font-mono font-semibold">La Cible (VIP en veste)</span>
            </div>
            <p className="text-xs text-on-surface-variant dark:text-zinc-400 leading-snug">
              Son destin dépend entièrement de la présence ou de l'absence du code d'authentification.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Telemetry Metrics Grid (from Mockup) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest dark:bg-zinc-900 p-4 rounded-xl border border-outline-variant/30 dark:border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-on-surface-variant font-mono">
            <span>Algorithme Actif</span>
            <span className="material-symbols-outlined text-[16px] text-secondary">memory</span>
          </div>
          <div className="mt-2">
            <span className="font-mono text-base font-bold text-on-surface dark:text-zinc-100 block">
              HMAC-SHA256
            </span>
            <span className="text-xs text-tertiary font-medium">Standard FIPS 198-1</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest dark:bg-zinc-900 p-4 rounded-xl border border-outline-variant/30 dark:border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-on-surface-variant font-mono">
            <span>Intégrité Mathématique</span>
            <span className="material-symbols-outlined text-[16px] text-tertiary">verified_user</span>
          </div>
          <div className="mt-2">
            <span className="font-mono text-base font-bold text-tertiary block">
              100% Vérifiée
            </span>
            <span className="text-xs text-on-surface-variant dark:text-zinc-400">Temps constant timingSafe</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest dark:bg-zinc-900 p-4 rounded-xl border border-outline-variant/30 dark:border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-on-surface-variant font-mono">
            <span>Latence d'Exécution</span>
            <span className="material-symbols-outlined text-[16px] text-primary">speed</span>
          </div>
          <div className="mt-2">
            <span className="font-mono text-base font-bold text-on-surface dark:text-zinc-100 block">
              &lt; 0.5 ms
            </span>
            <span className="text-xs text-on-surface-variant dark:text-zinc-400">Micro-benchmark JIT</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest dark:bg-zinc-900 p-4 rounded-xl border border-outline-variant/30 dark:border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-on-surface-variant font-mono">
            <span>Sécurité Client</span>
            <span className="material-symbols-outlined text-[16px] text-tertiary">lock</span>
          </div>
          <div className="mt-2">
            <span className="font-mono text-base font-bold text-tertiary block">
              0 Fuite Réseau
            </span>
            <span className="text-xs text-on-surface-variant dark:text-zinc-400">Calcul 100% dans le navigateur</span>
          </div>
        </div>
      </section>
    </div>
  );
}
