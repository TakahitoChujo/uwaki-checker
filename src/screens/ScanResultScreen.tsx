import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, ScanResult } from '../types';
import { Colors } from '../constants/colors';
import { rs, rp } from '../utils/responsive';
import { useHistoryStore } from '../store';
import { shareResultAsPDF } from '../utils/exportResult';
import ResultHeader from '../components/results/ResultHeader';
import DangerBadge from '../components/common/DangerBadge';
import EvidenceList from '../components/results/EvidenceList';
import BarChart from '../components/charts/BarChart';

type Props = NativeStackScreenProps<RootStackParamList, 'ScanResult'>;

export default function ScanResultScreen({ route, navigation }: Props) {
  const { resultId } = route.params;
  const result = useHistoryStore((s) => s.getResult(resultId)) as
    | ScanResult
    | undefined;
  const [sharing, setSharing] = useState(false);

  const handleShare = async () => {
    if (!result) return;
    setSharing(true);
    try {
      await shareResultAsPDF(result);
    } catch (e) {
      Alert.alert('エラー', '共有に失敗しました。');
    } finally {
      setSharing(false);
    }
  };

  if (!result) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>結果が見つかりません</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <ResultHeader
        percentage={result.percentage}
        dangerLevel={result.dangerLevel}
      />

      <DangerBadge level={result.dangerLevel} size="large" />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>週間行動パターン</Text>
        <View style={styles.chartCard}>
          <BarChart data={result.weeklyData} />
        </View>
      </View>

      <EvidenceList evidences={result.evidences} />

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={handleShare}
          disabled={sharing}
        >
          {sharing ? (
            <ActivityIndicator color={Colors.background} />
          ) : (
            <Text style={styles.shareButtonText}>📄 PDFで共有・保存</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.replace('Scan')}
        >
          <Text style={styles.primaryButtonText}>もう一度スキャン</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.popToTop()}
        >
          <Text style={styles.secondaryButtonText}>ホームに戻る</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.disclaimer}>
        ※ この結果はジョークです。実際のデータ分析は行っていません。
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    paddingHorizontal: rp(20),
    paddingBottom: rp(40),
  },
  errorText: {
    color: Colors.textSecondary,
    fontSize: rs(16),
    textAlign: 'center',
    marginTop: rp(40),
  },
  section: {
    marginTop: rp(24),
  },
  sectionTitle: {
    fontSize: rs(16),
    fontWeight: '700',
    color: Colors.text,
    marginBottom: rp(12),
  },
  chartCard: {
    backgroundColor: Colors.surface,
    borderRadius: rp(16),
    padding: rp(20),
  },
  buttons: {
    marginTop: rp(32),
    gap: rp(12),
  },
  shareButton: {
    backgroundColor: Colors.surfaceElevated,
    paddingVertical: rp(16),
    borderRadius: rp(12),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.accent + '40',
  },
  shareButtonText: {
    fontSize: rs(16),
    fontWeight: '600',
    color: Colors.accent,
  },
  primaryButton: {
    backgroundColor: Colors.accent,
    paddingVertical: rp(16),
    borderRadius: rp(12),
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: rs(16),
    fontWeight: '700',
    color: Colors.background,
  },
  secondaryButton: {
    backgroundColor: Colors.surface,
    paddingVertical: rp(16),
    borderRadius: rp(12),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  secondaryButtonText: {
    fontSize: rs(16),
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  disclaimer: {
    fontSize: rs(11),
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: rp(24),
    lineHeight: rs(16),
  },
});
