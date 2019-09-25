import { get } from 'axios';
import {
  FETCH_GAME_STATS,
  SELECT_GAME_STATS_VIEW,
  SELECT_GAME_STATS_INDEX,
} from './util/types';
import apiEndpoints from './util/apiEndpoints';
import { actionWrapper } from '../lib/actions';

const fetchGameStatsActionCreator = actionWrapper({ type: FETCH_GAME_STATS });

const fetchGameStats = (id) => (
  async (dispatch) => {
    dispatch(fetchGameStatsActionCreator());

    try {
      const { data } = await get(`${apiEndpoints.fetchGameStats}/${Array.isArray(id) ? id.join(',') : id}`);

      return dispatch(fetchGameStatsActionCreator({ response: { data } }));
    } catch ({ response: error }) {
      return dispatch(fetchGameStatsActionCreator({ error }));
    }
  }
);

const selectGameStatsGroup = statsGroup => (
  actionWrapper({ type: SELECT_GAME_STATS_VIEW })({ response: { statsGroup } })
);

const selectGameStatsIndex = statsIndex => (
  actionWrapper({ type: SELECT_GAME_STATS_INDEX })({ response: { statsIndex } })
);

export {
  fetchGameStats,
  selectGameStatsGroup,
  selectGameStatsIndex,
};
