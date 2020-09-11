import React from 'react';
import { render, screen } from '@testing-library/react';

import Quiz from '../Quiz';

const props = {
  appState: {
    status: 'success',
    error: '',
    currentWikis: [
      {
        summary: 'Hello World',
        countryCode: '',
        distance: 0,
        elevation: 0,
        geoNameId: 0,
        lang: 0,
        lat: 0,
        rank: 0,
        title: 'Hello',
        wikipediaUrl: '',
      },
    ],
  },
  selection: undefined,
  selectedTowns: [0, 1, 2, 3, 4],
  finalSelection: 0,
  finalWiki: 0,
  resetRound: () => {},
};

test('finds wiki', () => {
  render(<Quiz {...props} />);
  const wiki = screen.queryByText(/Hello World/i);

  expect(wiki).toHaveTextContent('Hello World Wiki');
});
