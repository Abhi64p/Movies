import React from 'react';
import {render} from '@testing-library/react-native';

import Poster from '../src/components/Poster';

test('Poster rendering correctly', () => {
  const {toJSON} = render(
    <Poster
      name="sample poster"
      posterUrl="http://posterUrl"
      width={100}
      height={150}
    />,
  );
  expect(toJSON()).toMatchSnapshot();
});
