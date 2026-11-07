# TABLE DE CORRESPONDANCE DOCUMENTAIRE (SOURCE MAPPING)
## Application Web CryptoLab // Rapport de Recherche ENSPY 3GI

**Document de référence :** *Hachage : MAC, HMAC et dérivation des clés*, Groupe 23, ENSPY 3GI, 7 novembre 2026.
**Auteurs :** AKAMBA Ghislaine Lucie, BEKIMA WANDJI Rodrigue Hazael, DJUISSI BOUMI Myriam, MANGASSO MINGA Hamdi, MO-TSANGA Olive Zita.

---

### Correspondance globale des Modules de l'Application

| Module de l'Application | Notions & Fonctionnalités | Section du Rapport | Pages du PDF |
|---|---|---|---|
| **Module 1 : Accueil & Présentation** | - Accroche et problématique d'intégrité / authenticité<br>- Pôles Comprendre, Expérimenter, Simuler<br>- Présentation de la triade opérationnelle (Agent A, Agent B, The Spy, Bill) | - Introduction<br>- Section 1.1<br>- Section 1.2<br>- Section 2.1 | pp. 5, 6, 9 |
| **Module 2 : Documentation** | **Partie 1 :** Historique et avancées technologiques (1970–2026, DES, HMAC, CMAC, SHA-3, KMAC, SP 800-224)<br>**Partie 2 :** Définitions et généralités (Message, Clé, Symétrique, Propriétés de sécurité, Tableau comparatif, Dérivation)<br>**Partie 3 :** Fonctions de hachage (Propriétés, Paradoxe anniversaires, Démonstrations de complexité $2^n$ et $2^{n/2}$, Merkle-Damgård vs Éponge Keccak, Évolution MD4/MD5/SHA-1/SHA-2/SHA-3/BLAKE, Attaques et parade)<br>**Partie 4 :** Le MAC (Définition formelle Gen/Tag/Vrfy, EUF-CMA, CBC-MAC, CMAC, Constructions naïves $H(k\parallel m)$, $H(m\parallel k)$, double hachage, troncature, réutilisation)<br>**Partie 5 :** Le HMAC (Bellare/Canetti/Krawczyk, RFC 2104, formule $K'$, ipad `0x36`, opad `0x5C`, deux passes, preuve Bellare 2006, vecteur de test RFC 4231 "Jefe", applications)<br>**Partie 6 :** Dérivation des clés (KDF, IKM, sel, info, OKM, haute entropie vs faible entropie, HKDF-Extract/Expand RFC 5869, PBKDF2, bcrypt, scrypt, Argon2, OWASP)<br>**Partie 7 :** Problèmes, limites et attaques (Panorama contrefaçon, Anniversaire sur MAC itérés, Extension de longueur, Canaux auxiliaires & timingSafeEqual, Rejeu & nonces, Gestion des clés, Menaces quantiques Shor/Grover)<br>**Partie 8 :** Conclusion & 26 Références bibliographiques | - Chapitre 1<br>- Chapitre 2<br>- Chapitre 3<br>- Chapitre 4<br>- Chapitre 5<br>- Chapitre 6<br>- Chapitre 7<br>- Conclusion & Références | pp. 5–8<br>pp. 9–12<br>pp. 13–24<br>pp. 24–29<br>pp. 29–34<br>pp. 34–41<br>pp. 41–46<br>pp. 46–48 |
| **Module 3 : Laboratoire de Calcul** | - Mode Pas-à-Pas, Global, Octet par octet, Bit par bit<br>- MAC Naïf $H(k\parallel m)$ et $H(m\parallel k)$<br>- CBC-MAC (fondé sur AES-128, $C_0=0, C_i=E_k(C_{i-1}\oplus M_i)$)<br>- HMAC (MD4, MD5, SHA-1, SHA-256, SHA-512) avec calcul K', ipad `0x36`, opad `0x5C`, passe interne $h_{int}$, passe externe<br>- Espace distinct HKDF (Extract $PRK = HMAC(salt, IKM)$, Expand $T(i) = HMAC(PRK, T(i-1)\parallel info \parallel i)$)<br>- Vecteur test certifié RFC 4231 ("Jefe") et RFC 5869 | - Section 4.4.1 (CBC-MAC)<br>- Section 4.5.1 & 4.5.2 (Naïf)<br>- Section 5.2 & 5.3 (HMAC formule & 2 passes)<br>- Section 5.7 (Vecteur Jefe)<br>- Section 6.3 (HKDF)<br>- Section 6.3.3 (Vecteur RFC 5869) | pp. 25–26<br>pp. 26–27<br>pp. 30–31<br>p. 33<br>pp. 36–38<br>p. 38 |
| **Module 4 : Simulateur d'Attaque (Sans Authentification)** | - Scénario narratif : Agent A ("SAVE BILL"), Canal non sécurisé, Interception par The Spy, Modification en "KILL BILL", Réception crédule par Agent B, Perte suggestive de Bill (veste au sol, fondu au noir), Bilan pédagogique | - Introduction (Canal non sécurisé)<br>- Section 1.1 (Causes de création des MAC)<br>- Section 3.8 (Limites du hachage seul, Mallory intercepte et remplace) | p. 5<br>p. 5<br>p. 24 |
| **Module 5 : Simulateur d'Authentification (Avec Authentification)** | - Scénario narratif avec MAC sélectionné<br>- Transmission simultanée du message et du tag $(m, t)$<br>- Tentative d'altération en "KILL BILL"<br>- Cas A : Échec de l'espion, tag recalculé invalide, rejet 403, Bill sauvé<br>- Cas B : Modèle probabiliste pédagogique de démonstration (paramètres explicites fictifs)<br>- Moteur de vérification cryptographique réelle rigoureusement découplé du tirage aléatoire<br>- Option avancée HKDF pour dériver la clé avant authentification | - Section 2.4 (Algorithmes Gen, Tag, Vrfy)<br>- Section 4.2 & 4.3 (EUF-CMA)<br>- Section 5.3 & 5.4 (Neutralisation altération)<br>- Section 7.1 (Panorama contrefaçon)<br>- Section 7.4 (Comparaison temps constant) | p. 10<br>p. 25<br>pp. 30–31<br>p. 41<br>pp. 43–44 |
| **Module 6 : Comparateur & Analyse** | - Tableau comparatif des primitives (Type, primitive sous-jacente, taille bloc, taille tag, sécurité, avantages, limites)<br>- Graphiques de comparaison (SAC effet d'avalanche, benchmark latence, bits de sécurité contre les collisions)<br>- Avertissement explicite sur la distinction entre latence et sécurité cryptographique | - Section 1.5 (Frise)<br>- Section 2.7 (Tableau comparatif)<br>- Section 3.1.2 (Effet d'avalanche)<br>- Section 3.3.3 (Tableau complexités)<br>- Section 3.4.3 (MD vs Keccak)<br>- Section 4.5 (Faiblesses constructions)<br>- Section 6.4.3 (Comparaison KDF mots de passe) | p. 8<br>p. 11<br>p. 13<br>p. 16<br>p. 19<br>p. 29<br>p. 39 |
| **Page À Propos / Crédits** | - Présentation académique du Groupe 23 ENSPY 3GI<br>- Fiche technique des rôles (Agent A, Agent B, The Spy, Bill)<br>- Engagement de rigueur mathématique et zéro fuite serveur (calculs 100% locaux) | - Page de garde du rapport<br>- Section 2.1 & 2.2<br>- Exigences de sécurité | p. 1<br>p. 9 |

---

### Correspondance Détaillée des Formules Mathématiques du Rapport

| Formule | Signification | Emplacement dans le Rapport | Page PDF |
|---|---|---|---|
| $H : \{0,1\}^* \to \{0,1\}^n$ | Définition d'une fonction de hachage cryptographique | Section 2.3 & 3.1.1 | pp. 10, 13 |
| $t = MAC_k(m)$ | Définition formelle du tag MAC | Section 2.4 & 4.2 | pp. 10, 25 |
| $P \approx 1 - e^{-k^2/2^{n+1}}$ | Probabilité de collision (paradoxe des anniversaires) | Section 3.2 & 3.3.2 | pp. 14, 15 |
| $k \approx \sqrt{2 \ln 2 \cdot N} \approx 1,1774 \times 2^{n/2}$ | Seuil à 50% du paradoxe des anniversaires | Section 3.3.2 | p. 16 |
| $h_0 = IV, \quad h_i = f(h_{i-1}, m_i), \quad H(m) = h_k$ | Chaînage de Merkle–Damgård | Section 3.4.1 | p. 17 |
| $f(h, m) = E_m(h) \oplus h$ | Schéma de Davies–Meyer | Section 3.4.1 | p. 17 |
| $r + c = 1600$ | Paramètres de l'éponge Keccak (débit $r$, capacité $c$) | Section 3.4.2 | p. 18 |
| $C_0 = 0, \quad C_i = E_k(C_{i-1} \oplus M_i), \quad t = C_n$ | Construction standard CBC-MAC | Section 4.4.1 | p. 25 |
| $m'' = M_1 \parallel \dots \parallel M_n \parallel (M'_1 \oplus t) \parallel M'_2 \dots$ | Vulnérabilité de CBC-MAC sur longueurs variables | Section 4.4.1 | p. 26 |
| $MAC_{naïf}(k, m) = H(k \parallel m)$ | MAC préfixe naïf | Section 4.5.1 | p. 26 |
| $H(m) \mapsto H(m \parallel pad(m) \parallel m')$ | Attaque par extension de longueur | Section 3.6.4 & 4.5.1 & 7.3 | pp. 23, 26, 43 |
| $MAC_{suffixe}(m, k) = H(m \parallel k)$ | MAC suffixe naïf | Section 4.5.2 | p. 27 |
| $HMAC(k, m) = H((K' \oplus opad) \parallel H((K' \oplus ipad) \parallel m))$ | Formule canonique de HMAC | Section 4.5.6 & 5.2 | pp. 28, 30 |
| $PRK = HMAC(salt, IKM)$ | Étape 1 d'extraction HKDF | Section 6.3.1 | p. 36 |
| $T(0) = \epsilon, \quad T(i) = HMAC(PRK, T(i-1) \parallel info \parallel i)$ | Étape 2 d'expansion HKDF | Section 6.3.2 | p. 37 |
| $OKM = \text{premiers } L \text{ octets de } T(1) \parallel T(2) \dots$ | Clé finale dérivée HKDF | Section 6.3.2 | p. 37 |
| $U_1 = PRF(P, S \parallel i), \; U_j = PRF(P, U_{j-1}), \; T_i = \bigoplus U_j$ | Dérivation PBKDF2 | Section 6.4.2 | p. 38 |
| $t = MAC_k(c \parallel m), \quad c \in \{\text{compteur, nonce, horodatage}\}$ | Protection anti-rejeu | Section 7.5 | p. 44 |

---

Toutes les données textuelles, citations, formules et tableaux de l'application CryptoLab sont rigoureusement indexés sur cette source documentaire unique.
