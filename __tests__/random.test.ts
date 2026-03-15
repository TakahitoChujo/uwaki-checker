import {
  generateScanPercentage,
  getDangerLevel,
  generateEvidences,
  generateWeeklyData,
} from '../src/utils/random';

describe('generateScanPercentage', () => {
  it('0〜100 の範囲内', () => {
    for (let i = 0; i < 50; i++) {
      const p = generateScanPercentage();
      expect(p).toBeGreaterThanOrEqual(0);
      expect(p).toBeLessThanOrEqual(100);
    }
  });

  it('整数を返す', () => {
    for (let i = 0; i < 20; i++) {
      expect(Number.isInteger(generateScanPercentage())).toBe(true);
    }
  });

  it('5%未満にならない（下限クランプ）', () => {
    for (let i = 0; i < 50; i++) {
      expect(generateScanPercentage()).toBeGreaterThanOrEqual(5);
    }
  });

  it('99%超にならない（上限クランプ）', () => {
    for (let i = 0; i < 50; i++) {
      expect(generateScanPercentage()).toBeLessThanOrEqual(98);
    }
  });
});

describe('getDangerLevel (random.ts)', () => {
  it('0 → safe', () => expect(getDangerLevel(0)).toBe('safe'));
  it('25 → safe', () => expect(getDangerLevel(25)).toBe('safe'));
  it('50 → caution', () => expect(getDangerLevel(50)).toBe('caution'));
  it('75 → warning', () => expect(getDangerLevel(75)).toBe('warning'));
  it('76 → danger', () => expect(getDangerLevel(76)).toBe('danger'));
  it('100 → danger', () => expect(getDangerLevel(100)).toBe('danger'));
});

describe('generateEvidences', () => {
  it('デフォルトで4件返す', () => {
    const evidences = generateEvidences();
    expect(evidences).toHaveLength(4);
  });

  it('指定件数を返す', () => {
    expect(generateEvidences(2)).toHaveLength(2);
    expect(generateEvidences(5)).toHaveLength(5);
  });

  it('各evidenceに必須フィールドがある', () => {
    const evidences = generateEvidences(3);
    evidences.forEach((e) => {
      expect(typeof e.id).toBe('string');
      expect(typeof e.icon).toBe('string');
      expect(typeof e.category).toBe('string');
      expect(typeof e.description).toBe('string');
      expect(['safe', 'caution', 'warning', 'danger']).toContain(e.severity);
    });
  });

  it('IDが一意', () => {
    const evidences = generateEvidences(10);
    const ids = new Set(evidences.map((e) => e.id));
    expect(ids.size).toBe(10);
  });
});

describe('generateWeeklyData', () => {
  it('7日分のデータを返す', () => {
    const data = generateWeeklyData(50);
    expect(data).toHaveLength(7);
  });

  it('曜日ラベルが正しい順序', () => {
    const data = generateWeeklyData(50);
    const labels = data.map((d) => d.label);
    expect(labels).toEqual(['月', '火', '水', '木', '金', '土', '日']);
  });

  it('各valueが 0〜100 の範囲', () => {
    for (let trial = 0; trial < 10; trial++) {
      const data = generateWeeklyData(Math.random() * 100);
      data.forEach((d) => {
        expect(d.value).toBeGreaterThanOrEqual(0);
        expect(d.value).toBeLessThanOrEqual(100);
      });
    }
  });

  it('各valueが整数', () => {
    const data = generateWeeklyData(50);
    data.forEach((d) => {
      expect(Number.isInteger(d.value)).toBe(true);
    });
  });
});
