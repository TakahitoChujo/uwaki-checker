import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { ChartDataPoint } from '../../types';
import { Colors, dangerColor } from '../../constants/colors';
import { rs, rp } from '../../utils/responsive';

interface Props {
  data: ChartDataPoint[];
  maxHeight?: number;
}

function AnimatedBar({
  value,
  maxHeight,
  delay,
}: {
  value: number;
  maxHeight: number;
  delay: number;
}) {
  const height = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(height, {
      toValue: (value / 100) * maxHeight,
      duration: 600,
      delay,
      useNativeDriver: false,
    }).start();
  }, [height, value, maxHeight, delay]);

  const color =
    value <= 30
      ? Colors.safe
      : value <= 60
        ? Colors.caution
        : value <= 80
          ? Colors.warning
          : Colors.danger;

  return (
    <Animated.View
      style={[styles.bar, { height, backgroundColor: color }]}
    />
  );
}

export default function BarChart({ data, maxHeight = rp(120) }: Props) {
  return (
    <View style={styles.container}>
      {data.map((point, index) => (
        <View key={point.label} style={styles.column}>
          <View style={[styles.barContainer, { height: maxHeight }]}>
            <AnimatedBar
              value={point.value}
              maxHeight={maxHeight}
              delay={index * 80}
            />
          </View>
          <Text style={styles.label}>{point.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: rp(8),
  },
  column: {
    alignItems: 'center',
    flex: 1,
  },
  barContainer: {
    justifyContent: 'flex-end',
    width: rp(28),
  },
  bar: {
    width: '100%',
    borderRadius: rp(4),
    minHeight: rp(4),
  },
  label: {
    fontSize: rs(11),
    color: Colors.textSecondary,
    marginTop: rp(6),
  },
});
