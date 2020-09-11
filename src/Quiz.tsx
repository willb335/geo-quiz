import React, { FunctionComponent, useState, useEffect } from 'react';
import { CurrentWiki } from './App';
import { Dots } from '@zendeskgarden/react-loaders';
import styled from 'styled-components';

import Modal from './Modal';

export interface AppState {
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
  /* min-height: 30vh; */
  margin: 0 16vw 0 16vw;

  @media (max-width: 500px) {
    margin: 0;
  }
`;

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
  const [isModalVisible, setIsModalVisible] = useState(true);

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

  function display(): JSX.Element | null | undefined {
    switch (appState.status) {
      case 'loading':
        return <Dots size={50} />;
      case 'success':
        return isModalVisible ? (
          <Modal
            appState={appState}
            selection={selection}
            finalWiki={finalWiki}
            setIsModalVisible={setIsModalVisible}
            round={round}
            score={score}
            attempts={attempts}
            isFinished={isFinished}
            playAgain={playAgain}
            handleNext={handleNext}
          />
        ) : null;
      case 'error':
        return <span>Error: {appState.error}</span>;
    }
  }

  return (
    <QuizContainer>
      <React.Fragment>{display()}</React.Fragment>
    </QuizContainer>
  );
};

export default Quiz;
