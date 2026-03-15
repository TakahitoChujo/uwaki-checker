import { DangerLevel } from '../constants/colors';

export interface FakeEvidence {
  id: string;
  icon: string;
  category: string;
  description: string;
  severity: DangerLevel;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface ScanResult {
  id: string;
  type: 'scan';
  percentage: number;
  dangerLevel: DangerLevel;
  evidences: FakeEvidence[];
  weeklyData: ChartDataPoint[];
  createdAt: string;
}

export interface QuizAnswer {
  questionId: number;
  selectedIndex: number;
  points: number;
}

export interface QuizResult {
  id: string;
  type: 'quiz';
  percentage: number;
  dangerLevel: DangerLevel;
  totalScore: number;
  maxScore: number;
  answers: QuizAnswer[];
  createdAt: string;
}

export type CheckResult = ScanResult | QuizResult;
