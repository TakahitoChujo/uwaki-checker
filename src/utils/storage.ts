import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckResult } from '../types';

const HISTORY_KEY = '@uwaki/history';

export async function saveHistory(results: CheckResult[]): Promise<void> {
  const trimmed = results.slice(0, 50);
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

export async function loadHistory(): Promise<CheckResult[]> {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CheckResult[];
  } catch {
    return [];
  }
}
