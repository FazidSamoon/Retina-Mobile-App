import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const LoadingSpinner = () => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const interpolateRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {[...Array(5)].map((_, index) => {
        const dotRotation = index * (360 / 5);
        const animatedStyle = {
          transform: [{ rotate: interpolateRotation }, { rotate: `${dotRotation}deg` }],
        };
        return <Dot key={index} style={animatedStyle} />;
      })}
    </View>
  );
};

const Dot = ({ style }) => {
  return <Animated.View style={[styles.dot, style]} />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'blue', // You can change the color as needed
    marginHorizontal: 5,
  },
});

export default LoadingSpinner;
