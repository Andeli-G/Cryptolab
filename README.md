# CryptoLab — Message Authentication Laboratory

### Application web pédagogique de calcul et de simulation des mécanismes d'authentification des messages

**Cadre académique :** Unité d'enseignement *Cryptographie et systèmes d'information*  
**Institution :** École Nationale Supérieure Polytechnique de Yaoundé (ENSPY 3GI)  
**Auteurs du rapport de référence :** Groupe 23 — AKAMBA Ghislaine Lucie, BEKIMA WANDJI Rodrigue Hazael, DJUISSI BOUMI Myriam, MANGASSO MINGA Hamdi, MO-TSANGA Olive Zita  
**Date :** 7 novembre 2026

---

## 1. Présentation du projet

**CryptoLab** est une application web interactive permettant d'étudier, de calculer et de visualiser le fonctionnement interne des mécanismes d'authentification des messages (**MAC, CBC-MAC, HMAC**) et de dérivation de clés (**HKDF**).

L'application permet également d'illustrer les propriétés de ces mécanismes à travers des scénarios d'interception et de modification de messages sur un canal de communication non sécurisé.

### Règle fondamentale de fidélité scientifique

Conformément à l'addendum au cahier des charges, **le rapport universitaire de référence constitue l'unique source de vérité scientifique**.

Aucune définition, formule ou propriété mathématique ne doit être inventée ou ajoutée sans justification documentaire. L'application assure une traçabilité vers les sections et les pages correspondantes du document source.

Les fichiers suivants permettent de suivre cette correspondance :

- `SOURCE_MAPPING.md` : correspondance entre les notions de l'application et les pages du rapport.
- `DOCUMENTATION_GAPS.md` : suivi des précisions techniques et des éventuels écarts documentaires.

---

## 2. Architecture fonctionnelle et modules

L'application comprend six modules fonctionnels principaux ainsi qu'une page de présentation.

| Module | Route | Fonctionnalités principales |
|---|---|---|
| **Accueil** | `/` | Présentation pédagogique, cartes « Comprendre », « Expérimenter » et « Simuler », démonstration interactive de l'effet avalanche et télémétrie système. |
| **Documentation** | `/documentation` | Huit parties consacrées à l'historique, aux définitions, aux fonctions de hachage, au MAC, au HMAC, à la dérivation des clés, aux problèmes et attaques, puis à la conclusion et aux références bibliographiques. Formules KaTeX, table des matières et citations des sources. |
| **Laboratoire** | `/laboratory` | Calcul cryptographique à partir des saisies utilisateur. Trois modes d'affichage : global, octet par octet (inspecteur sur 16 colonnes) et bit par bit (opérations OU exclusif). Primitives : MAC naïf `H(k || m)` et `H(m || k)`, CBC-MAC AES-128, HMAC (MD4, MD5, SHA-1, SHA-256, SHA-512) et HKDF (Extract & Expand). Export TXT et rapport imprimable. |
| **Simulateur d'attaque** | `/simulator` | Scénario narratif en six scènes sans authentification, mettant en scène l'Agent A, l'Agent B, The Spy et Bill. Interception et altération du message `SAVE BILL` en `KILL BILL`, suivies d'un bilan pédagogique. |
| **Simulateur d'authentification** | `/authentification` | Reprise du scénario avec un tag MAC/HMAC attaché au message. Détection et rejet de la modification (réponse 403). Modèle probabiliste pédagogique paramétrable, statistiques sur plusieurs simulations (100 tirages) et possibilité de dériver préalablement une clé avec HKDF. |
| **Comparateur** | `/comparison` | Tableau comparatif des primitives : tailles de blocs, tailles de tags, bits de collision, statuts, failles et usages. Banc de mesure de l'effet avalanche (SAC) et micro-benchmark de latence en temps réel. Avertissement pédagogique : la rapidité ne doit pas être confondue avec la sécurité cryptographique. |
| **À propos et crédits** | `/about` | Présentation des membres du Groupe 23 ENSPY 3GI, engagement relatif à la confidentialité des données et traçabilité documentaire. |

---

## 3. Technologies utilisées

- **Framework :** [Next.js](https://nextjs.org/) 14 — App Router, Server Components et Client Components.
- **Langage :** [TypeScript](https://www.typescriptlang.org/) — typage strict.
- **Style et interface :** [Tailwind CSS](https://tailwindcss.com/) — système de design avec mode clair et mode sombre.
- **Moteur cryptographique :** WebCrypto native et bibliothèques `@noble/hashes` et `@noble/ciphers`.
- **Rendu mathématique :** [KaTeX](https://katex.org/) pour l'affichage des équations mathématiques.
- **Typographies :** Space Grotesk pour les titres, Geist pour le corps du texte et JetBrains Mono pour les clés, registres et données hexadécimales.

Les standards et documents techniques associés aux primitives comprennent notamment FIPS 180-2, FIPS 198-1, NIST SP 800-38B, RFC 2104, RFC 5869 et RFC 1320.

---

## 4. Installation et lancement

### Prérequis

- [Node.js](https://nodejs.org/) : version 18.18 ou supérieure.
- npm : version 9 ou supérieure.

### Installation des dépendances

```bash
npm install
```

### Lancement du serveur de développement

```bash
npm run dev
```

Ouvrir ensuite le navigateur à l'adresse :

```text
http://localhost:3000
```

### Exécution des tests cryptographiques

```bash
npm test
```

La suite de tests comprend notamment les validations suivantes :

- **RFC 4231 — Cas 2 (« Jefe ») :** HMAC-SHA256 (rapport, page 33).
- **RFC 4231 — Cas 1 (« Hi There ») :** HMAC-SHA256.
- **RFC 5869 — Cas 1 :** HKDF-Extract et HKDF-Expand avec SHA-256 (rapport, page 38).
- **MAC naïf :** validation de l'empreinte par concaténation.
- **CBC-MAC AES-128 :** validation du chaînage des blocs de 16 octets.
- **Comparaison en temps constant :** validation de la comparaison des tags (rapport, page 44).

### Compilation et lancement en production

```bash
npm run build
npm start
```

---

## 5. Exigences de sécurité et confidentialité

### Confidentialité des données

**Zero Cloud Leak :** aucune clé secrète, aucun message ni aucune donnée saisie par l'utilisateur ne doit être transmis à un serveur distant dans le cadre des calculs cryptographiques locaux.

### Comparaison en temps constant

L'authentification utilise une fonction de comparaison en temps constant (`timingSafeEqual`) afin de limiter les risques d'attaques temporelles décrites dans le rapport.

### Séparation entre démonstration et vérification cryptographique

Le modèle probabiliste de démonstration, qui représente les probabilités de réussite de l'espion, est séparé du vérificateur cryptographique réel.

Ainsi, dans le scénario prévu, un message modifié sans recalcul valide du tag à l'aide de la clé secrète doit être rejeté.

---

## 6. Fichiers de traçabilité documentaire

Deux fichiers accompagnent le projet afin de garantir la cohérence entre le contenu pédagogique et le rapport universitaire :

1. **`SOURCE_MAPPING.md`** : correspondance entre les sections, les notions et les fonctionnalités de l'application et les pages du rapport de recherche.
2. **`DOCUMENTATION_GAPS.md`** : suivi des précisions techniques d'implémentation, notamment AES-128 (FIPS 197), MD4 (RFC 1320) et les paramètres de simulation.