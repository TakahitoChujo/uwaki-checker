import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FakeEvidence } from '../../types';
import { Colors } from '../../constants/colors';
import { rs, rp } from '../../utils/responsive';
import EvidenceCard from './EvidenceCard';

interface Props {
  evidences: FakeEvidence[];
}

export default function EvidenceList({ evidences }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>検出された証拠</Text>
      {evidences.map((e) => (
        <EvidenceCard key={e.id} evidence={e} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: rp(16),
  },
  title: {
    fontSize: rs(16),
    fontWeight: '700',
    color: Colors.text,
    marginBottom: rp(12),
  },
});
