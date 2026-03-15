import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { DangerLevel, dangerColor } from '../../constants/colors';
import { rs, rp } from '../../utils/responsive';

interface Props {
  percentage: number;
  dangerLevel: DangerLevel;
}

export default function ResultHeader({ percentage, dangerLevel }: Props) {
  const [displayValue, setDisplayValue] = useState(0);
  const animValue = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const listener = animValue.addListener(({ value }) => {
      setDisplayValue(Math.round(value));
    });

    Animated.parallel([
      Animated.timing(animValue, {
        toValue: percentage,
        duration: 1500,
        useNativeDriver: false,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    return () => animValue.removeListener(listener);
  }, [percentage, animValue, scaleAnim]);

  const color = dangerColor(dangerLevel);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ scale: scaleAnim }] }]}
    >
      <Text style={styles.label}>浮気度</Text>
      <Text style={[styles.percentage, { color }]}>{displayValue}%</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: rp(24),
  },
  label: {
    fontSize: rs(14),
    color: '#8892AA',
    marginBottom: rp(4),
    fontWeight: '600',
  },
  percentage: {
    fontSize: rs(72),
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
  },
});
