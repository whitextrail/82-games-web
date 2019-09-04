import {
  AUTHENTICATE_USER,
  LOG_OUT_USER,
} from '../actions/util/types';
import {
  evalActionPayload,
  initialStateDecorator,
} from '../lib/reducers';

const userState = initialStateDecorator({
  id: 0,
  name: '',
  profilePictureUrl: '',
  email: '',
  emailVerified: false,
});

const authenticateUserReducer = (state, { response }) => ({ ...response });

const logOutUserReducer = () => ({ ...userState });

export default (state = userState, action) => {
  const { type } = action;

  switch (type) {
    case AUTHENTICATE_USER:
      return evalActionPayload(state, action, authenticateUserReducer);
    case LOG_OUT_USER:
      return evalActionPayload(state, action, logOutUserReducer);
    default:
      return state;
  }
};
