import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';

import {Images} from '../assets/images';
import {Typography} from '../styles';

const {width: deviceWidth} = Dimensions.get('window');
const width = (deviceWidth - 4 * 20) / 3;
const height = width * 1.49;

const Poster = ({name, posterUrl}) => (
  <View style={styles.posterContainer}>
    <Image
      source={Images?.[posterUrl] ?? Images.placeholder}
      style={styles.imageStyle}
      resizeMode="cover"
    />
    <Text style={[Typography.h3, styles.name]} numberOfLines={2}>
      {name}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  posterContainer: {margin: 10},
  name: {width, minHeight: 40, marginTop: 3},
  imageStyle: {height, width},
});

export default Poster;
