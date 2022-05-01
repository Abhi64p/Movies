import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
} from 'react-native-reanimated';

import {Images} from '../assets/images';
import {Typography} from '../styles';

const {View: AView} = Animated;

const SearchBarWithTitle = ({title, onChangeText}) => {
  const textInputRef = useRef();
  const timeoutId = useRef();

  const [searchEnabled, setSearchEnabled] = useState(false);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    if (searchEnabled) {
      textInputRef?.current?.focus?.();
    }
  }, [searchEnabled]);

  useEffect(() => {
    if (searchString === '' && !textInputRef?.current?.isFocused()) {
      setSearchEnabled(false);
    }

    /**
     * timeout is for handling debouncing
     */
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => onChangeText?.(searchString), 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString]);

  const handleSearchStringChange = text => setSearchString(text);
  const handleClear = () => setSearchString('');
  const toggleSearch = () =>
    setSearchEnabled(!searchEnabled || searchString !== '');

  return (
    <>
      <View style={styles.container}>
        {searchEnabled ? (
          <AView
            key={`input${searchEnabled ? 'yes' : 'no'}`}
            style={styles.row0}
            entering={FadeInRight}
            exiting={FadeOutRight}>
            <TextInput
              ref={textInputRef}
              style={[styles.textInput, Typography.h3]}
              placeholder="Search movie title"
              placeholderTextColor="white"
              value={searchString}
              onChangeText={handleSearchStringChange}
              onBlur={toggleSearch}
            />
            <TouchableOpacity
              onPress={handleClear}
              disabled={searchString === ''}
              testID="searchStringClearButton">
              <Image
                source={Images.cancel}
                resizeMode="contain"
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          </AView>
        ) : (
          <AView
            key={`title${searchEnabled ? 'yes' : 'no'}`}
            style={styles.flex1}
            entering={FadeInLeft}
            exiting={FadeOutLeft}>
            <Text style={Typography.h2}>{title}</Text>
          </AView>
        )}
        <TouchableOpacity
          style={styles.searchButton}
          onPress={toggleSearch}
          disabled={searchEnabled && searchString !== ''}
          testID="searchToggleButton">
          <Image
            source={Images.search}
            resizeMode="contain"
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
      <LinearGradient
        colors={['rgba(32,33,36,1)', 'rgba(32,33,36,0)']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        locations={[0, 1]}
        style={styles.gradient}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  gradient: {height: 20, zIndex: 2},
  searchIcon: {height: 20, width: 20},
  searchButton: {marginLeft: 10, paddingVertical: 4},
  flex1: {flex: 1},
  textInput: {
    flex: 1,
    height: 28,
    padding: 0,
  },
  row0: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderColor: 'white',
    borderWidth: 0.8,
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 5,
  },
});

export default SearchBarWithTitle;
