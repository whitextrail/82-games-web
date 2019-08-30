import { get } from 'axios';
import {
  FETCH_GAMES_BY_TEAM_ID,
  FILTER_GAMES_BY_STATUS_ID,
} from './util/types';
import apiEndpoints from './util/apiEndpoints';
import { actionWrapper } from '../lib/actions';

const fetchGamesByTeamIdActionCreator = actionWrapper({ type: FETCH_GAMES_BY_TEAM_ID });
const filterGamesByStatusIdActionCreator = actionWrapper({ type: FILTER_GAMES_BY_STATUS_ID });

const fetchGamesByTeamId = (id) => (
  async (dispatch) => {
    dispatch(fetchGamesByTeamIdActionCreator());

    try {
      const { data } = await get(`${apiEndpoints.fetchGamesByTeamId}/${id}`);

      return dispatch(fetchGamesByTeamIdActionCreator({ response: data }));
    } catch (error) {
      return dispatch(fetchGamesByTeamIdActionCreator({
        error: {
          errorCode: error.code,
          errorMessage: error.message,
        },
      }));
    }
  }
);

const filterGamesByStatusId = id => dispatch => dispatch(filterGamesByStatusIdActionCreator({ response: { id } }));

export {
  fetchGamesByTeamId,
  filterGamesByStatusId,
};
