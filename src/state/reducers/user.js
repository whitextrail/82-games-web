import {
  AUTHENTICATE_USER,
  PURCHASE_VOUCHER,
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
});

const authenticateUserReducer = (state, { response }) => ({ ...response });

const purchaseVoucherReducer = (state, { response }) => ({ ...response });

const logOutUserReducer = () => ({ ...userState });

export default (state = userState, action) => {
  const { type } = action;

  switch (type) {
    case AUTHENTICATE_USER:
      return evalActionPayload(state, action, authenticateUserReducer);
    case PURCHASE_VOUCHER:
      return evalActionPayload(state, action, purchaseVoucherReducer);
    case LOG_OUT_USER:
      return evalActionPayload(state, action, logOutUserReducer);
    default:
      return state;
  }
};