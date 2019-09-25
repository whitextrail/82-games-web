import React, {
  memo,
  createContext,
  useReducer,
  useMemo,
  useCallback,
  useEffect,
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

const Nav = memo(({
  pathname,
  children,
  showVoucherDialog,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // useCallback memoizes the functions below and only update them if the
  // dependencies in the function's 2nd arg change. This is necessary,
  // otherwise memoContext will constantly be re-assigned
  const toggleMenu = useCallback(() => (
    dispatch({
      type: actionTypes.TOGGLE_MENU,
      payload: !state.menuOpen,
    })
  ), [state.menuOpen]);

  const selectId = useCallback((id => dispatch({
    type: actionTypes.SELECT_ID,
    payload: id,
  })), [dispatch]);

  // Returns a memoized object to prevent NavContext subscribers
  // from re-rendering when state and props don't change
  const memoContext = useMemo(() => ({
    state,
    toggleMenu,
    selectId,
    showVoucherDialog,
  }), [
    state,
    toggleMenu,
    selectId,
    showVoucherDialog,
  ]);

  // The useEffect hook is used below to set `selectId` based on
  // the root pathname (e.g. "games" in /games/previous)
  useEffect(() => {
    const [,rootPath] = pathname.split('/');
    const {
      byId,
      selectedId,
    } = state;

    if (byId[rootPath] && rootPath !== selectedId) {
      selectId(rootPath);
    }
  }, [state, pathname, selectId]);

  return <NavContext.Provider value={memoContext}>{children}</NavContext.Provider>;
});

export {
  Nav,
  NavContext,
};
