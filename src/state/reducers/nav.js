import {
  SET_NAV_STATE,
  TOGGLE_NAV_MENU,
  SELECT_NAV_ID,
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

const setNavStateReducer = () => {
  const navListKeys = Object.keys(navList);

  return {
    byId: { ...navList},
    allIds: navListKeys,
    selectedId: navListKeys[0],
  };
};

const toggleNavMenuReducer = (state) => ({
  isOpen: !state.isOpen,
});

const selectNavId = (state, action) => {
  const { allIds } = state;
  const { id } = action.response;

  return {
    selectedId: allIds.includes(id) ? id : allIds[0],
    isOpen: false,
  };
};

export default (state = navState, action) => {
  const { type } = action;

  switch (type) {
    case SET_NAV_STATE:
      return evalActionPayload(state, action, setNavStateReducer);
    case TOGGLE_NAV_MENU:
      return evalActionPayload(state, action, toggleNavMenuReducer);
    case SELECT_NAV_ID:
      return evalActionPayload(state, action, selectNavId);
    default:
      return state;
  }
};
