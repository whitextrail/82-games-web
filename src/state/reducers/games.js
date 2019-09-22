import {
  FETCH_GAMES_BY_TEAM_ID,
  FETCH_GAME_STATISTIC_BY_ID,
  FILTER_GAMES_BY_STATUS_ID,
} from '../actions/util/types';
import {
  evalActionPayload,
  initialStateDecorator,
} from '../lib/reducers';
import { normalizeGameList } from '../lib/games';

const gamesState = initialStateDecorator({
  byId: {},
  allIds: [],
  selectedId: null,
  byStatusId: {},
  allStatusIds: [],
  selectedStatusId: null,
  idsByTeam: {},
});

const fetchGamesByTeamIdReducer = (state, { response }) => {
  const { data } = response;
  const {
    entities: {
      games,
      gamesByStatus,
      gameIdsByTeam,
    },
    result,
  } = normalizeGameList(data);
  const gamesByStatusKeys = Object.keys(gamesByStatus);

  return {
    byId: games,
    allIds: result,
    selectedId: result[0],
    byStatusId: gamesByStatus,
    allStatusIds: gamesByStatusKeys,
    selectedStatusId: gamesByStatusKeys[0],
    idsByTeam: gameIdsByTeam,
  };
};

const fetchGameStatisticByIdReducer = (state, { response }) => {
  const {
    id,
    homeTeamStatistics,
    awayTeamStatistics,
  } = response;

  return {
    byId: {
      ...state.byId,
      [id]: {
        ...state.byId[id],
        homeTeamStatistics,
        awayTeamStatistics,
      }
    },
  };
};

const filterGamesByStatusIdReducer = (state, { response }) => ({
  selectedStatusId: response.statusId,
});

export default (state = gamesState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_GAMES_BY_TEAM_ID:
      return evalActionPayload(state, action, fetchGamesByTeamIdReducer);
    case FETCH_GAME_STATISTIC_BY_ID:
        return evalActionPayload(state, action, fetchGameStatisticByIdReducer);
    case FILTER_GAMES_BY_STATUS_ID:
      return evalActionPayload(state, action, filterGamesByStatusIdReducer);
    default:
      return state;
  }
};
