import { combineReducers } from 'redux';
import nav from './nav';
import teams from './teams';
import games from './games';
import athletes from './athletes';

const rootReducer = combineReducers({
  nav,
  teams,
  games,
  athletes,
});

export default rootReducer;
