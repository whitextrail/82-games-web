import {
  FETCH_GAME_STATS,
  SELECT_GAME_STATS_VIEW,
  SELECT_GAME_STATS_INDEX,
} from '../actions/util/types';
import {
  evalActionPayload,
  initialStateDecorator,
} from '../lib/reducers';

const gamesStatsState = initialStateDecorator({
  byId: {},
  allIds: [],
  selectedId: null,
  byStatsGroup: {},
  allStatsGroups: ['player', 'teams'],
  selectedStatsGroup: 'player',
  selectedStatsIndex: null,
});

const fetchGameStatsReducer = (state, { response }) => {
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
