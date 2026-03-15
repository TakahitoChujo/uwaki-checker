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
import { RootStackParamList, QuizResult } from '../types';
import { Colors } from '../constants/colors';
import { rs, rp } from '../utils/responsive';
import { useHistoryStore } from '../store';
import { getDiagnosisText } from '../utils/scoring';
import { shareResultAsPDF } from '../utils/exportResult';
import ResultHeader from '../components/results/ResultHeader';
import DangerBadge from '../components/common/DangerBadge';

type Props = NativeStackScreenProps<RootStackParamList, 'QuizResult'>;

export default function QuizResultScreen({ route, navigation }: Props) {
  const { resultId } = route.params;
  const result = useHistoryStore((s) => s.getResult(resultId)) as
    | QuizResult
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

  const diagnosisText = getDiagnosisText(result.percentage);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <ResultHeader
        percentage={result.percentage}
        dangerLevel={result.dangerLevel}
      />

      <DangerBadge level={result.dangerLevel} size="large" />

      <View style={styles.diagnosisCard}>
        <Text style={styles.diagnosisTitle}>診断結果</Text>
        <Text style={styles.diagnosisText}>{diagnosisText}</Text>
        <View style={styles.scoreRow}>
          <Text style={styles.scoreLabel}>スコア</Text>
          <Text style={styles.scoreValue}>
            {result.totalScore} / {result.maxScore}
          </Text>
        </View>
      </View>

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
          onPress={() => navigation.replace('Quiz')}
        >
          <Text style={styles.primaryButtonText}>もう一度診断</Text>
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
  diagnosisCard: {
    backgroundColor: Colors.surface,
    borderRadius: rp(16),
    padding: rp(24),
    marginTop: rp(24),
  },
  diagnosisTitle: {
    fontSize: rs(16),
    fontWeight: '700',
    color: Colors.text,
    marginBottom: rp(12),
  },
  diagnosisText: {
    fontSize: rs(14),
    color: Colors.textSecondary,
    lineHeight: rs(22),
    marginBottom: rp(16),
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: rp(16),
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  scoreLabel: {
    fontSize: rs(14),
    color: Colors.textSecondary,
  },
  scoreValue: {
    fontSize: rs(18),
    fontWeight: '700',
    color: Colors.accent,
    fontVariant: ['tabular-nums'],
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
