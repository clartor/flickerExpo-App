import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, withDecay, ReduceMotion, withSpring, Easing, interpolate } from 'react-native-reanimated';

import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

import Card from './src/filmcard/index'
import titles from './assets/data/titles';

const SIZE = 110;
const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);

  const currentTitle = titles[currentIndex];
  const nextTitle = titles[nextIndex];

  // animation functions  
  const offset = useSharedValue(0);
  const width = useSharedValue(0);

 

  const onLayout = (event) => {
    width.value = event.nativeEvent.layout.width;
  };

  const pan = Gesture.Pan()
    .onChange((event) => {
      offset.value += event.changeX;
    })
    .onFinalize((event) => {
      offset.value = withDecay({
        velocity: event.velocityX,
        rubberBandEffect: true,
        clamp: [-(width.value / 2) + SIZE / 2, width.value / 2 - SIZE / 2],
      });
    })
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }]
  }));

  // buttons function
  const sv = useSharedValue(250);

  const handlePressRight = () => {
    offset.value = withTiming(sv.value, {
      duration: 160,
      easing: Easing.out(Easing.bezierFn(0.25, 0.1, 0.25, 1)),
      reduceMotion: ReduceMotion.Never,
    })
  }
  const handlePressLeft = () => {
    offset.value = withTiming(-sv.value, {
      duration: 160,
      easing: Easing.out(Easing.bezierFn(0.25, 0.1, 0.25, 1)),
      reduceMotion: ReduceMotion.Never,
    })
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View onLayout={onLayout} style={styles.pageContainer}>
        <View style={styles.cardScrollContainer}>

        <Animated.View style={[ styles.nextCardContainer]}>
          <Card title={nextTitle} />
        </Animated.View>

        <GestureDetector gesture={pan}>
            <Animated.View style={[animatedStyles, styles.thisCardContainer]}>
              <Card title={currentTitle} />
            </Animated.View>
        </GestureDetector>

        </View>
        <View style={{ flexDirection: 'row' }}>
          <Button onPress={handlePressLeft} title="No"></Button>
          <Button onPress={handlePressRight} title="Yes"></Button>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  cardScrollContainer: {
    height: '80%',
  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
  }
});

export default App;
