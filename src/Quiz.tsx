import React, { FunctionComponent, useState, Dispatch } from 'react';
import { CurrentWiki, Action } from './App';

interface AppState {
  status: string;
  error?: string;
  currentWikis?: CurrentWiki[];
}

interface QuizProps {
  appState: AppState;
  selection: number | undefined;
  selectedTowns: number[];
  finalSelection: number;
  finalWiki: number;
  resetRound: Function;
  dispatch: Dispatch<Action>;
}

const Quiz: FunctionComponent<QuizProps> = ({
  appState,
  selection,
  selectedTowns,
  finalSelection,
  finalWiki,
  resetRound,
  dispatch,
}) => {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);

  function handleNext(): void {
    if (selection === selectedTowns[finalSelection]) {
      setScore((prev) => prev + 1);
      setRound((prev) => prev + 1);
      resetRound();
      dispatch({ type: 'empty' });
    } else {
      setRound((prev) => prev + 1);
      resetRound();
      dispatch({ type: 'empty' });
    }
  }
  return (
    <React.Fragment>
      {appState.status === 'loading' && (
        <span style={{ color: 'white' }}>Loading...</span>
      )}
      {appState.status === 'success' && (
        <div style={{ color: 'white' }}>
          {appState.currentWikis && appState.currentWikis[finalWiki].summary}
        </div>
      )}
      {appState.status === 'error' && (
        <span style={{ color: 'white' }}>Error: {appState.error}</span>
      )}
      {selection === selectedTowns[finalSelection] ? (
        <div style={{ color: 'white' }}>Correct</div>
      ) : (
        <div style={{ color: 'white' }}>Select a town</div>
      )}
      <div style={{ color: 'white' }}>Round: {round}</div>
      <div style={{ color: 'white' }}>Score: {score}</div>
      <button onClick={handleNext}>Next</button>
    </React.Fragment>
  );
};

export default Quiz;
