import {
  FETCH_GAME_STATS,
  CHANGE_GAME_STATS_GROUP,
  CHANGE_SELECTED_GAME_STATS_ID,
} from '../actions/util/types';
import {
  evalActionPayload,
  initialStateDecorator,
} from '../lib/reducers';
import { normalizeGameStatsList } from '../lib/gameStats';

const gamesStatsState = initialStateDecorator({
  byGameStatsId: {},
  allGameStatsIds: [],
  selectedGameStatsId: null,
  allGameStatsGroups: ['player', 'teams'],
  selectedGameStatsGroup: 'player',
});

const fetchGameStatsReducer = (state, { response: { data } }) => {
  const {
    entities: { gameStats },
    result,
  } = normalizeGameStatsList(data);

  return {
    byGameStatsId: {
      ...state.byGameStatsId,
      ...gameStats
    },
    allGameStatsIds: [...state.allGameStatsIds, ...result],
    selectedGameStatsId: result[0],
  };
};

const changeGameStatsGroupReducer = (state, { response: statsGroup }) => ({
  selectedGameStatsGroup: statsGroup
});

const changeSelectedGameStatsIdReducer = (state, { response: { statsId } }) => ({
  selectedGameStatsId: statsId
});

export default (state = gamesStatsState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_GAME_STATS:
        return evalActionPayload(state, action, fetchGameStatsReducer);
    case CHANGE_GAME_STATS_GROUP:
      return evalActionPayload(state, action, changeGameStatsGroupReducer);
    case CHANGE_SELECTED_GAME_STATS_ID:
      return evalActionPayload(state, action, changeSelectedGameStatsIdReducer);
    default:
      return state;
  }
};
