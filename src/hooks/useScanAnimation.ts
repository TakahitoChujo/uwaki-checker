import { useRef, useState, useCallback } from 'react';
import { Animated } from 'react-native';
import { SCAN_LOG_MESSAGES } from '../constants/scanTexts';

type ScanPhase = 'idle' | 'initializing' | 'scanning' | 'complete';

export function useScanAnimation() {
  const progress = useRef(new Animated.Value(0)).current;
  const [phase, setPhase] = useState<ScanPhase>('idle');
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const start = useCallback(
    (onComplete: () => void) => {
      clearTimers();
      setPhase('initializing');
      setLogMessages([]);
      progress.setValue(0);

      const t1 = setTimeout(() => {
        setPhase('scanning');

        Animated.timing(progress, {
          toValue: 1,
          duration: 5500,
          useNativeDriver: false,
        }).start();

        const shuffled = [...SCAN_LOG_MESSAGES].sort(
          () => Math.random() - 0.5
        );
        const lineCount = Math.min(shuffled.length, 12);
        const interval = 5500 / lineCount;

        for (let i = 0; i < lineCount; i++) {
          const t = setTimeout(() => {
            setLogMessages((prev) => [...prev, shuffled[i]]);
          }, interval * i);
          timers.current.push(t);
        }

        const t2 = setTimeout(() => {
          setPhase('complete');
          const t3 = setTimeout(onComplete, 800);
          timers.current.push(t3);
        }, 5500);
        timers.current.push(t2);
      }, 1500);
      timers.current.push(t1);
    },
    [progress, clearTimers]
  );

  const reset = useCallback(() => {
    clearTimers();
    setPhase('idle');
    setLogMessages([]);
    progress.setValue(0);
  }, [progress, clearTimers]);

  return { phase, progress, logMessages, start, reset };
}
