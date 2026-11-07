(()=>{var e={};e.id=154,e.ids=[154],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},6782:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>r.a,__next_app__:()=>p,originalPathname:()=>d,pages:()=>c,routeModule:()=>x,tree:()=>u}),a(7942),a(6593),a(5866);var n=a(3191),i=a(8716),s=a(7922),r=a.n(s),o=a(5231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);a.d(t,l);let u=["",{children:["documentation",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,7942)),"/home/andeli/WORKING/Hachage/src/app/documentation/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,6593)),"/home/andeli/WORKING/Hachage/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,5866,23)),"next/dist/client/components/not-found-error"]}],c=["/home/andeli/WORKING/Hachage/src/app/documentation/page.tsx"],d="/documentation/page",p={require:a,loadChunk:()=>Promise.resolve()},x=new n.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/documentation/page",pathname:"/documentation",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:u}})},5139:(e,t,a)=>{Promise.resolve().then(a.bind(a,2055))},2055:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>o});var n=a(326),i=a(7577);let s=[{id:"part-1",partNumber:1,title:"Historique et avanc\xe9es technologiques",pdfChapter:"Chapitre 1",pdfPages:"pp. 5–8",sections:[{id:"1-1",title:"Les causes de la cr\xe9ation des MAC",pdfSection:"Section 1.1",pdfPage:5,content:`Les MAC (Message Authentication Codes), ou codes d'authentification de message, ont \xe9t\xe9 cr\xe9\xe9s pour r\xe9pondre \xe0 un probl\xe8me fondamental de la communication num\xe9rique : comment garantir qu'un message re\xe7u est authentique et qu'il n'a pas \xe9t\xe9 modifi\xe9 pendant sa transmission ?

Les causes fondamentales identifi\xe9es sont :
- **La falsification des messages :** une personne malveillante pouvait modifier le contenu d'un message.
- **L'usurpation d'identit\xe9 :** un pirate pouvait se faire passer pour l'exp\xe9diteur l\xe9gitime.
- **La modification des donn\xe9es :** des informations pouvaient \xeatre alt\xe9r\xe9es volontairement pendant leur transmission.
- **Le manque de confiance :** le destinataire ne pouvait pas toujours v\xe9rifier que le message provenait r\xe9ellement de la personne avec laquelle il communiquait.`,keyPoints:["Falsification des messages","Usurpation d'identit\xe9","Modification des donn\xe9es","Manque de confiance dans le canal"]},{id:"1-2",title:"Les solutions apport\xe9es par les MAC",pdfSection:"Section 1.2",pdfPage:6,content:`Les MAC ont \xe9t\xe9 d\xe9velopp\xe9s pour permettre \xe0 deux personnes partageant une m\xeame cl\xe9 secr\xe8te de v\xe9rifier :
- **L'int\xe9grit\xe9 :** le message n'a pas \xe9t\xe9 modifi\xe9.
- **L'authenticit\xe9 :** le message a \xe9t\xe9 produit par une personne connaissant la cl\xe9 secr\xe8te.`},{id:"1-3",title:"Origine des MAC",pdfSection:"Section 1.3",pdfPage:6,content:`Au d\xe9but des ann\xe9es 1970, les \xe9changes \xe9lectroniques commencent \xe0 se d\xe9velopper. Les banques et les institutions financi\xe8res ont notamment besoin de s\xe9curiser les transferts d'argent et les informations sensibles.

Les techniques d'authentification ne n\xe9cessitant pas de chiffrer le message sont d\xe9j\xe0 connues des chercheurs au d\xe9but des ann\xe9es 1970. En 1977, Campbell propose d'utiliser l'algorithme DES (Data Encryption Standard) pour produire un code d'authentification.`},{id:"1-4",title:"\xc9volution technologique des MAC : de 1970 \xe0 2026",pdfSection:"Section 1.4",pdfPage:6,content:`L'\xe9volution technologique s'articule en cinq g\xe9n\xe9rations successives :

**1. Premi\xe8re g\xe9n\xe9ration : les MAC bas\xe9s sur DES (1970–1990)**
- *D\xe9but des ann\xe9es 1970 :* des chercheurs \xe9tudient des m\xe9canismes permettant de v\xe9rifier l'authenticit\xe9 des messages gr\xe2ce \xe0 des cl\xe9s secr\xe8tes.
- *1977 :* publication du DES et d\xe9veloppement de m\xe9thodes d'authentification reposant sur celui-ci.
- *1981 :* la norme bancaire ANSI X9.9 formalise l'utilisation des codes d'authentification dans les \xe9changes financiers.
- *1985 :* le standard am\xe9ricain FIPS 113 (Computer Data Authentication) d\xe9crit un MAC fond\xe9 sur DES en mode CBC.
*Apport technologique :* les banques peuvent v\xe9rifier l'authenticit\xe9 des messages et d\xe9tecter les modifications frauduleuses des donn\xe9es.

**2. Deuxi\xe8me g\xe9n\xe9ration : vers des m\xe9canismes plus souples (ann\xe9es 1990)**
Avec l'\xe9volution des r\xe9seaux informatiques, les besoins de s\xe9curit\xe9 deviennent plus importants. Les chercheurs cherchent \xe0 d\xe9velopper des m\xe9canismes plus souples, plus efficaces et compatibles avec les fonctions de hachage. Une avanc\xe9e majeure appara\xeet en 1996 avec la proposition du HMAC.

**3. Troisi\xe8me g\xe9n\xe9ration : g\xe9n\xe9ralisation du HMAC (1996–2010)**
En 1996, Mihir Bellare, Ran Canetti et Hugo Krawczyk proposent la construction HMAC. En f\xe9vrier 1997, le m\xe9canisme est officiellement d\xe9crit dans la RFC 2104. Ses principales innovations sont :
- l'utilisation de fonctions de hachage cryptographiques ;
- l'association d'une cl\xe9 secr\xe8te au calcul du code ;
- une meilleure souplesse d'utilisation avec diff\xe9rentes fonctions de hachage ;
- une construction con\xe7ue pour r\xe9sister aux attaques visant les m\xe9canismes d'authentification.
En 2002, HMAC est sp\xe9cifi\xe9 dans la norme FIPS 198, puis dans sa version r\xe9vis\xe9e FIPS 198-1 en 2008. Cette p\xe9riode voit aussi appara\xeetre les fonctions SHA-2 (HMAC-SHA-256, HMAC-SHA-512) ainsi que le CMAC (NIST SP 800-38B, 2005).

**4. Quatri\xe8me g\xe9n\xe9ration : diversification des algorithmes (2010–2020)**
- *SHA-3 :* normalis\xe9e en 2015 (FIPS 202), fond\xe9e sur KECCAK.
- *KMAC :* m\xe9canisme d'authentification fond\xe9 sur KECCAK, d\xe9fini dans la norme NIST SP 800-185 en d\xe9cembre 2016 (KMAC128 et KMAC256, longueur variable).

