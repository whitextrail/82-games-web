import { get } from 'axios';
import * as Promise from "bluebird";
import {
  FETCH_GAMES_BY_TEAM_ID,
  FETCH_GAME_STATISTIC_BY_ID,
  SELECT_GAME_STATUS_ID,
  SELECT_GAME_ID,
  SELECT_GAME_STATS_VIEW,
  SELECT_GAME_STATS_INDEX,
} from './util/types';
import apiEndpoints from './util/apiEndpoints';
import { actionWrapper } from '../lib/actions';

const fetchGamesByTeamIdActionCreator = actionWrapper({ type: FETCH_GAMES_BY_TEAM_ID });
const fetchGameStatisticByIdActionCreator = actionWrapper({ type: FETCH_GAME_STATISTIC_BY_ID });

const fetchGamesByTeamId = (id = 1) => (
  async (dispatch) => {
    dispatch(fetchGamesByTeamIdActionCreator());

    try {
      const { data } = await get(`${apiEndpoints.fetchGamesByTeamId}/${id}`);

      return dispatch(fetchGamesByTeamIdActionCreator({ response: { data } }));
    } catch ({ response: error }) {
      return dispatch(fetchGamesByTeamIdActionCreator({ error }));
    }
  }
);

const fetchGameStatisticById = (id) => (
  async (dispatch) => {
    dispatch(fetchGameStatisticByIdActionCreator());

    try {
      let data;

      if (Array.isArray(id)) {
        data = await Promise.map(id, async (gameId) => (await get(`${apiEndpoints.fetchGameStatisticById}/${gameId}`)).data);
      } else {
        data = [(await get(`${apiEndpoints.fetchGameStatisticById}/${id}`)).data];
      }

      return dispatch(fetchGameStatisticByIdActionCreator({ response: { data } }));
    } catch ({ response: error }) {
      return dispatch(fetchGameStatisticByIdActionCreator({ error }));
    }
  }
);

const selectGameStatusId = statusId => actionWrapper({ type: SELECT_GAME_STATUS_ID })({ response: { statusId } });;

const selectGameId = gameId => actionWrapper({ type: SELECT_GAME_ID })({ response: { gameId } });

const selectGameStatsView = statsView => actionWrapper({ type: SELECT_GAME_STATS_VIEW })({ response: { statsView } });

const selectGameStatsIndex = statsIndex => (
  actionWrapper({ type: SELECT_GAME_STATS_INDEX })({ response: { statsIndex } })
);

export {
  fetchGamesByTeamId,
  fetchGameStatisticById,
  selectGameStatusId,
  selectGameId,
  selectGameStatsView,
  selectGameStatsIndex,
};
