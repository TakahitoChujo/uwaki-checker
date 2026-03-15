import { create } from 'zustand';
import { CheckResult, ScanResult, QuizResult } from '../types';
import { saveHistory, loadHistory } from '../utils/storage';

let idCounter = 0;
const uid = () =>
  `${Date.now()}_${++idCounter}_${Math.random().toString(36).slice(2, 7)}`;

interface HistoryState {
  results: CheckResult[];
  isLoading: boolean;
}

interface HistoryActions {
  loadHistory: () => Promise<void>;
  addScanResult: (data: Omit<ScanResult, 'id' | 'createdAt'>) => string;
  addQuizResult: (data: Omit<QuizResult, 'id' | 'createdAt'>) => string;
  deleteResult: (id: string) => void;
  clearHistory: () => void;
  getResult: (id: string) => CheckResult | undefined;
}

export const useHistoryStore = create<HistoryState & HistoryActions>(
  (set, get) => ({
    results: [],
    isLoading: false,

    loadHistory: async () => {
      set({ isLoading: true });
      const results = await loadHistory();
      set({ results, isLoading: false });
    },

    addScanResult: (data) => {
      const id = uid();
      const result: ScanResult = {
        ...data,
        id,
        createdAt: new Date().toISOString(),
      };
      const results = [result, ...get().results];
      set({ results });
      saveHistory(results);
      return id;
    },

    addQuizResult: (data) => {
      const id = uid();
      const result: QuizResult = {
        ...data,
        id,
        createdAt: new Date().toISOString(),
      };
      const results = [result, ...get().results];
      set({ results });
      saveHistory(results);
      return id;
    },

    deleteResult: (id) => {
      const results = get().results.filter((r) => r.id !== id);
      set({ results });
      saveHistory(results);
    },

    clearHistory: () => {
      set({ results: [] });
      saveHistory([]);
    },

    getResult: (id) => get().results.find((r) => r.id === id),
  })
);
