'use client';

import React, { useState } from 'react';
import { DOCUMENTATION_CHAPTERS, DocChapter, DocSection } from '../../documentation/data';
import { KatexFormula } from '../../components/common/KatexFormula';

export default function DocumentationPage() {
  const [selectedPartId, setSelectedPartId] = useState<string>('part-1');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentChapter =
    DOCUMENTATION_CHAPTERS.find((c) => c.id === selectedPartId) || DOCUMENTATION_CHAPTERS[0];

  // Filter sections if search query is provided
  const filteredSections = searchQuery.trim()
    ? currentChapter.sections.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentChapter.sections;

  return (
    <div className="py-6 sm:py-8 flex flex-col gap-6">
      {/* Header Banner */}
      <div className="bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-6 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed dark:bg-primary-container/30 text-on-primary-fixed dark:text-primary-fixed">
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            <span className="font-label-sm text-xs font-semibold uppercase tracking-wider">
              Documentation Scientifique Officielle
            </span>
          </div>

          <span className="font-mono text-xs text-primary font-semibold">
            Source Unique : Rapport ENSPY 3GI (Groupe 23, 7 nov. 2026)
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-headline-xl text-2xl sm:text-3xl font-bold text-on-surface dark:text-zinc-100">
              Manuel Cryptographique Pédagogique
            </h1>
            <p className="text-sm text-on-surface-variant dark:text-zinc-300 mt-1">
              Théorie rigoureuse, définitions, formules mathématiques et démonstrations pas à pas sans aucune altération.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant">
              search
            </span>
            <input
              type="text"
              placeholder="Rechercher une notion..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/40 text-xs sm:text-sm text-on-surface dark:text-zinc-100 placeholder:text-on-surface-variant focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Main Layout: Sticky Sidebar TOC + Content Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table of Contents (TOC) Sidebar */}
        <aside className="lg:col-span-4 bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-4 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-2 sticky top-20">
          <div className="px-2 py-1.5 flex items-center justify-between border-b border-outline-variant/20">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-zinc-400">
              Plan du Rapport (8 Parties)
            </span>
            <span className="text-xs font-mono text-primary font-semibold">
              48 Pages
            </span>
          </div>

          <nav className="flex flex-col gap-1 max-h-[70vh] overflow-y-auto pr-1">
            {DOCUMENTATION_CHAPTERS.map((ch) => {
              const isSelected = ch.id === selectedPartId;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setSelectedPartId(ch.id);
                    setSearchQuery('');
                  }}
                  type="button"
                  className={`text-left px-3 py-2.5 rounded-xl transition-all flex items-start gap-2.5 ${
                    isSelected
                      ? 'bg-primary text-white shadow-xs font-semibold'
                      : 'text-on-surface-variant dark:text-zinc-300 hover:bg-surface-container-low dark:hover:bg-zinc-800'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-surface-container dark:bg-zinc-700 text-on-surface-variant'
                    }`}
                  >
                    {ch.partNumber}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm leading-tight truncate">
                      {ch.title}
                    </span>
                    <span
                      className={`text-[10px] font-mono mt-0.5 ${
                        isSelected ? 'text-white/80' : 'text-on-surface-variant/70'
                      }`}
                    >
                      {ch.pdfChapter} • {ch.pdfPages}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Viewer */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          {/* Chapter Header */}
          <div className="bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-6 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-primary-fixed dark:bg-primary-container/30 text-on-primary-fixed dark:text-primary-fixed text-xs font-mono font-bold">
                PARTIE {currentChapter.partNumber}
              </span>
              <span className="text-xs text-on-surface-variant font-mono">
                {currentChapter.pdfChapter} ({currentChapter.pdfPages})
              </span>
            </div>
            <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface dark:text-zinc-100">
              {currentChapter.title}
            </h2>
          </div>

          {/* Sections List */}
          {filteredSections.map((section) => (
            <article
              key={section.id}
              id={section.id}
              className="bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-6 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-4"
            >
              {/* Section Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-outline-variant/20 dark:border-zinc-800">
                <h3 className="font-headline-md text-lg sm:text-xl font-bold text-on-surface dark:text-zinc-100">
                  {section.title}
                </h3>
                <span className="text-xs font-mono text-primary dark:text-amber-400 bg-primary-fixed/30 dark:bg-primary-container/20 px-2 py-0.5 rounded font-medium">
                  Source : Rapport Groupe 23, {section.pdfSection}, page {section.pdfPage}
                </span>
              </div>

              {/* Formula Display if defined */}
              {section.formula && (
                <div className="p-4 rounded-xl bg-surface-container-low dark:bg-zinc-800/60 border border-outline-variant/30 dark:border-zinc-700 flex flex-col gap-1 items-start overflow-x-auto">
                  <span className="text-[11px] font-mono uppercase font-bold text-primary">
                    Formule Mathématique du Rapport :
                  </span>
                  <KatexFormula formula={section.formula} display={true} className="text-lg text-on-surface dark:text-zinc-100 my-1" />
                </div>
              )}

              {/* Body Text */}
              <div className="text-sm sm:text-base text-on-surface-variant dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>

              {/* Data Table if defined */}
              {section.table && (
                <div className="overflow-x-auto rounded-xl border border-outline-variant/30 text-xs sm:text-sm font-mono mt-2">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-high dark:bg-zinc-800 text-on-surface dark:text-zinc-100 font-bold">
                        {section.table.headers.map((h, i) => (
                          <th key={i} className="p-3 border-b border-outline-variant/30">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20 text-on-surface-variant dark:text-zinc-300">
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-surface-container-low dark:hover:bg-zinc-800/50">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Key Points Badges */}
              {section.keyPoints && section.keyPoints.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-outline-variant/20">
                  {section.keyPoints.map((pt, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full bg-surface-container-high dark:bg-zinc-800 text-xs font-mono text-on-surface dark:text-zinc-200"
                    >
                      ✓ {pt}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
