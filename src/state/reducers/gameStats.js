import {
  FETCH_GAME_STATS,
  SELECT_GAME_STATS_VIEW,
  SELECT_GAME_STATS_INDEX,
} from '../actions/util/types';
import {
  evalActionPayload,
  initialStateDecorator,
} from '../lib/reducers';
import { normalizeGameStatsList } from '../lib/gameStats';

const gamesStatsState = initialStateDecorator({
  byId: {},
  allIds: [],
  selectedId: null,
  allStatsGroups: ['player', 'teams'],
  selectedStatsGroup: 'player',
  selectedStatsIndex: null,
});

const fetchGameStatsReducer = (state, { response: { data } }) => {
  const {
    entities: { gameStats },
    result,
  } = normalizeGameStatsList(data);

  return {
    byId: {
      ...state.byId,
      ...gameStats
    },
    allIds: [...state.allIds, ...result],
    selectedId: result[0],
  };
};

const selectGameStatsGroupReducer = (state, { response: statsGroup }) => ({ selectedStatsGroup: statsGroup });

const selectGameStatsIndexReducer = (state, { response: { statsIndex } }) => ({ selectedStatsIndex: statsIndex });

export default (state = gamesStatsState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_GAME_STATS:
        return evalActionPayload(state, action, fetchGameStatsReducer);
    case SELECT_GAME_STATS_VIEW:
      return evalActionPayload(state, action, selectGameStatsGroupReducer);
    case SELECT_GAME_STATS_INDEX:
      return evalActionPayload(state, action, selectGameStatsIndexReducer);
    default:
      return state;
  }
};
