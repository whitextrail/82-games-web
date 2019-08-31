import { TOGGLE_NAVIGATION_MENU_OPEN_STATE } from './util/types';
import { actionWrapper } from '../lib/actions';

const toggleNavigationMenuOpenStateActionCreator = actionWrapper({ type: TOGGLE_NAVIGATION_MENU_OPEN_STATE });

const toggleNavigationMenuOpenState = () => (
  dispatch => dispatch(toggleNavigationMenuOpenStateActionCreator({ response: {} }))
);

export {
  toggleNavigationMenuOpenState,
};
