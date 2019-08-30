import { combineReducers } from 'redux';
import teams from './teams';
import games from './games';

const rootReducer = combineReducers({
  teams,
  games,
});

export default rootReducer;
