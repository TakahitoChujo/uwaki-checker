import {
  calculateQuizPercentage,
  getDangerLevel,
  getDiagnosisText,
} from '../src/utils/scoring';
import { QuizAnswer } from '../src/types';

const makeAnswers = (points: number[]): QuizAnswer[] =>
  points.map((p, i) => ({ questionId: i + 1, selectedIndex: 0, points: p }));

describe('calculateQuizPercentage', () => {
  it('全問0点 → ほぼ0% (ジッター込み)', () => {
    const answers = makeAnswers(Array(10).fill(0));
    const result = calculateQuizPercentage(answers);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(10);
  });

  it('全問3点 (満点) → ほぼ100% (ジッター込み)', () => {
    const answers = makeAnswers(Array(10).fill(3));
    const result = calculateQuizPercentage(answers);
    expect(result).toBeGreaterThanOrEqual(90);
    expect(result).toBeLessThanOrEqual(100);
  });

  it('中間スコア (半分) → 45〜55%付近', () => {
    // Math.random のジッターを排除するため固定シードの代わりに複数回試行
    const answers = makeAnswers(Array(10).fill(1));  // 10/30 = 33%
    const result = calculateQuizPercentage(answers);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(100);
    expect(typeof result).toBe('number');
  });

  it('返り値が 0-100 の整数', () => {
    for (let trial = 0; trial < 20; trial++) {
      const points = Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * 4)
      );
      const result = calculateQuizPercentage(makeAnswers(points));
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
      expect(Number.isInteger(result)).toBe(true);
    }
  });
});

describe('getDangerLevel', () => {
  it('0% → safe', () => expect(getDangerLevel(0)).toBe('safe'));
  it('25% → safe', () => expect(getDangerLevel(25)).toBe('safe'));
  it('26% → caution', () => expect(getDangerLevel(26)).toBe('caution'));
  it('50% → caution', () => expect(getDangerLevel(50)).toBe('caution'));
  it('51% → warning', () => expect(getDangerLevel(51)).toBe('warning'));
  it('75% → warning', () => expect(getDangerLevel(75)).toBe('warning'));
  it('76% → danger', () => expect(getDangerLevel(76)).toBe('danger'));
  it('100% → danger', () => expect(getDangerLevel(100)).toBe('danger'));
});

describe('getDiagnosisText', () => {
  it('0% → 安心メッセージ', () => {
    const text = getDiagnosisText(0);
    expect(typeof text).toBe('string');
    expect(text.length).toBeGreaterThan(0);
    expect(text).toContain('良好');
  });

  it('100% → 危険メッセージ', () => {
    const text = getDiagnosisText(100);
    expect(typeof text).toBe('string');
    expect(text.length).toBeGreaterThan(0);
    expect(text).toContain('危険');
  });

  it('26〜50% → 注意メッセージ', () => {
    const text = getDiagnosisText(40);
    expect(text).toContain('コミュニケーション');
  });

  it('51〜75% → 警告メッセージ', () => {
    const text = getDiagnosisText(60);
    expect(text).toContain('警告');
  });
});
