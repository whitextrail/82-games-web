import { combineReducers } from 'redux';
import nav from './nav';
import user from './user';
import teams from './teams';
import games from './games';

const rootReducer = combineReducers({
  nav,
  user,
  teams,
  games,
});

export default rootReducer;
