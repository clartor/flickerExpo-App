import 'react-native-gesture-handler';
import React from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, withDecay, ReduceMotion, withSpring, Easing } from 'react-native-reanimated';

import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

import Card from './src/filmcard/index'
import titles from './assets/data/titles';

const SIZE = 120;
const App = () => {

  const pressed = useSharedValue(false);
  // const offset = useSharedValue(0);

  const offset = useSharedValue(0);
  const width = useSharedValue(0);

  const onLayout = (event) => {
    width.value = event.nativeEvent.layout.width;
  };

  const pan = Gesture.Pan()
  // .onBegin(() => {
  //   pressed.value = true;
  // })
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
    opacity: pressed.value ? '.63' : '1',
    transform: [{ translateX: offset.value }],
    opacity: pressed.value ? '.63' : '1',
  }));

  // const translateX = useSharedValue(0);
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
        <GestureDetector gesture={pan}>

        <Animated.View 
        // </GestureDetector>style={[styles.circle, animatedStyles]} />
        style={[ animatedStyles]}>
          {/* <Text>Hello poo </Text> */}
          <Card title={titles[1]} />
         </Animated.View>


          </GestureDetector>
        <View style={{ flexDirection: 'row' }}>
          <Button onPress={handlePressLeft} title="No"></Button>
          <Button onPress={handlePressRight} title="Yes"></Button>
        </View>
      </View>

    </GestureHandlerRootView>
  );
};

// upp t rad 51 sen
        
const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  circle: {
    height: 120,
    width: 120,
    borderRadius: 500,
  },
});

export default App;
