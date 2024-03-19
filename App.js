import React from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';

// import Animated from 'react-native-reanimated';
import Animated, { useSharedValue, withTiming, Easing, ReduceMotion } from 'react-native-reanimated';

import Card from './src/filmcard/index'
import titles from './assets/data/titles';

const App = () => {
  const translateX = useSharedValue(0);
  const sv = useSharedValue(250);


  const handlePressRight = () => {
    translateX.value = withTiming(sv.value, {
      duration: 200,
      easing: Easing.out(Easing.bezierFn(0.25, 0.1, 0.25, 1)),
      reduceMotion: ReduceMotion.Never,
    })
  }
  const handlePressLeft = () => {
    translateX.value = withTiming(-sv.value, {
      duration: 200,
      easing: Easing.out(Easing.bezierFn(0.25, 0.1, 0.25, 1)),
      reduceMotion: ReduceMotion.Never,
    })
  }

  return (
    <View style={styles.pageContainer}>
      <Animated.View style={[styles.box, { transform: [{ translateX }] }]}
      >
        {/* <Text>Hello poo </Text> */}
        <Card title={titles[1]} />
      </Animated.View>

      <View style={{ flexDirection: 'row' }}>
        <Button onPress={handlePressLeft} title="No"></Button>
        <Button onPress={handlePressRight} title="Yes"></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,

    // width: '100vw'

  },
  // myAnimation:
  // { height: 100,width, backgroundColor: 'green' }
});

export default App;
