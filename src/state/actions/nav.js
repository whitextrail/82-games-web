import {
  SET_NAV_STATE,
  TOGGLE_NAV_MENU,
} from './util/types';
import { actionWrapper } from '../lib/actions';

const actionCreators = {
  setNavState: actionWrapper({ type: SET_NAV_STATE })({ response: {} }),
  toggleNavMenu: actionWrapper({ type: TOGGLE_NAV_MENU })({ response: {} }),
};

const setNavState = () => dispatch => dispatch(actionCreators.setNavState);

const toggleNavMenu = () => dispatch => dispatch(actionCreators.toggleNavMenu);

export {
  setNavState,
  toggleNavMenu,
};
