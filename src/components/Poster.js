import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {Images} from '../assets/images';
import {Typography} from '../styles';

const Poster = ({name, posterUrl, width, height}) => (
  <View style={styles.posterContainer}>
    <Image
      source={Images?.[posterUrl] ?? Images.placeholder}
      style={{height, width}}
      resizeMode="cover"
    />
    <Text style={[Typography.h3, styles.name, {width}]} numberOfLines={2}>
      {name}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  posterContainer: {margin: 10},
  name: {height: 40, marginTop: 3},
});

export default Poster;
