/**
 * Base documentaire intégrale de CryptoLab.
 * SOURCE UNIQUE ET OFFICIELLE : "Hachage : MAC, HMAC et dérivation des clés",
 * Groupe 23 — ENSPY 3GI, 7 novembre 2026.
 * (AKAMBA Ghislaine Lucie, BEKIMA WANDJI Rodrigue Hazael, DJUISSI BOUMI Myriam,
 * MANGASSO MINGA Hamdi, MO-TSANGA Olive Zita).
 *
 * RÈGLE ABSOLUE : Zéro invention documentaire. Toutes les définitions, formules,
 * tableaux, historiques et références proviennent exclusivement du rapport universitaire.
 */

export interface DocSection {
  id: string;
  title: string;
  pdfSection: string;
  pdfPage: number;
  content: string; // Markdown / LaTeX math
  keyPoints?: string[];
  formula?: string;
  formulaDesc?: string;
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface DocChapter {
  id: string;
  partNumber: number;
  title: string;
  pdfChapter: string;
  pdfPages: string;
  sections: DocSection[];
}

export const DOCUMENTATION_CHAPTERS: DocChapter[] = [
  {
    id: 'part-1',
    partNumber: 1,
    title: 'Historique et avancées technologiques',
    pdfChapter: 'Chapitre 1',
    pdfPages: 'pp. 5–8',
    sections: [
      {
        id: '1-1',
        title: 'Les causes de la création des MAC',
        pdfSection: 'Section 1.1',
        pdfPage: 5,
        content: `Les MAC (Message Authentication Codes), ou codes d'authentification de message, ont été créés pour répondre à un problème fondamental de la communication numérique : comment garantir qu'un message reçu est authentique et qu'il n'a pas été modifié pendant sa transmission ?

Les causes fondamentales identifiées sont :
- **La falsification des messages :** une personne malveillante pouvait modifier le contenu d'un message.
- **L'usurpation d'identité :** un pirate pouvait se faire passer pour l'expéditeur légitime.
- **La modification des données :** des informations pouvaient être altérées volontairement pendant leur transmission.
- **Le manque de confiance :** le destinataire ne pouvait pas toujours vérifier que le message provenait réellement de la personne avec laquelle il communiquait.`,
        keyPoints: [
          'Falsification des messages',
          'Usurpation d\'identité',
          'Modification des données',
          'Manque de confiance dans le canal',
        ],
      },
      {
        id: '1-2',
        title: 'Les solutions apportées par les MAC',
        pdfSection: 'Section 1.2',
        pdfPage: 6,
        content: `Les MAC ont été développés pour permettre à deux personnes partageant une même clé secrète de vérifier :
- **L'intégrité :** le message n'a pas été modifié.
- **L'authenticité :** le message a été produit par une personne connaissant la clé secrète.`,
      },
      {
        id: '1-3',
        title: 'Origine des MAC',
        pdfSection: 'Section 1.3',
        pdfPage: 6,
        content: `Au début des années 1970, les échanges électroniques commencent à se développer. Les banques et les institutions financières ont notamment besoin de sécuriser les transferts d'argent et les informations sensibles.

Les techniques d'authentification ne nécessitant pas de chiffrer le message sont déjà connues des chercheurs au début des années 1970. En 1977, Campbell propose d'utiliser l'algorithme DES (Data Encryption Standard) pour produire un code d'authentification.`,
      },
      {
        id: '1-4',
        title: 'Évolution technologique des MAC : de 1970 à 2026',
        pdfSection: 'Section 1.4',
        pdfPage: 6,
        content: `L'évolution technologique s'articule en cinq générations successives :

**1. Première génération : les MAC basés sur DES (1970–1990)**
- *Début des années 1970 :* des chercheurs étudient des mécanismes permettant de vérifier l'authenticité des messages grâce à des clés secrètes.
- *1977 :* publication du DES et développement de méthodes d'authentification reposant sur celui-ci.
- *1981 :* la norme bancaire ANSI X9.9 formalise l'utilisation des codes d'authentification dans les échanges financiers.
- *1985 :* le standard américain FIPS 113 (Computer Data Authentication) décrit un MAC fondé sur DES en mode CBC.
*Apport technologique :* les banques peuvent vérifier l'authenticité des messages et détecter les modifications frauduleuses des données.

**2. Deuxième génération : vers des mécanismes plus souples (années 1990)**
Avec l'évolution des réseaux informatiques, les besoins de sécurité deviennent plus importants. Les chercheurs cherchent à développer des mécanismes plus souples, plus efficaces et compatibles avec les fonctions de hachage. Une avancée majeure apparaît en 1996 avec la proposition du HMAC.

**3. Troisième génération : généralisation du HMAC (1996–2010)**
En 1996, Mihir Bellare, Ran Canetti et Hugo Krawczyk proposent la construction HMAC. En février 1997, le mécanisme est officiellement décrit dans la RFC 2104. Ses principales innovations sont :
- l'utilisation de fonctions de hachage cryptographiques ;
- l'association d'une clé secrète au calcul du code ;
- une meilleure souplesse d'utilisation avec différentes fonctions de hachage ;
- une construction conçue pour résister aux attaques visant les mécanismes d'authentification.
En 2002, HMAC est spécifié dans la norme FIPS 198, puis dans sa version révisée FIPS 198-1 en 2008. Cette période voit aussi apparaître les fonctions SHA-2 (HMAC-SHA-256, HMAC-SHA-512) ainsi que le CMAC (NIST SP 800-38B, 2005).

**4. Quatrième génération : diversification des algorithmes (2010–2020)**
- *SHA-3 :* normalisée en 2015 (FIPS 202), fondée sur KECCAK.
- *KMAC :* mécanisme d'authentification fondé sur KECCAK, défini dans la norme NIST SP 800-185 en décembre 2016 (KMAC128 et KMAC256, longueur variable).

**5. Cinquième génération : modernisation et sécurité avancée (2020–2026)**
- *HMAC avec SHA-3 :* HMAC utilisable avec SHA-3 en complément de SHA-2.
- *Renforcement des normes :* en juin 2024, publication du projet SP 800-224 par le NIST pour regrouper les spécifications de HMAC. En juin 2025, proposition de retrait de FIPS 198-1.
- *Adaptation en 2026 :* sécurisation des API, cloud, IoT, transactions bancaires.`,
      },
      {
        id: '1-5',
        title: 'Frise récapitulative des avancées (1977–2026)',
        pdfSection: 'Section 1.5',
        pdfPage: 8,
        content: `Tableau chronologique récapitulatif des jalons majeurs de l'authentification des messages tel que présenté dans le rapport du groupe 23 :`,
        table: {
          headers: ['Année', 'Avancée technologique', 'Apport'],
          rows: [
            ['1977', 'MAC basé sur le DES (proposition de Campbell)', 'Authentification des données'],
            ['1981', 'ANSI X9.9', 'Sécurisation des échanges bancaires'],
            ['1985', 'FIPS 113', 'Première normalisation d\'un MAC (DES en mode CBC)'],
            ['1996', 'Proposition du HMAC (Bellare, Canetti, Krawczyk)', 'Authentification basée sur le hachage'],
            ['1997', 'RFC 2104', 'Formalisation de HMAC'],
            ['2002', 'FIPS 198', 'Normalisation de HMAC'],
            ['2005', 'CMAC (SP 800-38B)', 'Authentification basée sur le chiffrement par blocs'],
            ['2008', 'FIPS 198-1', 'Révision de la norme HMAC'],
            ['2015', 'SHA-3 (FIPS 202)', 'Extension des fonctions utilisables avec HMAC'],
            ['2016', 'KMAC (SP 800-185)', 'Nouvelle génération basée sur KECCAK'],
            ['2024', 'Projet SP 800-224', 'Modernisation des recommandations HMAC'],
            ['2025', 'Proposition de retrait de FIPS 198-1', 'Transition vers une nouvelle publication'],
            ['2026', 'HMAC, CMAC, KMAC', 'Maintien et diversification des mécanismes approuvés'],
          ],
        },
      },
    ],
  },
  {
    id: 'part-2',
    partNumber: 2,
    title: 'Définitions et généralités',
    pdfChapter: 'Chapitre 2',
    pdfPages: 'pp. 9–12',
    sections: [
      {
        id: '2-1',
        title: 'Cadre et vocabulaire de base',
        pdfSection: 'Section 2.1',
        pdfPage: 9,
        content: `Définitions fondamentales du rapport :
- **Message :** Suite de bits $m \\in \\{0, 1\\}^*$ que l'expéditeur souhaite transmettre.
- **Clé secrète :** Valeur $k$ connue uniquement des parties légitimes, dont la confidentialité garantit la sécurité du mécanisme.
- **Cryptographie symétrique :** Famille de mécanismes où les deux parties utilisent la même clé secrète $k$. Les MAC, le HMAC et le CMAC en font partie. Elle s'oppose à la cryptographie asymétrique, qui utilise un couple clé publique / clé privée.
- **Chiffrement :** Opération qui transforme un message en un texte illisible sans la clé. Elle protège la confidentialité, mais ne garantit pas à elle seule l'authenticité du message.
- **Adversaire :** Entité malveillante qui cherche à lire, modifier ou forger des messages sans connaître la clé secrète.`,
      },
      {
        id: '2-2',
        title: 'Les propriétés de sécurité visées',
        pdfSection: 'Section 2.2',
        pdfPage: 9,
        content: `- **Confidentialité :** Seules les personnes autorisées peuvent lire le contenu du message.
- **Intégrité :** Le message n'a pas été modifié entre son émission et sa réception, ou pendant son stockage.
- **Authenticité :** Le message provient bien d'une entité qui possède la clé secrète.
- **Non-répudiation :** L'auteur d'un message ne peut pas nier en être l'auteur. Cette propriété n'est pas assurée par un MAC, puisque plusieurs personnes partagent la même clé ; elle nécessite une signature numérique.

*Règle essentielle :* Les mécanismes étudiés dans ce travail assurent l'intégrité et l'authenticité, mais pas la confidentialité.`,
      },
      {
        id: '2-3',
        title: 'Fonction de hachage cryptographique',
        pdfSection: 'Section 2.3',
        pdfPage: 10,
        content: `Une fonction de hachage cryptographique est une fonction $H : \\{0, 1\\}^* \\to \\{0, 1\\}^n$ qui associe à un message de taille quelconque une empreinte (ou condensat) de taille fixe $n$ bits. Elle est :
- **déterministe :** un même message donne toujours la même empreinte ;
- **rapide à calculer ;**
- **sensible aux modifications :** changer un seul bit du message modifie profondément l'empreinte (effet d'avalanche) ;
- **à sens unique et résistante aux collisions :** il est difficile de retrouver un message à partir de son empreinte, ou de trouver deux messages ayant la même empreinte.

Une fonction de hachage n'utilise aucune clé : n'importe qui peut recalculer l'empreinte d'un message. Elle ne suffit donc pas à authentifier l'expéditeur.`,
        formula: 'H : \\{0, 1\\}^* \\longrightarrow \\{0, 1\\}^n',
      },
      {
        id: '2-4',
        title: 'Le MAC (Message Authentication Code)',
        pdfSection: 'Section 2.4',
        pdfPage: 10,
        content: `Un MAC est une valeur de contrôle cryptographique calculée à partir d'un message, d'une clé secrète partagée et d'un algorithme cryptographique. Le résultat est appelé tag, code d'authentification ou étiquette d'authentification :
$$t = \\text{MAC}_k(m)$$

Formellement, un MAC est défini par trois algorithmes : la génération de clé $\\text{Gen}$, le calcul du tag $\\text{Tag}$ et la vérification $\\text{Vrfy}$. Alice envoie le couple $(m, t)$; Bob recalcule $\\text{MAC}_k(m)$ avec la clé partagée et accepte le message si, et seulement si, le résultat est égal à $t$.

Un MAC est dit sûr s'il est **infalsifiable** : un adversaire qui connaît des couples $(m_i, t_i)$ de son choix ne peut pas produire un nouveau couple valide $(m, t)$ sans connaître $k$.

Le MAC assure deux propriétés : **l'intégrité** et **l'authenticité**. En revanche :
- il ne chiffre pas le message, donc ne garantit pas sa confidentialité ;
- il ne prouve pas l'identité réelle de l'auteur (pas de non-répudiation) ;
- il ne protège pas contre le rejeu d'un message valide déjà transmis.`,
        formula: 't = \\text{MAC}_k(m)',
      },
      {
        id: '2-7',
        title: 'Comparaison des mécanismes de sécurité',
        pdfSection: 'Section 2.7',
        pdfPage: 11,
        content: `Tableau de comparaison synthétique issu directement du rapport :`,
        table: {
          headers: ['Mécanisme', 'Clé', 'Intégrité', 'Authenticité', 'Confidentialité', 'Non-répudiation'],
          rows: [
            ['Hachage seul', 'Aucune', 'Accidentelle uniquement', 'Non', 'Non', 'Non'],
            ['Chiffrement symétrique seul', 'Secrète partagée', 'Non garantie', 'Non garantie', 'Oui', 'Non'],
            ['MAC (HMAC, CMAC)', 'Secrète partagée', 'Oui', 'Oui', 'Non', 'Non'],
            ['Signature numérique', 'Privée / publique', 'Oui', 'Oui', 'Non', 'Oui'],
          ],
        },
      },
      {
        id: '2-8',
        title: 'La dérivation de clés',
        pdfSection: 'Section 2.8',
        pdfPage: 11,
        content: `La dérivation de clés (key derivation) est un procédé cryptographique qui consiste à générer une ou plusieurs clés cryptographiques à partir d'une clé initiale, d'un mot de passe ou d'un secret partagé, en utilisant un algorithme appelé KDF (Key Derivation Function). Elle permet par exemple d'obtenir plusieurs clés indépendantes (une pour le chiffrement, une pour l'authentification) à partir d'un unique secret.

Paramètres supplémentaires d'une KDF :
- **Sel (salt) :** Valeur aléatoire, non nécessairement secrète, qui rend la dérivation unique et empêche les attaques par tables précalculées.
- **Contexte (info) :** Information décrivant l'usage de la clé dérivée (protocole, rôle, version), qui garantit que des usages différents produisent des clés différentes.
- **Nombre d'itérations :** Nombre de répétitions du calcul, destiné à ralentir volontairement un attaquant.
- **Longueur de sortie :** Taille de la clé dérivée souhaitée.

On distingue deux situations :
- dérivation depuis un secret cryptographique déjà fort (clé issue d'un échange Diffie-Hellman) -> KDF rapides comme **HKDF**, fondée sur HMAC ;
- dérivation depuis un mot de passe humain, peu aléatoire -> KDF volontairement lentes comme **PBKDF2, scrypt ou Argon2**.`,
      },
      {
        id: '2-9',
        title: 'Notions complémentaires & Notations',
        pdfSection: 'Sections 2.9 & 2.10',
        pdfPage: 12,
        content: `- **Entropie :** Mesure du caractère imprévisible d'un secret. Plus elle est élevée, plus le secret est difficile à deviner.
- **Fonction pseudo-aléatoire (PRF) :** Fonction à clé dont la sortie est indiscernable d'une suite aléatoire pour quiconque ne connaît pas la clé. HMAC est analysé comme une PRF, ce qui justifie son usage dans les KDF.
- **Nonce :** Valeur utilisée une seule fois, ajoutée à un message pour empêcher le rejeu.
- **Attaque par extension de longueur :** Attaque sur les constructions naïves de type $H(k \\parallel m)$, qui permet de forger l'empreinte d'un message prolongé sans connaître $k$.

*Notations du rapport :*
- $m$ : message
- $k$ : clé secrète
- $t$ : tag (code d'authentification)
- $H$ : fonction de hachage
- $\\parallel$ : concaténation
- $\\oplus$ : OU exclusif (XOR) bit à bit
- $\\{0, 1\\}^*$ : suites de bits de longueur quelconque`,
      },
    ],
  },
  {
    id: 'part-3',
    partNumber: 3,
    title: 'Fonctions de hachage',
    pdfChapter: 'Chapitre 3',
    pdfPages: 'pp. 13–24',
    sections: [
      {
        id: '3-1',
        title: 'Définition et propriétés attendues',
        pdfSection: 'Section 3.1',
        pdfPage: 13,
        content: `Une fonction de hachage cryptographique convertit une donnée d'entrée de taille arbitraire en une séquence binaire de longueur fixe $n$ bits. Par exemple, SHA-256 renvoie toujours 256 bits : l'empreinte du texte « abc » est :
\`ba7816bf 8f01cfea 414140de 5dae2223 b00361a3 96177a9c b410ff61 f20015ad\`
que le message fasse 3 octets ou 3 gigaoctets.

Les trois formes de résistance exigées :
1. **Résistance à la préimage :** Connaissant $y$, on ne peut pas trouver $x$ tel que $H(x) = y$ (effort : $2^n$).
2. **Résistance à la seconde préimage :** Connaissant $x_1$, on ne peut pas trouver $x_2 \\neq x_1$ tel que $H(x_2) = H(x_1)$ (effort : $2^n$).
3. **Résistance aux collisions :** On ne peut pas trouver deux messages distincts ayant la même empreinte (effort : $2^{n/2}$).

**Effet d'avalanche :** modifier un seul bit du message doit changer environ la moitié des bits de l'empreinte, sans corrélation exploitable.`,
        formula: 'H(x) = y, \\quad |y| = n \\text{ bits}',
      },
      {
        id: '3-2',
        title: 'Le paradoxe des anniversaires & Démonstration pas à pas',
        pdfSection: 'Sections 3.2 & 3.3',
        pdfPage: 14,
        content: `Trouver une collision est bien plus facile que trouver une préimage. Si l'on calcule $k$ empreintes de $n$ bits, la probabilité qu'au moins deux soient identiques est d'environ :
$$P \\approx 1 - e^{-k^2 / 2^{n+1}}$$

Elle atteint 50 % pour $k \\approx 1,18 \\cdot 2^{n/2}$. Une empreinte de $n$ bits n'offre donc que $n/2$ bits de sécurité contre les collisions : $2^{64}$ opérations suffisent en théorie contre une sortie de 128 bits (MD5), $2^{80}$ contre 160 bits (SHA-1), alors que $2^{128}$ sont nécessaires contre SHA-256.

**Démonstration pas à pas (Rapport p. 15) :**
1. *Probabilité d'absence de collision :*
$$P(\\text{aucune collision}) = \\prod_{i=0}^{k-1} \\left(1 - \\frac{i}{N}\\right)$$
2. *Passage au logarithme :* avec $\\ln(1-x) \\approx -x$ pour $x$ petit :
$$\\ln P \\approx -\\sum_{i=0}^{k-1} \\frac{i}{N} = -\\frac{k(k-1)}{2N}$$
3. *Probabilité de collision :*
$$P_{\\text{collision}} \\approx 1 - e^{-k^2 / (2 \\cdot 2^n)} = 1 - e^{-k^2 / 2^{n+1}}$$
4. *Seuil à 50 % :*
$$\\frac{k^2}{2N} = \\ln 2 \\implies k = \\sqrt{2 \\ln 2 \\cdot N} \\approx 1,1774 \\times 2^{n/2}$$
5. *Cas classique des anniversaires :* Pour $N = 365$ jours, le seuil est $k \\approx 1,1774 \\times \\sqrt{365} \\approx 22,5$, soit 23 personnes ($P = 50,7 \\%$).`,
        formula: 'P_{\\text{collision}} \\approx 1 - e^{-k^2/2^{n+1}}, \\quad k_{50\\%} \\approx 1,1774 \\cdot 2^{n/2}',
      },
      {
        id: '3-4',
        title: 'Architectures : Merkle–Damgård vs Éponge de Keccak',
        pdfSection: 'Section 3.4',
        pdfPage: 17,
        content: `**1. La construction de Merkle–Damgård (1989)**
Transforme une fonction de compression $f$, à entrées de taille fixe, en une fonction pour messages de longueur quelconque en trois étapes :
- *Remplissage (padding) :* ajout d'un bit 1, de zéros, puis de la longueur encodée sur 64 bits (128 bits pour SHA-512) -> renforcement de Merkle-Damgård.
- *Découpage en blocs :* $m_1, m_2, \\dots, m_k$.
- *Chaînage :* $h_0 = IV, \\quad h_i = f(h_{i-1}, m_i), \\quad H(m) = h_k$.
Schéma Davies-Meyer : $f(h, m) = E_m(h) \\oplus h$.

**2. La construction éponge de Keccak (SHA-3)**
Abandonne le chaînage de blocs. État de 1600 bits découpé en : débit $r$ (rate) et capacité $c$ (capacity, cachée), avec $r + c = 1600$.
- *Absorption :* chaque bloc de $r$ bits est combiné par XOR avec la partie $r$ de l'état, puis la permutation Keccak-$f[1600]$ (24 tours) est appliquée.
- *Essorage :* lecture de $r$ bits comme sortie.
Sécurité générique : $\\min(n/2, c/2)$ contre les collisions, $\\min(n, c/2)$ contre la préimage.

**Comparaison des deux architectures (Rapport p. 19) :**
- État interne : Égal à la sortie dans MD (256 ou 512 bits) vs 1600 bits dans l'Éponge.
- Sortie révèle l'état : **Oui** pour SHA-256/SHA-512 vs **Non** pour SHA-3.
- Extension de longueur : **Possible** sur Merkle-Damgård vs **Impossible** sur Keccak.`,
      },
      {
        id: '3-6',
        title: 'Attaques contre les fonctions de hachage & L\'extension de longueur',
        pdfSection: 'Section 3.6',
        pdfPage: 21,
        content: `Tableau synthétique des attaques du rapport :
- **Force brute / dictionnaire :** essayer des entrées. Parade : sortie $\\ge 256$ bits, sel et fonction lente.
- **Tables arc-en-ciel (Oechslin, 2003) :** compromis temps-mémoire. Parade : sel unique par utilisateur.
- **Collision différentielle :** compensation des différences au fil des tours (Wang 2004 sur MD5, SHAttered 2017 sur SHA-1). Parade : abandonner l'algorithme.
- **Multicollisions de Joux (2004) :** obtenir $2^k$ collisions pour le coût de $k \\times 2^{n/2}$. Concaténer $H_1(m) \\parallel H_2(m)$ n'apporte pas la sécurité d'une fonction de taille somme !
- **Attaque par extension de longueur (Section 3.6.4 & 7.3) :**
Dans Merkle-Damgård, l'empreinte finale $H(m)$ est l'état interne final. Un attaquant connaissant $H(m)$ et la longueur de $m$ peut reprendre le calcul à partir de cet état, ajouter son texte $m'$ et obtenir une empreinte valide de $m \\parallel \\text{pad}(m) \\parallel m'$ sans connaître $m$ :
$$H(m) \\longmapsto H(m \\parallel \\text{pad}(m) \\parallel m')$$
Cette attaque a permis à Duong et Rizzo en 2009 de forger des requêtes signées dans l'API Flickr qui utilisait $MD5(\\text{secret} \\parallel \\text{paramètres})$.`,
        formula: 'H(m) \\longmapsto H(m \\parallel \\text{pad}(m) \\parallel m\')',
      },
    ],
  },
  {
    id: 'part-4',
    partNumber: 4,
    title: 'Le MAC : un code d\'authentification utile mais insuffisant',
    pdfChapter: 'Chapitre 4',
    pdfPages: 'pp. 24–29',
    sections: [
      {
        id: '4-1',
        title: 'Origine, principe et modèle formel EUF-CMA',
        pdfSection: 'Sections 4.1–4.3',
        pdfPage: 24,
        content: `Les travaux fondateurs de Gilbert, MacWilliams et Sloane (1974) sur les codes de détection de tromperie ont posé les bases théoriques des codes d'authentification.

Un MAC est un triplet d'algorithmes : $(\\text{Gen}, \\text{Tag}, \\text{Vrfy})$.
La sécurité d'un MAC se définit par l'**infalsifiabilité existentielle sous attaque à messages choisis (EUF-CMA)** : un adversaire capable d'obtenir le tag de messages $m_1, m_2, \\dots$ de son choix ne peut pas forger un couple valide $(m, t)$ pour un message jamais soumis.
Conséquence directe : pour un tag de $\\tau$ bits, un adversaire devinant au hasard réussit avec la probabilité $2^{-\\tau}$.`,
        formula: 'P_{\\text{devinette}} = 2^{-\\tau}',
      },
      {
        id: '4-4',
        title: 'CBC-MAC : Fonctionnement et faille sur longueur variable',
        pdfSection: 'Section 4.4',
        pdfPage: 25,
        content: `Le CBC-MAC découpe le message en blocs de la taille du chiffrement (16 octets pour AES). Il initialise l'état à zéro :
$$C_0 = 0, \\quad C_i = E_k(C_{i-1} \\oplus M_i) \\quad (1 \\le i \\le n), \\quad t = C_n$$

**Sécurité et faiblesse du CBC-MAC (Rapport p. 26) :**
Le CBC-MAC est sûr lorsque tous les messages ont la même longueur fixe [7]. Il devient **falsifiable pour des messages de longueur variable**.
Soit $m = M_1 \\parallel \\dots \\parallel M_n$ de tag $t$, et $m' = M'_1 \\parallel \\dots \\parallel M'_p$ de tag $t'$.
Alors le message forgé :
$$m'' = M_1 \\parallel \\dots \\parallel M_n \\parallel (M'_1 \\oplus t) \\parallel M'_2 \\parallel \\dots \\parallel M'_p$$
a exactement pour tag $t'$. En effet, après le bloc $M_n$, l'état est $t$. Le bloc suivant donne :
$$E_k(t \\oplus (M'_1 \\oplus t)) = E_k(M'_1)$$
qui est exactement le premier état du calcul de $m'$, et toute la suite est identique ! L'adversaire a falsifié un tag pour un message jamais soumis avec seulement deux requêtes.

*Correctifs :* préfixer la longueur, chiffrer le dernier état avec une seconde clé (ECBC-MAC), ou utiliser le CMAC (NIST SP 800-38B, avec sous-clés $K_1, K_2$).`,
        formula: 'm\'\' = M_1 \\parallel \\dots \\parallel M_n \\parallel (M\'_1 \\oplus t) \\parallel M\'_2 \\dots \\implies \\text{Tag} = t\'',
      },
      {
        id: '4-5',
        title: 'Constructions naïves à base de hachage et leurs failles',
        pdfSection: 'Section 4.5',
        pdfPage: 26,
        content: `Tableau des constructions naïves du rapport (p. 29) :`,
        table: {
          headers: ['Construction naïve', 'Faiblesse principale identifiée dans le rapport'],
          rows: [
            ['H(k ∥ m) [MAC préfixe]', 'Prolongement de longueur avec MD5, SHA-1, SHA-2 (ex: Flickr 2009)'],
            ['H(m ∥ k) [MAC suffixe]', 'Substitution par collision de messages (attaque hors-ligne : H(m)=H(m\') => H(m||k)=H(m\'||k))'],
            ['Double hachage ad hoc : H(H(m) ∥ k)', 'Sécurité non prouvée, collision interne transmise au tag'],
            ['MAC tronqué trop court (< 80 bits)', 'Force réduite : probabilité de deviner le tag égale à 2^{-lambda}'],
            ['Clé partagée entre usages', 'Confusion d\'usage et réutilisation dangereuse (chiffrement et MAC)'],
          ],
        },
      },
      {
        id: '4-6',
        title: 'Limites du MAC',
        pdfSection: 'Section 4.6',
        pdfPage: 29,
        content: `Un MAC est utile mais insuffisant :
- Il ne garantit pas l'authenticité absolue : si la clé est compromise, tout est perdu.
- Il n'assure pas la non-répudiation : Alice et Bob partagent la même clé.
- Il ne protège pas contre le rejeu : un message valide peut être renvoyé tel quel s'il ne contient pas de nonce ou d'horodatage.
- Il suppose le partage préalable d'un secret (problème de distribution des clés).
- Il ne chiffre pas : la confidentialité doit être assurée séparément.`,
      },
    ],
  },
  {
    id: 'part-5',
    partNumber: 5,
    title: 'Le HMAC',
    pdfChapter: 'Chapitre 5',
    pdfPages: 'pp. 29–34',
    sections: [
      {
        id: '5-1',
        title: 'Origine, motivation et définition formelle',
        pdfSection: 'Sections 5.1 & 5.2',
        pdfPage: 29,
        content: `Conçu par Mihir Bellare, Ran Canetti et Hugo Krawczyk (CRYPTO 1996, RFC 2104 en 1997, FIPS 198-1).

Formule canonique :
$$HMAC(k, m) = H((K' \\oplus opad) \\parallel H((K' \\oplus ipad) \\parallel m))$$

Éléments de la formule :
- $K'$ : la clé $k$ ramenée à $B$ octets ($B=64$ pour SHA-256, $B=128$ pour SHA-512). Si $k$ est plus courte, complétée par des zéros ; si plus longue, remplacée d'abord par $H(k)$ puis complétée.
- $ipad$ : l'octet \`0x36\` répété $B$ fois (inner pad).
- $opad$ : l'octet \`0x5C\` répété $B$ fois (outer pad).
- $\\parallel$ : concaténation, $\\oplus$ : OU exclusif bit à bit.`,
        formula: 'HMAC(k, m) = H((K\' \\oplus opad) \\parallel H((K\' \\oplus ipad) \\parallel m))',
      },
      {
        id: '5-3',
        title: 'Déroulement en deux passes & Pourquoi deux passes sont nécessaires',
        pdfSection: 'Sections 5.3 & 5.4',
        pdfPage: 30,
        content: `HMAC calcule deux hachages emboîtés avec deux clés distinctes dérivées de $K'$ :
1. **Dérivation des deux clés :** $K_i = K' \\oplus ipad$ et $K_o = K' \\oplus opad$. Comme $0x36 \\oplus 0x5C = 0x6A$, ces deux clés diffèrent sur exactement la moitié de leurs bits.
2. **Passe interne :** on hache $K_i \\parallel m$. Son résultat $h_{int}$ est un état intermédiaire secret qui ne sort jamais.
3. **Passe externe :** on hache $K_o \\parallel h_{int}$. Son entrée a une taille fixe ($B$ octets de clé plus taille de condensat), et son résultat est le tag publié.

**Pourquoi deux passes sont nécessaires (Rapport p. 31) :**
- *Contre l'extension de longueur :* le tag publié est la sortie de la passe externe $H(K_o \\parallel h_{int})$. Pour falsifier le message, l'attaquant devrait connaître l'état $h_{int}$ de la passe interne ainsi que $K_o$. Il ne dispose ni de l'un ni de l'autre !
- *Contre les collisions :* la preuve de Bellare (2006) montre que HMAC reste un MAC sûr sans exiger que $H$ résiste aux collisions, tant que sa fonction de compression se comporte comme une fonction pseudo-aléatoire (PRF). C'est pourquoi HMAC-MD5 n'est pas cassé en tant que MAC.`,
      },
      {
        id: '5-7',
        title: 'Vecteur de test officiel RFC 4231 & Exemple Python',
        pdfSection: 'Section 5.7',
        pdfPage: 33,
        content: `Exemple officiel du rapport :
\`\`\`python
import hmac, hashlib
cle = b"Jefe"
message = b"what do ya want for nothing?"
tag = hmac.new(cle, message, hashlib.sha256).hexdigest()
# Résultat : 5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843
\`\`\`
*Vérification en temps constant :* la comparaison doit utiliser une fonction en temps constant (\`compare_digest\` ou \`crypto.timingSafeEqual\`) et JAMAIS l'opérateur \`==\` qui fuite des informations par canal auxiliaire.`,
      },
      {
        id: '5-8',
        title: 'Applications pratiques du HMAC',
        pdfSection: 'Section 5.8',
        pdfPage: 34,
        content: `Tableau des applications du rapport :`,
        table: {
          headers: ['Domaine', 'Primitive utilisée', 'Rôle'],
          rows: [
            ['TLS / HTTPS', 'HMAC (TLS <= 1.2), HKDF, AEAD (TLS 1.3)', 'Protéger chaque enregistrement et dériver les clés de session'],
            ['IPsec, SSH', 'HMAC-SHA2 ou AEAD', 'Authentifier chaque paquet'],
            ['JWT (jetons web)', 'HS256 = HMAC-SHA256, ou signature RS256/ES256', 'Garantir qu\'un jeton de session n\'a pas été modifié'],
            ['API et webhooks', 'HMAC-SHA256 sur la requête', 'Prouver la légitimité du partenaire émetteur'],
            ['Paiements & transactions', 'HMAC ou signature sur le message de transaction', 'Empêcher la modification du montant ou du destinataire'],
            ['Mots de passe', 'PBKDF2 (fondé sur HMAC), bcrypt, scrypt, Argon2', 'Stocker une empreinte lente et salée plutôt que le mot de passe'],
          ],
        },
      },
    ],
  },
  {
    id: 'part-6',
    partNumber: 6,
    title: 'La dérivation des clés',
    pdfChapter: 'Chapitre 6',
    pdfPages: 'pp. 34–41',
    sections: [
      {
        id: '6-1',
        title: 'Pourquoi dériver des clés ? & Paramètres',
        pdfSection: 'Section 6.1',
        pdfPage: 34,
        content: `Une KDF (Key Derivation Function) garantit que les clés produites sont pseudo-aléatoires et de la bonne longueur. Elle ne peut pas créer d'entropie.

Raisons fondamentales :
- **Une clé, un usage :** séparation de domaine assurée par le contexte (\`info\`).
- **Adapter longueur et format :** adapter à la taille attendue (ex: 128 ou 256 bits pour AES).
- **Uniformiser un secret non uniforme :** un secret Diffie-Hellman est un élément de groupe ; on le passe par une KDF.
- **Renforcer un mot de passe faible :** ralentir les essais par coût de calcul.
- **Renouveler les clés :** dériver une nouvelle clé par session, message ou fichier.

Paramètres (Rapport p. 35) :
- *IKM (Input Key Material) :* source secrète.
- *Sel (salt) :* valeur aléatoire publique, rend la dérivation unique.
- *Contexte (info) :* étiquette publique d'usage de la clé.
- *Coût :* nombre d'itérations, mémoire, parallélisme.
- *Longueur souhaitée (L) :* taille finale en octets.
- *OKM (Output Key Material) :* clé secrète dérivée finale.`,
      },
      {
        id: '6-3',
        title: 'HKDF : Extraction puis Expansion (RFC 5869)',
        pdfSection: 'Section 6.3',
        pdfPage: 36,
        content: `HKDF (Krawczyk et Eronen, 2010, RFC 5869) se déroule en deux étapes :

**Étape 1 : Extraction (HKDF-Extract)**
Obtention d'une clé pseudo-aléatoire uniforme PRK à partir de l'IKM et du sel :
$$PRK = HMAC(salt, IKM)$$
Si le sel est absent, on utilise une chaîne de zéros de taille $HashLen$.

**Étape 2 : Expansion (HKDF-Expand)**
Production de la sortie OKM de $L$ octets :
$$T(0) = \\epsilon$$
$$T(i) = HMAC(PRK, T(i-1) \\parallel info \\parallel i) \\quad (i = 1, 2, \\dots)$$
$$OKM = \\text{premiers } L \\text{ octets de } T(1) \\parallel T(2) \\dots$$
où $i$ est un compteur codé sur un octet ($1 \\le i \\le 255$, max $255 \\times HashLen$ octets).

*Vecteur de test RFC 5869 du rapport (p. 38) :*
IKM = 22 octets \`0x0b\`, salt = \`0x00..0x0c\`, info = \`0xf0..0xf9\`, $L=42$ :
\`OKM = 3cb25f25faacd57a90434f64d0362f2a2d2d0a90cf1a5a4c5db02d56ecc4c5bf34007208d5b887185865\``,
        formula: 'PRK = HMAC(salt, IKM), \\quad T(i) = HMAC(PRK, T(i-1) \\parallel info \\parallel i)',
      },
      {
        id: '6-4',
        title: 'Dérivation à partir de mots de passe (PBKDF2, bcrypt, scrypt, Argon2)',
        pdfSection: 'Section 6.4',
        pdfPage: 38,
        content: `Tableau comparatif des KDF pour mots de passe du rapport (p. 39) :`,
        table: {
          headers: ['Fonction', 'Paramètres de coût', 'Résistance GPU', 'Mémoire', 'Remarque'],
          rows: [
            ['PBKDF2', 'Itérations c', 'Faible', 'Négligeable', 'Approuvé FIPS (RFC 8018)'],
            ['bcrypt', 'Facteur de coût', 'Moyenne', 'Faible, fixe', 'Limite connue de 72 octets (1999)'],
            ['scrypt', 'N, r, p', 'Forte', 'Réglable', 'Memory-hard (RFC 7914, 2009)'],
            ['Argon2id', 'm, t, p', 'Forte', 'Réglable', 'Vainqueur PHC, recommandé (RFC 9106, 2021)'],
          ],
        },
      },
    ],
  },
  {
    id: 'part-7',
    partNumber: 7,
    title: 'Problèmes, limites et attaques',
    pdfChapter: 'Chapitre 7',
    pdfPages: 'pp. 41–46',
    sections: [
      {
        id: '7-1',
        title: 'Panorama : contrefaçon et attaques génériques',
        pdfSection: 'Section 7.1',
        pdfPage: 41,
        content: `Tableau des attaques appliqué aux MAC (Rapport p. 42) :`,
        table: {
          headers: ['Attaque', 'Principe appliqué à un MAC', 'Parade'],
          rows: [
            ['Force brute sur la clé', 'Essayer toutes les clés jusqu\'à retrouver t ; coût 2^{|k|}', 'Clé d\'au moins 128 bits générée aléatoirement'],
            ['Devinette du tag', 'Proposer un tag au hasard : probabilité 2^{-tau} ; attaque en ligne', 'Tag d\'au moins 80 bits, limitation du nombre d\'essais'],
            ['Messages connus', 'Exploiter des couples (m_i, t_i) observés pour déduire la clé', 'MAC sûr (HMAC, CMAC), clé forte'],
            ['Messages choisis', 'L\'attaquant obtient le tag de messages de son choix (modèle EUF-CMA)', 'Preuve de sécurité formelle de la construction'],
            ['Homme du milieu (MitM)', 'Un tiers s\'interpose, capte et modifie les messages', 'MAC vérifié à chaque message, certificats'],
            ['Mesure du temps (timing attack)', 'Déduire des informations secrètes du temps de calcul ou vérification', 'Comparaison en temps constant (Section 7.4)'],
            ['Rejeu (replay)', 'Renvoyer un message authentique déjà intercepté', 'Nonce, compteur, horodatage (Section 7.5)'],
          ],
        },
      },
      {
        id: '7-4',
        title: 'Attaques par canaux auxiliaires & Comparaison en temps constant',
        pdfSection: 'Section 7.4',
        pdfPage: 43,
        content: `Si le serveur compare le tag reçu au tag attendu octet par octet avec l'opérateur \`==\` et s'arrête dès la première différence, le temps de réponse révèle le nombre d'octets corrects !
L'attaquant peut alors deviner le tag octet par octet : $256$ essais par position au lieu de $2^{8L}$ pour un tag de $L$ octets, ramenant une recherche exponentielle à une recherche linéaire !

Code comparatif du rapport (p. 44) :
\`\`\`python
# VULNÉRABLE : s'arrête au premier octet différent (fuite temporelle)
def verifier_naif(tag_attendu, tag_recu):
    return tag_attendu == tag_recu

# SÛR : temps constant
def verifier_sur(tag_attendu, tag_recu):
    return hmac.compare_digest(tag_attendu, tag_recu)
\`\`\``,
      },
      {
        id: '7-5',
        title: 'Rejeu (replay) et nécessité de nonces / horodatage',
        pdfSection: 'Section 7.5',
        pdfPage: 44,
        content: `Un MAC garantit l'intégrité et l'authenticité d'un message, mais **pas sa fraîcheur**. Si Alice envoie « payer 100 », l'adversaire peut le renvoyer dix fois si le message ne comporte pas d'indicateur d'unicité :
$$t = \\text{MAC}_k(c \\parallel m), \\quad c \\in \\{\\text{compteur, nonce, horodatage}\\}$$

Tableau comparatif des mécanismes anti-rejeu du rapport :
- **Compteur (numéro de séquence) :** chaque message porte un numéro strictement croissant ; le récepteur rejette un numéro déjà vu. Limite : état synchronisé requis.
- **Nonce :** valeur aléatoire ou unique par message mémorisée par le récepteur. Limite : stockage des nonces.
- **Horodatage :** le récepteur rejette ce qui sort d'une fenêtre de validité. Limite : horloges à synchroniser.`,
      },
      {
        id: '7-7',
        title: 'Menaces futures : Cryptanalyse & Ordinateur quantique',
        pdfSection: 'Section 7.7',
        pdfPage: 45,
        content: `L'ordinateur quantique menace très différemment les deux familles de cryptographie :
- **Cryptographie asymétrique (RSA, Diffie-Hellman, ECC) :** l'algorithme de Shor la casse complètement. Réponse : cryptographie post-quantique ML-KEM (FIPS 203) et ML-DSA (FIPS 204).
- **Cryptographie symétrique et hachage :** l'algorithme de Grover accélère la recherche exhaustive en racine carrée. Une clé de $k$ bits passe à $k/2$ bits de sécurité quantique, et une préimage coûte $2^{n/2}$. Il n'y a pas de rupture : il suffit de doubler les tailles ! Une clé de 256 bits et un HMAC-SHA-256 ou HMAC-SHA-512 restent considérés comme sûrs.`,
        table: {
          headers: ['Primitive', 'Menace quantique', 'Réponse recommandée'],
          rows: [
            ['RSA, Diffie-Hellman, ECC', 'Cassées par l\'algorithme de Shor', 'Post-quantique : ML-KEM (FIPS 203), ML-DSA (FIPS 204)'],
            ['Clé de MAC ou chiffrement symétrique', 'Recherche en 2^{k/2} (Grover)', 'Clés de 256 bits'],
            ['Fonctions de hachage, HMAC', 'Préimage en 2^{n/2} (Grover) ; collisions en 2^{n/3}', 'Sorties de 256 bits ou plus (SHA-256, SHA-512, SHA-3)'],
          ],
        },
      },
    ],
  },
  {
    id: 'part-8',
    partNumber: 8,
    title: 'Conclusion et références bibliographiques',
    pdfChapter: 'Conclusion & Références',
    pdfPages: 'pp. 46–48',
    sections: [
      {
        id: '8-1',
        title: 'Conclusion générale du rapport',
        pdfSection: 'Conclusion',
        pdfPage: 46,
        content: `Nous sommes partis d'une question simple : comment faire confiance à un message transmis sur un canal non sécurisé ? Nous avons vu qu'une fonction de hachage seule ne suffit pas, puisque n'importe qui peut la calculer : elle détecte les erreurs, pas les falsifications. Il faut y associer un secret partagé, ce qui donne le MAC, qui garantit l'intégrité et l'authenticité du message.

Les premiers MAC (CBC-MAC) ont montré leurs limites sur les longueurs variables, tandis que les constructions naïves ($H(k \\parallel m)$) tombaient sous l'extension de longueur. Le HMAC, avec ses deux passes et ses deux clés dérivées, a apporté une construction simple, rapide et accompagnée d'une preuve de sécurité, au point d'être au cœur de TLS, IPsec et des API. La dérivation de clés prolonge cette idée avec HKDF.

Pourtant, aucun de ces outils n'est suffisant à lui seul : un MAC ne protège ni de la lecture, ni du rejeu, ni de la fuite de clé, et n'apporte pas de non-répudiation. Sécuriser un message, c'est choisir et assembler avec soin plusieurs briques complémentaires.`,
      },
      {
        id: '8-2',
        title: 'Les 26 Références bibliographiques officielles',
        pdfSection: 'Références [1] à [26]',
        pdfPage: 47,
        content: `1. **[1]** H. Krawczyk, M. Bellare, R. Canetti, *HMAC : Keyed-Hashing for Message Authentication*, RFC 2104, 1997.
2. **[2]** H. Krawczyk, P. Eronen, *HMAC-based Extract-and-Expand Key Derivation Function (HKDF)*, RFC 5869, 2010.
3. **[3]** NIST, *Keyed-Hash Message Authentication Code (HMAC) : Specification and Recommendations*, SP 800-224 (projet public initial), 2024.
4. **[4]** M. Bellare, R. Canetti, H. Krawczyk, *Keying Hash Functions for Message Authentication*, CRYPTO 1996.
5. **[5]** RFC 4231, *Identifiers and Test Vectors for HMAC-SHA-224, SHA-256, SHA-384, and SHA-512*, 2006.
6. **[6]** E. N. Gilbert, F. J. MacWilliams, N. J. A. Sloane, *Codes which detect deception*, Bell System Technical Journal 53(3), 1974.
7. **[7]** M. Bellare, J. Kilian, P. Rogaway, *The Security of the Cipher Block Chaining Message Authentication Code*, JCSS 61(3), 2000.
8. **[8]** NIST, *Recommendation for Block Cipher Modes of Operation : The CMAC Mode for Authentication*, SP 800-38B, 2005.
9. **[9]** NIST, *SHA-3 Derived Functions : cSHAKE, KMAC, TupleHash and ParallelHash*, SP 800-185, 2016.
10. **[10]** NIST, *SHA-3 Standard : Permutation-Based Hash and Extendable-Output Functions*, FIPS PUB 202, 2015.
11. **[11]** X. Wang, H. Yu, *How to Break MD5 and Other Hash Functions*, EUROCRYPT 2005.
12. **[12]** M. Stevens, E. Bursztein, P. Karpman, A. Albertini, Y. Markov, *The First Collision for Full SHA-1*, CRYPTO 2017.
13. **[13]** G. Leurent, T. Peyrin, *SHA-1 is a Shambles*, USENIX Security 2020.
14. **[14]** A. Joux, *Multicollisions in Iterated Hash Functions*, CRYPTO 2004.
15. **[15]** J. Kelsey, B. Schneier, *Second Preimages on n-bit Hash Functions for Much Less than 2^n Work*, EUROCRYPT 2005.
16. **[16]** P. Oechslin, *Making a Faster Cryptanalytic Time-Memory Trade-Off*, CRYPTO 2003.
17. **[17]** T. Duong, J. Rizzo, *Flickr's API Signature Forgery Vulnerability*, 2009.
18. **[18]** P. C. Kocher, *Timing Attacks on Implementations of Diffie-Hellman, RSA, DSS*, CRYPTO 1996.
19. **[19]** RFC 8018, *PKCS #5 : Password-Based Cryptography Specification Version 2.1*, 2017.
20. **[20]** NIST, *Recommendation for Password-Based Key Derivation*, SP 800-132, 2010.
21. **[21]** RFC 7914, *The scrypt Password-Based Key Derivation Function*, 2016.
22. **[22]** RFC 9106, *Argon2 Memory-Hard Function for Password Hashing and Proof-of-Work*, 2021.
23. **[23]** RFC 8446, *The Transport Layer Security (TLS) Protocol Version 1.3*, 2018.
24. **[24]** OWASP, *Password Storage Cheat Sheet*, cheatsheetseries.owasp.org, 2026.
25. **[25]** L. K. Grover, *A Fast Quantum Mechanical Algorithm for Database Search*, STOC 1996.
26. **[26]** NIST, *FIPS 203 (ML-KEM) and FIPS 204 (ML-DSA) Post-Quantum Standards*, 2024.`,
      },
    ],
  },
];
