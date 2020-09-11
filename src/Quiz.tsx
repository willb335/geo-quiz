import React, { FunctionComponent, useState, useEffect } from 'react';
import { CurrentWiki } from './App';
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
}

const ROUNDS = 3;

const QuizContainer = styled.div`
  display: block;
  min-height: 30vh;
  margin: 0 16vw 0 16vw;

  @media (max-width: 500px) {
    margin: 0;
  }
`;

const Round = styled.h5`
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
}) => {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [attempts, setAttempts] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (selection && selection === selectedTowns[finalSelection]) {
      setScore((prev) => prev + 1);
      setAttempts((prev) => prev + 1);
    }

    if (selection && selection !== selectedTowns[finalSelection]) {
      setAttempts((prev) => prev + 1);
    }
  }, [finalSelection, selectedTowns, selection]);

  useEffect(() => {
    if (attempts === ROUNDS) {
      setIsFinished(true);
    }
  }, [attempts]);

  function handleNext(): void {
    setRound((prev) => prev + 1);
    resetRound();
  }

  function playAgain(): void {
    setScore(0);
    setAttempts(0);
    setRound(1);
    setIsFinished(false);
    resetRound();
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
                appState.currentWikis[finalWiki].summary}{' '}
              {
                <span>
                  <a
                    href={`https://${
                      appState.currentWikis &&
                      appState.currentWikis[finalWiki].wikipediaUrl
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Wiki
                  </a>
                </span>
              }
            </div>
            <Round>Round: {round}</Round>
            <Score>
              {isFinished
                ? `Final Score: ${score} / ${attempts} `
                : `Score: ${score} / ${attempts}`}
            </Score>
            <PleaseSelect>Please select a town</PleaseSelect>
            <Button
              disabled={selection === undefined}
              onClick={isFinished ? playAgain : handleNext}
            >
              {isFinished ? `Play Again` : `Next`}
            </Button>
          </>
        );
      case 'error':
        return <span>Error: {appState.error}</span>;
    }
  }

  return (
    <QuizContainer>
      <React.Fragment>{display(appState)}</React.Fragment>
    </QuizContainer>
  );
};

export default Quiz;
