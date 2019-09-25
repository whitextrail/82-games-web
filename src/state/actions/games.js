import { get } from 'axios';
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

const fetchTeamGamesActionCreator = actionWrapper({ type: FETCH_GAMES_BY_TEAM_ID });
const fetchGameStatisticByIdActionCreator = actionWrapper({ type: FETCH_GAME_STATISTIC_BY_ID });

const fetchTeamGames = (id = 1) => (
  async (dispatch) => {
    dispatch(fetchTeamGamesActionCreator());

    try {
      const { data } = await get(`${apiEndpoints.fetchTeamGames}/${id}`);

      return dispatch(fetchTeamGamesActionCreator({ response: { data } }));
    } catch ({ response: error }) {
      return dispatch(fetchTeamGamesActionCreator({ error }));
    }
  }
);

const fetchGameStatisticById = (id) => (
  async (dispatch) => {
    dispatch(fetchGameStatisticByIdActionCreator());

    try {
      const { data } = await get(`${apiEndpoints.fetchGameStatisticById}/${Array.isArray(id) ? id.join(',') : id}`);

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
  fetchTeamGames,
  fetchGameStatisticById,
  selectGameStatusId,
  selectGameId,
  selectGameStatsView,
  selectGameStatsIndex,
};
