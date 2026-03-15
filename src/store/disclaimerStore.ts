import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DisclaimerState {
  hasSeen: boolean;
}

interface DisclaimerActions {
  loadDisclaimer: () => Promise<void>;
  acceptDisclaimer: () => void;
}

export const useDisclaimerStore = create<DisclaimerState & DisclaimerActions>(
  (set) => ({
    hasSeen: false,

    loadDisclaimer: async () => {
      const value = await AsyncStorage.getItem('@uwaki/disclaimer');
      set({ hasSeen: value === '1' });
    },

    acceptDisclaimer: () => {
      set({ hasSeen: true });
      AsyncStorage.setItem('@uwaki/disclaimer', '1');
    },
  })
);
