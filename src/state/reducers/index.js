import { combineReducers } from 'redux';
import app from './app';
import teams from './teams';
import games from './games';

const rootReducer = combineReducers({
  app,
  teams,
  games,
});

export default rootReducer;
