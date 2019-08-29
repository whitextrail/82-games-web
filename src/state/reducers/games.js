import { FETCH_GAMES_BY_TEAM_ID } from '../actions/util/types';
import {
  evalStatusCases,
  initialStateDecorator,
} from '../lib/reducers';
import { normalizeGameList } from '../lib/games';

const gamesState = initialStateDecorator({
  byId: {},
  allIds: [],
  selectedId: null,
});

const fetchGamesByTeamIdReducer = (state, response) => {
  if (response.length) {
    const {
      entities: { games },
      result,
    } = normalizeGameList(response);

    return {
      byId: { ...games },
      allIds: Object.keys(games),
      selectedId: result[0],
    };
  }

  return state;
};

const typeReducer = (state, action) => {
  let updatedState = {};
  const {
    type,
    response,
    error,
  } = action;

  if (response) {
    switch (type) {
      case FETCH_GAMES_BY_TEAM_ID:
        updatedState = fetchGamesByTeamIdReducer(state, response);
        break;
      default:
        return state;
    }
  } else if (error) {
    updatedState = { ...error };
  }

  return evalStatusCases(state, action, updatedState);
};

export default (state = gamesState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_GAMES_BY_TEAM_ID:
      return typeReducer(state, action);
    default:
      return state;
  }
};
