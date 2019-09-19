import React, {
  memo,
  createContext,
  useReducer,
  useMemo,
} from 'react';
import {
  LocalPlaySharp,
  EqualizerSharp,
  StarSharp,
} from '@material-ui/icons';

const initialState = {
  byId: {
    games: {
      title: 'Games',
      routePath: '/games',
      icon: LocalPlaySharp,
    },
    athletes: {
      title: 'Athletes',
      routePath: '/athletes',
      icon: StarSharp,
    },
    leaderboard: {
      title: 'Leaderboard',
      routePath: '/leaderboard',
      icon: EqualizerSharp,
    },
  },
  allIds: ['games', 'athletes', 'leaderboard'],
  selectedId: 'games',
  menuOpen: false,
};

const actionTypes = {
  TOGGLE_MENU: 'TOGGLE_MENU',
  SELECT_ID: 'SELECT_ID',
};

const reducer = (state = initialState, action) => {
  const {
    type,
    payload,
  } = action;
  const {
    TOGGLE_MENU,
    SELECT_ID,
  } = actionTypes;

  switch (type) {
    case TOGGLE_MENU:
      return {
        ...state,
        menuOpen: payload,
      };
    case SELECT_ID:
      return {
        ...state,
        selectedId: payload,
      };
    default:
      return state;
  }
};

const NavContext = createContext({});

const Nav = memo(({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const memoContext = useMemo(() => ({
    state,
    toggleMenu: () => dispatch({
      type: actionTypes.TOGGLE_MENU,
      payload: !state.menuOpen,
    }),
    selectId: id => dispatch({
      type: actionTypes.SELECT_ID,
      payload: id,
    })
  }), [state]);

  return <NavContext.Provider value={memoContext}>{children}</NavContext.Provider>;
});

export {
  Nav,
  NavContext,
};
