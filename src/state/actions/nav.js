import {
  SET_NAV_STATE,
  TOGGLE_NAV_MENU,
  SELECT_NAV_ID,
} from './util/types';
import { actionWrapper } from '../lib/actions';

const actionCreators = {
  setNavState: actionWrapper({ type: SET_NAV_STATE }),
  toggleNavMenu: actionWrapper({ type: TOGGLE_NAV_MENU })({ response: {} }),
  selectNavId: actionWrapper({ type: SELECT_NAV_ID }),
};

const setNavState = pathname => dispatch => dispatch(actionCreators.setNavState({ response: { pathname } }));

const toggleNavMenu = () => dispatch => dispatch(actionCreators.toggleNavMenu);

const selectNavId = id => dispatch => dispatch(actionCreators.selectNavId({ response: { id } }));

export {
  setNavState,
  toggleNavMenu,
  selectNavId,
};
