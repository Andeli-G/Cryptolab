'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cryptolab_theme');
      if (stored === 'dark') {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      } else {
        setIsDark(false);
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('cryptolab_theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('cryptolab_theme', 'dark');
      setIsDark(true);
    }
  };

  const navLinks = [
    { href: '/', label: 'Accueil', icon: 'dashboard' },
    { href: '/documentation', label: 'Documentation', icon: 'menu_book' },
    { href: '/laboratory', label: 'Laboratoire', icon: 'science' },
    { href: '/simulator', label: 'Simulateur d\'Attaque', icon: 'radar' },
    { href: '/authentification', label: 'Sécurité & Auth', icon: 'verified_user' },
    { href: '/comparison', label: 'Comparateur', icon: 'compare_arrows' },
    { href: '/about', label: 'À Propos', icon: 'info' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Desktop & Mobile Header Bar */}
      <header className="fixed top-0 w-full z-50 pt-safe bg-surface/90 dark:bg-zinc-900/90 backdrop-blur-xl border-b border-outline-variant/30 dark:border-zinc-800 shadow-[0_1px_8px_rgba(0,0,0,0.03)] transition-colors">
        <div className="max-w-7xl mx-auto h-14 px-4 sm:px-6 flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white shadow-sm group-hover:bg-primary-hover transition-colors">
              <span className="material-symbols-outlined text-[18px]">lock</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-md text-headline-md tracking-tight text-on-surface dark:text-zinc-100 leading-none">
                  CryptoLab
                </span>
                <span className="px-1.5 py-0.2 rounded bg-primary-fixed dark:bg-primary-container/30 text-on-primary-fixed dark:text-primary-fixed text-[10px] font-mono font-semibold uppercase">
                  ENSPY 3GI
                </span>
              </div>
              <span className="font-label-sm text-[10px] text-on-surface-variant dark:text-zinc-400 uppercase tracking-wider">
                Laboratoire d'Authentification
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-primary-container text-white shadow-xs font-semibold'
                      : 'text-on-surface-variant dark:text-zinc-300 hover:text-on-surface dark:hover:text-white hover:bg-surface-container-low dark:hover:bg-zinc-800'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-1.5">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high dark:bg-zinc-800 text-tertiary">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
              <span className="font-label-sm text-[11px] font-medium text-on-surface dark:text-zinc-200">
                W3C WebCrypto Native
              </span>
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Basculer le thème clair/sombre"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant dark:text-zinc-300 hover:bg-surface-container dark:hover:bg-zinc-800 transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Mobile Hamburger Drawer Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu principal"
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant dark:text-zinc-300 hover:bg-surface-container dark:hover:bg-zinc-800 transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu for Extra Pages */}
        {isMobileMenuOpen && (
          <div className="lg:hidden px-4 py-3 bg-surface-container-lowest dark:bg-zinc-900 border-b border-outline-variant/30 dark:border-zinc-800 flex flex-col gap-1 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2.5 ${
                  isActive(link.href)
                    ? 'bg-primary-container text-white font-semibold'
                    : 'text-on-surface dark:text-zinc-200 hover:bg-surface-container dark:hover:bg-zinc-800'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Fixed Bottom Navigation for Mobile (Styled exactly after the UI/UX Mockup) */}
      <nav className="lg:hidden fixed bottom-0 w-full z-50 pb-safe bg-surface/95 dark:bg-zinc-900/95 backdrop-blur-xl border-t border-outline-variant/30 dark:border-zinc-800 shadow-[0_-1px_10px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-around h-16 px-1">
          <Link
            href="/"
            className={`flex flex-col items-center justify-center w-16 h-12 transition-colors ${
              isActive('/')
                ? 'text-primary-container dark:text-primary-fixed font-semibold relative after:content-[""] after:w-1 after:h-1 after:bg-primary-container dark:after:bg-primary-fixed after:rounded-full after:mt-0.5'
                : 'text-on-surface-variant dark:text-zinc-400 hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">dashboard</span>
            <span className="font-label-sm text-[10px]">Tableau</span>
          </Link>

          <Link
            href="/simulator"
            className={`flex flex-col items-center justify-center w-16 h-12 transition-colors ${
              isActive('/simulator')
                ? 'text-primary-container dark:text-primary-fixed font-semibold relative after:content-[""] after:w-1 after:h-1 after:bg-primary-container dark:after:bg-primary-fixed after:rounded-full after:mt-0.5'
                : 'text-on-surface-variant dark:text-zinc-400 hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">radar</span>
            <span className="font-label-sm text-[10px]">Simulateur</span>
          </Link>

          <Link
            href="/authentification"
            className={`flex flex-col items-center justify-center w-16 h-12 transition-colors ${
              isActive('/authentification')
                ? 'text-primary-container dark:text-primary-fixed font-semibold relative after:content-[""] after:w-1 after:h-1 after:bg-primary-container dark:after:bg-primary-fixed after:rounded-full after:mt-0.5'
                : 'text-on-surface-variant dark:text-zinc-400 hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">verified_user</span>
            <span className="font-label-sm text-[10px]">Sécurité</span>
          </Link>

          <Link
            href="/laboratory"
            className={`flex flex-col items-center justify-center w-16 h-12 transition-colors ${
              isActive('/laboratory')
                ? 'text-primary-container dark:text-primary-fixed font-semibold relative after:content-[""] after:w-1 after:h-1 after:bg-primary-container dark:after:bg-primary-fixed after:rounded-full after:mt-0.5'
                : 'text-on-surface-variant dark:text-zinc-400 hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">science</span>
            <span className="font-label-sm text-[10px]">Labo</span>
          </Link>

          <Link
            href="/documentation"
            className={`flex flex-col items-center justify-center w-16 h-12 transition-colors ${
              isActive('/documentation') || isActive('/comparison') || isActive('/about')
                ? 'text-primary-container dark:text-primary-fixed font-semibold relative after:content-[""] after:w-1 after:h-1 after:bg-primary-container dark:after:bg-primary-fixed after:rounded-full after:mt-0.5'
                : 'text-on-surface-variant dark:text-zinc-400 hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">menu_book</span>
            <span className="font-label-sm text-[10px]">Doc</span>
          </Link>
        </div>
      </nav>
    </>
  );
};
