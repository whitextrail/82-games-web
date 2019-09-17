import { combineReducers } from 'redux';
import nav from './nav';
import user from './user';
import teams from './teams';
import games from './games';
import athletes from './athletes';

const rootReducer = combineReducers({
  nav,
  user,
  teams,
  games,
  athletes,
});

export default rootReducer;
