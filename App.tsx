import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useHistoryStore, useDisclaimerStore } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import { Colors } from './src/constants/colors';

export default function App() {
  const [ready, setReady] = useState(false);
  const loadHistory = useHistoryStore((s) => s.loadHistory);
  const loadDisclaimer = useDisclaimerStore((s) => s.loadDisclaimer);

  useEffect(() => {
    Promise.all([loadHistory(), loadDisclaimer()]).finally(() =>
      setReady(true)
    );
  }, []);

  if (!ready) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.background,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" color={Colors.accent} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <RootNavigator />
    </>
  );
}
