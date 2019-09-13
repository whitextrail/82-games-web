import { get } from 'axios';
import {
  FETCH_ATHLETE_PROFILE_BY_ID,
} from './util/types';
import apiEndpoints from './util/apiEndpoints';
import { actionWrapper } from '../lib/actions';

const fetchAthleteProfileByIdActionCreator = actionWrapper({ type: FETCH_ATHLETE_PROFILE_BY_ID });

const fetchAthleteProfileById = (id = 1) => (
  async (dispatch) => {
    dispatch(fetchAthleteProfileByIdActionCreator());

    try {
      const { data } = await get(`${apiEndpoints.fetchAthleteProfileById}/${id}`);

      return dispatch(fetchAthleteProfileByIdActionCreator({ response: data }));
    } catch ({ response: error }) {
      return dispatch(fetchAthleteProfileByIdActionCreator({ error }));
    }
  }
);

export {
  fetchAthleteProfileById,
};
