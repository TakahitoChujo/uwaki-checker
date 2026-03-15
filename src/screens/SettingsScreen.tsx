import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Share,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Colors } from '../constants/colors';
import { rs, rp } from '../utils/responsive';
import { useHistoryStore } from '../store';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export default function SettingsScreen({ navigation }: Props) {
  const clearHistory = useHistoryStore((s) => s.clearHistory);

  const handleClearHistory = () => {
    Alert.alert('履歴をすべて削除', '本当に削除しますか？', [
      { text: 'キャンセル', style: 'cancel' },
      {
        text: '削除',
        style: 'destructive',
        onPress: clearHistory,
      },
    ]);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message:
          '浮気チェッカー - パーティーで盛り上がるジョークアプリ！友達と一緒に試してみよう 🔍',
      });
    } catch {}
  };

  const handleDisclaimer = () => {
    Alert.alert(
      '免責事項',
      'このアプリはエンターテインメント・ジョーク目的で作られています。\n\n実際のスマートフォンデータの分析やスキャンは一切行いません。\n\nすべての結果はランダムに生成されたフィクションです。',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>情報</Text>
        <TouchableOpacity style={styles.row} onPress={handleDisclaimer}>
          <Text style={styles.rowIcon}>📜</Text>
          <Text style={styles.rowText}>免責事項を表示</Text>
          <Text style={styles.rowArrow}>›</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.rowIcon}>📱</Text>
          <Text style={styles.rowText}>バージョン</Text>
          <Text style={styles.rowValue}>1.0.0</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>データ</Text>
        <TouchableOpacity style={styles.row} onPress={handleClearHistory}>
          <Text style={styles.rowIcon}>🗑️</Text>
          <Text style={[styles.rowText, { color: Colors.danger }]}>
            履歴をすべて削除
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>共有</Text>
        <TouchableOpacity style={styles.row} onPress={handleShare}>
          <Text style={styles.rowIcon}>📤</Text>
          <Text style={styles.rowText}>アプリを共有</Text>
          <Text style={styles.rowArrow}>›</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  section: {
    marginTop: rp(24),
    marginHorizontal: rp(16),
  },
  sectionTitle: {
    fontSize: rs(13),
    fontWeight: '600',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: rp(8),
    marginLeft: rp(4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingVertical: rp(14),
    paddingHorizontal: rp(16),
    borderRadius: rp(12),
    marginBottom: rp(2),
  },
  rowIcon: {
    fontSize: rs(18),
    marginRight: rp(12),
  },
  rowText: {
    flex: 1,
    fontSize: rs(16),
    color: Colors.text,
  },
  rowValue: {
    fontSize: rs(14),
    color: Colors.textSecondary,
  },
  rowArrow: {
    fontSize: rs(20),
    color: Colors.textMuted,
  },
});