**5. Cinqui\xe8me g\xe9n\xe9ration : modernisation et s\xe9curit\xe9 avanc\xe9e (2020–2026)**
- *HMAC avec SHA-3 :* HMAC utilisable avec SHA-3 en compl\xe9ment de SHA-2.
- *Renforcement des normes :* en juin 2024, publication du projet SP 800-224 par le NIST pour regrouper les sp\xe9cifications de HMAC. En juin 2025, proposition de retrait de FIPS 198-1.
- *Adaptation en 2026 :* s\xe9curisation des API, cloud, IoT, transactions bancaires.`},{id:"1-5",title:"Frise r\xe9capitulative des avanc\xe9es (1977–2026)",pdfSection:"Section 1.5",pdfPage:8,content:`Tableau chronologique r\xe9capitulatif des jalons majeurs de l'authentification des messages tel que pr\xe9sent\xe9 dans le rapport du groupe 23 :`,table:{headers:["Ann\xe9e","Avanc\xe9e technologique","Apport"],rows:[["1977","MAC bas\xe9 sur le DES (proposition de Campbell)","Authentification des donn\xe9es"],["1981","ANSI X9.9","S\xe9curisation des \xe9changes bancaires"],["1985","FIPS 113","Premi\xe8re normalisation d'un MAC (DES en mode CBC)"],["1996","Proposition du HMAC (Bellare, Canetti, Krawczyk)","Authentification bas\xe9e sur le hachage"],["1997","RFC 2104","Formalisation de HMAC"],["2002","FIPS 198","Normalisation de HMAC"],["2005","CMAC (SP 800-38B)","Authentification bas\xe9e sur le chiffrement par blocs"],["2008","FIPS 198-1","R\xe9vision de la norme HMAC"],["2015","SHA-3 (FIPS 202)","Extension des fonctions utilisables avec HMAC"],["2016","KMAC (SP 800-185)","Nouvelle g\xe9n\xe9ration bas\xe9e sur KECCAK"],["2024","Projet SP 800-224","Modernisation des recommandations HMAC"],["2025","Proposition de retrait de FIPS 198-1","Transition vers une nouvelle publication"],["2026","HMAC, CMAC, KMAC","Maintien et diversification des m\xe9canismes approuv\xe9s"]]}}]},{id:"part-2",partNumber:2,title:"D\xe9finitions et g\xe9n\xe9ralit\xe9s",pdfChapter:"Chapitre 2",pdfPages:"pp. 9–12",sections:[{id:"2-1",title:"Cadre et vocabulaire de base",pdfSection:"Section 2.1",pdfPage:9,content:`D\xe9finitions fondamentales du rapport :
- **Message :** Suite de bits $m \\in \\{0, 1\\}^*$ que l'exp\xe9diteur souhaite transmettre.
- **Cl\xe9 secr\xe8te :** Valeur $k$ connue uniquement des parties l\xe9gitimes, dont la confidentialit\xe9 garantit la s\xe9curit\xe9 du m\xe9canisme.
- **Cryptographie sym\xe9trique :** Famille de m\xe9canismes o\xf9 les deux parties utilisent la m\xeame cl\xe9 secr\xe8te $k$. Les MAC, le HMAC et le CMAC en font partie. Elle s'oppose \xe0 la cryptographie asym\xe9trique, qui utilise un couple cl\xe9 publique / cl\xe9 priv\xe9e.
- **Chiffrement :** Op\xe9ration qui transforme un message en un texte illisible sans la cl\xe9. Elle prot\xe8ge la confidentialit\xe9, mais ne garantit pas \xe0 elle seule l'authenticit\xe9 du message.
- **Adversaire :** Entit\xe9 malveillante qui cherche \xe0 lire, modifier ou forger des messages sans conna\xeetre la cl\xe9 secr\xe8te.`},{id:"2-2",title:"Les propri\xe9t\xe9s de s\xe9curit\xe9 vis\xe9es",pdfSection:"Section 2.2",pdfPage:9,content:`- **Confidentialit\xe9 :** Seules les personnes autoris\xe9es peuvent lire le contenu du message.
- **Int\xe9grit\xe9 :** Le message n'a pas \xe9t\xe9 modifi\xe9 entre son \xe9mission et sa r\xe9ception, ou pendant son stockage.
- **Authenticit\xe9 :** Le message provient bien d'une entit\xe9 qui poss\xe8de la cl\xe9 secr\xe8te.
- **Non-r\xe9pudiation :** L'auteur d'un message ne peut pas nier en \xeatre l'auteur. Cette propri\xe9t\xe9 n'est pas assur\xe9e par un MAC, puisque plusieurs personnes partagent la m\xeame cl\xe9 ; elle n\xe9cessite une signature num\xe9rique.

*R\xe8gle essentielle :* Les m\xe9canismes \xe9tudi\xe9s dans ce travail assurent l'int\xe9grit\xe9 et l'authenticit\xe9, mais pas la confidentialit\xe9.`},{id:"2-3",title:"Fonction de hachage cryptographique",pdfSection:"Section 2.3",pdfPage:10,content:`Une fonction de hachage cryptographique est une fonction $H : \\{0, 1\\}^* \\to \\{0, 1\\}^n$ qui associe \xe0 un message de taille quelconque une empreinte (ou condensat) de taille fixe $n$ bits. Elle est :
- **d\xe9terministe :** un m\xeame message donne toujours la m\xeame empreinte ;
- **rapide \xe0 calculer ;**
- **sensible aux modifications :** changer un seul bit du message modifie profond\xe9ment l'empreinte (effet d'avalanche) ;
- **\xe0 sens unique et r\xe9sistante aux collisions :** il est difficile de retrouver un message \xe0 partir de son empreinte, ou de trouver deux messages ayant la m\xeame empreinte.

Une fonction de hachage n'utilise aucune cl\xe9 : n'importe qui peut recalculer l'empreinte d'un message. Elle ne suffit donc pas \xe0 authentifier l'exp\xe9diteur.`,formula:"H : \\{0, 1\\}^* \\longrightarrow \\{0, 1\\}^n"},{id:"2-4",title:"Le MAC (Message Authentication Code)",pdfSection:"Section 2.4",pdfPage:10,content:`Un MAC est une valeur de contr\xf4le cryptographique calcul\xe9e \xe0 partir d'un message, d'une cl\xe9 secr\xe8te partag\xe9e et d'un algorithme cryptographique. Le r\xe9sultat est appel\xe9 tag, code d'authentification ou \xe9tiquette d'authentification :
$$t = \\text{MAC}_k(m)$$

Formellement, un MAC est d\xe9fini par trois algorithmes : la g\xe9n\xe9ration de cl\xe9 $\\text{Gen}$, le calcul du tag $\\text{Tag}$ et la v\xe9rification $\\text{Vrfy}$. Alice envoie le couple $(m, t)$; Bob recalcule $\\text{MAC}_k(m)$ avec la cl\xe9 partag\xe9e et accepte le message si, et seulement si, le r\xe9sultat est \xe9gal \xe0 $t$.

Un MAC est dit s\xfbr s'il est **infalsifiable** : un adversaire qui conna\xeet des couples $(m_i, t_i)$ de son choix ne peut pas produire un nouveau couple valide $(m, t)$ sans conna\xeetre $k$.

