import React, { memo, useReducer } from 'react';
import { connect } from 'react-redux';
import {
  withRouter,
  Switch,
  Route,
  Redirect,
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
  history,
  user,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    allIds,
    selectedId,
  } = state;

  const updateId = (event, value) => {
    dispatch({
      type: 'UPDATE_ID',
      response: { id: value },
    });

    return history.push(`${url}/${value.toLowerCase()}`);
  };

  return (
    <Grid container direction="column">
      <AccountHeader
        allIds={allIds}
        selectedId={selectedId}
        updateId={updateId}
      />
      <Switch>
        <Route exact path={`${url}/profile`} component={AccountProfile} />
        <Route exact path={`${url}/tickets`} render={() => <AccountTickets user={user} />} />
        <Redirect from={url} to={`${url}/profile`} />
      </Switch>
    </Grid>
  );
});

const mapStateToProps = ({ user }) => ({ user });

export default withRouter(connect(mapStateToProps)(AccountContainer));
