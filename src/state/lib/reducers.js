// Extends initial state with "boilerplate" properties
const initialStateDecorator = state => ({
  ...state,
  inProgress: false,
  error: null,
  errorCode: null,
  errorMessage: null,
});

// Flexible handlers for different status cases
const reduceStartState = (state, startState = {}) => ({
  ...state,
  ...startState,
  inProgress: true,
  error: null,
  errorCode: null,
  errorMessage: null,
});

const reduceSucessState = (state, successState = {}) => ({
  ...state,
  ...successState,
  inProgress: false,
});

const reduceErrorState = (state, errorState = {
  error: null,
  errorCode: 400,
  errorMessage: 'ERROR_PLACEHOLDER',
}) => ({
  ...state,
  ...errorState,
  inProgress: false,
});

const evalStatusCases = (state, action, updatedState) => {
  const { status } = action;

  switch (status) {
    case '':
      return reduceStartState(state, updatedState);
    case 'success':
      return reduceSucessState(state, updatedState);
    case 'error':
      return reduceErrorState(state, updatedState);
    default:
      return state;
  }
};

export {
  initialStateDecorator,
  evalStatusCases,
};
