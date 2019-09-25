import {
  FETCH_ATHLETE,
  FETCH_ATHLETE_TWEETS,
} from '../actions/util/types';
import {
  evalActionPayload,
  initialStateDecorator,
} from '../lib/reducers';
import {
  normalizeAthlete,
  normalizeAthleteTweets,
} from '../lib/athletes';

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

const fetchAthleteTweetsReducer = (state, { response }) => {
  const {
    entities: { athleteTweet },
    result,
  } = normalizeAthleteTweets(response);

  return {
    byTweetId: athleteTweet,
    allTweetIds: result,
    selectedTweetId: result[0],
  };
};

export default (state = athletesState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_ATHLETE:
      return evalActionPayload(state, action, fetchAthleteReducer);
    case FETCH_ATHLETE_TWEETS:
      return evalActionPayload(state, action, fetchAthleteTweetsReducer);
    default:
      return state;
  }
};
