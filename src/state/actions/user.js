import {
  AUTHENTICATE_USER,
  LOG_OUT_USER,
  PURCHASE_VOUCHER,
  SEND_PREDICTION,
  // FETCH_USER_PREDICTIONS,
} from './util/types';
import { actionWrapper } from '../lib/actions';
import {
  buyVoucher,
  submitPrediction,
  // getUserPredictions,
} from '../../util/tronweb';

const authenticateUserAction = actionWrapper({ type: AUTHENTICATE_USER });
const logOutUserAction = response => actionWrapper({ type: LOG_OUT_USER })({ response });
const purchaseVoucherAction = actionWrapper({ type: PURCHASE_VOUCHER });
const sendPredictionAction = actionWrapper({ type: SEND_PREDICTION });
// const fetchUserPredictionsAction = actionWrapper({ type: FETCH_USER_PREDICTIONS });

// Format the error from TronWeb to follow our backend API error
const parseTronWebError = (err) => ({
  status: 0,
  data: { error: { err } },
});

const authenticateUser = (account) => (
  async (dispatch) => {
    dispatch(authenticateUserAction({ response: account }));
  }
);

const purchaseVoucher = (voucherCount = 1) => (
  async (dispatch) => {
    dispatch(purchaseVoucherAction());

    try {
      // Initiate voucher purchase transaction
      const response = await buyVoucher(voucherCount);

      return dispatch(purchaseVoucherAction({ response }));
    } catch (err) {
      return dispatch(purchaseVoucherAction({ error: parseTronWebError(err) }));
    }
  }
);

const sendPrediction = (prediction) => (
  async (dispatch) => {
    dispatch(sendPredictionAction());

    try {
      const response = await submitPrediction(prediction);

      return dispatch(sendPredictionAction({ response }));
    } catch (err) {
      return dispatch(sendPredictionAction({ error: parseTronWebError(err) }));
    }
  }
);

const logOutUser = () => (
  async (dispatch) => {
    dispatch(logOutUserAction({}));
  }
);

export {
  authenticateUser,
  purchaseVoucher,
  sendPrediction,
  logOutUser,
};