import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import store from './state';
import App from './components/container/App';
import * as serviceWorker from './serviceWorker';
import { SENTRY_DSN } from './config';
import { theme } from './styles/constants';

Sentry.init({
  dsn: SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
, document.getElementById('root'));

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
