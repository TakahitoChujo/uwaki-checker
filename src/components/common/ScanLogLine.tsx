import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { rs, rp } from '../../utils/responsive';

interface Props {
  message: string;
}

export default function ScanLogLine({ message }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Text style={styles.prefix}>{'>'} </Text>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: rp(3),
  },
  prefix: {
    fontSize: rs(12),
    color: Colors.accent,
    fontFamily: 'monospace',
  },
  text: {
    fontSize: rs(12),
    color: Colors.textSecondary,
    fontFamily: 'monospace',
    flex: 1,
  },
});
