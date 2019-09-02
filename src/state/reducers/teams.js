import { FETCH_TEAMS } from '../actions/util/types';
import {
  evalActionPayload,
  initialStateDecorator,
} from '../lib/reducers';
import { normalizeTeamList } from '../lib/teams';

const teamsState = initialStateDecorator({
  byId: {},
  allIds: [],
  selectedId: null,
});

const fetchTeamsReducer = (state, { response }) => {
  const {
    entities: { teams },
    result,
  } = normalizeTeamList(response);

  return {
    byId: teams,
    allIds: result,
    selectedId: result[0],
  };
};

export default (state = teamsState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_TEAMS:
      return evalActionPayload(state, action, fetchTeamsReducer);
    default:
      return state;
  }
};
