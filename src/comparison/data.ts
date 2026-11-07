/**
 * Données comparatives des mécanismes d'authentification et de dérivation.
 * Source unique : Rapport universitaire ENSPY 3GI, Chapitres 1, 2, 3, 4, 5, 6 et 7.
 */

export interface PrimitiveComparison {
  id: string;
  name: string;
  category: 'hash_mac' | 'block_mac' | 'kdf' | 'keccak';
  constructionType: string;
  underlyingPrimitive: string;
  blockSizeBytes: number;
  blockSizeBits: number;
  tagSizeBytes: number;
  tagSizeBits: number;
  securityBitsGeneric: number;
  currentSecurityStatus: 'broken' | 'vulnerable' | 'legacy' | 'secure';
  statusLabel: string;
  advantages: string[];
  limitations: string[];
  recommendedUse: string;
  pdfReference: string;
  relativeLatencyScore: number; // approximate relative speed factor
}

export const PRIMITIVES_COMPARISON_DATA: PrimitiveComparison[] = [
  {
    id: 'naive_prefix',
    name: 'MAC Naïf : H(k ∥ m)',
    category: 'hash_mac',
    constructionType: 'Concaténation directe préfixe',
    underlyingPrimitive: 'SHA-256 (Merkle-Damgård)',
    blockSizeBytes: 64,
    blockSizeBits: 512,
    tagSizeBytes: 32,
    tagSizeBits: 256,
    securityBitsGeneric: 0,
    currentSecurityStatus: 'vulnerable',
    statusLabel: 'VULNÉRABLE (Extension de longueur)',
    advantages: [
      'Simple et intuitif à première vue',
      'Un seul appel à la fonction de compression',
    ],
    limitations: [
      'Vulnérabilité critique à l\'attaque par extension de longueur sur Merkle-Damgård (MD5, SHA-1, SHA-256)',
      'Un attaquant forge un message prolongé sans connaître la clé secrète k (Flickr 2009)',
      'La sortie de hachage révèle directement l\'état interne',
    ],
    recommendedUse: 'STRICTEMENT DÉCONSEILLÉ. Ne jamais fabriquer un MAC maison avec H(k || m).',
    pdfReference: 'Rapport ENSPY 3GI, Chapitre 4, Section 4.5.1, p. 26',
    relativeLatencyScore: 1.0,
  },
  {
    id: 'naive_suffix',
    name: 'MAC Suffixe : H(m ∥ k)',
    category: 'hash_mac',
    constructionType: 'Concaténation directe suffixe',
    underlyingPrimitive: 'SHA-256 (Merkle-Damgård)',
    blockSizeBytes: 64,
    blockSizeBits: 512,
    tagSizeBytes: 32,
    tagSizeBits: 256,
    securityBitsGeneric: 0,
    currentSecurityStatus: 'vulnerable',
    statusLabel: 'VULNÉRABLE (Collision hors-ligne)',
    advantages: [
      'Non vulnérable à l\'extension de longueur',
    ],
    limitations: [
      'Hérite directement des collisions du hachage : si H(m) = H(m\'), alors H(m || k) = H(m\' || k) pour toute clé k',
      'Attaque réalisable entièrement hors-ligne sans requêter le vérificateur',
    ],
    recommendedUse: 'STRICTEMENT DÉCONSEILLÉ.',
    pdfReference: 'Rapport ENSPY 3GI, Chapitre 4, Section 4.5.2, p. 27',
    relativeLatencyScore: 1.0,
  },
  {
    id: 'cbc_mac',
    name: 'CBC-MAC (AES-128)',
    category: 'block_mac',
    constructionType: 'Chaînage de blocs (Cipher Block Chaining)',
    underlyingPrimitive: 'AES-128 (FIPS 197)',
    blockSizeBytes: 16,
    blockSizeBits: 128,
    tagSizeBytes: 16,
    tagSizeBits: 128,
    securityBitsGeneric: 64, // anniversaire sur 128 bits = 2^64
    currentSecurityStatus: 'legacy',
    statusLabel: 'CONDITIONNEL (Sûr sur longueur fixe)',
    advantages: [
      'Historique et standardisé (ANSI X9.9, FIPS 113)',
      'Sûr lorsque tous les messages ont la même longueur fixe connue',
      'Réutilise le coprocesseur matériel de chiffrement par blocs',
    ],
    limitations: [
      'Falsifiable sur messages de longueur variable (attaque par coupure/recollement de tag)',
      'Sensible à l\'anniversaire au-delà de 2^64 blocs avec AES (2^32 blocs avec DES)',
      'Nécessite une parade : longueur préfixée, ECBC-MAC ou CMAC',
    ],
    recommendedUse: 'Remplacé par CMAC (NIST SP 800-38B) ou HMAC.',
    pdfReference: 'Rapport ENSPY 3GI, Chapitre 4, Section 4.4.1, pp. 25-26',
    relativeLatencyScore: 1.8,
  },
  {
    id: 'cmac',
    name: 'CMAC (NIST SP 800-38B)',
    category: 'block_mac',
    constructionType: 'Chaînage avec sous-clés K1, K2',
    underlyingPrimitive: 'AES-128 / AES-256',
    blockSizeBytes: 16,
    blockSizeBits: 128,
    tagSizeBytes: 16,
    tagSizeBits: 128,
    securityBitsGeneric: 64,
    currentSecurityStatus: 'secure',
    statusLabel: 'SÛR (Messages variables)',
    advantages: [
      'Résout la faille de longueur variable de CBC-MAC grâce à deux sous-clés dérivées K1 et K2',
      'Normalisé par le NIST en 2005 (SP 800-38B)',
      'Idéal sur systèmes embarqués disposant d\'un accélérateur matériel AES',
    ],
    limitations: [
      'Limité par la taille de bloc du chiffreur (128 bits)',
      'Performance logicielle inférieure à HMAC sur architectures sans instructions AES dédiées',
    ],
    recommendedUse: 'Recommandé pour les protocoles basés sur le chiffrement par blocs.',
    pdfReference: 'Rapport ENSPY 3GI, Chapitre 4, Section 4.4.2, p. 26',
    relativeLatencyScore: 1.9,
  },
  {
    id: 'hmac_md4',
    name: 'HMAC-MD4',
    category: 'hash_mac',
    constructionType: 'HMAC à double passe',
    underlyingPrimitive: 'MD4 (1990)',
    blockSizeBytes: 64,
    blockSizeBits: 512,
    tagSizeBytes: 16,
    tagSizeBits: 128,
    securityBitsGeneric: 64,
    currentSecurityStatus: 'broken',
    statusLabel: 'OBSOLÈTE (MD4 cassé)',
    advantages: [
      'Très rapide en calcul pur',
      'Preuve de principe historique',
    ],
    limitations: [
      'MD4 cassé en quelques opérations depuis 2004 (Wang)',
      'Digest trop court (128 bits, seulement 64 bits de résistance collision)',
    ],
    recommendedUse: 'OBSOLÈTE. Uniquement pour étude rétrospective.',
    pdfReference: 'Rapport ENSPY 3GI, Chapitre 3, Section 3.5.1, p. 20',
    relativeLatencyScore: 0.8,
  },
  {
    id: 'hmac_md5',
    name: 'HMAC-MD5',
    category: 'hash_mac',
    constructionType: 'HMAC à double passe (RFC 2104)',
    underlyingPrimitive: 'MD5 (1991)',
    blockSizeBytes: 64,
    blockSizeBits: 512,
    tagSizeBytes: 16,
    tagSizeBits: 128,
    securityBitsGeneric: 64,
    currentSecurityStatus: 'legacy',
    statusLabel: 'DÉCONSEILLÉ (MD5 cassé)',
    advantages: [
      'Preuve de Bellare (2006) : HMAC résiste même avec des collisions sur MD5 si la compression est une PRF',
      'Présent historiquement dans de nombreux protocoles legacy',
    ],
    limitations: [
      'MD5 vulnérable aux collisions en quelques secondes (Wang 2004, Flame 2012)',
      'Taille de sortie 128 bits insuffisante face aux standards modernes',
    ],
    recommendedUse: 'À bannir par mesure de prudence moderne.',
    pdfReference: 'Rapport ENSPY 3GI, Chapitre 5, Section 5.4, p. 32',
    relativeLatencyScore: 0.9,
  },
  {
    id: 'hmac_sha1',
    name: 'HMAC-SHA-1',
    category: 'hash_mac',
    constructionType: 'HMAC à double passe (RFC 2104)',
    underlyingPrimitive: 'SHA-1 (1995)',
    blockSizeBytes: 64,
    blockSizeBits: 512,
    tagSizeBytes: 20,
    tagSizeBits: 160,
    securityBitsGeneric: 80,
    currentSecurityStatus: 'legacy',
    statusLabel: 'DÉPRÉCIÉ (Retrait NIST 2030)',
    advantages: [
      'Encore utilisé dans Git, TLS 1.2 legacy et PBKDF2 (WPA2)',
      'HMAC atténue les attaques par collision connues sur SHA-1',
    ],
    limitations: [
      'Collisions pratiques réelles démontrées (SHAttered 2017, SHA-1 is a Shambles 2020)',
      'NIST a décrété son retrait complet d\'ici 2030',
    ],
    recommendedUse: 'Migration impérative vers SHA-2 ou SHA-3.',
    pdfReference: 'Rapport ENSPY 3GI, Chapitre 3, Section 3.5.2, pp. 20-21',
    relativeLatencyScore: 1.1,
  },
  {
    id: 'hmac_sha256',
    name: 'HMAC-SHA-256',
    category: 'hash_mac',
    constructionType: 'HMAC à double passe (FIPS 198-1, SP 800-224)',
    underlyingPrimitive: 'SHA-256 (SHA-2)',
    blockSizeBytes: 64,
    blockSizeBits: 512,
    tagSizeBytes: 32,
    tagSizeBits: 256,
    securityBitsGeneric: 128,
    currentSecurityStatus: 'secure',
    statusLabel: 'STANDARD INDUSTRIEL (Recommandé)',
    advantages: [
      'Aucune attaque pratique connue',
      'Passe externe neutralise totalement l\'extension de longueur',
      'Standard mondial universel : TLS, IPsec, SSH, JWT (HS256), Webhooks API',
      'Résistant à l\'ordinateur quantique avec clé de 256 bits (Grover)',
    ],
    limitations: [
      'Ne fournit pas de non-répudiation (clé partagée)',
      'Nécessite un nonce/horodatage pour prévenir le rejeu',
    ],
    recommendedUse: 'Standard de référence actuel pour l\'authentification de messages.',
    pdfReference: 'Rapport ENSPY 3GI, Chapitre 5, Sections 5.1-5.8, pp. 29-34',
    relativeLatencyScore: 1.2,
  },
  {
    id: 'hmac_sha512',
    name: 'HMAC-SHA-512',
    category: 'hash_mac',
    constructionType: 'HMAC à double passe (FIPS 198-1)',
    underlyingPrimitive: 'SHA-512 (SHA-2)',
    blockSizeBytes: 128,
    blockSizeBits: 1024,
    tagSizeBytes: 64,
    tagSizeBits: 512,
    securityBitsGeneric: 256,
    currentSecurityStatus: 'secure',
    statusLabel: 'HAUTE SÉCURITÉ (256 bits collision)',
    advantages: [
      'Sécurité maximale (256 bits de résistance collision, 512 bits préimage)',
      'Particulièrement performant sur architectures 64 bits natives',
      'Très haute marge de sécurité post-quantique',
    ],
    limitations: [
      'Taille de tag volumineuse (64 octets) si non tronquée',
    ],
    recommendedUse: 'Recommandé pour les applications critiques et l\'archivage longue durée.',
    pdfReference: 'Rapport ENSPY 3GI, Chapitre 3, Section 3.4.1 & 3.5.3, pp. 18, 21',
    relativeLatencyScore: 1.3,
  },
  {
    id: 'hkdf_sha256',
    name: 'HKDF (RFC 5869)',
    category: 'kdf',
    constructionType: 'KDF Extract-and-Expand (fondé sur HMAC)',
    underlyingPrimitive: 'HMAC-SHA-256',
    blockSizeBytes: 64,
    blockSizeBits: 512,
    tagSizeBytes: 32,
    tagSizeBits: 256,
    securityBitsGeneric: 128,
    currentSecurityStatus: 'secure',
    statusLabel: 'STANDARD DÉRIVATION (Haute entropie)',
    advantages: [
      'Structure rigoureuse en deux étapes : Extract (PRK) puis Expand (OKM)',
      'Assure la séparation de domaine via l\'étiquette de contexte info',
      'Standard au cœur de TLS 1.3 (RFC 8446) et Signal Double Ratchet',
    ],
    limitations: [
      'NE DOIT JAMAIS être utilisé directement sur un mot de passe humain (KDF rapide, vulnérable aux attaques par dictionnaire GPU)',
    ],
    recommendedUse: 'Dérivation de clés depuis un secret déjà fort (Diffie-Hellman, master key).',
    pdfReference: 'Rapport ENSPY 3GI, Chapitre 6, Section 6.3, pp. 36-38',
    relativeLatencyScore: 2.1,
  },
  {
    id: 'kmac',
    name: 'KMAC (NIST SP 800-185)',
    category: 'keccak',
    constructionType: 'Construction Éponge Keccak (FIPS 202)',
    underlyingPrimitive: 'cSHAKE / KECCAK',
    blockSizeBytes: 136, // rate r
    blockSizeBits: 1088,
    tagSizeBytes: 32,
    tagSizeBits: 256,
    securityBitsGeneric: 128,
    currentSecurityStatus: 'secure',
    statusLabel: 'NOUVELLE GÉNÉRATION (SHA-3)',
    advantages: [
      'Structure radicalement différente de Merkle-Damgård (immunité structurelle à l\'extension de longueur)',
      'Permet des longueurs de tag variables et la personnalisation de domaine native',
      'Normalisé par le NIST en décembre 2016 (KMAC128, KMAC256)',
    ],
    limitations: [
      'Moins répandu dans les protocoles historiques que HMAC-SHA-256',
    ],
    recommendedUse: 'Solution moderne d\'avenir et diversification algorithmique.',
    pdfReference: 'Rapport ENSPY 3GI, Chapitre 1, Section 1.4.4 & Chapitre 3, Section 3.4.2, pp. 7, 18',
    relativeLatencyScore: 1.5,
  },
];
