import {
  SEND_PREDICTION,
  FETCH_USER_PREDICTIONS,
} from './util/types';
import { actionWrapper } from '../lib/actions';
import {
  submitPrediction,
  getUserPredictions,
} from '../../util/tronweb';

const sendPredictionAction = actionWrapper({ type: SEND_PREDICTION });
const fetchUserPredictionsAction = actionWrapper({ type: FETCH_USER_PREDICTIONS });

// Format the error from TronWeb to follow our backend API error
const parseTronWebError = (err) => ({
  status: 0,
  data: { error: { err } },
});

const sendPrediction = (prediction) => (
  async (dispatch) => {
    dispatch(sendPredictionAction());
    console.log('Predic', prediction);
    try {
      const response = await submitPrediction(prediction);

      return dispatch(sendPredictionAction({ response }));
    } catch (err) {
      return dispatch(sendPredictionAction({ error: parseTronWebError(err) }));
    }
  }
);

const fetchUserPredictions = () => (
  async (dispatch) => {
    dispatch(fetchUserPredictionsAction());

    try {
      const response = await getUserPredictions();
      console.log(response);
      return dispatch(fetchUserPredictionsAction({ response }));
    } catch (err) {
      return dispatch(fetchUserPredictionsAction({ error: parseTronWebError(err) }));
    }
  }
);

export {
  sendPrediction,
  fetchUserPredictions,
};