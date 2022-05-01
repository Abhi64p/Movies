import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  useWindowDimensions,
} from 'react-native';

import Poster from './components/Poster';
import {Colors} from './styles';
import {getContent} from './api';
import SearchBarWithTitle from './components/SearchBarWithTitle';

const App = () => {
  const [page, setPage] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchStr, setSearchStr] = useState('');
  const [filteredPage, setFilteredPage] = useState({});

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    setFilteredPage({
      ...page,
      'content-items':
        page?.['content-items']?.filter(item =>
          item?.name.includes(searchStr),
        ) ?? [],
    });
  }, [page, searchStr]);

  /**
   * Function to fetch content when the state 'currentPage' change.
   */
  const fetchMovies = () => {
    const result = getContent(currentPage);
    setPage({
      title: result?.page?.title,
      'content-items': [
        ...(page?.['content-items'] ?? []),
        ...(result?.page?.['content-items']?.content ?? []),
      ],
    });
  };

  /**
   * this hook is used to make Poster response if device width change,
   * like during device rotation.
   */
  const {width: deviceWidth} = useWindowDimensions();
  const posterWidth = (deviceWidth - 4 * 20) / 3;
  const posterHeight = posterWidth * 1.49;

  const renderItem = ({item}) => (
    <Poster
      name={item?.name}
      posterUrl={item?.['poster-image']}
      width={posterWidth}
      height={posterHeight}
    />
  );

  /**
   * handleOnEndReached will update the current page when 60% of visible area
   * is scrolled.
   */
  const handleOnEndReached = () =>
    setCurrentPage(currentPage + 1 <= 3 ? currentPage + 1 : currentPage);

  const handleSearchStrChange = text => setSearchStr(text);

  return (
    <>
      <StatusBar backgroundColor={Colors.background} barStyle="light-content" />
      <View style={styles.container}>
        <SearchBarWithTitle
          title={page?.title}
          onChangeText={handleSearchStrChange}
        />
        <FlatList
          data={filteredPage?.['content-items'] ?? []}
          keyExtractor={item => item?.id}
          renderItem={renderItem}
          style={styles.marginTopN20}
          contentContainerStyle={styles.contentContainer}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          onEndReached={handleOnEndReached}
          onEndReachedThreshold={0.4} //When 60% is scrolled, next page is fetched.
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
  marginTopN20: {marginTop: -20},
  contentContainer: {padding: 10},
});

export default App;
