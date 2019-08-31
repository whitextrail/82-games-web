import { TOGGLE_NAVIGATION_MENU_OPEN_STATE } from '../actions/util/types';
import {
  evalStatusCases,
  initialStateDecorator,
} from '../lib/reducers';

const appState = initialStateDecorator({
  navigationMenuOpenState: false,
});

const toggleNavigationMenuOpenStateReducer = ({ navigationMenuOpenState }) => ({
  navigationMenuOpenState: !navigationMenuOpenState,
});

export default (state = appState, action) => {
  let updatedState = {};

  const {
    type,
    response,
    error,
  } = action;

  if (response) {
    switch (type) {
      case TOGGLE_NAVIGATION_MENU_OPEN_STATE:
        updatedState = toggleNavigationMenuOpenStateReducer(state);
        break;
      default:
        return state;
    }
  } else if (error) {
    updatedState = { ...error };
  }

  return evalStatusCases(state, action, updatedState);
};
