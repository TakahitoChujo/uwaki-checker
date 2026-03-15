import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DangerLevel, dangerColor, dangerBgColor, dangerLabel } from '../../constants/colors';
import { rs, rp } from '../../utils/responsive';

interface Props {
  level: DangerLevel;
  size?: 'small' | 'large';
}

export default function DangerBadge({ level, size = 'small' }: Props) {
  const isLarge = size === 'large';
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: dangerBgColor(level),
          borderColor: dangerColor(level) + '60',
          paddingVertical: isLarge ? rp(8) : rp(4),
          paddingHorizontal: isLarge ? rp(20) : rp(12),
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: dangerColor(level),
            fontSize: isLarge ? rs(16) : rs(12),
          },
        ]}
      >
        {dangerLabel(level)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: rp(20),
    borderWidth: 1,
    alignSelf: 'center',
  },
  text: {
    fontWeight: '700',
  },
});
