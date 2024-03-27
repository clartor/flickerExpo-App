import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import titles from '../../assets/data/titles';
import AnimatedStack from '../animatedStack';

import Card from '../filmcard'

const SwipeTitles = () => {
  const onSwipeLeft = (title) => {
    console.warn("swipe left:", title.name)
    
  }
  const onSwipeRight = (title) => {
    console.warn("swipe right:", title.name)

  }
  return (
      <SafeAreaView style={styles.root}>
        <AnimatedStack
        data={titles}
        renderItem={({item}) => <Card title={item} /> }
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        />
      </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  matched: {
      // flex: 1,
      backgroundColor: 'green'

  }
})



export default SwipeTitles;
