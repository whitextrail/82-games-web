import { combineReducers } from 'redux';
import user from './user';
import teams from './teams';
import games from './games';
import athletes from './athletes';

const rootReducer = combineReducers({
  user,
  teams,
  games,
  athletes,
});

export default rootReducer;
