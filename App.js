
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from './src/filmcard/index'
import titles from './assets/data/titles';

const App = () => {
  return (
    <View style={styles.pageContainer}>
      <Card title={titles[1]}/>
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
