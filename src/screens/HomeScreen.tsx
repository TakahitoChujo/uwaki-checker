import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Colors } from '../constants/colors';
import { rs, rp } from '../utils/responsive';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerIcon}>🔍</Text>
          <Text style={styles.title}>浮気チェッカー</Text>
          <Text style={styles.subtitle}>AI行動分析システム v2.1</Text>
        </View>

        <View style={styles.cards}>
          <TouchableOpacity
            style={[styles.card, styles.scanCard]}
            onPress={() => navigation.navigate('Scan')}
            activeOpacity={0.7}
          >
            <Text style={styles.cardIcon}>📡</Text>
            <View style={styles.cardTextArea}>
              <Text style={styles.cardTitle}>スキャンモード</Text>
              <Text style={styles.cardDesc}>
                端末を分析して浮気の証拠をスキャン
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.quizCard]}
            onPress={() => navigation.navigate('Quiz')}
            activeOpacity={0.7}
          >
            <Text style={styles.cardIcon}>📋</Text>
            <View style={styles.cardTextArea}>
              <Text style={styles.cardTitle}>質問診断</Text>
              <Text style={styles.cardDesc}>
                10の質問でパートナーの行動を診断
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate('History')}
          >
            <Text style={styles.footerIcon}>📊</Text>
            <Text style={styles.footerText}>履歴</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.footerIcon}>⚙️</Text>
            <Text style={styles.footerText}>設定</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: rp(20),
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: rp(40),
  },
  headerIcon: {
    fontSize: rs(48),
    marginBottom: rp(12),
  },
  title: {
    fontSize: rs(28),
    fontWeight: '800',
    color: Colors.text,
    marginBottom: rp(4),
  },
  subtitle: {
    fontSize: rs(13),
    color: Colors.textMuted,
    fontFamily: 'monospace',
  },
  cards: {
    gap: rp(16),
    marginBottom: rp(40),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: rp(16),
    padding: rp(20),
    borderWidth: 1,
  },
  scanCard: {
    borderColor: Colors.accent + '40',
  },
  quizCard: {
    borderColor: Colors.warning + '40',
  },
  cardIcon: {
    fontSize: rs(36),
    marginRight: rp(16),
  },
  cardTextArea: {
    flex: 1,
  },
  cardTitle: {
    fontSize: rs(18),
    fontWeight: '700',
    color: Colors.text,
    marginBottom: rp(4),
  },
  cardDesc: {
    fontSize: rs(13),
    color: Colors.textSecondary,
  },
  arrow: {
    fontSize: rs(24),
    color: Colors.textMuted,
    marginLeft: rp(8),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: rp(32),
  },
  footerButton: {
    alignItems: 'center',
    gap: rp(4),
  },
  footerIcon: {
    fontSize: rs(24),
  },
  footerText: {
    fontSize: rs(12),
    color: Colors.textSecondary,
  },
});
