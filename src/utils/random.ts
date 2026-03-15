import { FakeEvidence, ChartDataPoint } from '../types';
import { DangerLevel } from '../constants/colors';
import { EVIDENCE_POOL } from '../constants/evidenceTexts';

let evidenceIdCounter = 0;

export function generateScanPercentage(): number {
  const raw = Math.random();
  const weighted = Math.pow(raw, 0.7) * 100;
  return Math.round(Math.max(5, Math.min(98, weighted)));
}

export function getDangerLevel(percentage: number): DangerLevel {
  if (percentage <= 25) return 'safe';
  if (percentage <= 50) return 'caution';
  if (percentage <= 75) return 'warning';
  return 'danger';
}

export function generateEvidences(count: number = 4): FakeEvidence[] {
  const shuffled = [...EVIDENCE_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((e) => ({
    ...e,
    id: `ev_${Date.now()}_${++evidenceIdCounter}`,
  }));
}

export function generateWeeklyData(percentage: number): ChartDataPoint[] {
  const days = ['月', '火', '水', '木', '金', '土', '日'];
  const baseLevel = percentage * 0.6;
  return days.map((label) => ({
    label,
    value: Math.round(
      Math.max(0, Math.min(100, baseLevel + (Math.random() - 0.5) * 40))
    ),
  }));
}
