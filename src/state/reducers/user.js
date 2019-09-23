import {
  AUTHENTICATE_USER,
  PURCHASE_VOUCHER,
  SEND_PREDICTION,
  // FETCH_USER_PREDICTIONS,
  LOG_OUT_USER,
} from '../actions/util/types';
import {
  evalActionPayload,
  initialStateDecorator,
} from '../lib/reducers';

const userState = initialStateDecorator({
  address: '',
  balance: 0,
  voucherCount: 0,
  predictions: [],
});

const authenticateUserReducer = (state, { response }) => ({ ...response });

const purchaseVoucherReducer = (state, { response }) => ({ ...response });

const sendPredictionReducer = (state, { response }) => ({ predictions: response });

const logOutUserReducer = () => ({ ...userState });

export default (state = userState, action) => {
  const { type } = action;

  switch (type) {
    case AUTHENTICATE_USER:
      return evalActionPayload(state, action, authenticateUserReducer);
    case PURCHASE_VOUCHER:
      return evalActionPayload(state, action, purchaseVoucherReducer);
    case SEND_PREDICTION:
      return evalActionPayload(state, action, sendPredictionReducer);
    case LOG_OUT_USER:
      return evalActionPayload(state, action, logOutUserReducer);
    default:
      return state;
  }
};