import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('react-native-reanimated', () => ({View: 'AView'}));

import SearchBarWithTitle from '../src/components/SearchBarWithTitle';

test('Test to see if title is rendering', () => {
  const TITLE = 'title for testing';
  const {getByText, toJSON} = render(<SearchBarWithTitle title={TITLE} />);
  const titleElement = getByText(TITLE);
  expect(titleElement).toBeDefined();
  expect(toJSON()).toMatchSnapshot();
});

test('Test to see if Title <-> SearchBar toggle is working', () => {
  const TITLE = 'title for testing';
  const {getByText, getByPlaceholderText, getByTestId} = render(
    <SearchBarWithTitle title={TITLE} />,
  );
  const searchToggleButton = getByTestId('searchToggleButton');
  fireEvent(searchToggleButton, 'onPress'); // Switching to Search bar from Title
  const textInput = getByPlaceholderText('Search movie title');
  expect(textInput).toBeDefined();
  fireEvent(searchToggleButton, 'onPress'); // Switching back to Title
  const titleElement = getByText(TITLE);
  expect(titleElement).toBeDefined();
});

test('Test to see if searching works', async () => {
  const STRING = 'random string';
  const onChangeText = jest.fn();
  const {getByPlaceholderText, getByTestId} = render(
    <SearchBarWithTitle onChangeText={onChangeText} />,
  );
  const searchToggleButton = getByTestId('searchToggleButton');
  fireEvent(searchToggleButton, 'onPress');
  const textInput = getByPlaceholderText('Search movie title');
  fireEvent.changeText(textInput, STRING);
  await waitFor(() => expect(onChangeText).toBeCalledWith(STRING));
});
