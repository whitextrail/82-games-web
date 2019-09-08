import React, {
  memo,
  useReducer,
  useEffect,
} from 'react';
import { connect } from 'react-redux';
import {
  withRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { Grid } from '@material-ui/core';
import AccountHeader from '../presentational/body/account/AccountHeader';
import AccountProfile from '../presentational/body/account/AccountProfile';
import AccountTickets from '../presentational/body/account/AccountTickets';

const initialState = {
  byId: {
    Profile: AccountProfile,
    Tickets: AccountTickets,
  },
  allIds: ['Profile', 'Tickets'],
  selectedId: 'Profile',
};

const reducer = (state, action) => {
  const {
    type,
    response,
  } = action;

  switch(type) {
    case 'UPDATE_ID':
      return {
        ...state,
        selectedId: response.id,
      };
    default:
      return state;
  }
};

const AccountContainer = memo(({
  match: { url },
  location: { pathname },
  history,
  user,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    allIds,
    selectedId,
  } = state;

  const updateId = id => dispatch({
    type: 'UPDATE_ID',
    response: { id },
  });

  const handleTabClick = (event, value) => {
    updateId(value);

    return history.push(`${url}/${value.toLowerCase()}`);
  };

  useEffect(() => {
    const childRoutePathname = pathname.split('/')[2];

    if (childRoutePathname) {
      const pathnameAsId = childRoutePathname.substring(0, 1).toUpperCase() + childRoutePathname.substring(1);
      const {
        byId,
        selectedId,
      } = state;

      if (
        byId[pathnameAsId]
        && (pathnameAsId !== selectedId)
      ) {
        // Update `selectedId` to match child route pathname on-load
        updateId(pathnameAsId);
      }
    }
  });

  return (
    <Grid container direction="column">
      <AccountHeader
        allIds={allIds}
        selectedId={selectedId}
        handleTabClick={handleTabClick}
      />
      <Switch>
        <Route exact path="/account" render={() => <AccountProfile username={user.username} />} />
        <Route exact path={`/account/profile`} render={() => <AccountProfile username={user.username} />} />
        <Route exact path={`/account/tickets`} render={() => <AccountTickets user={user} />} />
      </Switch>
    </Grid>
  );
});

const mapStateToProps = ({ user }) => ({ user });

export default withRouter(connect(mapStateToProps)(AccountContainer));
