import { get } from 'axios';
import {
  FETCH_GAMES_BY_TEAM_ID,
  FETCH_GAME_STATISTIC_BY_ID,
  FILTER_GAMES_BY_STATUS_ID,
} from './util/types';
import apiEndpoints from './util/apiEndpoints';
import { actionWrapper } from '../lib/actions';

const fetchGamesByTeamIdActionCreator = actionWrapper({ type: FETCH_GAMES_BY_TEAM_ID });
const fetchGameStatisticByIdActionCreator = actionWrapper({ type: FETCH_GAME_STATISTIC_BY_ID });
const filterGamesByStatusIdActionCreator = actionWrapper({ type: FILTER_GAMES_BY_STATUS_ID });

const fetchGamesByTeamId = (id = 1, statusId = '') => (
  async (dispatch) => {
    dispatch(fetchGamesByTeamIdActionCreator());

    try {
      const { data } = await get(`${apiEndpoints.fetchGamesByTeamId}/${id}`);

      return dispatch(fetchGamesByTeamIdActionCreator({
        response: {
          ...data,
          statusId,
        },
      }));
    } catch ({ response: error }) {
      return dispatch(fetchGamesByTeamIdActionCreator({ error }));
    }
  }
);

const fetchGameStatisticById = (id) => (
  async (dispatch) => {
    dispatch(fetchGameStatisticByIdActionCreator());

    try {
      const { data } = await get(`${apiEndpoints.fetchGameStatisticById}/${id}`);

      return dispatch(fetchGameStatisticByIdActionCreator({ response: { ...data } }));
    } catch ({ response: error }) {
      return dispatch(fetchGameStatisticByIdActionCreator({ error }));
    }
  }
);

const filterGamesByStatusId = statusId => (
  (dispatch) => {
    dispatch(filterGamesByStatusIdActionCreator());

    setTimeout(() => dispatch(filterGamesByStatusIdActionCreator({ response: { statusId } })), 1000);
  }
);

export {
  fetchGamesByTeamId,
  fetchGameStatisticById,
  filterGamesByStatusId,
};
