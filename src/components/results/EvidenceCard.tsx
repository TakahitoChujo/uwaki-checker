import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FakeEvidence } from '../../types';
import { dangerColor, dangerBgColor } from '../../constants/colors';
import { Colors } from '../../constants/colors';
import { rs, rp } from '../../utils/responsive';

interface Props {
  evidence: FakeEvidence;
}

export default function EvidenceCard({ evidence }: Props) {
  const color = dangerColor(evidence.severity);
  const bgColor = dangerBgColor(evidence.severity);

  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <View style={styles.header}>
        <Text style={styles.icon}>{evidence.icon}</Text>
        <View style={[styles.categoryBadge, { backgroundColor: bgColor }]}>
          <Text style={[styles.categoryText, { color }]}>
            {evidence.category}
          </Text>
        </View>
      </View>
      <Text style={styles.description}>{evidence.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: rp(12),
    padding: rp(16),
    borderLeftWidth: rp(3),
    marginBottom: rp(10),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rp(8),
  },
  icon: {
    fontSize: rs(18),
    marginRight: rp(8),
  },
  categoryBadge: {
    paddingVertical: rp(2),
    paddingHorizontal: rp(8),
    borderRadius: rp(6),
  },
  categoryText: {
    fontSize: rs(11),
    fontWeight: '600',
  },
  description: {
    fontSize: rs(14),
    color: Colors.text,
    lineHeight: rs(20),
  },
});
