import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, CheckResult } from '../types';
import { Colors, dangerColor } from '../constants/colors';
import { rs, rp } from '../utils/responsive';
import { useHistoryStore } from '../store';
import DangerBadge from '../components/common/DangerBadge';

type Props = NativeStackScreenProps<RootStackParamList, 'History'>;

function formatDate(iso: string): string {
  const d = new Date(iso);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hours = d.getHours().toString().padStart(2, '0');
  const mins = d.getMinutes().toString().padStart(2, '0');
  return `${month}/${day} ${hours}:${mins}`;
}

export default function HistoryScreen({ navigation }: Props) {
  const results = useHistoryStore((s) => s.results);
  const deleteResult = useHistoryStore((s) => s.deleteResult);

  const handlePress = (item: CheckResult) => {
    if (item.type === 'scan') {
      navigation.navigate('ScanResult', { resultId: item.id });
    } else {
      navigation.navigate('QuizResult', { resultId: item.id });
    }
  };

  const handleLongPress = (item: CheckResult) => {
    Alert.alert('削除', 'この結果を削除しますか？', [
      { text: 'キャンセル', style: 'cancel' },
      {
        text: '削除',
        style: 'destructive',
        onPress: () => deleteResult(item.id),
      },
    ]);
  };

  const renderItem = ({ item }: { item: CheckResult }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => handlePress(item)}
      onLongPress={() => handleLongPress(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.typeIcon}>
        {item.type === 'scan' ? '📡' : '📋'}
      </Text>
      <View style={styles.rowContent}>
        <Text style={styles.rowTitle}>
          {item.type === 'scan' ? 'スキャン' : '質問診断'}
        </Text>
        <Text style={styles.rowDate}>{formatDate(item.createdAt)}</Text>
      </View>
      <Text
        style={[styles.rowPercent, { color: dangerColor(item.dangerLevel) }]}
      >
        {item.percentage}%
      </Text>
      <DangerBadge level={item.dangerLevel} />
    </TouchableOpacity>
  );

  if (results.length === 0) {
    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <Text style={styles.emptyIcon}>📊</Text>
        <Text style={styles.emptyTitle}>履歴がありません</Text>
        <Text style={styles.emptyDesc}>
          スキャンや診断を行うと、ここに結果が表示されます
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={results}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  list: {
    padding: rp(16),
    gap: rp(8),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: rp(16),
    borderRadius: rp(12),
    gap: rp(12),
  },
  typeIcon: {
    fontSize: rs(24),
  },
  rowContent: {
    flex: 1,
  },
  rowTitle: {
    fontSize: rs(15),
    fontWeight: '600',
    color: Colors.text,
  },
  rowDate: {
    fontSize: rs(12),
    color: Colors.textMuted,
    marginTop: rp(2),
  },
  rowPercent: {
    fontSize: rs(18),
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: rp(40),
  },
  emptyIcon: {
    fontSize: rs(48),
    marginBottom: rp(16),
  },
  emptyTitle: {
    fontSize: rs(18),
    fontWeight: '600',
    color: Colors.text,
    marginBottom: rp(8),
  },
  emptyDesc: {
    fontSize: rs(14),
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
