module.exports = {
  authenticationStates: {
    ANY: 0,
    UNAUTHENTICATED: 1,
    AUTHENTICATED: 2,
  },
  errorCodes: {
    UNKNOWN: -1,
    NONE: 0,
    USER_NOT_AUTHENTICATED: 1,
  },
  errorMessages: {
    UNKNOWN: 'Unknown error occured',
    NONE: '',
    USER_NOT_AUTHENTICATED: 'User not authenticated',
  },
};
