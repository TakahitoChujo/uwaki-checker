export type DangerLevel = 'safe' | 'caution' | 'warning' | 'danger';

export const Colors = {
  background: '#0A0E1A',
  surface: '#141927',
  surfaceElevated: '#1C2235',
  border: '#2A3050',

  text: '#E8ECF4',
  textSecondary: '#8892AA',
  textMuted: '#4A5270',

  accent: '#00D4FF',
  accentDim: '#0A2A3A',

  safe: '#00E676',
  safeBg: '#0A2A1A',
  caution: '#FFD600',
  cautionBg: '#2A2A0A',
  warning: '#FF9100',
  warningBg: '#2A1A0A',
  danger: '#FF1744',
  dangerBg: '#2A0A10',

  scanLine: '#00D4FF',
  progressTrack: '#1C2235',
  progressFill: '#00D4FF',
};

export function dangerColor(level: DangerLevel): string {
  return Colors[level];
}

export function dangerBgColor(level: DangerLevel): string {
  const map: Record<DangerLevel, string> = {
    safe: Colors.safeBg,
    caution: Colors.cautionBg,
    warning: Colors.warningBg,
    danger: Colors.dangerBg,
  };
  return map[level];
}

export function dangerLabel(level: DangerLevel): string {
  const map: Record<DangerLevel, string> = {
    safe: '安全',
    caution: '注意',
    warning: '警告',
    danger: '危険',
  };
  return map[level];
}
