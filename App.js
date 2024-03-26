import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Button, View, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, useDerivedValue, ReduceMotion, withSpring, Easing, interpolate } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

import Card from './src/filmcard/index'
// import Groups from './assets/data/groups';

import titles from './assets/data/titles';
// import { rotationHandlerName } from 'react-native-gesture-handler/lib/typescript/handlers/RotationGestureHandler';
// import { RotationGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/rotationGesture';


const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1); 

  const currentTitle = titles[currentIndex]; // nuvarande kort
  const nextTitle = titles[nextIndex]; // nästa kort
  // const okeyTitles = {};

  const {width : screenWidth } = useWindowDimensions();


  // animation functions  
  const translateX = useSharedValue(0);
  const rotate = useDerivedValue(
    () => interpolate(translateX.value, [0, screenWidth], [0, 40]) + 'deg', // rotera beroende på hur långt åt sidan drag
    );
 
  
  const pan = Gesture.Pan()
  .onBegin(() => {
  })
  .onChange((event) => {
    translateX.value = event.translationX;
  })
  .onFinalize(() => {
    translateX.value = withSpring(0);
  });
  
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value }, 
      { rotate: rotate.value}
    ]
  }));
  
  const serveNewcard = useSharedValue(0.3);

  const nextAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(serveNewcard.value, { })}],
   
  }));

  // buttons function
  const sv = useSharedValue('300px');

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
      <View style={styles.pageContainer}>
        <View style={styles.cardScrollContainer}>


          <Animated.View style={[nextAnimatedStyles, styles.nextCardContainer]}>
            <Card title={nextTitle} />
          </Animated.View>

          <GestureDetector gesture={pan}>
              <Animated.View style={[animatedStyles, styles.currentCardContainer]}>
                <Card title={titles[0]} />
              </Animated.View>
          </GestureDetector>

        </View>
        <View style={{ flexDirection: 'row' }}>
          <Button onPress={handlePressLeft} title="No"></Button>
          <Button onPress={handlePressRight} title="Yes"></Button>
        </View>
        <View>
                  {/* <Groups okt={okeyTitles}/> */}
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
