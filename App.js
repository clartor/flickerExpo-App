import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet } from 'react-native'
import SwipeTitles from './src/screens/SwipeTitles';
import MatchedTitles from './src/screens/MatchedTitles';

const App = () => {

  return (
      <View style={styles.pageContainer}>
        <MatchedTitles/>
        {/* <SwipeTitles/> */}
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
