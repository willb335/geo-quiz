import React, {
  useEffect,
  useState,
  FunctionComponent,
  useReducer,
  SyntheticEvent,
} from 'react';
import Geonames from 'geonames.js';
import { Point } from 'react-simple-maps';
import styled from 'styled-components';

import CT from './CT';
import Quiz from './Quiz';

export interface CurrentWiki {
  countryCode: string;
  distance: number;
  elevation: number;
  geoNameId: number;
  lang: number;
  lat: number;
  rank: number;
  summary: string;
  title: string;
  wikipediaUrl: string;
}

type State =
  | { status: 'empty' }
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'success'; currentWikis: CurrentWiki[] };

export type Action =
  | { type: 'empty' }
  | { type: 'request' }
  | { type: 'success'; results: CurrentWiki[] }
  | { type: 'failure'; error: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'empty':
      return { status: 'empty' };
    case 'request':
      return { status: 'loading' };
    case 'success':
      return { status: 'success', currentWikis: action.results };
    case 'failure':
      return { status: 'error', error: action.error };
    default: {
      return { status: 'empty' };
    }
  }
}

const geonames = new Geonames({
  username: 'willb335',
  lan: 'en',
  encoding: 'JSON',
});

const SELECTED_TOWNS_LENGTH = 5;
const WIKI_LENGTH = 3;

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

const FlexContainer = styled.div`
  margin: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 500px) {
    justify-content: space-around;
    height: 100vh;
  }
`;

const App: FunctionComponent = () => {
  const [finalSelection, setFinalSelection] = useState(0);
  const [finalWiki, setFinalWiki] = useState(0);
  const [selection, setSelection] = useState<number | undefined>(undefined);
  const [selectedTowns, setSelectedTowns] = useState<number[]>([]);
  const [state, dispatch] = useReducer(reducer, { status: 'empty' });

  useEffect(() => {
    resetRound();
  }, []);

  function resetRound(): void {
    setFinalWiki(getRandomInt(WIKI_LENGTH));
    setFinalSelection(getRandomInt(SELECTED_TOWNS_LENGTH));
    setSelection(undefined);

    const selectedTowns: number[] = [];
    while (selectedTowns.length < SELECTED_TOWNS_LENGTH) {
      const r = Math.floor(Math.random() * 168) + 1;
      if (selectedTowns.indexOf(r) === -1) selectedTowns.push(r);
    }
    setSelectedTowns(selectedTowns);
  }

  async function findWikipedia(centroid: Point): Promise<undefined | string> {
    try {
      if (state.status === 'empty') {
        dispatch({ type: 'request' });

        const wiki: {
          [geonames: string]: CurrentWiki[];
        } = await geonames.findNearbyWikipedia({
          lat: centroid[1],
          lng: centroid[0],
        });
        dispatch({ type: 'success', results: wiki.geonames });
      }

      return;
    } catch (e) {
      dispatch({ type: 'failure', error: e });
      console.log('error finding wikipedia', e);
      return e;
    }
  }

  function handleMarkerClick(
    e: SyntheticEvent,
    selectedTowns: number[],
    index: number
  ): void {
    e.preventDefault();
    if (selectedTowns.includes(index) && selection === undefined) {
      setSelection(index);
    }
  }

  return (
    <FlexContainer>
      <Quiz
        appState={state}
        selection={selection}
        selectedTowns={selectedTowns}
        finalSelection={finalSelection}
        finalWiki={finalWiki}
        resetRound={resetRound}
        dispatch={dispatch}
      />
      <CT
        findWikipedia={findWikipedia}
        handleMarkerClick={handleMarkerClick}
        selection={selection}
        selectedTowns={selectedTowns}
        finalSelection={finalSelection}
      />
    </FlexContainer>
  );
};

export default App;
