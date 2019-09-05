import {
  SET_NAV_STATE,
  TOGGLE_NAV_MENU,
} from '../actions/util/types';
import {
  evalActionPayload,
  initialStateDecorator,
} from '../lib/reducers';
import { navList } from '../lib/nav';

const navState = initialStateDecorator({
  byId: {},
  allIds: [],
  selectedId: null,
  isOpen: false,
});

const setNavStateReducer = (state, action) => {
  const navListKeys = Object.keys(navList);
  const pathname = action.response.substring(1);

  return {
    byId: { ...navList},
    allIds: navListKeys,
    selectedId: navListKeys.includes(pathname) ? pathname : navListKeys[0],
  };
};

const toggleNavMenuReducer = (state) => ({
  isOpen: !state.isOpen,
});

export default (state = navState, action) => {
  const { type } = action;

  switch (type) {
    case SET_NAV_STATE:
      return evalActionPayload(state, action, setNavStateReducer);
    case TOGGLE_NAV_MENU:
      return evalActionPayload(state, action, toggleNavMenuReducer);
    default:
      return state;
  }
};
