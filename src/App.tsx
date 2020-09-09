import React, {
  useEffect,
  useState,
  FunctionComponent,
  useReducer,
  SyntheticEvent,
} from 'react';
import Geonames from 'geonames.js';
import { Point } from 'react-simple-maps';

import CT from './CT';
// import Quiz from './Quiz';

interface CurrentWiki {
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

type Action =
  | { type: 'request' }
  | { type: 'success'; results: CurrentWiki[] }
  | { type: 'failure'; error: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
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
const selectedTowns: number[] = [];
while (selectedTowns.length < SELECTED_TOWNS_LENGTH) {
  const r = Math.floor(Math.random() * 168) + 1;
  if (selectedTowns.indexOf(r) === -1) selectedTowns.push(r);
}
function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

const App: FunctionComponent = () => {
  const [finalSelection] = useState<number>(
    getRandomInt(SELECTED_TOWNS_LENGTH)
  );
  const [selection, setSelection] = useState<number | undefined>(undefined);
  const [state, dispatch] = useReducer(reducer, { status: 'empty' });

  useEffect(() => {
    if (state.status === 'success') {
      console.log('currentWiki', state.currentWikis);
    }
  }, [state.status]);

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
    if (selectedTowns.includes(index)) {
      setSelection(index);
    }
  }

  return (
    <React.Fragment>
      {state.status === 'loading' && (
        <span style={{ color: 'white' }}>Loading...</span>
      )}
      {state.status === 'success' && (
        <div style={{ color: 'white' }}>{state.currentWikis[0].summary}</div>
      )}
      {state.status === 'error' && (
        <span style={{ color: 'white' }}>Error: {state.error}</span>
      )}
      {selection === selectedTowns[finalSelection] ? (
        <div style={{ color: 'white' }}>Correct</div>
      ) : (
        <div style={{ color: 'white' }}>Wrong</div>
      )}

      {/* <Quiz currentWiki={currentWiki} /> */}
      <CT
        findWikipedia={findWikipedia}
        handleMarkerClick={handleMarkerClick}
        selection={selection}
        selectedTowns={selectedTowns}
        finalSelection={finalSelection}
      />
    </React.Fragment>
  );
};

export default React.memo(App);
