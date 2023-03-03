import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.rootConatiner}>
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  rootConatiner: {flex: 1},
});
