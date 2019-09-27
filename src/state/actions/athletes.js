import { get } from 'axios';
import { FETCH_ATHLETE } from './util/types';
import apiEndpoints from './util/apiEndpoints';
import { actionWrapper } from '../lib/actions';

const fetchAthleteActionCreator = actionWrapper({ type: FETCH_ATHLETE });

const fetchAthlete = (id = 1) => (
  async (dispatch) => {
    dispatch(fetchAthleteActionCreator());

    try {
      const { data } = await get(`${apiEndpoints.fetchAthlete}/${id}`);

      return dispatch(fetchAthleteActionCreator({ response: data }));
    } catch ({ response: error }) {
      return dispatch(fetchAthleteActionCreator({ error }));
    }
  }
);

export {
  fetchAthlete,
};
