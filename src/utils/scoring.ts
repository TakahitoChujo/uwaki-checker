import { QuizAnswer } from '../types';
import { DangerLevel } from '../constants/colors';

export function calculateQuizPercentage(answers: QuizAnswer[]): number {
  const totalPoints = answers.reduce((sum, a) => sum + a.points, 0);
  const maxPoints = answers.length * 3;
  const base = (totalPoints / maxPoints) * 100;
  const jitter = (Math.random() - 0.5) * 10;
  return Math.max(0, Math.min(100, Math.round(base + jitter)));
}

export function getDangerLevel(percentage: number): DangerLevel {
  if (percentage <= 25) return 'safe';
  if (percentage <= 50) return 'caution';
  if (percentage <= 75) return 'warning';
  return 'danger';
}

export function getDiagnosisText(percentage: number): string {
  if (percentage <= 25) {
    return 'パートナーとの関係は非常に良好です。信頼関係がしっかり築けているようです。安心して今の関係を楽しんでください。';
  }
  if (percentage <= 50) {
    return '少し気になる点はありますが、大きな心配は不要でしょう。コミュニケーションを大切にして、お互いの信頼を深めていきましょう。';
  }
  if (percentage <= 75) {
    return 'いくつかの警告サインが検出されました。パートナーとの対話を増やし、お互いの気持ちを確認し合うことをお勧めします。';
  }
  return '複数の危険シグナルが検出されました。冷静に状況を見極め、必要であれば信頼できる人に相談することをお勧めします。';
}
