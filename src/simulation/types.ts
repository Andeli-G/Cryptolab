/**
 * Types for the narrative and probabilistic simulation modules (Modules 4 & 5).
 * Reference: Cahier des Charges Sections 6 & 7.
 */

import { CalculationResult, MacMechanism } from '../crypto/types';

export type SimulationScene = 1 | 2 | 3 | 4 | 5 | 6;

export interface SimulationActor {
  id: 'agent_a' | 'agent_b' | 'the_spy' | 'bill';
  name: string;
  role: string;
  avatarUrl: string;
  badge: string;
  description: string;
}

export interface SimulationProbProfile {
  mechanism: MacMechanism;
  name: string;
  defaultSuccessProb: number; // in percentage e.g. 65 for 65%
  explanation: string;
}

export interface SimulationResultRecord {
  id: string;
  timestamp: string;
  mode: 'without_auth' | 'with_auth';
  mechanism?: MacMechanism;
  mechanismName?: string;
  originalMessage: string;
  modifiedMessage: string;
  keyUsed?: string;
  originalTag?: string;
  transmittedTag?: string;
  recalculatedTag?: string;
  realCryptoValid: boolean;
  spyForgedSuccessfullyInSimulation: boolean;
  pedagogicalProbabilityUsed?: number;
  billFate: 'saved' | 'lost';
  technicalExplanation: string;
}
