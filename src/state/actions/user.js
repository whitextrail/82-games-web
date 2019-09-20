import {
  AUTHENTICATE_USER,
  LOG_OUT_USER,
} from './util/types';
import { actionWrapper } from '../lib/actions';

const authenticateUserAction = actionWrapper({ type: AUTHENTICATE_USER });
const logOutUserAction = response => actionWrapper({ type: LOG_OUT_USER })({ response });

const authenticateUser = (account) => (
  async (dispatch) => {
    dispatch(authenticateUserAction({ response: account }));
  }
);

const logOutUser = () => (
  async (dispatch) => {
    dispatch(logOutUserAction({}));
  }
);

export {
  authenticateUser,
  logOutUser,
};