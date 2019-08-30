import { FETCH_TEAMS } from '../actions/util/types';
import {
  evalStatusCases,
  initialStateDecorator,
} from '../lib/reducers';
import { normalizeTeamList } from '../lib/teams';

const teamsState = initialStateDecorator({
  byId: {},
  allIds: [],
  selectedId: null,
});

const fetchTeamsReducer = (state, response) => {
  if (response.length) {
    const {
      entities: { teams },
      result,
    } = normalizeTeamList(response);

    return {
      byId: { ...teams },
      allIds: Object.keys(teams),
      selectedId: result[0],
    };
  }

  return state;
};

export default (state = teamsState, action) => {
  let updatedState = {};

  const {
    type,
    response,
    error,
  } = action;

  if (response) {
    switch (type) {
      case FETCH_TEAMS:
        updatedState = fetchTeamsReducer(state, response);
        break;
      default:
        return state;
    }
  } else if (error) {
    updatedState = { ...error };
  }

  return evalStatusCases(state, action, updatedState);
};
