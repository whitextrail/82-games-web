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

export { actionWrapper };
