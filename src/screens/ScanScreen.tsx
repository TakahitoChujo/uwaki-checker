import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Colors } from '../constants/colors';
import { rs, rp } from '../utils/responsive';
import { useScanAnimation } from '../hooks/useScanAnimation';
import {
  generateScanPercentage,
  generateEvidences,
  generateWeeklyData,
  getDangerLevel,
} from '../utils/random';
import { useHistoryStore } from '../store';
import ProgressBar from '../components/common/ProgressBar';
import ScanLogLine from '../components/common/ScanLogLine';

type Props = NativeStackScreenProps<RootStackParamList, 'Scan'>;

export default function ScanScreen({ navigation }: Props) {
  const { phase, progress, logMessages, start } = useScanAnimation();
  const addScanResult = useHistoryStore((s) => s.addScanResult);
  const [percentText, setPercentText] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start pulsing dot animation
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    start(() => {
      const percentage = generateScanPercentage();
      const dangerLevel = getDangerLevel(percentage);
      const evidences = generateEvidences(4);
      const weeklyData = generateWeeklyData(percentage);

      const resultId = addScanResult({
        type: 'scan',
        percentage,
        dangerLevel,
        evidences,
        weeklyData,
      });

      navigation.replace('ScanResult', { resultId });
    });

    return () => pulse.stop();
  }, []);

  useEffect(() => {
    const listener = progress.addListener(({ value }) => {
      setPercentText(Math.round(value * 100));
    });
    return () => progress.removeListener(listener);
  }, [progress]);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [logMessages]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.percentArea}>
          <Text style={styles.percentText}>{percentText}%</Text>
        </View>

        <View style={styles.statusArea}>
          {phase === 'initializing' && (
            <View style={styles.statusRow}>
              <Animated.View
                style={[styles.dot, { opacity: pulseAnim }]}
              />
              <Text style={styles.statusText}>初期化中...</Text>
            </View>
          )}
          {phase === 'scanning' && (
            <Text style={styles.statusText}>スキャン中...</Text>
          )}
          {phase === 'complete' && (
            <Text style={[styles.statusText, { color: Colors.accent }]}>
              分析完了
            </Text>
          )}
        </View>

        <ProgressBar progress={progress} />

        <ScrollView
          ref={scrollRef}
          style={styles.logArea}
          showsVerticalScrollIndicator={false}
        >
          {logMessages.map((msg, i) => (
            <ScanLogLine key={i} message={msg} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: rp(24),
    paddingTop: rp(40),
  },
  percentArea: {
    alignItems: 'center',
    marginBottom: rp(20),
  },
  percentText: {
    fontSize: rs(56),
    fontWeight: '900',
    color: Colors.accent,
    fontVariant: ['tabular-nums'],
  },
  statusArea: {
    alignItems: 'center',
    marginBottom: rp(24),
    height: rp(24),
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rp(8),
  },
  dot: {
    width: rp(8),
    height: rp(8),
    borderRadius: rp(4),
    backgroundColor: Colors.accent,
  },
  statusText: {
    fontSize: rs(14),
    color: Colors.textSecondary,
    fontFamily: 'monospace',
  },
  logArea: {
    flex: 1,
    marginTop: rp(24),
    backgroundColor: Colors.surface,
    borderRadius: rp(12),
    padding: rp(16),
  },
});
