import { post } from 'axios';
import {
  AUTHENTICATE_USER,
  LOG_OUT_USER,
} from './util/types';
import apiEndpoints from './util/apiEndpoints';
import { logout } from '../../util/auth';
// import { errorCodes, errorMessages } from '../../util/constants';
import {
  actionWrapper,
  // parseActionError,
} from '../lib/actions';

// ACTIONS
const authenticateUserAction = actionWrapper({ type: AUTHENTICATE_USER });
const logOutUserAction = response => actionWrapper({ type: LOG_OUT_USER })({ response });

const authenticateUser = (credentials) => (
  async (dispatch) => {
    dispatch(authenticateUserAction());

    try {
      const { data } = await post(apiEndpoints.authenticateUser, credentials);
      return dispatch(authenticateUserAction({ response: data }));
    } catch ({ response: error }) {
      return dispatch(authenticateUserAction({ error }));
    }
  }
);

const logOutUser = () => (
  async (dispatch) => {
    await logout();
    dispatch(logOutUserAction({}));
  }
);

export {
  authenticateUser,
  logOutUser,
};