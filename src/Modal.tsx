import React, { FunctionComponent } from 'react';
import {
  Modal as ZenGardenModal,
  Header,
  Body,
  Close,
  Footer,
  FooterItem,
} from '@zendeskgarden/react-modals';
import { Button } from '@zendeskgarden/react-buttons';
import styled from 'styled-components';

import { AppState } from './Quiz';

interface ModalProps {
  appState: AppState;
  selection: number | undefined;
  finalWiki: number;
  setIsModalVisible: Function;
  round: number;
  score: number;
  attempts: number;
  isFinished: boolean;
  playAgain: Function;
  handleNext: Function;
}

const Round = styled.h5`
  font-weight: bold;
  margin: 10px 0 10px 0;
`;

const Score = styled(Round)``;

const PleaseSelect = styled(Round)``;

const Modal: FunctionComponent<ModalProps> = ({
  appState,
  selection,
  finalWiki,
  setIsModalVisible,
  round,
  score,
  attempts,
  isFinished,
  playAgain,
  handleNext,
}) => {
  return (
    <ZenGardenModal
      onClose={() => setIsModalVisible(false)}
      // style={{ width: state.width, paddingBottom: DEFAULT_THEME.space.md }}
    >
      <Header>
        {appState.currentWikis && appState.currentWikis[finalWiki].title}
      </Header>
      <Body>
        <div>
          {appState.currentWikis && appState.currentWikis[finalWiki].summary}{' '}
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
        {selection === undefined && (
          <PleaseSelect>Please select a town</PleaseSelect>
        )}
      </Body>
      <Footer>
        <FooterItem>
          <Button
            disabled={selection === undefined}
            onClick={isFinished ? () => playAgain() : () => handleNext()}
          >
            {isFinished ? `Play Again` : `Next`}
          </Button>
        </FooterItem>
      </Footer>
      <Close aria-label="Close modal" />
    </ZenGardenModal>
  );
};

export default Modal;
