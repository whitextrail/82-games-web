import { combineReducers } from 'redux';
import user from './user';
import userPredictions from './user-predictions';
import teams from './teams';
import games from './games';
import athletes from './athletes';

const rootReducer = combineReducers({
  user,
  userPredictions,
  teams,
  games,
  athletes,
});

export default rootReducer;
