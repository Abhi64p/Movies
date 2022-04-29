import React, {useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar, FlatList} from 'react-native';

import Poster from './components/Poster';
import {Colors} from './styles';
import {getContent} from './api';

const App = () => {
  const [page, setPage] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

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

  return (
    <>
      <StatusBar backgroundColor={Colors.background} barStyle="light-content" />
      <View style={styles.container}>
        <FlatList
          data={page?.['content-items'] ?? []}
          keyExtractor={(item, index) => `${item?.name}${index}`}
          renderItem={({item}) => (
            <Poster name={item?.name} posterUrl={item?.['poster-image']} />
          )}
          contentContainerStyle={styles.contentContainer}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          onEndReached={() =>
            setCurrentPage(currentPage + 1 <= 3 ? currentPage + 1 : currentPage)
          }
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
  contentContainer: {padding: 10},
});

export default App;
