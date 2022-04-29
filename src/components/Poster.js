import React from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';

import {Images} from '../assets/images';
import {Typography} from '../styles';

const Poster = ({name, posterUrl}) => {
  /**
   * this hook is used to make Poster response if device width change,
   * like during device rotation.
   */
  const {width: deviceWidth} = useWindowDimensions();

  const width = (deviceWidth - 4 * 20) / 3;
  const height = width * 1.49;

  return (
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
};

const styles = StyleSheet.create({
  posterContainer: {margin: 10},
  name: {minHeight: 40, marginTop: 3},
});

export default Poster;
