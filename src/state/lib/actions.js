const { get } = require('lodash');

// Outputs an action creator that can handle generic, success, and error cases
const actionWrapper = ({ type }) => {
  const action = { type };
  const hasOwnProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

  return (payload = {}) => {
    action.response = null;
    action.error = null;
    action.status = '';

    if (hasOwnProp(payload, 'error')) {
      action.error = payload.error;
      action.status = 'error';
    } else if (hasOwnProp(payload, 'response')) {
      action.response = payload.response;
      action.status = 'success';
    }

    // Return shallow copy of action
    return { ...action };
  };
};

// Get the nested error object and return the errorMessage when available
// Otherwise, use the specified default message
const parseActionError = (error, defaultMessage) => get(error, ['response', 'data', 'error', 'message'], defaultMessage);

module.exports = {
  actionWrapper,
  parseActionError,
};
