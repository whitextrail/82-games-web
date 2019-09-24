import {
  FETCH_GAMES_BY_TEAM_ID,
  FETCH_GAME_STATISTIC_BY_ID,
  SELECT_GAME_STATUS_ID,
  SELECT_GAME_ID,
  SELECT_GAME_STATS_VIEW,
} from '../actions/util/types';
import {
  evalActionPayload,
  initialStateDecorator,
} from '../lib/reducers';
import { normalizeGameList } from '../lib/games';

const gamesStatsState = initialStateDecorator({
  byId: {},
  allIds: [],
  selectedId: null,
  byStatusId: {},
  allStatusIds: [],
  selectedStatusId: null,
  byTeamId: {},
  allStatsViews: ['player', 'teams'],
  selectedStatsView: 'player',
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
    byTeamId: gameIdsByTeam,
  };
};

const fetchGameStatisticByIdReducer = (state, { response }) => {
  const gamesWithStatistics = response.data.reduce((accumulator, value) => {
    const { id } = value;

    return {
      ...accumulator,
      [id]: {
        ...state.byId[id],
        ...value,
      }
    };
  }, {});

  return {
    byId: {
      ...state.byId,
      ...gamesWithStatistics,
    },
  };
};

const selectGameIdReducer = (state, { response }) => ({ selectedId: response });

const selectGameStatusIdReducer = (state, { response }) => ({ selectedStatusId: response });

const selectGameStatsViewReducer = (state, { response }) => ({ selectedStatsView: response });

export default (state = gamesStatsState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_GAMES_BY_TEAM_ID:
      return evalActionPayload(state, action, fetchGamesByTeamIdReducer);
    case FETCH_GAME_STATISTIC_BY_ID:
        return evalActionPayload(state, action, fetchGameStatisticByIdReducer);
    case SELECT_GAME_STATUS_ID:
      return evalActionPayload(state, action, selectGameStatusIdReducer);
    case SELECT_GAME_ID:
      return evalActionPayload(state, action, selectGameIdReducer);
    case SELECT_GAME_STATS_VIEW:
        return evalActionPayload(state, action, selectGameStatsViewReducer);
    default:
      return state;
  }
};
