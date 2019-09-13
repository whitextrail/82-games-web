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
    entities: { athlete }
  } = normalizeAthlete(response);
  const athleteKeys = Object.keys(athlete);

  return {
    byId: {
      ...state.byId,
      ...athlete,
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