Le MAC assure deux propri\xe9t\xe9s : **l'int\xe9grit\xe9** et **l'authenticit\xe9**. En revanche :
- il ne chiffre pas le message, donc ne garantit pas sa confidentialit\xe9 ;
- il ne prouve pas l'identit\xe9 r\xe9elle de l'auteur (pas de non-r\xe9pudiation) ;
- il ne prot\xe8ge pas contre le rejeu d'un message valide d\xe9j\xe0 transmis.`,formula:"t = \\text{MAC}_k(m)"},{id:"2-7",title:"Comparaison des m\xe9canismes de s\xe9curit\xe9",pdfSection:"Section 2.7",pdfPage:11,content:`Tableau de comparaison synth\xe9tique issu directement du rapport :`,table:{headers:["M\xe9canisme","Cl\xe9","Int\xe9grit\xe9","Authenticit\xe9","Confidentialit\xe9","Non-r\xe9pudiation"],rows:[["Hachage seul","Aucune","Accidentelle uniquement","Non","Non","Non"],["Chiffrement sym\xe9trique seul","Secr\xe8te partag\xe9e","Non garantie","Non garantie","Oui","Non"],["MAC (HMAC, CMAC)","Secr\xe8te partag\xe9e","Oui","Oui","Non","Non"],["Signature num\xe9rique","Priv\xe9e / publique","Oui","Oui","Non","Oui"]]}},{id:"2-8",title:"La d\xe9rivation de cl\xe9s",pdfSection:"Section 2.8",pdfPage:11,content:`La d\xe9rivation de cl\xe9s (key derivation) est un proc\xe9d\xe9 cryptographique qui consiste \xe0 g\xe9n\xe9rer une ou plusieurs cl\xe9s cryptographiques \xe0 partir d'une cl\xe9 initiale, d'un mot de passe ou d'un secret partag\xe9, en utilisant un algorithme appel\xe9 KDF (Key Derivation Function). Elle permet par exemple d'obtenir plusieurs cl\xe9s ind\xe9pendantes (une pour le chiffrement, une pour l'authentification) \xe0 partir d'un unique secret.

Param\xe8tres suppl\xe9mentaires d'une KDF :
- **Sel (salt) :** Valeur al\xe9atoire, non n\xe9cessairement secr\xe8te, qui rend la d\xe9rivation unique et emp\xeache les attaques par tables pr\xe9calcul\xe9es.
- **Contexte (info) :** Information d\xe9crivant l'usage de la cl\xe9 d\xe9riv\xe9e (protocole, r\xf4le, version), qui garantit que des usages diff\xe9rents produisent des cl\xe9s diff\xe9rentes.
- **Nombre d'it\xe9rations :** Nombre de r\xe9p\xe9titions du calcul, destin\xe9 \xe0 ralentir volontairement un attaquant.
- **Longueur de sortie :** Taille de la cl\xe9 d\xe9riv\xe9e souhait\xe9e.

