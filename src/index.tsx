import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider, DEFAULT_THEME } from '@zendeskgarden/react-theming';
import { css } from 'styled-components';

const customTheme = {
  components: {
    'buttons.button': css`
      && {
        color: black;
        border-color: ${(props: any) =>
          props.disabled === true ? 'none' : 'black'};
      }
    `,
  },
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={{ ...DEFAULT_THEME, ...customTheme }}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
