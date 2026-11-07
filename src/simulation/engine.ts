/**
 * Simulation engine for CryptoLab.
 * Implements Module 4 (Unauthenticated interception) and Module 5 (Authenticated simulation with probabilistic demo model).
 *
 * RÈGLE TECHNIQUE IMPÉRATIVE (Cahier des charges 7.3 & Addendum 8) :
 * Le moteur cryptographique réel calcule toujours la vérité mathématique : si m' != m et que le tag n'est pas recalculé,
 * le tag est INVALIDE à 100%. Le modèle probabiliste pédagogique est un moteur de simulation DISTINCT, explicitement
 * documenté comme une modélisation fictive pour l'apprentissage.
 */

import { calculateCbcMac } from '../crypto/cbc-mac';
import { calculateHmac } from '../crypto/hmac';
import { calculateNaiveMac } from '../crypto/naive-mac';
import { MacMechanism } from '../crypto/types';
import { timingSafeEqual } from '../crypto/utils';
import { SimulationProbProfile, SimulationResultRecord } from './types';

export const PEDAGOGICAL_PROFILES: Record<MacMechanism, SimulationProbProfile> = {
  naive_prefix: {
    mechanism: 'naive_prefix',
    name: 'MAC Naïf : H(k ∥ m)',
    defaultSuccessProb: 65,
    explanation:
      'Dans cette simulation pédagogique, l\'espion a 65% de chances de forger un tag valide en exploitant l\'attaque par extension de longueur de Merkle-Damgård.',
  },
  naive_suffix: {
    mechanism: 'naive_suffix',
    name: 'MAC Suffixe : H(m ∥ k)',
    defaultSuccessProb: 60,
    explanation:
      'Dans cette simulation pédagogique, l\'espion exploite une collision de message précalculée pour substituer le message avec 60% de chances simulées.',
  },
  cbc_mac: {
    mechanism: 'cbc_mac',
    name: 'CBC-MAC (AES-128)',
    defaultSuccessProb: 35,
    explanation:
      'Dans cette simulation pédagogique, l\'espion tente une falsification par coupure et recollement de blocs sur messages de longueur variable (35% de chances simulées).',
  },
  hmac_md4: {
    mechanism: 'hmac_md4',
    name: 'HMAC-MD4',
    defaultSuccessProb: 25,
    explanation:
      'Dans cette simulation pédagogique, l\'espion tente d\'exploiter les faiblesses extrêmes de MD4 (25% de chances simulées).',
  },
  hmac_md5: {
    mechanism: 'hmac_md5',
    name: 'HMAC-MD5',
    defaultSuccessProb: 15,
    explanation:
      'Dans cette simulation pédagogique, l\'espion tente de tirer parti des collisions différentielles de MD5 (15% de chances simulées).',
  },
  hmac_sha1: {
    mechanism: 'hmac_sha1',
    name: 'HMAC-SHA-1',
    defaultSuccessProb: 8,
    explanation:
      'Dans cette simulation pédagogique, l\'espion mobilise des ressources massives pour approcher une collision SHA-1 (8% de chances simulées).',
  },
  hmac_sha256: {
    mechanism: 'hmac_sha256',
    name: 'HMAC-SHA-256',
    defaultSuccessProb: 1,
    explanation:
      'Dans cette simulation pédagogique, la probabilité de falsification est infime (1%), reflétant la très haute robustesse du standard actuel.',
  },
  hmac_sha512: {
    mechanism: 'hmac_sha512',
    name: 'HMAC-SHA-512',
    defaultSuccessProb: 0.5,
    explanation:
      'Dans cette simulation pédagogique, la probabilité est quasi-nulle (0.5%), correspondant à une sécurité de 256 bits contre les collisions.',
  },
  hkdf: {
    mechanism: 'hkdf',
    name: 'HKDF (Dérivation)',
    defaultSuccessProb: 1,
    explanation: 'HKDF n\'est pas un MAC autonome mais une KDF pour dériver des clés indépendantes.',
  },
};

/**
 * Executes a simulated attack scenario.
 */
