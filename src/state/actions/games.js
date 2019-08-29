import { get } from 'axios';
import { FETCH_GAMES_BY_TEAM_ID } from './util/types';
import apiEndpoints from './util/apiEndpoints';
import { actionWrapper } from '../lib/actions';

const fetchGamesByTeamIdAction = actionWrapper({ type: FETCH_GAMES_BY_TEAM_ID });

const fetchGamesByTeamId = (id) => (
  async (dispatch) => {
    dispatch(fetchGamesByTeamIdAction());

    try {
      const { data } = await get(`${apiEndpoints.fetchGamesByTeamId}/${id}`);

      return dispatch(fetchGamesByTeamIdAction({ response: data }));
    } catch (error) {
      return dispatch(fetchGamesByTeamIdAction({
        error: {
          errorCode: error.code,
          errorMessage: error.message,
        },
      }));
    }
  }
);

export {
  fetchGamesByTeamId
};
