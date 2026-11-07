import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../components/navigation/Navbar';

export const metadata: Metadata = {
  title: 'CryptoLab — Message Authentication Laboratory',
  description:
    'Application web pédagogique de calcul et de simulation des mécanismes d\'authentification des messages (MAC, CBC-MAC, HMAC, HKDF) // ENSPY 3GI Groupe 23',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </head>
      <body className="bg-surface dark:bg-zinc-950 font-sans text-on-surface dark:text-zinc-100 min-h-screen flex flex-col antialiased">
        <Navbar />

        <main className="flex-1 pt-14 pb-20 lg:pb-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
          {children}
        </main>

        {/* Academic Footer */}
        <footer className="border-t border-outline-variant/30 dark:border-zinc-800 bg-surface-container-low dark:bg-zinc-900 py-6 px-4 text-center text-xs text-on-surface-variant dark:text-zinc-400">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-col items-center sm:items-start text-left">
              <span className="font-semibold text-on-surface dark:text-zinc-200">
                CryptoLab — Message Authentication Laboratory
              </span>
              <span>
                Basé sur les travaux de recherche : <em>Hachage : MAC, HMAC et dérivation des clés</em> (ENSPY 3GI, Groupe 23, 7 nov. 2026)
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="px-2 py-0.5 rounded bg-surface-container dark:bg-zinc-800">
                Zero Cloud Leak (100% Local)
              </span>
              <span className="px-2 py-0.5 rounded bg-primary-fixed dark:bg-primary-container/40 text-on-primary-fixed dark:text-primary-fixed font-bold">
                RFC 2104 / 5869
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
