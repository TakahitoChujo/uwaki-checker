jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn().mockResolvedValue(undefined),
  getItem: jest.fn().mockResolvedValue(null),
  removeItem: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('react-native', () => ({
  Dimensions: { get: jest.fn().mockReturnValue({ width: 390, height: 844 }) },
}));

import { useHistoryStore } from '../src/store/historyStore';
import { ScanResult, QuizResult } from '../src/types';

const makeScanData = (): Omit<ScanResult, 'id' | 'createdAt'> => ({
  type: 'scan',
  percentage: 72,
  dangerLevel: 'warning',
  evidences: [],
  weeklyData: [],
});

const makeQuizData = (): Omit<QuizResult, 'id' | 'createdAt'> => ({
  type: 'quiz',
  percentage: 30,
  dangerLevel: 'caution',
  totalScore: 9,
  maxScore: 30,
  answers: [],
});

describe('historyStore', () => {
  beforeEach(() => {
    useHistoryStore.setState({ results: [], isLoading: false });
  });

  describe('addScanResult', () => {
    it('IDを返す', () => {
      const id = useHistoryStore.getState().addScanResult(makeScanData());
      expect(typeof id).toBe('string');
      expect(id.length).toBeGreaterThan(0);
    });

    it('storeに追加される', () => {
      useHistoryStore.getState().addScanResult(makeScanData());
      const results = useHistoryStore.getState().results;
      expect(results).toHaveLength(1);
      expect(results[0].type).toBe('scan');
    });

    it('createdAt が ISO文字列', () => {
      useHistoryStore.getState().addScanResult(makeScanData());
      const result = useHistoryStore.getState().results[0];
      expect(() => new Date(result.createdAt)).not.toThrow();
      expect(isNaN(new Date(result.createdAt).getTime())).toBe(false);
    });

    it('最新順で先頭に追加される', () => {
      const id1 = useHistoryStore.getState().addScanResult(makeScanData());
      const id2 = useHistoryStore.getState().addScanResult(makeScanData());
      const results = useHistoryStore.getState().results;
      expect(results[0].id).toBe(id2);
      expect(results[1].id).toBe(id1);
    });
  });

  describe('addQuizResult', () => {
    it('IDを返す', () => {
      const id = useHistoryStore.getState().addQuizResult(makeQuizData());
      expect(typeof id).toBe('string');
    });

    it('storeに追加される', () => {
      useHistoryStore.getState().addQuizResult(makeQuizData());
      const results = useHistoryStore.getState().results;
      expect(results).toHaveLength(1);
      expect(results[0].type).toBe('quiz');
    });
  });

  describe('getResult', () => {
    it('存在するIDで結果を返す', () => {
      const id = useHistoryStore.getState().addScanResult(makeScanData());
      const result = useHistoryStore.getState().getResult(id);
      expect(result).toBeDefined();
      expect(result!.id).toBe(id);
    });

    it('存在しないIDでundefinedを返す', () => {
      const result = useHistoryStore.getState().getResult('no-such-id');
      expect(result).toBeUndefined();
    });
  });

  describe('deleteResult', () => {
    it('指定IDの結果が削除される', () => {
      const id = useHistoryStore.getState().addScanResult(makeScanData());
      useHistoryStore.getState().addScanResult(makeScanData());
      useHistoryStore.getState().deleteResult(id);
      const results = useHistoryStore.getState().results;
      expect(results).toHaveLength(1);
      expect(results.find((r) => r.id === id)).toBeUndefined();
    });

    it('存在しないIDを渡してもエラーにならない', () => {
      useHistoryStore.getState().addScanResult(makeScanData());
      expect(() =>
        useHistoryStore.getState().deleteResult('no-such-id')
      ).not.toThrow();
      expect(useHistoryStore.getState().results).toHaveLength(1);
    });
  });

  describe('clearHistory', () => {
    it('全件削除される', () => {
      useHistoryStore.getState().addScanResult(makeScanData());
      useHistoryStore.getState().addQuizResult(makeQuizData());
      useHistoryStore.getState().clearHistory();
      expect(useHistoryStore.getState().results).toHaveLength(0);
    });
  });
});
