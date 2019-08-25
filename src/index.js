import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';
import store from './state';
import App from './components/presentational/App';
import * as serviceWorker from './serviceWorker';
import { SENTRY_DSN } from './config';
import 'typeface-roboto';

Sentry.init({
  dsn: SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
