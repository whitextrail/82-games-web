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
import Progress from '../presentational/reusable/Progress';
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
    const {
      user,
      teams,
      games,
    } = this.props;
    const isLoading = user.inProgress || teams.inProgress || games.inProgress;

    return (
      <Grid container direction="column">
        <CssBaseline />
        <Progress show={isLoading} />
        <Route path="/account" component={Account} />
        <Route component={Games} />
      </Grid>
    );
  }
};

const mapStateToProps = ({
  nav,
  teams,
  games,
  user,
}) => ({
  nav,
  teams,
  games,
  user,
});

export default withRouter(connect(mapStateToProps, {
  authenticateUserAction: authenticateUser,
})(App));
