import React, {
  useEffect,
  useState,
  FunctionComponent,
  useReducer,
  SyntheticEvent,
} from 'react';
import { Point } from 'react-simple-maps';
import styled from 'styled-components';

import CT from './CT';
import Quiz from './Quiz';

export enum Status {
  empty = 'empty',
  loading = 'loading',
  success = 'success',
  error = 'error',
}

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
  | { status: Status.empty }
  | { status: Status.loading }
  | { status: Status.error; error: string }
  | { status: Status.success; currentWikis: CurrentWiki[] };

export type Action =
  | { type: 'empty' }
  | { type: 'request' }
  | { type: 'success'; results: CurrentWiki[] }
  | { type: 'failure'; error: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'empty':
      return { status: Status.empty };
    case 'request':
      return { status: Status.loading };
    case 'success':
      return { status: Status.success, currentWikis: action.results };
    case 'failure':
      return { status: Status.error, error: action.error };
    default: {
      return { status: Status.empty };
    }
  }
}

const { REACT_APP_USERNAME } = process.env;

const SELECTED_TOWNS_LENGTH = 5;
const WIKI_LENGTH = 3;
const TOTAL_TOWNS = 168;

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

const FlexContainer = styled.div`
  margin: 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PinMap = styled.div`
  position: absolute;
  width: 100%;
  top: 60px;
`;

const App: FunctionComponent = () => {
  const [finalSelection, setFinalSelection] = useState(0);
  const [finalWiki, setFinalWiki] = useState(0);
  const [selection, setSelection] = useState<number | undefined>(undefined);
  const [selectedTowns, setSelectedTowns] = useState<number[]>([]);
  const [state, dispatch] = useReducer(reducer, { status: Status.empty });

  useEffect(() => {
    resetRound();
  }, []);

  function resetRound(): void {
    setFinalWiki(getRandomInt(WIKI_LENGTH));
    setFinalSelection(getRandomInt(SELECTED_TOWNS_LENGTH));
    setSelection(undefined);

    const selectedTowns: number[] = [];
    while (selectedTowns.length < SELECTED_TOWNS_LENGTH) {
      const r = Math.floor(Math.random() * TOTAL_TOWNS) + 1;
      if (selectedTowns.indexOf(r) === -1) selectedTowns.push(r);
    }
    setSelectedTowns(selectedTowns);
    dispatch({ type: 'empty' });
  }

  async function findWikipedia(centroid: Point): Promise<undefined | string> {
    try {
      if (state.status === Status.empty) {
        dispatch({ type: 'request' });

        const response: Response = await fetch(
          `https://secure.geonames.org/findNearbyWikipediaJSON?formatted=true&lat=${centroid[1]}&lng=${centroid[0]}&username=${REACT_APP_USERNAME}&style=full`
        );

        const wiki: {
          [geonames: string]: CurrentWiki[];
        } = await response.json();

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
      />
      <PinMap>
        <CT
          findWikipedia={findWikipedia}
          handleMarkerClick={handleMarkerClick}
          selection={selection}
          selectedTowns={selectedTowns}
          finalSelection={finalSelection}
        />
      </PinMap>
    </FlexContainer>
  );
};

export default App;
