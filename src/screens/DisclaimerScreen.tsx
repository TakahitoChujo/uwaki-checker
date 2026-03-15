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
import { useDisclaimerStore } from '../store';

type Props = NativeStackScreenProps<RootStackParamList, 'Disclaimer'>;

export default function DisclaimerScreen({ navigation }: Props) {
  const acceptDisclaimer = useDisclaimerStore((s) => s.acceptDisclaimer);

  const handleAccept = () => {
    acceptDisclaimer();
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>🛡️</Text>
        <Text style={styles.title}>ご利用の前に</Text>
        <View style={styles.card}>
          <Text style={styles.body}>
            このアプリは
            <Text style={styles.bold}>エンターテインメント・ジョーク目的</Text>
            で作られたアプリです。{'\n\n'}
            実際のスマートフォンデータの分析やスキャンは
            <Text style={styles.bold}>一切行いません</Text>。{'\n\n'}
            すべての結果はランダムに生成されたフィクションです。
            実在の人物・団体とは関係ありません。{'\n\n'}
            友達やパートナーとのパーティーでお楽しみください。
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleAccept}>
          <Text style={styles.buttonText}>同意してはじめる</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: rp(24),
  },
  icon: {
    fontSize: rs(64),
    marginBottom: rp(16),
  },
  title: {
    fontSize: rs(24),
    fontWeight: '700',
    color: Colors.text,
    marginBottom: rp(24),
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: rp(16),
    padding: rp(24),
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: rp(32),
  },
  body: {
    fontSize: rs(15),
    color: Colors.textSecondary,
    lineHeight: rs(24),
  },
  bold: {
    color: Colors.accent,
    fontWeight: '600',
  },
  button: {
    backgroundColor: Colors.accent,
    paddingVertical: rp(16),
    paddingHorizontal: rp(48),
    borderRadius: rp(12),
  },
  buttonText: {
    fontSize: rs(17),
    fontWeight: '700',
    color: Colors.background,
  },
});
