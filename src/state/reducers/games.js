import {
  FETCH_GAMES_BY_TEAM_ID,
  SELECT_GAME_STATUS_ID,
  SELECT_GAME_ID,
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
  idsByTeamId: {},
});

const fetchTeamGamesReducer = (state, { response }) => {
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
    idsByTeamId: gameIdsByTeam,
  };
};

const selectGameIdReducer = (state, { response: { gameId } }) => ({ selectedId: gameId });

const selectGameStatusIdReducer = (state, { response: { statusId } }) => ({ selectedStatusId: statusId });

export default (state = gamesStatsState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_GAMES_BY_TEAM_ID:
      return evalActionPayload(state, action, fetchTeamGamesReducer);
    case SELECT_GAME_STATUS_ID:
      return evalActionPayload(state, action, selectGameStatusIdReducer);
    case SELECT_GAME_ID:
      return evalActionPayload(state, action, selectGameIdReducer);
    default:
      return state;
  }
};
