import React, {
  useState,
  useEffect,
  FunctionComponent,
  useReducer,
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

const App: FunctionComponent = () => {
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

        // setCurrentWikis(wiki.geonames);
      }

      return;
    } catch (e) {
      dispatch({ type: 'failure', error: e });
      console.log('error finding wikipedia', e);
      return e;
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

      {/* <div style={{ color: '#fff' }}>{currentWiki}</div> */}
      {/* <Quiz currentWiki={currentWiki} /> */}
      <CT findWikipedia={findWikipedia} />
    </React.Fragment>
  );
};

export default React.memo(App);
