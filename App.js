import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Button, View, StyleSheet, Text, useWindowDimensions } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, fadeIn, useDerivedValue, withDecay, ReduceMotion, withSpring, Easing, interpolate } from 'react-native-reanimated';

import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

import Card from './src/filmcard/index'
// import Groups from './assets/data/groups';

import titles from './assets/data/titles';
// import { rotationHandlerName } from 'react-native-gesture-handler/lib/typescript/handlers/RotationGestureHandler';
// import { RotationGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/rotationGesture';


const SIZE = 10;

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1); 

  const currentTitle = titles[currentIndex]; // nuvarande kort
  const nextTitle = titles[nextIndex]; // nästa kort

  // const okeyTitles = {};

  // animation functions  
  const width = useSharedValue(0); // initiera bredd t noll
  const offset = useSharedValue(0); // nya placeringen  ( translateX i video)
  
  const rotate = useDerivedValue(() => '20deg'); // -60    0     60 deg
  
  const displayNew = useSharedValue(0.3);


  const onLayout = (event) => { 
    width.value = event.nativeEvent.layout.width;// hämta bredden av skärmen
  };

  const pan = Gesture.Pan()
    .onChange((event) => {
      offset.value += event.changeX;
    })
    .onFinalize((event) => {
               // okeyTitles[titles[currentIndex].id] = titles[currentIndex] 
      offset.value = withDecay({
        velocity: event.velocityX,
        rubberBandEffect: true
      });
      if (Math.abs(offset.value / 100) > 0.5)
        displayNew.value = Math.abs(offset.value) / 400, 2;
    })
    

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: offset.value }, 
      { rotate: rotate.value}
    ]
  }));
  
  const nextAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(displayNew.value, { })}],
   
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
      <View onLayout={onLayout} style={styles.pageContainer}>
        <View style={styles.cardScrollContainer}>


          <Animated.View style={[nextAnimatedStyles, styles.nextCardContainer]}>
            <Card title={nextTitle} />
          </Animated.View>

          <GestureDetector gesture={pan}>
              <Animated.View style={[animatedStyles, styles.currentCardContainer]}>
                <Card title={currentTitle} />
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
