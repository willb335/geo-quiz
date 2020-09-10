import React, { FunctionComponent, useState, Dispatch } from 'react';
import { CurrentWiki, Action } from './App';
import { Dots } from '@zendeskgarden/react-loaders';
import { Button } from '@zendeskgarden/react-buttons';
import styled from 'styled-components';

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

const ROUNDS = 3;

const QuizContainer = styled.div`
  display: block;
  min-height: 20vh;
`;

const Round = styled.div`
  font-weight: bold;
  margin: 10px 0 10px 0;
`;

const Score = styled(Round)``;

const Finished = styled(Round)``;

const PleaseSelect = styled(Round)``;

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
  const [isFinished, setIsFinished] = useState(false);

  function handleNext(): void {
    if (round === ROUNDS) {
      setIsFinished(true);
      if (selection === selectedTowns[finalSelection]) {
        setScore((prev) => prev + 1);
        setRound((prev) => prev + 1);
      } else {
        setRound((prev) => prev + 1);
      }
      return;
    }
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

  function playAgain(): void {
    setScore(0);
    setRound(1);
    setIsFinished(false);
    resetRound();
    dispatch({ type: 'empty' });
  }

  function display(appState: AppState): JSX.Element | undefined {
    switch (appState.status) {
      case 'loading':
        return <Dots size={50} />;
      case 'success':
        return (
          <>
            <div>
              {appState.currentWikis &&
                appState.currentWikis[finalWiki].summary}
            </div>
            <Round>Round: {round}</Round>
            <Score>
              Score: {score} / {round - 1}
            </Score>
            <PleaseSelect>Please select a town</PleaseSelect>
            <Button disabled={selection === undefined} onClick={handleNext}>
              Next
            </Button>
          </>
        );
      case 'error':
        return <span>Error: {appState.error}</span>;
    }
  }

  return (
    <QuizContainer>
      {!isFinished ? (
        <React.Fragment>{display(appState)}</React.Fragment>
      ) : (
        <React.Fragment>
          <Finished>
            FINSIHED: Score: {score} / {round - 1}
          </Finished>
          <Button onClick={playAgain}>Play Again</Button>
        </React.Fragment>
      )}
    </QuizContainer>
  );
};

export default Quiz;
