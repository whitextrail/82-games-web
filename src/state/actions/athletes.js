import { get } from 'axios';
import {
  FETCH_ATHLETE,
  FETCH_ATHLETE_TWEETS,
} from './util/types';
import apiEndpoints from './util/apiEndpoints';
import { actionWrapper } from '../lib/actions';

const fetchAthleteActionCreator = actionWrapper({ type: FETCH_ATHLETE });
const fetchAthleteTweetsActionCreator = actionWrapper({ type: FETCH_ATHLETE_TWEETS });

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

const fetchAthleteTweets = (athleteId = 1, page, size) => (
  async (dispatch) => {
    dispatch(fetchAthleteTweetsActionCreator());

    try {
      const tweetEndpointQueryParams = `?athleteId=${athleteId}${page ? `&page=${page}` : ''}${page ? `&size=${size}` : ''}`;
      const { data } = await get(`${apiEndpoints.fetchAthleteTweets}/${tweetEndpointQueryParams}`);

      return dispatch(fetchAthleteTweetsActionCreator({ response: data }));
    } catch ({ response: error }) {
      return dispatch(fetchAthleteTweetsActionCreator({ error }));
    }
  }
);

export {
  fetchAthlete,
  fetchAthleteTweets,
};
