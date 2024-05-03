import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const SoundWave = () => {
  const circleScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(circleScale, {
          toValue: 2,
          duration: 1000,
          easing: Easing.out(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(circleScale, {
          toValue: 1,
          duration: 1000,
          easing: Easing.in(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    ).start();
  }, [circleScale]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Svg height="200" width="200">
        <Circle
          cx="100"
          cy="100"
          r="50"
          fill="none"
          stroke="blue"
          strokeWidth="2"
          scale={circleScale}
        />
      </Svg>
    </View>
  );
};

export default SoundWave;
