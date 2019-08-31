import {
  FETCH_GAMES_BY_TEAM_ID,
  FILTER_GAMES_BY_STATUS_ID,
  SEGMENT_GAMES_BY_STATUS,
} from '../actions/util/types';
import {
  evalStatusCases,
  initialStateDecorator,
} from '../lib/reducers';
import {
  normalizeGameList,
  segmentGamesByStatus,
} from '../lib/games';

const gamesState = initialStateDecorator({
  byId: {},
  allIds: [],
  selectedId: null,
  byStatus: {},
  allStatuses: ['Closed', 'Live', 'Open'],
  statusIndex: 1,
});

const fetchGamesByTeamIdReducer = (response) => {
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

  return {};
};

const filterGamesByStatusIdReducer = (state, response) => {
  const { id } = response;

  if (id < state.allStatuses.length) {
    return { statusIndex: id };
  }

  return {};
};

const segmentGamesByStatusReducer = (state, response) => {
  if (response) {
    return { byStatus: segmentGamesByStatus(state.byId) };
  }

  return {};
};

export default (state = gamesState, action) => {
  let updatedState = {};

  const {
    type,
    response,
    error,
  } = action;

  if (response) {
    switch (type) {
      case FETCH_GAMES_BY_TEAM_ID:
        updatedState = fetchGamesByTeamIdReducer(response);
        break;
      case FILTER_GAMES_BY_STATUS_ID:
        updatedState = filterGamesByStatusIdReducer(state, response);
        break;
      case SEGMENT_GAMES_BY_STATUS:
        updatedState = segmentGamesByStatusReducer(state, response);
        break;
      default:
        return state;
    }
  } else if (error) {
    updatedState = { ...error };
  }

  return evalStatusCases(state, action, updatedState);
};
