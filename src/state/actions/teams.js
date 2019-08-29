import { get } from 'axios';
import { FETCH_TEAMS } from './util/types';
import apiEndpoints from './util/apiEndpoints';
import { actionWrapper } from '../lib/actions';

// ACTIONS
const fetchTeamsActionCreator = actionWrapper({ type: FETCH_TEAMS });

// ASYNC ACTION CREATORS
const fetchTeams = () => (
  async (dispatch) => {
    dispatch(fetchTeamsActionCreator());

    try {
      const { data } = await get(`${apiEndpoints.fetchTeams}`);

      return dispatch(fetchTeamsActionCreator({ response: data }));
    } catch (error) {
      return dispatch(fetchTeamsActionCreator({
        error: {
          errorCode: error.code,
          errorMessage: error.message,
        },
      }));
    }
  }
);

export {
  fetchTeams,
};
