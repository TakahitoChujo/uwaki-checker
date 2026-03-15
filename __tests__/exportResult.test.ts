const mockPrintToFileAsync = jest.fn();
const mockShareAsync = jest.fn();
const mockIsAvailableAsync = jest.fn();
const mockPrintAsync = jest.fn();

jest.mock('expo-print', () => ({
  printToFileAsync: mockPrintToFileAsync,
  printAsync: mockPrintAsync,
}));

jest.mock('expo-sharing', () => ({
  isAvailableAsync: mockIsAvailableAsync,
  shareAsync: mockShareAsync,
}));

jest.mock('react-native', () => ({
  Dimensions: { get: jest.fn().mockReturnValue({ width: 390, height: 844 }) },
}));

import { shareResultAsPDF } from '../src/utils/exportResult';
import { ScanResult, QuizResult } from '../src/types';

const makeScanResult = (): ScanResult => ({
  id: 'test-1',
  type: 'scan',
  percentage: 72,
  dangerLevel: 'warning',
  evidences: [
    {
      id: 'ev-1',
      icon: '💬',
      category: 'メッセージ',
      description: '深夜に不審なメッセージ',
      severity: 'warning',
    },
  ],
  weeklyData: [
    { label: '月', value: 60 },
    { label: '火', value: 40 },
    { label: '水', value: 80 },
    { label: '木', value: 55 },
    { label: '金', value: 90 },
    { label: '土', value: 30 },
    { label: '日', value: 70 },
  ],
  createdAt: '2026-03-15T10:00:00.000Z',
});

const makeQuizResult = (): QuizResult => ({
  id: 'test-2',
  type: 'quiz',
  percentage: 30,
  dangerLevel: 'caution',
  totalScore: 9,
  maxScore: 30,
  answers: [],
  createdAt: '2026-03-15T11:00:00.000Z',
});

describe('shareResultAsPDF', () => {
  beforeEach(() => {
    mockPrintToFileAsync.mockReset();
    mockShareAsync.mockReset();
    mockIsAvailableAsync.mockReset();
    mockPrintAsync.mockReset();
    mockPrintToFileAsync.mockResolvedValue({ uri: 'file:///tmp/result.pdf' });
  });

  describe('共有が利用可能な場合', () => {
    beforeEach(() => {
      mockIsAvailableAsync.mockResolvedValue(true);
    });

    it('ScanResult → printToFileAsync が呼ばれる', async () => {
      await shareResultAsPDF(makeScanResult());
      expect(mockPrintToFileAsync).toHaveBeenCalledTimes(1);
      const arg = mockPrintToFileAsync.mock.calls[0][0];
      expect(typeof arg.html).toBe('string');
      expect(arg.html.length).toBeGreaterThan(100);
    });

    it('ScanResult → shareAsync が呼ばれる', async () => {
      await shareResultAsPDF(makeScanResult());
      expect(mockShareAsync).toHaveBeenCalledTimes(1);
      expect(mockShareAsync).toHaveBeenCalledWith(
        'file:///tmp/result.pdf',
        expect.objectContaining({ mimeType: 'application/pdf' })
      );
    });

    it('QuizResult → printToFileAsync が呼ばれる', async () => {
      await shareResultAsPDF(makeQuizResult());
      expect(mockPrintToFileAsync).toHaveBeenCalledTimes(1);
    });

    it('QuizResult → shareAsync が呼ばれる', async () => {
      await shareResultAsPDF(makeQuizResult());
      expect(mockShareAsync).toHaveBeenCalledTimes(1);
    });

    it('生成HTML に浮気チェッカーのタイトルが含まれる', async () => {
      await shareResultAsPDF(makeScanResult());
      const html: string = mockPrintToFileAsync.mock.calls[0][0].html;
      expect(html).toContain('浮気チェッカー');
    });

    it('生成HTML に免責テキストが含まれる', async () => {
      await shareResultAsPDF(makeScanResult());
      const html: string = mockPrintToFileAsync.mock.calls[0][0].html;
      expect(html).toContain('この結果はジョークです');
    });

    it('生成HTML にパーセンテージが含まれる', async () => {
      await shareResultAsPDF(makeScanResult());
      const html: string = mockPrintToFileAsync.mock.calls[0][0].html;
      expect(html).toContain('72%');
    });
  });

  describe('共有が利用不可能な場合', () => {
    beforeEach(() => {
      mockIsAvailableAsync.mockResolvedValue(false);
    });

    it('printAsync にフォールバックする', async () => {
      await shareResultAsPDF(makeScanResult());
      expect(mockPrintAsync).toHaveBeenCalledTimes(1);
      expect(mockShareAsync).not.toHaveBeenCalled();
    });
  });
});
