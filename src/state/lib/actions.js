const { get } = require('lodash');

// Cleanly wraps actions
const actionWrapper = ({ type }) => {
  return (payload = {}) => ({
    ...payload,
    type,
  });
};

// Get the nested error object and return the errorMessage when available
// Otherwise, use the specified default message
const parseActionError = (error, defaultMessage) => get(error, ['response', 'data', 'error', 'message'], defaultMessage);

export {
  actionWrapper,
  parseActionError,
};
