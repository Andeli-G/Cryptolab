# FICHIER DE SUIVI DES INFORMATIONS COMPLÉMENTAIRES (DOCUMENTATION GAPS)
## Application Web CryptoLab // ENSPY 3GI — Groupe 23

Conformément à la règle fondamentale n° 3 de l'Addendum au Cahier des Charges, ce document consigne toute information technique requise pour l'implémentation logicielle mais non détaillée textuellement dans le rapport universitaire de référence (*Hachage : MAC, HMAC et dérivation des clés*, Groupe 23, 7 novembre 2026).

---

### GAP-01 : Spécification interne des tours AES-128 pour CBC-MAC
- **Information recherchée :** Décomposition interne des tours de chiffrement AES-128 (SubBytes, ShiftRows, MixColumns, AddRoundKey).
- **Fonctionnalité concernée :** Module 3 (Laboratoire de calcul cryptographique — Visualisation CBC-MAC).
- **Partie du rapport consultée :** Chapitre 2 (Section 2.6, p. 11) et Chapitre 4 (Section 4.4.1, pp. 25–26).
- **Raison de l'insuffisance :** Le rapport traite du niveau protocolaire d'authentification des messages ($C_0 = 0, C_i = E_k(C_{i-1} \oplus M_i), t = C_n$) et utilise $E_k$ comme une primitive de chiffrement par blocs boîte noire (blocs de 16 octets pour AES). Il ne détaille pas la micro-architecture interne d'AES (FIPS 197) pour ne pas s'éloigner du sujet du hachage et des MAC.
- **Solution technique proposée :** 
  1. L'application implémente fidèlement le chaînage CBC-MAC en blocs de 16 octets conformément à la section 4.4.1 du rapport.
  2. Le laboratoire détaille : le découpage en blocs de 128 bits, le vecteur initial $C_0=0$, l'opération XOR bit-à-bit et octet-par-octet $(C_{i-1} \oplus M_i)$, l'application du chiffrement $E_k$, le chaînage successif et l'extraction du tag final $t = C_n$.
  3. L'algorithme $E_k$ exécute un AES-128 cryptographiquement conforme, sans inventer de théorie supplémentaire non présente dans le rapport.
- **Statut de validation :** Validé (Conforme au niveau d'abstraction du rapport).

---

### GAP-02 : Micro-étapes internes de la fonction de hachage MD4
- **Information recherchée :** Déroulement pas-à-pas des 3 tours de compression internes de MD4 (opérations F, G, H, constantes et rotations).
- **Fonctionnalité concernée :** Module 3 (Calcul de HMAC-MD4) et Module 6 (Comparateur).
- **Partie du rapport consultée :** Chapitre 3 (Section 3.5.1, p. 20) et Chapitre 5 (Section 5.2, p. 30).
- **Raison de l'insuffisance :** Le rapport mentionne la création de MD4 par Ronald Rivest en 1990 et sa rupture par Wang en 2004, mais ne contient pas la spécification détaillée des fonctions booléennes de MD4.
- **Solution technique proposée :**
  1. Implémenter l'algorithme de hachage MD4 standard (RFC 1320) pour le calcul cryptographique effectif.
  2. Exposer dans le laboratoire les étapes de construction du HMAC prescrites par le rapport (Section 5.2 & 5.3) : normalisation de la clé $K'$, XOR avec ipad `0x36`, hachage interne $h_{int}$, XOR avec opad `0x5C`, et hachage externe du tag final.
- **Statut de validation :** Validé (Calcul exact, exposition rigoureuse du cadre HMAC).

---

### GAP-03 : Paramètres probabilistes de la simulation narrative d'interception
- **Information recherchée :** Origine mathématique des pourcentages de réussite de l'espion dans la simulation narrative (MAC Naïf : 65 %, CBC-MAC : 35 %, HMAC-MD4 : 25 %, HMAC-MD5 : 15 %, HMAC-SHA-1 : 8 %, HMAC-SHA-256 : 1 %, HMAC-SHA-512 : 0,5 %).
- **Fonctionnalité concernée :** Module 5 (Simulateur d'authentification).
- **Partie du rapport consultée :** Chapitre 3 (Section 3.3, pp. 15–16), Chapitre 4 (Section 4.3, p. 25), Chapitre 7 (Section 7.1, pp. 41–42).
- **Raison de l'insuffisance :** Le rapport traite des complexités théoriques rigoureuses ($2^{|k|}, 2^{-\tau}, 2^{n/2}$, etc.). Il ne définit pas de probabilités empiriques de jeu en pourcentages fixes, car les cassages réels dépendent des ressources de calcul et de la taille de clé.
- **Solution technique proposée :**
  1. Respecter scrupuleusement la consigne du Cahier des charges et l'Addendum (Règle 8) : ces pourcentages sont explicitement labellisés dans l'interface comme des **« Paramètres pédagogiques de démonstration »** et non comme des mesures scientifiques issues du rapport.
  2. Le moteur probabiliste est strictement découplé du moteur de vérification cryptographique : un message altéré ($m \neq m'$) avec tag non recalculé est **systématiquement rejeté à 100%** par le vérificateur cryptographique réel ($MAC_k(m) \neq t$).
  3. L'aléa probabiliste n'intervient que dans le scénario narratif scénarisé où l'on simule si l'espion parvient à forger un tag par ruse pédagogique.
- **Statut de validation :** Validé (Explicitation rigoureuse de la nature pédagogique).

---

### GAP-04 : Remplissage (Padding) de CBC-MAC sur messages de longueur non multiple de 16 octets
- **Information recherchée :** Règle de bourrage standard pour messages de taille arbitraire dans CBC-MAC.
- **Fonctionnalité concernée :** Module 3 (Laboratoire de calcul CBC-MAC).
- **Partie du rapport consultée :** Chapitre 4 (Section 4.4.1, pp. 25–26).
- **Raison de l'insuffisance :** Le rapport indique précisément que « CBC-MAC est sûr lorsque tous les messages ont la même longueur fixe. Il devient falsifiable pour des messages de longueur variable » et cite les correctifs (préfixage de longueur, ECBC-MAC, CMAC NIST SP 800-38B). Il ne fixe pas une norme unique de bourrage pour la démonstration de base.
- **Solution technique proposée :** Proposer le padding ISO/IEC 7816-4 / PKCS#7 standard (ou zéro-padding avec indication de taille) avec sélecteur clair dans les paramètres d'entrée de CBC-MAC, tout en rappelant la mise en garde de la section 4.4.1 du rapport sur la vulnérabilité intrinsèque de CBC-MAC aux longueurs variables.
- **Statut de validation :** Validé.
