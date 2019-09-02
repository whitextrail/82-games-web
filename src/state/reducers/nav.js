import {
  SET_NAV_STATE,
  TOGGLE_NAV_MENU,
} from '../actions/util/types';
import {
  evalStatusCases,
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

const toggleNavMenuReducer = ({ isOpen }) => ({
  isOpen: !isOpen,
});

export default (state = navState, action) => {
  let updatedState = {};

  const { type } = action;

  switch (type) {
    case SET_NAV_STATE:
      updatedState = setNavStateReducer();
      break;
    case TOGGLE_NAV_MENU:
      updatedState = toggleNavMenuReducer(state);
      break;
    default:
      return state;
  }

  return evalStatusCases(state, action, updatedState);
};
