import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Colors } from '../constants/colors';
import { useDisclaimerStore } from '../store';

import DisclaimerScreen from '../screens/DisclaimerScreen';
import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import ScanResultScreen from '../screens/ScanResultScreen';
import QuizScreen from '../screens/QuizScreen';
import QuizResultScreen from '../screens/QuizResultScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const hasSeen = useDisclaimerStore((s) => s.hasSeen);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={hasSeen ? 'Home' : 'Disclaimer'}
        screenOptions={{
          headerStyle: { backgroundColor: Colors.surface },
          headerTintColor: Colors.accent,
          headerTitleStyle: { color: Colors.text, fontWeight: '600' },
          contentStyle: { backgroundColor: Colors.background },
        }}
      >
        <Stack.Screen
          name="Disclaimer"
          component={DisclaimerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Scan"
          component={ScanScreen}
          options={{ title: 'スキャン中...', headerBackVisible: false }}
        />
        <Stack.Screen
          name="ScanResult"
          component={ScanResultScreen}
          options={{ title: '分析結果' }}
        />
        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={{ title: '質問診断' }}
        />
        <Stack.Screen
          name="QuizResult"
          component={QuizResultScreen}
          options={{ title: '診断結果' }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: '履歴' }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: '設定' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
