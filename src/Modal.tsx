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
  finalWiki: number;
  setIsModalVisible: Function;
  round: number;
  score: number;
  attempts: number;
  isFinished: boolean;
}

const Round = styled.h5`
  font-weight: bold;
  margin: 10px 0 10px 0;
`;

const Score = styled(Round)``;

const StyledModal = styled(ZenGardenModal)`
  @media (max-width: 500px) {
    width: 90vw;
  }
`;

const Modal: FunctionComponent<ModalProps> = ({
  appState,
  finalWiki,
  setIsModalVisible,
  round,
  score,
  attempts,
  isFinished,
}) => {
  return (
    <StyledModal onClose={() => setIsModalVisible(false)}>
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
      </Body>
      <Footer>
        <FooterItem>
          <Button onClick={() => setIsModalVisible(false)}>
            {`Find ${
              appState.currentWikis && appState.currentWikis[finalWiki].title
            }`}
          </Button>
        </FooterItem>
      </Footer>
      <Close aria-label="Close modal" />
    </StyledModal>
  );
};

export default Modal;
