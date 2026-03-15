import { Dimensions } from 'react-native';

const BASE_WIDTH = 390;
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const scale = Math.min(Math.max(SCREEN_WIDTH / BASE_WIDTH, 0.85), 1.10);

export function rs(size: number): number {
  return Math.round(size * scale * 2) / 2;
}

export function rp(size: number): number {
  return Math.round(size * scale);
}

export { SCREEN_WIDTH, scale };
