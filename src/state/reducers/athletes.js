import { FETCH_ATHLETE_PROFILE_BY_ID } from '../actions/util/types';
import {
  evalActionPayload,
  initialStateDecorator,
} from '../lib/reducers';
import { normalizeAthlete } from '../lib/athletes';

const athletesState = initialStateDecorator({
  byId: {},
  allIds: [],
  selectedId: null,
});

const fetchAthleteProfileByIdReducer = (state, { response }) => {
  const {
    entities: { athlete },
    result,
  } = normalizeAthlete(response);
  const athleteKeys = Object.keys(athlete);

  // Remove games that don't have any stats
  const perfStatsKeys = Object.keys(athlete[result].performanceStatisticsByGameId);
  const filteredPerfStats = perfStatsKeys.reduce((accumulator, gameId) => (
    athlete[result].performanceStatisticsByGameId[gameId].WL
      ? ({
          ...accumulator,
          [gameId]: { ...athlete[result].performanceStatisticsByGameId[gameId], }
        })
      : accumulator
  ), {});

  return {
    byId: {
      ...state.byId,
      [result]: {
        ...athlete[result],
        performanceStatisticsByGameId: filteredPerfStats,
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
    case FETCH_ATHLETE_PROFILE_BY_ID:
      return evalActionPayload(state, action, fetchAthleteProfileByIdReducer);
    default:
      return state;
  }
};
