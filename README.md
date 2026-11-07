# CryptoLab — Message Authentication Laboratory
### Application web pédagogique de calcul et de simulation des mécanismes d'authentification des messages

**Cadre académique :** Unité d'enseignement *Cryptographie et systèmes d'information*  
**Institution :** École Nationale Supérieure Polytechnique de Yaoundé (ENSPY 3GI)  
**Auteurs du rapport de référence :** Groupe 23 (AKAMBA Ghislaine Lucie, BEKIMA WANDJI Rodrigue Hazael, DJUISSI BOUMI Myriam, MANGASSO MINGA Hamdi, MO-TSANGA Olive Zita)  
**Date :** 7 novembre 2026  

---

## 1. Présentation du Projet

**CryptoLab** est une application web interactive et instrumentée permettant d'étudier, de calculer et de visualiser le fonctionnement interne des mécanismes d'authentification des messages (**MAC, CBC-MAC, HMAC**) et de dérivation de clés (**HKDF**), tout en illustrant leurs propriétés face aux attaques d'interception sur un canal non sécurisé.

### Règle d'or de fidélité scientifique
Conformément à l'Addendum au Cahier des Charges, **le rapport universitaire de référence constitue l'unique source de vérité**. Aucune définition, formule ou propriété mathématique n'a été inventée. L'application assure une traçabilité documentaire rigoureuse vers chaque section et numéro de page du document source (voir [`SOURCE_MAPPING.md`](./SOURCE_MAPPING.md) et [`DOCUMENTATION_GAPS.md`](./DOCUMENTATION_GAPS.md)).

---

## 2. Architecture Fonctionnelle & Modules

L'application est organisée autour de six modules principaux :

| Module | Route | Fonctionnalités Clés |
|---|---|---|
| **Module 1 : Accueil** | `/` | Phrase d'accroche pédagogique, cartes *Comprendre*, *Expérimenter* et *Simuler*, playground interactif d'effet avalanche en temps réel, télémétrie système. |
| **Module 2 : Documentation** | `/documentation` | 8 parties intégrales (Historique 1970–2026, Définitions, Fonctions de hachage, Le MAC, Le HMAC, Dérivation des clés, Problèmes & Attaques, Conclusion & 26 Références bibliographiques), formules KaTeX, table des matières latérale et citations de source. |
| **Module 3 : Laboratoire** | `/laboratory` | Moteur cryptographique calculant en temps réel sur les saisies utilisateur. 3 modes d'affichage : Global, Octet par octet (avec inspecteur 16 colonnes), et Bit par bit (opérations OU exclusif). Primitives : MAC Naïf $H(k\parallel m)$ et $H(m\parallel k)$, CBC-MAC AES-128, HMAC (MD4, MD5, SHA-1, SHA-256, SHA-512) et espace dédié HKDF (Extract & Expand). Export TXT et rapport imprimable. |
| **Module 4 : Simulateur d'Attaque** | `/simulator` | Scénario narratif en 6 scènes sans authentification mettant en scène l'Agent A, l'Agent B, The Spy et Bill. Interception et altération du message `SAVE BILL` en `KILL BILL`. Conséquence cinématographique suggestive (veste abandonnée au sol) et bilan pédagogique. |
| **Module 5 : Simulateur d'Auth** | `/authentification` | Même scénario avec tag MAC/HMAC attaché. Détection et rejet 403 immédiat. Modèle probabiliste pédagogique de démonstration paramétrable avec statistiques multi-simulations (100 tirages). Option avancée de dérivation de clé préalable par HKDF. |
| **Module 6 : Comparateur** | `/comparison` | Tableau comparatif exhaustif des primitives (tailles de blocs, tags, bits de collision, statuts, failles, usages). Banc de mesure de l'effet avalanche (SAC) et micro-benchmark de latence en temps réel. Avertissement formel : ne pas confondre rapidité et sécurité cryptographique. |
| **À Propos & Crédits** | `/about` | Crédits officiels des membres du Groupe 23 ENSPY 3GI, engagement de zéro fuite serveur (calculs 100% locaux) et traçabilité documentaire. |

---

## 3. Technologies Utilisées

- **Framework :** [Next.js](https://nextjs.org/) 14 (App Router, Server & Client Components)
- **Langage :** [TypeScript](https://www.typescriptlang.org/) (Typage strict de bout en bout)
- **Style & UI :** [Tailwind CSS](https://tailwindcss.com/) fondé sur le système de design *Mode Jour / Mode Sombre* (Minimalisme suisse et console d'instrumentation)
- **Moteur Cryptographique :** Primitives conformes aux standards officiels (FIPS 180-2, FIPS 198-1, NIST SP 800-38B, RFC 2104, RFC 5869, RFC 1320), WebCrypto native et bibliothèques `@noble/hashes` et `@noble/ciphers` (sans dépendances externes lourdes).
- **Rendu Mathématique :** [KaTeX](https://katex.org/) pour la fidélité des équations LaTeX.
- **Typographies :** *Space Grotesk* (titres structurés), *Geist* (corps de texte) et *JetBrains Mono* (télémétrie, clés et registres hexadécimaux).

---

## 4. Installation & Lancement

### Prérequis
- [Node.js](https://nodejs.org/) version 18.18+ ou 20+ ou 22+
- `npm` (v9 ou supérieur)

### Installation des dépendances
```bash
npm install
```

### Lancement du serveur de développement
```bash
npm run dev
```
Ouvrez votre navigateur sur [http://localhost:3000](http://localhost:3000).

### Exécution des tests cryptographiques (Vecteurs officiels)
```bash
npm test
```
Cette commande exécute la suite de tests validant la conformité des calculs avec les vecteurs de test du rapport :
- **RFC 4231 (Cas 2 - Clé "Jefe") :** HMAC-SHA256 (Rapport p. 33)
- **RFC 4231 (Cas 1 - "Hi There") :** HMAC-SHA256
- **RFC 5869 (Cas 1) :** HKDF-Extract & Expand SHA-256 (Rapport p. 38)
- **MAC Naïf :** Validation de l'empreinte concaténée
- **CBC-MAC AES-128 :** Validation du chaînage des blocs de 16 octets
- **Comparaison en temps constant :** Validation de la neutralisation des attaques temporelles (Rapport p. 44)

### Compilation pour la production & Déploiement
```bash
npm run build
npm start
```

---

## 5. Exigences de Sécurité & Confidentialité

- **Zero Cloud Leak :** Aucune clé secrète, aucun message ni aucune donnée saisie n'est transmis à un serveur distant.
- **Temps Constant :** L'authentification utilise une fonction de comparaison en temps constant (`timingSafeEqual`) pour prévenir les attaques par canaux auxiliaires décrites à la section 7.4 du rapport.
- **Découplage Pédagogique :** Le modèle probabiliste de démonstration (pourcentages de l'espion) est strictement séparé du vérificateur cryptographique réel, garantissant qu'un message modifié sans recalcul de clé est toujours rejeté à 100%.

---

## 6. Fichiers de Traçabilité Documentaire

1. [`SOURCE_MAPPING.md`](./SOURCE_MAPPING.md) : Correspondance exhaustive entre chaque section/notion de l'application et les pages du rapport de recherche.
2. [`DOCUMENTATION_GAPS.md`](./DOCUMENTATION_GAPS.md) : Suivi des précisions techniques d'implémentation (AES-128 FIPS 197, MD4 RFC 1320, paramètres de simulation).
