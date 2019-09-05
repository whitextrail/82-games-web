import {
  FETCH_GAMES_BY_TEAM_ID,
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
});

const fetchGamesByTeamIdReducer = (state, { response }) => {
  const {
    statusId,
    ...teamGames
  } = response;
  const {
    entities: {
      games,
      gamesByStatus,
    },
    result,
  } = normalizeGameList(teamGames);
  const gamesByStatusKeys = Object.keys(gamesByStatus);
  const formattedResponseStatusId = statusId.substring(0, 1).toUpperCase() + statusId.substring(1);
  const initialStatusId = gamesByStatusKeys.includes(formattedResponseStatusId)
    ? formattedResponseStatusId
    : gamesByStatusKeys[0];

  return {
    byId: games,
    allIds: result,
    selectedId: result[0],
    byStatusId: gamesByStatus,
    allStatusIds: gamesByStatusKeys,
    selectedStatusId: initialStatusId,
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
    case FILTER_GAMES_BY_STATUS_ID:
      return evalActionPayload(state, action, filterGamesByStatusIdReducer);
    default:
      return state;
  }
};
