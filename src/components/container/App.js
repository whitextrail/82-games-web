import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { CssBaseline, Grid } from '@material-ui/core';
import {
  withRouter,
  Route,
} from 'react-router-dom';
import { authenticateUser } from '../../state/actions';
import Games from './Games';
import Account from '../functional/Account';
import { checkSessionAsync } from '../../util/auth';

class App extends PureComponent {
  componentDidMount = () => (
    // Check for Auth0 user session
    checkSessionAsync()
      .then((result) => {
        const { email } = result.idTokenPayload;

        // Session exists, dispatch authenticateUser with credentials
        return this.props.authenticateUserAction({ email });
      })
      // Error checking for user session, ship them off to Auth0
      .catch((err) => {
        console.log(err);
        // TODO: Handle and report error
      })
  );

  render = () => {
    return (
      <Grid container direction="column">
        <CssBaseline />
        <Route path="/account" component={Account} />
        <Route component={Games} />
      </Grid>
    );
  }
};

export default withRouter(connect(null, {
  authenticateUserAction: authenticateUser,
})(App));
