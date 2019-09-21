import {
  AUTHENTICATE_USER,
  LOG_OUT_USER,
  PURCHASE_VOUCHER,
} from './util/types';
import { actionWrapper } from '../lib/actions';
import { buyVoucher } from '../../util/tronweb';

const authenticateUserAction = actionWrapper({ type: AUTHENTICATE_USER });
const logOutUserAction = response => actionWrapper({ type: LOG_OUT_USER })({ response });
const purchaseVoucherAction = actionWrapper({ type: PURCHASE_VOUCHER });

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
      // Format the error from TronWeb to follow our backend API error
      const error = {
        status: 0,
        data: { error: { err } },
      };
      return dispatch(purchaseVoucherAction({ error }));
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
  logOutUser,
};