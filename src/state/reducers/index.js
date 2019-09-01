import { combineReducers } from 'redux';
import nav from './nav';
import teams from './teams';
import games from './games';

const rootReducer = combineReducers({
  nav,
  teams,
  games,
});

export default rootReducer;
