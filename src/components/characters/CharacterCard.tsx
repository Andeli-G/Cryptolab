'use client';

import React from 'react';
import Image from 'next/image';

interface CharacterCardProps {
  id: 'agent_a' | 'agent_b' | 'the_spy' | 'bill';
  state?: 'idle' | 'active' | 'warning' | 'success' | 'danger';
  dialogue?: string;
  badge?: string;
  compact?: boolean;
  className?: string;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  id,
  state = 'idle',
  dialogue,
  badge,
  compact = false,
  className = '',
}) => {
  const getActorConfig = () => {
    switch (id) {
      case 'agent_a':
        return {
          name: 'Agent A',
          role: 'Émettrice Légitime',
          avatarSrc: '/characters/agent-a.png',
          defaultBadge: 'ÉMETTRICE',
          badgeColor: 'bg-primary-fixed dark:bg-primary-container/40 text-on-primary-fixed dark:text-primary-fixed',
          borderColor: 'border-primary/40',
          accentIcon: 'key',
        };
      case 'agent_b':
        return {
          name: 'Agent B',
          role: 'Destinataire Vérificateur',
          avatarSrc: '/characters/agent-b.png',
          defaultBadge: 'VÉRIFICATEUR',
          badgeColor: 'bg-secondary-fixed dark:bg-secondary-container/40 text-on-secondary-fixed dark:text-secondary-fixed',
          borderColor: 'border-secondary/40',
          accentIcon: 'verified',
        };
      case 'the_spy':
        return {
          name: 'The Spy',
          role: 'Intercepteur MitM',
          avatarSrc: '/characters/the-spy.png',
          defaultBadge: 'INTERCEPTEUR',
          badgeColor: 'bg-error-container text-on-error-container font-bold',
          borderColor: 'border-error/40',
          accentIcon: 'leak_remove',
        };
      case 'bill':
      default:
        return {
          name: 'Bill',
          role: 'La Cible (VIP en veste)',
          avatarSrc: '/characters/bill.svg',
          defaultBadge: 'VIP EN VESTE',
          badgeColor: 'bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200',
          borderColor: 'border-amber-400',
          accentIcon: 'person',
        };
    }
  };

  const config = getActorConfig();

  if (compact) {
    return (
      <div className={`flex items-center gap-2 p-2 rounded-lg bg-surface-container-low dark:bg-zinc-800 border ${config.borderColor} ${className}`}>
        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-surface-container flex-shrink-0">
          <Image
            src={config.avatarSrc}
            alt={config.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-xs text-on-surface dark:text-zinc-100 truncate">
            {config.name}
          </span>
          <span className="text-[10px] text-on-surface-variant dark:text-zinc-400 truncate">
            {badge || config.defaultBadge}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-surface-container-lowest dark:bg-zinc-900 rounded-xl p-4 border ${config.borderColor} shadow-sm flex flex-col gap-3 ${className}`}>
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <div className="relative w-14 h-14 rounded-full overflow-hidden bg-surface-container border-2 border-outline-variant/30 flex-shrink-0 shadow-xs">
          <Image
            src={config.avatarSrc}
            alt={config.name}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">
            <span className="material-symbols-outlined text-[10px]">{config.accentIcon}</span>
          </div>
        </div>

        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1">
            <span className="font-headline-md text-sm sm:text-base font-bold text-on-surface dark:text-zinc-100 truncate">
              {config.name}
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${config.badgeColor}`}>
              {badge || config.defaultBadge}
            </span>
          </div>
          <span className="text-xs text-on-surface-variant dark:text-zinc-400">
            {config.role}
          </span>
        </div>
      </div>

      {/* Dialogue bubble if present */}
      {dialogue && (
        <div className="relative p-2.5 rounded-lg bg-surface-container-low dark:bg-zinc-800/70 border border-outline-variant/20 text-xs text-on-surface dark:text-zinc-200 leading-snug font-mono">
          <div className="flex items-start gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-primary flex-shrink-0 mt-0.5">
              chat_bubble
            </span>
            <p className="italic">« {dialogue} »</p>
          </div>
        </div>
      )}
    </div>
  );
};