On distingue deux situations :
- d\xe9rivation depuis un secret cryptographique d\xe9j\xe0 fort (cl\xe9 issue d'un \xe9change Diffie-Hellman) -> KDF rapides comme **HKDF**, fond\xe9e sur HMAC ;
- d\xe9rivation depuis un mot de passe humain, peu al\xe9atoire -> KDF volontairement lentes comme **PBKDF2, scrypt ou Argon2**.`},{id:"2-9",title:"Notions compl\xe9mentaires & Notations",pdfSection:"Sections 2.9 & 2.10",pdfPage:12,content:`- **Entropie :** Mesure du caract\xe8re impr\xe9visible d'un secret. Plus elle est \xe9lev\xe9e, plus le secret est difficile \xe0 deviner.
- **Fonction pseudo-al\xe9atoire (PRF) :** Fonction \xe0 cl\xe9 dont la sortie est indiscernable d'une suite al\xe9atoire pour quiconque ne conna\xeet pas la cl\xe9. HMAC est analys\xe9 comme une PRF, ce qui justifie son usage dans les KDF.
- **Nonce :** Valeur utilis\xe9e une seule fois, ajout\xe9e \xe0 un message pour emp\xeacher le rejeu.
- **Attaque par extension de longueur :** Attaque sur les constructions na\xefves de type $H(k \\parallel m)$, qui permet de forger l'empreinte d'un message prolong\xe9 sans conna\xeetre $k$.

*Notations du rapport :*
- $m$ : message
- $k$ : cl\xe9 secr\xe8te
- $t$ : tag (code d'authentification)
- $H$ : fonction de hachage
- $\\parallel$ : concat\xe9nation
- $\\oplus$ : OU exclusif (XOR) bit \xe0 bit
- $\\{0, 1\\}^*$ : suites de bits de longueur quelconque`}]},{id:"part-3",partNumber:3,title:"Fonctions de hachage",pdfChapter:"Chapitre 3",pdfPages:"pp. 13–24",sections:[{id:"3-1",title:"D\xe9finition et propri\xe9t\xe9s attendues",pdfSection:"Section 3.1",pdfPage:13,content:`Une fonction de hachage cryptographique convertit une donn\xe9e d'entr\xe9e de taille arbitraire en une s\xe9quence binaire de longueur fixe $n$ bits. Par exemple, SHA-256 renvoie toujours 256 bits : l'empreinte du texte \xab abc \xbb est :
\`ba7816bf 8f01cfea 414140de 5dae2223 b00361a3 96177a9c b410ff61 f20015ad\`
que le message fasse 3 octets ou 3 gigaoctets.

Les trois formes de r\xe9sistance exig\xe9es :
1. **R\xe9sistance \xe0 la pr\xe9image :** Connaissant $y$, on ne peut pas trouver $x$ tel que $H(x) = y$ (effort : $2^n$).
2. **R\xe9sistance \xe0 la seconde pr\xe9image :** Connaissant $x_1$, on ne peut pas trouver $x_2 \\neq x_1$ tel que $H(x_2) = H(x_1)$ (effort : $2^n$).
3. **R\xe9sistance aux collisions :** On ne peut pas trouver deux messages distincts ayant la m\xeame empreinte (effort : $2^{n/2}$).

**Effet d'avalanche :** modifier un seul bit du message doit changer environ la moiti\xe9 des bits de l'empreinte, sans corr\xe9lation exploitable.`,formula:"H(x) = y, \\quad |y| = n \\text{ bits}"},{id:"3-2",title:"Le paradoxe des anniversaires & D\xe9monstration pas \xe0 pas",pdfSection:"Sections 3.2 & 3.3",pdfPage:14,content:`Trouver une collision est bien plus facile que trouver une pr\xe9image. Si l'on calcule $k$ empreintes de $n$ bits, la probabilit\xe9 qu'au moins deux soient identiques est d'environ :
$$P \\approx 1 - e^{-k^2 / 2^{n+1}}$$

Elle atteint 50 % pour $k \\approx 1,18 \\cdot 2^{n/2}$. Une empreinte de $n$ bits n'offre donc que $n/2$ bits de s\xe9curit\xe9 contre les collisions : $2^{64}$ op\xe9rations suffisent en th\xe9orie contre une sortie de 128 bits (MD5), $2^{80}$ contre 160 bits (SHA-1), alors que $2^{128}$ sont n\xe9cessaires contre SHA-256.

**D\xe9monstration pas \xe0 pas (Rapport p. 15) :**
1. *Probabilit\xe9 d'absence de collision :*
$$P(\\text{aucune collision}) = \\prod_{i=0}^{k-1} \\left(1 - \\frac{i}{N}\\right)$$
2. *Passage au logarithme :* avec $\\ln(1-x) \\approx -x$ pour $x$ petit :
$$\\ln P \\approx -\\sum_{i=0}^{k-1} \\frac{i}{N} = -\\frac{k(k-1)}{2N}$$
3. *Probabilit\xe9 de collision :*
$$P_{\\text{collision}} \\approx 1 - e^{-k^2 / (2 \\cdot 2^n)} = 1 - e^{-k^2 / 2^{n+1}}$$
4. *Seuil \xe0 50 % :*
$$\\frac{k^2}{2N} = \\ln 2 \\implies k = \\sqrt{2 \\ln 2 \\cdot N} \\approx 1,1774 \\times 2^{n/2}$$
5. *Cas classique des anniversaires :* Pour $N = 365$ jours, le seuil est $k \\approx 1,1774 \\times \\sqrt{365} \\approx 22,5$, soit 23 personnes ($P = 50,7 \\%$).`,formula:"P_{\\text{collision}} \\approx 1 - e^{-k^2/2^{n+1}}, \\quad k_{50\\%} \\approx 1,1774 \\cdot 2^{n/2}"},{id:"3-4",title:"Architectures : Merkle–Damg\xe5rd vs \xc9ponge de Keccak",pdfSection:"Section 3.4",pdfPage:17,content:`**1. La construction de Merkle–Damg\xe5rd (1989)**
Transforme une fonction de compression $f$, \xe0 entr\xe9es de taille fixe, en une fonction pour messages de longueur quelconque en trois \xe9tapes :
- *Remplissage (padding) :* ajout d'un bit 1, de z\xe9ros, puis de la longueur encod\xe9e sur 64 bits (128 bits pour SHA-512) -> renforcement de Merkle-Damg\xe5rd.
- *D\xe9coupage en blocs :* $m_1, m_2, \\dots, m_k$.
- *Cha\xeenage :* $h_0 = IV, \\quad h_i = f(h_{i-1}, m_i), \\quad H(m) = h_k$.
Sch\xe9ma Davies-Meyer : $f(h, m) = E_m(h) \\oplus h$.

**2. La construction \xe9ponge de Keccak (SHA-3)**
Abandonne le cha\xeenage de blocs. \xc9tat de 1600 bits d\xe9coup\xe9 en : d\xe9bit $r$ (rate) et capacit\xe9 $c$ (capacity, cach\xe9e), avec $r + c = 1600$.
- *Absorption :* chaque bloc de $r$ bits est combin\xe9 par XOR avec la partie $r$ de l'\xe9tat, puis la permutation Keccak-$f[1600]$ (24 tours) est appliqu\xe9e.
- *Essorage :* lecture de $r$ bits comme sortie.
S\xe9curit\xe9 g\xe9n\xe9rique : $\\min(n/2, c/2)$ contre les collisions, $\\min(n, c/2)$ contre la pr\xe9image.

**Comparaison des deux architectures (Rapport p. 19) :**
- \xc9tat interne : \xc9gal \xe0 la sortie dans MD (256 ou 512 bits) vs 1600 bits dans l'\xc9ponge.
- Sortie r\xe9v\xe8le l'\xe9tat : **Oui** pour SHA-256/SHA-512 vs **Non** pour SHA-3.
- Extension de longueur : **Possible** sur Merkle-Damg\xe5rd vs **Impossible** sur Keccak.`},{id:"3-6",title:"Attaques contre les fonctions de hachage & L'extension de longueur",pdfSection:"Section 3.6",pdfPage:21,content:`Tableau synth\xe9tique des attaques du rapport :
- **Force brute / dictionnaire :** essayer des entr\xe9es. Parade : sortie $\\ge 256$ bits, sel et fonction lente.
- **Tables arc-en-ciel (Oechslin, 2003) :** compromis temps-m\xe9moire. Parade : sel unique par utilisateur.
- **Collision diff\xe9rentielle :** compensation des diff\xe9rences au fil des tours (Wang 2004 sur MD5, SHAttered 2017 sur SHA-1). Parade : abandonner l'algorithme.
- **Multicollisions de Joux (2004) :** obtenir $2^k$ collisions pour le co\xfbt de $k \\times 2^{n/2}$. Concat\xe9ner $H_1(m) \\parallel H_2(m)$ n'apporte pas la s\xe9curit\xe9 d'une fonction de taille somme !
- **Attaque par extension de longueur (Section 3.6.4 & 7.3) :**
Dans Merkle-Damg\xe5rd, l'empreinte finale $H(m)$ est l'\xe9tat interne final. Un attaquant connaissant $H(m)$ et la longueur de $m$ peut reprendre le calcul \xe0 partir de cet \xe9tat, ajouter son texte $m'$ et obtenir une empreinte valide de $m \\parallel \\text{pad}(m) \\parallel m'$ sans conna\xeetre $m$ :
$$H(m) \\longmapsto H(m \\parallel \\text{pad}(m) \\parallel m')$$
Cette attaque a permis \xe0 Duong et Rizzo en 2009 de forger des requ\xeates sign\xe9es dans l'API Flickr qui utilisait $MD5(\\text{secret} \\parallel \\text{param\xe8tres})$.`,formula:"H(m) \\longmapsto H(m \\parallel \\text{pad}(m) \\parallel m')"}]},{id:"part-4",partNumber:4,title:"Le MAC : un code d'authentification utile mais insuffisant",pdfChapter:"Chapitre 4",pdfPages:"pp. 24–29",sections:[{id:"4-1",title:"Origine, principe et mod\xe8le formel EUF-CMA",pdfSection:"Sections 4.1–4.3",pdfPage:24,content:`Les travaux fondateurs de Gilbert, MacWilliams et Sloane (1974) sur les codes de d\xe9tection de tromperie ont pos\xe9 les bases th\xe9oriques des codes d'authentification.

Un MAC est un triplet d'algorithmes : $(\\text{Gen}, \\text{Tag}, \\text{Vrfy})$.
La s\xe9curit\xe9 d'un MAC se d\xe9finit par l'**infalsifiabilit\xe9 existentielle sous attaque \xe0 messages choisis (EUF-CMA)** : un adversaire capable d'obtenir le tag de messages $m_1, m_2, \\dots$ de son choix ne peut pas forger un couple valide $(m, t)$ pour un message jamais soumis.
Cons\xe9quence directe : pour un tag de $\\tau$ bits, un adversaire devinant au hasard r\xe9ussit avec la probabilit\xe9 $2^{-\\tau}$.`,formula:"P_{\\text{devinette}} = 2^{-\\tau}"},{id:"4-4",title:"CBC-MAC : Fonctionnement et faille sur longueur variable",pdfSection:"Section 4.4",pdfPage:25,content:`Le CBC-MAC d\xe9coupe le message en blocs de la taille du chiffrement (16 octets pour AES). Il initialise l'\xe9tat \xe0 z\xe9ro :
$$C_0 = 0, \\quad C_i = E_k(C_{i-1} \\oplus M_i) \\quad (1 \\le i \\le n), \\quad t = C_n$$

**S\xe9curit\xe9 et faiblesse du CBC-MAC (Rapport p. 26) :**
Le CBC-MAC est s\xfbr lorsque tous les messages ont la m\xeame longueur fixe [7]. Il devient **falsifiable pour des messages de longueur variable**.
Soit $m = M_1 \\parallel \\dots \\parallel M_n$ de tag $t$, et $m' = M'_1 \\parallel \\dots \\parallel M'_p$ de tag $t'$.
Alors le message forg\xe9 :
$$m'' = M_1 \\parallel \\dots \\parallel M_n \\parallel (M'_1 \\oplus t) \\parallel M'_2 \\parallel \\dots \\parallel M'_p$$
a exactement pour tag $t'$. En effet, apr\xe8s le bloc $M_n$, l'\xe9tat est $t$. Le bloc suivant donne :
$$E_k(t \\oplus (M'_1 \\oplus t)) = E_k(M'_1)$$
qui est exactement le premier \xe9tat du calcul de $m'$, et toute la suite est identique ! L'adversaire a falsifi\xe9 un tag pour un message jamais soumis avec seulement deux requ\xeates.

*Correctifs :* pr\xe9fixer la longueur, chiffrer le dernier \xe9tat avec une seconde cl\xe9 (ECBC-MAC), ou utiliser le CMAC (NIST SP 800-38B, avec sous-cl\xe9s $K_1, K_2$).`,formula:"m'' = M_1 \\parallel \\dots \\parallel M_n \\parallel (M'_1 \\oplus t) \\parallel M'_2 \\dots \\implies \\text{Tag} = t'"},{id:"4-5",title:"Constructions na\xefves \xe0 base de hachage et leurs failles",pdfSection:"Section 4.5",pdfPage:26,content:`Tableau des constructions na\xefves du rapport (p. 29) :`,table:{headers:["Construction na\xefve","Faiblesse principale identifi\xe9e dans le rapport"],rows:[["H(k ∥ m) [MAC pr\xe9fixe]","Prolongement de longueur avec MD5, SHA-1, SHA-2 (ex: Flickr 2009)"],["H(m ∥ k) [MAC suffixe]","Substitution par collision de messages (attaque hors-ligne : H(m)=H(m') => H(m||k)=H(m'||k))"],["Double hachage ad hoc : H(H(m) ∥ k)","S\xe9curit\xe9 non prouv\xe9e, collision interne transmise au tag"],["MAC tronqu\xe9 trop court (< 80 bits)","Force r\xe9duite : probabilit\xe9 de deviner le tag \xe9gale \xe0 2^{-lambda}"],["Cl\xe9 partag\xe9e entre usages","Confusion d'usage et r\xe9utilisation dangereuse (chiffrement et MAC)"]]}},{id:"4-6",title:"Limites du MAC",pdfSection:"Section 4.6",pdfPage:29,content:`Un MAC est utile mais insuffisant :
- Il ne garantit pas l'authenticit\xe9 absolue : si la cl\xe9 est compromise, tout est perdu.
- Il n'assure pas la non-r\xe9pudiation : Alice et Bob partagent la m\xeame cl\xe9.
- Il ne prot\xe8ge pas contre le rejeu : un message valide peut \xeatre renvoy\xe9 tel quel s'il ne contient pas de nonce ou d'horodatage.
- Il suppose le partage pr\xe9alable d'un secret (probl\xe8me de distribution des cl\xe9s).
- Il ne chiffre pas : la confidentialit\xe9 doit \xeatre assur\xe9e s\xe9par\xe9ment.`}]},{id:"part-5",partNumber:5,title:"Le HMAC",pdfChapter:"Chapitre 5",pdfPages:"pp. 29–34",sections:[{id:"5-1",title:"Origine, motivation et d\xe9finition formelle",pdfSection:"Sections 5.1 & 5.2",pdfPage:29,content:`Con\xe7u par Mihir Bellare, Ran Canetti et Hugo Krawczyk (CRYPTO 1996, RFC 2104 en 1997, FIPS 198-1).

Formule canonique :
$$HMAC(k, m) = H((K' \\oplus opad) \\parallel H((K' \\oplus ipad) \\parallel m))$$

\xc9l\xe9ments de la formule :
- $K'$ : la cl\xe9 $k$ ramen\xe9e \xe0 $B$ octets ($B=64$ pour SHA-256, $B=128$ pour SHA-512). Si $k$ est plus courte, compl\xe9t\xe9e par des z\xe9ros ; si plus longue, remplac\xe9e d'abord par $H(k)$ puis compl\xe9t\xe9e.
- $ipad$ : l'octet \`0x36\` r\xe9p\xe9t\xe9 $B$ fois (inner pad).
- $opad$ : l'octet \`0x5C\` r\xe9p\xe9t\xe9 $B$ fois (outer pad).
- $\\parallel$ : concat\xe9nation, $\\oplus$ : OU exclusif bit \xe0 bit.`,formula:"HMAC(k, m) = H((K' \\oplus opad) \\parallel H((K' \\oplus ipad) \\parallel m))"},{id:"5-3",title:"D\xe9roulement en deux passes & Pourquoi deux passes sont n\xe9cessaires",pdfSection:"Sections 5.3 & 5.4",pdfPage:30,content:`HMAC calcule deux hachages embo\xeet\xe9s avec deux cl\xe9s distinctes d\xe9riv\xe9es de $K'$ :
1. **D\xe9rivation des deux cl\xe9s :** $K_i = K' \\oplus ipad$ et $K_o = K' \\oplus opad$. Comme $0x36 \\oplus 0x5C = 0x6A$, ces deux cl\xe9s diff\xe8rent sur exactement la moiti\xe9 de leurs bits.
2. **Passe interne :** on hache $K_i \\parallel m$. Son r\xe9sultat $h_{int}$ est un \xe9tat interm\xe9diaire secret qui ne sort jamais.
3. **Passe externe :** on hache $K_o \\parallel h_{int}$. Son entr\xe9e a une taille fixe ($B$ octets de cl\xe9 plus taille de condensat), et son r\xe9sultat est le tag publi\xe9.

**Pourquoi deux passes sont n\xe9cessaires (Rapport p. 31) :**
- *Contre l'extension de longueur :* le tag publi\xe9 est la sortie de la passe externe $H(K_o \\parallel h_{int})$. Pour falsifier le message, l'attaquant devrait conna\xeetre l'\xe9tat $h_{int}$ de la passe interne ainsi que $K_o$. Il ne dispose ni de l'un ni de l'autre !
- *Contre les collisions :* la preuve de Bellare (2006) montre que HMAC reste un MAC s\xfbr sans exiger que $H$ r\xe9siste aux collisions, tant que sa fonction de compression se comporte comme une fonction pseudo-al\xe9atoire (PRF). C'est pourquoi HMAC-MD5 n'est pas cass\xe9 en tant que MAC.`},{id:"5-7",title:"Vecteur de test officiel RFC 4231 & Exemple Python",pdfSection:"Section 5.7",pdfPage:33,content:`Exemple officiel du rapport :
\`\`\`python
import hmac, hashlib
cle = b"Jefe"
message = b"what do ya want for nothing?"
tag = hmac.new(cle, message, hashlib.sha256).hexdigest()
# R\xe9sultat : 5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843
\`\`\`
*V\xe9rification en temps constant :* la comparaison doit utiliser une fonction en temps constant (\`compare_digest\` ou \`crypto.timingSafeEqual\`) et JAMAIS l'op\xe9rateur \`==\` qui fuite des informations par canal auxiliaire.`},{id:"5-8",title:"Applications pratiques du HMAC",pdfSection:"Section 5.8",pdfPage:34,content:"Tableau des applications du rapport :",table:{headers:["Domaine","Primitive utilis\xe9e","R\xf4le"],rows:[["TLS / HTTPS","HMAC (TLS <= 1.2), HKDF, AEAD (TLS 1.3)","Prot\xe9ger chaque enregistrement et d\xe9river les cl\xe9s de session"],["IPsec, SSH","HMAC-SHA2 ou AEAD","Authentifier chaque paquet"],["JWT (jetons web)","HS256 = HMAC-SHA256, ou signature RS256/ES256","Garantir qu'un jeton de session n'a pas \xe9t\xe9 modifi\xe9"],["API et webhooks","HMAC-SHA256 sur la requ\xeate","Prouver la l\xe9gitimit\xe9 du partenaire \xe9metteur"],["Paiements & transactions","HMAC ou signature sur le message de transaction","Emp\xeacher la modification du montant ou du destinataire"],["Mots de passe","PBKDF2 (fond\xe9 sur HMAC), bcrypt, scrypt, Argon2","Stocker une empreinte lente et sal\xe9e plut\xf4t que le mot de passe"]]}}]},{id:"part-6",partNumber:6,title:"La d\xe9rivation des cl\xe9s",pdfChapter:"Chapitre 6",pdfPages:"pp. 34–41",sections:[{id:"6-1",title:"Pourquoi d\xe9river des cl\xe9s ? & Param\xe8tres",pdfSection:"Section 6.1",pdfPage:34,content:`Une KDF (Key Derivation Function) garantit que les cl\xe9s produites sont pseudo-al\xe9atoires et de la bonne longueur. Elle ne peut pas cr\xe9er d'entropie.

Raisons fondamentales :
- **Une cl\xe9, un usage :** s\xe9paration de domaine assur\xe9e par le contexte (\`info\`).
- **Adapter longueur et format :** adapter \xe0 la taille attendue (ex: 128 ou 256 bits pour AES).
- **Uniformiser un secret non uniforme :** un secret Diffie-Hellman est un \xe9l\xe9ment de groupe ; on le passe par une KDF.
- **Renforcer un mot de passe faible :** ralentir les essais par co\xfbt de calcul.
- **Renouveler les cl\xe9s :** d\xe9river une nouvelle cl\xe9 par session, message ou fichier.

Param\xe8tres (Rapport p. 35) :
- *IKM (Input Key Material) :* source secr\xe8te.
- *Sel (salt) :* valeur al\xe9atoire publique, rend la d\xe9rivation unique.
- *Contexte (info) :* \xe9tiquette publique d'usage de la cl\xe9.
- *Co\xfbt :* nombre d'it\xe9rations, m\xe9moire, parall\xe9lisme.
- *Longueur souhait\xe9e (L) :* taille finale en octets.
- *OKM (Output Key Material) :* cl\xe9 secr\xe8te d\xe9riv\xe9e finale.`},{id:"6-3",title:"HKDF : Extraction puis Expansion (RFC 5869)",pdfSection:"Section 6.3",pdfPage:36,content:`HKDF (Krawczyk et Eronen, 2010, RFC 5869) se d\xe9roule en deux \xe9tapes :

**\xc9tape 1 : Extraction (HKDF-Extract)**
Obtention d'une cl\xe9 pseudo-al\xe9atoire uniforme PRK \xe0 partir de l'IKM et du sel :
$$PRK = HMAC(salt, IKM)$$
Si le sel est absent, on utilise une cha\xeene de z\xe9ros de taille $HashLen$.

**\xc9tape 2 : Expansion (HKDF-Expand)**
Production de la sortie OKM de $L$ octets :
$$T(0) = \\epsilon$$
$$T(i) = HMAC(PRK, T(i-1) \\parallel info \\parallel i) \\quad (i = 1, 2, \\dots)$$
$$OKM = \\text{premiers } L \\text{ octets de } T(1) \\parallel T(2) \\dots$$
o\xf9 $i$ est un compteur cod\xe9 sur un octet ($1 \\le i \\le 255$, max $255 \\times HashLen$ octets).

*Vecteur de test RFC 5869 du rapport (p. 38) :*
IKM = 22 octets \`0x0b\`, salt = \`0x00..0x0c\`, info = \`0xf0..0xf9\`, $L=42$ :
\`OKM = 3cb25f25faacd57a90434f64d0362f2a2d2d0a90cf1a5a4c5db02d56ecc4c5bf34007208d5b887185865\``,formula:"PRK = HMAC(salt, IKM), \\quad T(i) = HMAC(PRK, T(i-1) \\parallel info \\parallel i)"},{id:"6-4",title:"D\xe9rivation \xe0 partir de mots de passe (PBKDF2, bcrypt, scrypt, Argon2)",pdfSection:"Section 6.4",pdfPage:38,content:"Tableau comparatif des KDF pour mots de passe du rapport (p. 39) :",table:{headers:["Fonction","Param\xe8tres de co\xfbt","R\xe9sistance GPU","M\xe9moire","Remarque"],rows:[["PBKDF2","It\xe9rations c","Faible","N\xe9gligeable","Approuv\xe9 FIPS (RFC 8018)"],["bcrypt","Facteur de co\xfbt","Moyenne","Faible, fixe","Limite connue de 72 octets (1999)"],["scrypt","N, r, p","Forte","R\xe9glable","Memory-hard (RFC 7914, 2009)"],["Argon2id","m, t, p","Forte","R\xe9glable","Vainqueur PHC, recommand\xe9 (RFC 9106, 2021)"]]}}]},{id:"part-7",partNumber:7,title:"Probl\xe8mes, limites et attaques",pdfChapter:"Chapitre 7",pdfPages:"pp. 41–46",sections:[{id:"7-1",title:"Panorama : contrefa\xe7on et attaques g\xe9n\xe9riques",pdfSection:"Section 7.1",pdfPage:41,content:`Tableau des attaques appliqu\xe9 aux MAC (Rapport p. 42) :`,table:{headers:["Attaque","Principe appliqu\xe9 \xe0 un MAC","Parade"],rows:[["Force brute sur la cl\xe9","Essayer toutes les cl\xe9s jusqu'\xe0 retrouver t ; co\xfbt 2^{|k|}","Cl\xe9 d'au moins 128 bits g\xe9n\xe9r\xe9e al\xe9atoirement"],["Devinette du tag","Proposer un tag au hasard : probabilit\xe9 2^{-tau} ; attaque en ligne","Tag d'au moins 80 bits, limitation du nombre d'essais"],["Messages connus","Exploiter des couples (m_i, t_i) observ\xe9s pour d\xe9duire la cl\xe9","MAC s\xfbr (HMAC, CMAC), cl\xe9 forte"],["Messages choisis","L'attaquant obtient le tag de messages de son choix (mod\xe8le EUF-CMA)","Preuve de s\xe9curit\xe9 formelle de la construction"],["Homme du milieu (MitM)","Un tiers s'interpose, capte et modifie les messages","MAC v\xe9rifi\xe9 \xe0 chaque message, certificats"],["Mesure du temps (timing attack)","D\xe9duire des informations secr\xe8tes du temps de calcul ou v\xe9rification","Comparaison en temps constant (Section 7.4)"],["Rejeu (replay)","Renvoyer un message authentique d\xe9j\xe0 intercept\xe9","Nonce, compteur, horodatage (Section 7.5)"]]}},{id:"7-4",title:"Attaques par canaux auxiliaires & Comparaison en temps constant",pdfSection:"Section 7.4",pdfPage:43,content:`Si le serveur compare le tag re\xe7u au tag attendu octet par octet avec l'op\xe9rateur \`==\` et s'arr\xeate d\xe8s la premi\xe8re diff\xe9rence, le temps de r\xe9ponse r\xe9v\xe8le le nombre d'octets corrects !
L'attaquant peut alors deviner le tag octet par octet : $256$ essais par position au lieu de $2^{8L}$ pour un tag de $L$ octets, ramenant une recherche exponentielle \xe0 une recherche lin\xe9aire !

Code comparatif du rapport (p. 44) :
\`\`\`python
# VULN\xc9RABLE : s'arr\xeate au premier octet diff\xe9rent (fuite temporelle)
def verifier_naif(tag_attendu, tag_recu):
    return tag_attendu == tag_recu

# S\xdbR : temps constant
def verifier_sur(tag_attendu, tag_recu):
    return hmac.compare_digest(tag_attendu, tag_recu)
\`\`\``},{id:"7-5",title:"Rejeu (replay) et n\xe9cessit\xe9 de nonces / horodatage",pdfSection:"Section 7.5",pdfPage:44,content:`Un MAC garantit l'int\xe9grit\xe9 et l'authenticit\xe9 d'un message, mais **pas sa fra\xeecheur**. Si Alice envoie \xab payer 100 \xbb, l'adversaire peut le renvoyer dix fois si le message ne comporte pas d'indicateur d'unicit\xe9 :
$$t = \\text{MAC}_k(c \\parallel m), \\quad c \\in \\{\\text{compteur, nonce, horodatage}\\}$$

Tableau comparatif des m\xe9canismes anti-rejeu du rapport :
- **Compteur (num\xe9ro de s\xe9quence) :** chaque message porte un num\xe9ro strictement croissant ; le r\xe9cepteur rejette un num\xe9ro d\xe9j\xe0 vu. Limite : \xe9tat synchronis\xe9 requis.
- **Nonce :** valeur al\xe9atoire ou unique par message m\xe9moris\xe9e par le r\xe9cepteur. Limite : stockage des nonces.
- **Horodatage :** le r\xe9cepteur rejette ce qui sort d'une fen\xeatre de validit\xe9. Limite : horloges \xe0 synchroniser.`},{id:"7-7",title:"Menaces futures : Cryptanalyse & Ordinateur quantique",pdfSection:"Section 7.7",pdfPage:45,content:`L'ordinateur quantique menace tr\xe8s diff\xe9remment les deux familles de cryptographie :
- **Cryptographie asym\xe9trique (RSA, Diffie-Hellman, ECC) :** l'algorithme de Shor la casse compl\xe8tement. R\xe9ponse : cryptographie post-quantique ML-KEM (FIPS 203) et ML-DSA (FIPS 204).
- **Cryptographie sym\xe9trique et hachage :** l'algorithme de Grover acc\xe9l\xe8re la recherche exhaustive en racine carr\xe9e. Une cl\xe9 de $k$ bits passe \xe0 $k/2$ bits de s\xe9curit\xe9 quantique, et une pr\xe9image co\xfbte $2^{n/2}$. Il n'y a pas de rupture : il suffit de doubler les tailles ! Une cl\xe9 de 256 bits et un HMAC-SHA-256 ou HMAC-SHA-512 restent consid\xe9r\xe9s comme s\xfbrs.`,table:{headers:["Primitive","Menace quantique","R\xe9ponse recommand\xe9e"],rows:[["RSA, Diffie-Hellman, ECC","Cass\xe9es par l'algorithme de Shor","Post-quantique : ML-KEM (FIPS 203), ML-DSA (FIPS 204)"],["Cl\xe9 de MAC ou chiffrement sym\xe9trique","Recherche en 2^{k/2} (Grover)","Cl\xe9s de 256 bits"],["Fonctions de hachage, HMAC","Pr\xe9image en 2^{n/2} (Grover) ; collisions en 2^{n/3}","Sorties de 256 bits ou plus (SHA-256, SHA-512, SHA-3)"]]}}]},{id:"part-8",partNumber:8,title:"Conclusion et r\xe9f\xe9rences bibliographiques",pdfChapter:"Conclusion & R\xe9f\xe9rences",pdfPages:"pp. 46–48",sections:[{id:"8-1",title:"Conclusion g\xe9n\xe9rale du rapport",pdfSection:"Conclusion",pdfPage:46,content:`Nous sommes partis d'une question simple : comment faire confiance \xe0 un message transmis sur un canal non s\xe9curis\xe9 ? Nous avons vu qu'une fonction de hachage seule ne suffit pas, puisque n'importe qui peut la calculer : elle d\xe9tecte les erreurs, pas les falsifications. Il faut y associer un secret partag\xe9, ce qui donne le MAC, qui garantit l'int\xe9grit\xe9 et l'authenticit\xe9 du message.

Les premiers MAC (CBC-MAC) ont montr\xe9 leurs limites sur les longueurs variables, tandis que les constructions na\xefves ($H(k \\parallel m)$) tombaient sous l'extension de longueur. Le HMAC, avec ses deux passes et ses deux cl\xe9s d\xe9riv\xe9es, a apport\xe9 une construction simple, rapide et accompagn\xe9e d'une preuve de s\xe9curit\xe9, au point d'\xeatre au cœur de TLS, IPsec et des API. La d\xe9rivation de cl\xe9s prolonge cette id\xe9e avec HKDF.

Pourtant, aucun de ces outils n'est suffisant \xe0 lui seul : un MAC ne prot\xe8ge ni de la lecture, ni du rejeu, ni de la fuite de cl\xe9, et n'apporte pas de non-r\xe9pudiation. S\xe9curiser un message, c'est choisir et assembler avec soin plusieurs briques compl\xe9mentaires.`},{id:"8-2",title:"Les 26 R\xe9f\xe9rences bibliographiques officielles",pdfSection:"R\xe9f\xe9rences [1] \xe0 [26]",pdfPage:47,content:`1. **[1]** H. Krawczyk, M. Bellare, R. Canetti, *HMAC : Keyed-Hashing for Message Authentication*, RFC 2104, 1997.
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
26. **[26]** NIST, *FIPS 203 (ML-KEM) and FIPS 204 (ML-DSA) Post-Quantum Standards*, 2024.`}]}];var r=a(2102);function o(){let[e,t]=(0,i.useState)("part-1"),[a,o]=(0,i.useState)(""),l=s.find(t=>t.id===e)||s[0],u=a.trim()?l.sections.filter(e=>e.title.toLowerCase().includes(a.toLowerCase())||e.content.toLowerCase().includes(a.toLowerCase())):l.sections;return(0,n.jsxs)("div",{className:"py-6 sm:py-8 flex flex-col gap-6",children:[(0,n.jsxs)("div",{className:"bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-6 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-3",children:[(0,n.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[(0,n.jsxs)("div",{className:"inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed dark:bg-primary-container/30 text-on-primary-fixed dark:text-primary-fixed",children:[n.jsx("span",{className:"material-symbols-outlined text-[16px]",children:"menu_book"}),n.jsx("span",{className:"font-label-sm text-xs font-semibold uppercase tracking-wider",children:"Documentation Scientifique Officielle"})]}),n.jsx("span",{className:"font-mono text-xs text-primary font-semibold",children:"Source Unique : Rapport ENSPY 3GI (Groupe 23, 7 nov. 2026)"})]}),(0,n.jsxs)("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-4",children:[(0,n.jsxs)("div",{children:[n.jsx("h1",{className:"font-headline-xl text-2xl sm:text-3xl font-bold text-on-surface dark:text-zinc-100",children:"Manuel Cryptographique P\xe9dagogique"}),n.jsx("p",{className:"text-sm text-on-surface-variant dark:text-zinc-300 mt-1",children:"Th\xe9orie rigoureuse, d\xe9finitions, formules math\xe9matiques et d\xe9monstrations pas \xe0 pas sans aucune alt\xe9ration."})]}),(0,n.jsxs)("div",{className:"relative w-full sm:w-72",children:[n.jsx("span",{className:"material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant",children:"search"}),n.jsx("input",{type:"text",placeholder:"Rechercher une notion...",value:a,onChange:e=>o(e.target.value),className:"w-full pl-9 pr-3 py-2 rounded-xl bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/40 text-xs sm:text-sm text-on-surface dark:text-zinc-100 placeholder:text-on-surface-variant focus:outline-none focus:border-primary"})]})]})]}),(0,n.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",children:[(0,n.jsxs)("aside",{className:"lg:col-span-4 bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-4 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-2 sticky top-20",children:[(0,n.jsxs)("div",{className:"px-2 py-1.5 flex items-center justify-between border-b border-outline-variant/20",children:[n.jsx("span",{className:"font-mono text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-zinc-400",children:"Plan du Rapport (8 Parties)"}),n.jsx("span",{className:"text-xs font-mono text-primary font-semibold",children:"48 Pages"})]}),n.jsx("nav",{className:"flex flex-col gap-1 max-h-[70vh] overflow-y-auto pr-1",children:s.map(a=>{let i=a.id===e;return(0,n.jsxs)("button",{onClick:()=>{t(a.id),o("")},type:"button",className:`text-left px-3 py-2.5 rounded-xl transition-all flex items-start gap-2.5 ${i?"bg-primary text-white shadow-xs font-semibold":"text-on-surface-variant dark:text-zinc-300 hover:bg-surface-container-low dark:hover:bg-zinc-800"}`,children:[n.jsx("span",{className:`w-6 h-6 rounded flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 mt-0.5 ${i?"bg-white/20 text-white":"bg-surface-container dark:bg-zinc-700 text-on-surface-variant"}`,children:a.partNumber}),(0,n.jsxs)("div",{className:"flex flex-col min-w-0",children:[n.jsx("span",{className:"text-xs sm:text-sm leading-tight truncate",children:a.title}),(0,n.jsxs)("span",{className:`text-[10px] font-mono mt-0.5 ${i?"text-white/80":"text-on-surface-variant/70"}`,children:[a.pdfChapter," • ",a.pdfPages]})]})]},a.id)})})]}),(0,n.jsxs)("section",{className:"lg:col-span-8 flex flex-col gap-6",children:[(0,n.jsxs)("div",{className:"bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-6 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-2",children:[(0,n.jsxs)("div",{className:"flex items-center gap-2",children:[(0,n.jsxs)("span",{className:"px-2.5 py-0.5 rounded bg-primary-fixed dark:bg-primary-container/30 text-on-primary-fixed dark:text-primary-fixed text-xs font-mono font-bold",children:["PARTIE ",l.partNumber]}),(0,n.jsxs)("span",{className:"text-xs text-on-surface-variant font-mono",children:[l.pdfChapter," (",l.pdfPages,")"]})]}),n.jsx("h2",{className:"font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface dark:text-zinc-100",children:l.title})]}),u.map(e=>(0,n.jsxs)("article",{id:e.id,className:"bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-6 border border-outline-variant/30 dark:border-zinc-800 shadow-sm flex flex-col gap-4",children:[(0,n.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-outline-variant/20 dark:border-zinc-800",children:[n.jsx("h3",{className:"font-headline-md text-lg sm:text-xl font-bold text-on-surface dark:text-zinc-100",children:e.title}),(0,n.jsxs)("span",{className:"text-xs font-mono text-primary dark:text-amber-400 bg-primary-fixed/30 dark:bg-primary-container/20 px-2 py-0.5 rounded font-medium",children:["Source : Rapport Groupe 23, ",e.pdfSection,", page ",e.pdfPage]})]}),e.formula&&(0,n.jsxs)("div",{className:"p-4 rounded-xl bg-surface-container-low dark:bg-zinc-800/60 border border-outline-variant/30 dark:border-zinc-700 flex flex-col gap-1 items-start overflow-x-auto",children:[n.jsx("span",{className:"text-[11px] font-mono uppercase font-bold text-primary",children:"Formule Math\xe9matique du Rapport :"}),n.jsx(r.v,{formula:e.formula,display:!0,className:"text-lg text-on-surface dark:text-zinc-100 my-1"})]}),n.jsx("div",{className:"text-sm sm:text-base text-on-surface-variant dark:text-zinc-300 leading-relaxed whitespace-pre-line",children:e.content}),e.table&&n.jsx("div",{className:"overflow-x-auto rounded-xl border border-outline-variant/30 text-xs sm:text-sm font-mono mt-2",children:(0,n.jsxs)("table",{className:"w-full text-left border-collapse",children:[n.jsx("thead",{children:n.jsx("tr",{className:"bg-surface-container-high dark:bg-zinc-800 text-on-surface dark:text-zinc-100 font-bold",children:e.table.headers.map((e,t)=>n.jsx("th",{className:"p-3 border-b border-outline-variant/30",children:e},t))})}),n.jsx("tbody",{className:"divide-y divide-outline-variant/20 text-on-surface-variant dark:text-zinc-300",children:e.table.rows.map((e,t)=>n.jsx("tr",{className:"hover:bg-surface-container-low dark:hover:bg-zinc-800/50",children:e.map((e,t)=>n.jsx("td",{className:"p-3",children:e},t))},t))})]})}),e.keyPoints&&e.keyPoints.length>0&&n.jsx("div",{className:"flex flex-wrap gap-2 pt-2 border-t border-outline-variant/20",children:e.keyPoints.map((e,t)=>(0,n.jsxs)("span",{className:"px-2.5 py-1 rounded-full bg-surface-container-high dark:bg-zinc-800 text-xs font-mono text-on-surface dark:text-zinc-200",children:["✓ ",e]},t))})]},e.id))]})]})]})}},2102:(e,t,a)=>{"use strict";a.d(t,{v:()=>r});var n=a(326),i=a(7577),s=a(330);let r=({formula:e,display:t=!1,className:a=""})=>{let r=(0,i.useMemo)(()=>{try{return s.ZP.renderToString(e,{displayMode:t,throwOnError:!1})}catch{return e}},[e,t]);return n.jsx("span",{className:`inline-block ${a}`,dangerouslySetInnerHTML:{__html:r}})}},7942:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>n});let n=(0,a(8570).createProxy)(String.raw`/home/andeli/WORKING/Hachage/src/app/documentation/page.tsx#default`)}};var t=require("../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),n=t.X(0,[24,330,271],()=>a(6782));module.exports=n})();