/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

import {Colors, Typography} from './styles';

const App = () => (
  <>
    <StatusBar backgroundColor={Colors.background} barStyle="light-content" />
    <View style={styles.container}>
      <Text style={Typography.h2}>Hai</Text>
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
});

export default App;
