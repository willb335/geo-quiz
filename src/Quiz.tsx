import React, { FunctionComponent, useState, useEffect } from 'react';
import { CurrentWiki } from './App';
import styled from 'styled-components';
import { Dots } from '@zendeskgarden/react-loaders';
import Modal from './Modal';
import { Button } from '@zendeskgarden/react-buttons';

import { Status } from './App';

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

const StyledButton = styled(Button)`
  margin: 10px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  /* min-height: 75px; */
  z-index: 5;
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
    setIsModalVisible(true);
  }

  function playAgain(): void {
    setScore(0);
    setAttempts(0);
    setRound(1);
    setIsFinished(false);
    resetRound();
    setIsModalVisible(true);
  }

  return (
    <FlexContainer>
      {appState.status === Status.loading && <Dots size={100} />}
      {isModalVisible && appState.status === Status.success ? (
        <Modal
          appState={appState}
          finalWiki={finalWiki}
          setIsModalVisible={setIsModalVisible}
          round={round}
          score={score}
          attempts={attempts}
          isFinished={isFinished}
        />
      ) : null}
      {appState.status === Status.success && (
        <FlexContainer>
          <StyledButton
            disabled={selection === undefined}
            onClick={isFinished ? playAgain : handleNext}
          >
            {isFinished ? `Play Again` : `Next`}
          </StyledButton>
          <StyledButton onClick={() => setIsModalVisible(true)}>
            {`Open Description`}
          </StyledButton>
        </FlexContainer>
      )}
      {isFinished && (
        <h4 style={{ marginLeft: 10 }}>
          Final Score: {score} / {round}
        </h4>
      )}
    </FlexContainer>
  );
};

export default Quiz;
