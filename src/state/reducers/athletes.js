import { FETCH_ATHLETE } from '../actions/util/types';
import {
  evalActionPayload,
  initialStateDecorator,
} from '../lib/reducers';
import { normalizeAthlete } from '../lib/athletes';

const athletesState = initialStateDecorator({
  byId: {},
  allIds: [],
  selectedId: null,
  byTweetId: {},
  allTweetIds: [],
  selectedTweetId: null,
});

const fetchAthleteReducer = (state, { response }) => {
  const {
    entities: { athlete },
    result,
  } = normalizeAthlete(response);
  const athleteKeys = Object.keys(athlete);
  const {
    performanceStatisticsByGameId: performanceStatistics,
    ...remainingAthleteProps
  } = athlete[result];

  // Remove games that don't have any stats
  const perfStatsKeys = Object.keys(performanceStatistics);
  const filteredPerfStats = perfStatsKeys.reduce((accumulator, gameId) => (
    performanceStatistics[gameId].WL
      ? ({
          ...accumulator,
          [gameId]: { ...performanceStatistics[gameId], }
        })
      : accumulator
  ), {});

  return {
    byId: {
      ...state.byId,
      [result]: {
        ...remainingAthleteProps,
        performanceStatistics: filteredPerfStats,
      },
    },
    allIds: [
      ...state.allIds,
      ...Object.keys(athlete),
    ],
    selectedId: athleteKeys[0],
  };
};

export default (state = athletesState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_ATHLETE:
      return evalActionPayload(state, action, fetchAthleteReducer);
    default:
      return state;
  }
};
