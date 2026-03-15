const mockGetItem = jest.fn();
const mockSetItem = jest.fn();

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: mockGetItem,
  setItem: mockSetItem,
}));

jest.mock('react-native', () => ({
  Dimensions: { get: jest.fn().mockReturnValue({ width: 390, height: 844 }) },
}));

import { useDisclaimerStore } from '../src/store/disclaimerStore';

describe('disclaimerStore', () => {
  beforeEach(() => {
    useDisclaimerStore.setState({ hasSeen: false });
    mockGetItem.mockReset();
    mockSetItem.mockReset();
  });

  describe('loadDisclaimer', () => {
    it('AsyncStorageに値がなければ hasSeen = false', async () => {
      mockGetItem.mockResolvedValueOnce(null);
      await useDisclaimerStore.getState().loadDisclaimer();
      expect(useDisclaimerStore.getState().hasSeen).toBe(false);
    });

    it('AsyncStorageに "1" があれば hasSeen = true', async () => {
      mockGetItem.mockResolvedValueOnce('1');
      await useDisclaimerStore.getState().loadDisclaimer();
      expect(useDisclaimerStore.getState().hasSeen).toBe(true);
    });

    it('AsyncStorageに別の文字列があれば hasSeen = false', async () => {
      mockGetItem.mockResolvedValueOnce('0');
      await useDisclaimerStore.getState().loadDisclaimer();
      expect(useDisclaimerStore.getState().hasSeen).toBe(false);
    });
  });

  describe('acceptDisclaimer', () => {
    it('hasSeen が true になる', () => {
      useDisclaimerStore.getState().acceptDisclaimer();
      expect(useDisclaimerStore.getState().hasSeen).toBe(true);
    });

    it('AsyncStorage.setItem が "1" で呼ばれる', () => {
      useDisclaimerStore.getState().acceptDisclaimer();
      expect(mockSetItem).toHaveBeenCalledWith('@uwaki/disclaimer', '1');
    });
  });
});