export function runSimulationAttack(params: {
  mode: 'without_auth' | 'with_auth';
  mechanism?: MacMechanism;
  keyStr?: string;
  originalMessage: string;
  modifiedMessage: string;
  customProb?: number;
  forcedSpySuccess?: boolean; // for testing or demonstration
}): SimulationResultRecord {
  const {
    mode,
    mechanism = 'hmac_sha256',
    keyStr = 'SecretKey2026!',
    originalMessage = 'SAVE BILL',
    modifiedMessage = 'KILL BILL',
    customProb,
    forcedSpySuccess,
  } = params;

  const id = `sim-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const timestamp = new Date().toLocaleTimeString('fr-FR');

  // Scenario 1: Without Authentication
  if (mode === 'without_auth') {
    return {
      id,
      timestamp,
      mode: 'without_auth',
      originalMessage,
      modifiedMessage,
      realCryptoValid: true, // Agent B accepts the message because there is NO tag to check!
      spyForgedSuccessfullyInSimulation: true,
      billFate: 'lost',
      technicalExplanation:
        'Le message a été modifié pendant sa transmission. En l\'absence de tag d\'authentification (MAC), le destinataire (Agent B) n\'avait AUCUN moyen cryptographique de vérifier l\'intégrité ni l\'authenticité du paquet reçu. Il a exécuté l\'ordre altéré.',
    };
  }

  // Scenario 2: With Authentication
  // 1. Agent A computes the real MAC on original message
  let originalTagHex = '';
  let originalTagBytes: Uint8Array = new Uint8Array(0);

  if (mechanism === 'naive_prefix') {
    const calc = calculateNaiveMac(originalMessage, keyStr, 'utf8', 'prefix', 'sha256');
    originalTagHex = calc.tagHex;
    originalTagBytes = calc.tag;
  } else if (mechanism === 'naive_suffix') {
    const calc = calculateNaiveMac(originalMessage, keyStr, 'utf8', 'suffix', 'sha256');
    originalTagHex = calc.tagHex;
    originalTagBytes = calc.tag;
  } else if (mechanism === 'cbc_mac') {
    const calc = calculateCbcMac(originalMessage, keyStr, 'utf8');
    originalTagHex = calc.tagHex;
    originalTagBytes = calc.tag;
  } else {
    const hashAlgo = mechanism.replace('hmac_', '') as any;
    const calc = calculateHmac(originalMessage, keyStr, 'utf8', 'utf8', hashAlgo);
    originalTagHex = calc.tagHex;
    originalTagBytes = calc.tag;
  }

  // 2. Real cryptographic verification performed by Agent B on modified message
  // Agent B recalculates the MAC of the received message (KILL BILL) using the shared secret key
  let recalculatedTagHex = '';
  let recalculatedTagBytes: Uint8Array = new Uint8Array(0);

  if (mechanism === 'naive_prefix') {
    const calc = calculateNaiveMac(modifiedMessage, keyStr, 'utf8', 'prefix', 'sha256');
    recalculatedTagHex = calc.tagHex;
    recalculatedTagBytes = calc.tag;
  } else if (mechanism === 'naive_suffix') {
    const calc = calculateNaiveMac(modifiedMessage, keyStr, 'utf8', 'suffix', 'sha256');
    recalculatedTagHex = calc.tagHex;
    recalculatedTagBytes = calc.tag;
  } else if (mechanism === 'cbc_mac') {
    const calc = calculateCbcMac(modifiedMessage, keyStr, 'utf8');
    recalculatedTagHex = calc.tagHex;
    recalculatedTagBytes = calc.tag;
  } else {
    const hashAlgo = mechanism.replace('hmac_', '') as any;
    const calc = calculateHmac(modifiedMessage, keyStr, 'utf8', 'utf8', hashAlgo);
    recalculatedTagHex = calc.tagHex;
    recalculatedTagBytes = calc.tag;
  }

  // Real crypto verification: does transmitted tag (original tag) match recalculated tag of modified message?
  // In reality, unless the attacker knows the key or achieves a mathematical collision, this is ALWAYS FALSE!
  const realCryptoValid = timingSafeEqual(originalTagBytes, recalculatedTagBytes);

  // 3. Separate Pedagogical Probabilistic Model
  const profile = PEDAGOGICAL_PROFILES[mechanism] || PEDAGOGICAL_PROFILES.hmac_sha256;
  const probToUse = customProb !== undefined ? customProb : profile.defaultSuccessProb;

  let spyWon = false;
  if (forcedSpySuccess !== undefined) {
    spyWon = forcedSpySuccess;
  } else {
    const roll = Math.random() * 100;
    spyWon = roll < probToUse;
  }

  const transmittedTag = spyWon ? recalculatedTagHex : originalTagHex;
  const billFate = spyWon ? 'lost' : 'saved';

  let technicalExplanation = '';
  if (!spyWon) {
    technicalExplanation =
      `VÉRIFICATION RÉUSSIE — ATTAQUE BLOQUÉE : L'espion n'a pas pu forger de tag valide pour "${modifiedMessage}" sans la clé secrète k. ` +
      `L'Agent B a recalculé le code HMAC attendu (${recalculatedTagHex.slice(0, 16)}...) et a constaté qu'il ne correspondait pas au tag reçu (${originalTagHex.slice(0, 16)}...). ` +
      `Le paquet a été immédiatement rejeté (403). Bill est sauvé !`;
  } else {
    technicalExplanation =
      `SIMULATION PÉDAGOGIQUE — FALSIFICATION ACCORDÉE : Selon le modèle probabiliste de démonstration fixé à ${probToUse}%, ` +
      `l'espion est réputé avoir réussi à contourner la protection dans ce tirage (ex: attaque par extension de longueur sur MAC naïf). ` +
      `L'Agent B a accepté la charge altérée. (Rappel : les probabilités sont des paramètres pédagogiques de démonstration).`;
  }

  return {
    id,
    timestamp,
    mode: 'with_auth',
    mechanism,
    mechanismName: profile.name,
    originalMessage,
    modifiedMessage,
    keyUsed: keyStr,
    originalTag: originalTagHex,
    transmittedTag,
    recalculatedTag: recalculatedTagHex,
    realCryptoValid,
    spyForgedSuccessfullyInSimulation: spyWon,
    pedagogicalProbabilityUsed: probToUse,
    billFate,
    technicalExplanation,
  };
}
