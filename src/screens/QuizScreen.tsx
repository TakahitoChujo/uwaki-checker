import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, QuizAnswer } from '../types';
import { Colors } from '../constants/colors';
import { rs, rp, SCREEN_WIDTH } from '../utils/responsive';
import { QUIZ_QUESTIONS } from '../constants/quizData';
import { calculateQuizPercentage, getDangerLevel } from '../utils/scoring';
import { useHistoryStore } from '../store';

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;

export default function QuizScreen({ navigation }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const addQuizResult = useHistoryStore((s) => s.addQuizResult);
  const total = QUIZ_QUESTIONS.length;
  const question = QUIZ_QUESTIONS[currentIndex];

  const handleAnswer = (optionIndex: number, points: number) => {
    const answer: QuizAnswer = {
      questionId: question.id,
      selectedIndex: optionIndex,
      points,
    };
    const newAnswers = [...answers, answer];

    if (currentIndex < total - 1) {
      // Slide out and in
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: -SCREEN_WIDTH,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: SCREEN_WIDTH,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(() => {
        setAnswers(newAnswers);
        setCurrentIndex(currentIndex + 1);
      }, 200);
    } else {
      // Complete
      setAnswers(newAnswers);
      const percentage = calculateQuizPercentage(newAnswers);
      const dangerLevel = getDangerLevel(percentage);
      const totalScore = newAnswers.reduce((sum, a) => sum + a.points, 0);
      const maxScore = total * 3;

      const resultId = addQuizResult({
        type: 'quiz',
        percentage,
        dangerLevel,
        totalScore,
        maxScore,
        answers: newAnswers,
      });

      navigation.replace('QuizResult', { resultId });
    }
  };

  const progressWidth = ((currentIndex + 1) / total) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.progressArea}>
          <Text style={styles.progressText}>
            {currentIndex + 1} / {total}
          </Text>
          <View style={styles.progressTrack}>
            <View
              style={[styles.progressFill, { width: `${progressWidth}%` }]}
            />
          </View>
        </View>

        <Animated.View
          style={[
            styles.questionArea,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          <Text style={styles.questionText}>{question.question}</Text>

          <View style={styles.options}>
            {question.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswer(index, option.points)}
                activeOpacity={0.7}
              >
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
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
    paddingTop: rp(20),
  },
  progressArea: {
    marginBottom: rp(32),
  },
  progressText: {
    fontSize: rs(14),
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: rp(8),
    fontVariant: ['tabular-nums'],
  },
  progressTrack: {
    height: rp(4),
    backgroundColor: Colors.progressTrack,
    borderRadius: rp(2),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: rp(2),
  },
  questionArea: {
    flex: 1,
  },
  questionText: {
    fontSize: rs(20),
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: rp(32),
    lineHeight: rs(30),
  },
  options: {
    gap: rp(12),
  },
  optionButton: {
    backgroundColor: Colors.surface,
    paddingVertical: rp(18),
    paddingHorizontal: rp(20),
    borderRadius: rp(12),
    borderWidth: 1,
    borderColor: Colors.border,
  },
  optionText: {
    fontSize: rs(15),
    color: Colors.text,
    textAlign: 'center',
  },
});
