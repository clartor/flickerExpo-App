import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import Card from './src/filmcard';
import titles from './assets/data/titles';

import AnimatedStack from './src/animatedStack';

const App = () => {
  const onSwipeLeft = (title) => {
    console.warn("swipe left:", title.name)
    
  }
  const onSwipeRight = (title) => {
    console.warn("swipe right:", title.name)

  }


  return (
      <View style={styles.pageContainer}>
        <AnimatedStack
        data={titles}
        renderItem={({item}) => <Card title={item} /> }
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default App;
