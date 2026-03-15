jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn().mockReturnValue({ width: 390, height: 844 }),
  },
}));

import { rs, rp, scale, SCREEN_WIDTH } from '../src/utils/responsive';

describe('responsive — ベース幅 390pt', () => {
  it('SCREEN_WIDTH が 390', () => {
    expect(SCREEN_WIDTH).toBe(390);
  });

  it('scale が 1.0', () => {
    expect(scale).toBeCloseTo(1.0);
  });

  describe('rs (フォントサイズ)', () => {
    it('16 → 16 (等倍)', () => {
      expect(rs(16)).toBe(16);
    });

    it('0.5刻みの値を返す', () => {
      const result = rs(15);
      expect(result * 2).toBe(Math.round(result * 2));
    });

    it('数値を返す (NaNでない)', () => {
      expect(typeof rs(16)).toBe('number');
      expect(isNaN(rs(16))).toBe(false);
    });
  });

  describe('rp (スペーシング)', () => {
    it('16 → 16 (等倍)', () => {
      expect(rp(16)).toBe(16);
    });

    it('整数を返す', () => {
      [14, 16, 20, 24, 28, 32].forEach((n) => {
        expect(Number.isInteger(rp(n))).toBe(true);
      });
    });
  });
});

describe('responsive — iPhone SE 375pt', () => {
  let rs375: (n: number) => number;
  let rp375: (n: number) => number;
  let scale375: number;

  beforeAll(() => {
    jest.resetModules();
    jest.mock('react-native', () => ({
      Dimensions: {
        get: jest.fn().mockReturnValue({ width: 375, height: 667 }),
      },
    }));
    const m = require('../src/utils/responsive');
    rs375 = m.rs;
    rp375 = m.rp;
    scale375 = m.scale;
  });

  it('scale が 1.0 未満', () => {
    expect(scale375).toBeLessThan(1.0);
  });

  it('scale が 0.85 以上 (クランプ下限)', () => {
    expect(scale375).toBeGreaterThanOrEqual(0.85);
  });

  it('rs(16) がベース幅より小さい', () => {
    expect(rs375(16)).toBeLessThan(16);
  });

  it('rp(16) がベース幅より小さい', () => {
    expect(rp375(16)).toBeLessThan(16);
  });
});

describe('responsive — iPhone 14 Plus 430pt', () => {
  let rs430: (n: number) => number;
  let rp430: (n: number) => number;
  let scale430: number;

  beforeAll(() => {
    jest.resetModules();
    jest.mock('react-native', () => ({
      Dimensions: {
        get: jest.fn().mockReturnValue({ width: 430, height: 932 }),
      },
    }));
    const m = require('../src/utils/responsive');
    rs430 = m.rs;
    rp430 = m.rp;
    scale430 = m.scale;
  });

  it('scale が 1.0 超', () => {
    expect(scale430).toBeGreaterThan(1.0);
  });

  it('scale が 1.10 以下 (クランプ上限)', () => {
    expect(scale430).toBeLessThanOrEqual(1.10);
  });

  it('rs(16) がベース幅より大きい', () => {
    expect(rs430(16)).toBeGreaterThan(16);
  });
});

describe('responsive — 極小 300pt → 0.85クランプ', () => {
  let scaleSmall: number;
  let rpSmall: (n: number) => number;

  beforeAll(() => {
    jest.resetModules();
    jest.mock('react-native', () => ({
      Dimensions: {
        get: jest.fn().mockReturnValue({ width: 300, height: 600 }),
      },
    }));
    const m = require('../src/utils/responsive');
    scaleSmall = m.scale;
    rpSmall = m.rp;
  });

  it('scale が 0.85 にクランプ', () => {
    expect(scaleSmall).toBe(0.85);
  });

  it('rp(100) が 85', () => {
    expect(rpSmall(100)).toBe(85);
  });
});

describe('responsive — 極大 500pt → 1.10クランプ', () => {
  let scaleHuge: number;

  beforeAll(() => {
    jest.resetModules();
    jest.mock('react-native', () => ({
      Dimensions: {
        get: jest.fn().mockReturnValue({ width: 500, height: 1000 }),
      },
    }));
    scaleHuge = require('../src/utils/responsive').scale;
  });

  it('scale が 1.10 にクランプ', () => {
    expect(scaleHuge).toBe(1.10);
  });
});
