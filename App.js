import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

// import Animated from 'react-native-reanimated';
import Animated, { useSharedValue } from 'react-native-reanimated';

import Card from './src/filmcard/index'
import titles from './assets/data/titles';
// import { Button } from 'react-native-web';

const App = () => {
  const width = useSharedValue(100);

  const handlePress = () => {
    width.value = width.value + 20;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>

    {/* <View style={styles.pageContainer}>
      <Card title={titles[1]}/>
    </View> */}
    <Animated.View
    style={{
      width, 
      height: 100,
      backgroundColor: 'violet',
    }}
    />
    <Button onPress={handlePress} title="click"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,

  }
});

export default App;
