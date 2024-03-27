import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { runOnJS, useSharedValue, withTiming, useAnimatedStyle, useDerivedValue, ReduceMotion, withSpring, Easing, interpolate } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

import Card from './src/filmcard/index'
// import Groups from './assets/data/groups';

import titles from './assets/data/titles';
// import { rotationHandlerName } from 'react-native-gesture-handler/lib/typescript/handlers/RotationGestureHandler';
// import { RotationGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/rotationGesture';

const ROTATION = 40; // hur mycket kortet snurrar
const SWIPE_VELOCITY = 300; // hur många pixlar per sekund är ett svep

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);

  const currentTitle = titles[currentIndex]; // nuvarande kort
  const nextTitle = titles[nextIndex]; // nästa kort
  // const okeyTitles = {};

  const { width: screenWidth } = useWindowDimensions();
  const hiddenTranslateX = 2 * screenWidth;


  // animation functions  
  const translateX = useSharedValue(0);
  const rotate = useDerivedValue(
    () => interpolate(translateX.value,
      [0, hiddenTranslateX],
      [0, ROTATION]) + 'deg', // rotera beroende på hur långt åt sidan drag
  );


  const pan = Gesture.Pan()
    .onChange((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (Math.abs(event.velocityX) < SWIPE_VELOCITY) { // om snabbt åt båda håll stanna där
        translateX.value = withSpring(0);
        return;
      }
      translateX.value = withSpring(
        hiddenTranslateX * Math.sign(event.velocityX),
        {}, // tredje delen måste köras innan nästa kort uppdateras 
        () => runOnJS(setCurrentIndex)(currentIndex + 1)
      )


    });

  useEffect(() => {
    translateX.value = 0;
    setNextIndex(currentIndex + 1)
  }, [currentIndex])

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: rotate.value }
    ]
  }));

  const nextAnimatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(translateX.value,
          [-hiddenTranslateX, 0, hiddenTranslateX],
          [1, 0.85, 1])
      }
    ],
    opacity: interpolate(translateX.value,
      [-hiddenTranslateX, 0, hiddenTranslateX],
      [1, 0.5, 1])
  })
  );

  // buttons function
  // const sv = useSharedValue('300px');

  // const handlePressRight = () => {
  //   translateX.value = withTiming(sv.value, {
  //     duration: 160,
  //     easing: Easing.out(Easing.bezierFn(0.25, 0.1, 0.25, 1)),
  //     reduceMotion: ReduceMotion.Never,
  //   })
  // }
  // const handlePressLeft = () => {
  //   translateX.value = withTiming(-sv.value, {
  //     duration: 160,
  //     easing: Easing.out(Easing.bezierFn(0.25, 0.1, 0.25, 1)),
  //     reduceMotion: ReduceMotion.Never,
  //   })
  // }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.pageContainer}>
        <View style={styles.cardScrollContainer}>
          {nextTitle && (
            <Animated.View style={[nextAnimatedStyles, styles.nextCardContainer]}>
                <Card title={nextTitle} />
              </Animated.View>
              )}

          <GestureDetector gesture={pan}>
              {currentTitle && (
            <Animated.View style={[animatedStyles, styles.currentCardContainer]}>
              <Card title={currentTitle} />
            </Animated.View>
              )} 
          </GestureDetector>
        </View>
        {/* <View style={{ flexDirection: 'row' }}>
          <Button onPress={handlePressLeft} title="No"></Button>
          <Button onPress={handlePressRight} title="Yes"></Button>
        </View> */}
        {/* <View>
          <Groups okt={okeyTitles}/>
        </View> */}
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
