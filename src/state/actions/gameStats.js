import { get } from 'axios';
import {
  FETCH_GAME_STATS,
  CHANGE_GAME_STATS_GROUP,
  CHANGE_SELECTED_GAME_STATS_ID,
} from './util/types';
import apiEndpoints from './util/apiEndpoints';
import { actionWrapper } from '../lib/actions';

const fetchGameStatsActionCreator = actionWrapper({ type: FETCH_GAME_STATS });

const fetchGameStats = (id, selectedId) => (
  async (dispatch) => {
    dispatch(fetchGameStatsActionCreator());

    try {
      const { data } = await get(`${apiEndpoints.fetchGameStats}/${Array.isArray(id) ? id.join(',') : id}`);

      return dispatch(fetchGameStatsActionCreator({ response: { data, selectedId } }));
    } catch ({ response: error }) {
      return dispatch(fetchGameStatsActionCreator({ error }));
    }
  }
);

const changeGameStatsGroup = statsGroup => (
  actionWrapper({ type: CHANGE_GAME_STATS_GROUP })({ response: { statsGroup } })
);

const changeSelectedGameStatsId = statsId => (
  actionWrapper({ type: CHANGE_SELECTED_GAME_STATS_ID })({ response: { statsId } })
);

export {
  fetchGameStats,
  changeGameStatsGroup,
  changeSelectedGameStatsId,
};
