import { combineReducers } from 'redux';
import user from './user';
import teams from './teams';
import games from './games';
import gameStats from './gameStats';
import athletes from './athletes';

const rootReducer = combineReducers({
  user,
  teams,
  games,
  gameStats,
  athletes,
});

export default rootReducer;
