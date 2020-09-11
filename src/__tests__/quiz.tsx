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
        title: '',
        wikipediaUrl: '',
      },
    ],
  },
  selection: undefined,
  selectedTowns: [0, 1, 2, 3, 4],
  finalSelection: 0,
  finalWiki: 0,
  resetRound: () => {},
  dispatch: () => {},
};

test('finds wiki', () => {
  render(<Quiz {...props} />);
  const wiki = screen.queryByText(/Hello World/i);

  expect(wiki).toHaveTextContent('Hello World');
});

test('finds rounds and score', () => {
  render(<Quiz {...props} />);
  const round = screen.queryByText(/Round/i);
  const score = screen.queryByText(/Score/i);

  expect(round).toHaveTextContent('Round: 1');
  expect(score).toHaveTextContent('Score: 0 / 0');
});

test('finds "Please select a town"', () => {
  render(<Quiz {...props} />);
  const please = screen.queryByText(/Please/i);

  expect(please).toHaveTextContent('Please select a town');
});
