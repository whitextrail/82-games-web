import { combineReducers } from 'redux';
import teams from './teams';
import games from './games';
import athletes from './athletes';

const rootReducer = combineReducers({
  teams,
  games,
  athletes,
});

export default rootReducer;
