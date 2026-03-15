import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { rp, SCREEN_WIDTH } from '../../utils/responsive';

interface Props {
  progress: Animated.Value;
}

export default function ProgressBar({ progress }: Props) {
  const barWidth = SCREEN_WIDTH - rp(48);
  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, barWidth],
  });

  return (
    <View style={[styles.track, { width: barWidth }]}>
      <Animated.View style={[styles.fill, { width }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: rp(6),
    backgroundColor: Colors.progressTrack,
    borderRadius: rp(3),
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: Colors.progressFill,
    borderRadius: rp(3),
  },
});
