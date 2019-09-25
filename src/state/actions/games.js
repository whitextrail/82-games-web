import { get } from 'axios';
import {
  FETCH_GAMES_BY_TEAM_ID,
  SELECT_GAME_STATUS_ID,
  SELECT_GAME_ID,
} from './util/types';
import apiEndpoints from './util/apiEndpoints';
import { actionWrapper } from '../lib/actions';

const fetchTeamGamesActionCreator = actionWrapper({ type: FETCH_GAMES_BY_TEAM_ID });

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

const selectGameStatusId = statusId => actionWrapper({ type: SELECT_GAME_STATUS_ID })({ response: { statusId } });;

const selectGameId = gameId => actionWrapper({ type: SELECT_GAME_ID })({ response: { gameId } });

export {
  fetchTeamGames,
  selectGameStatusId,
  selectGameId,
};
