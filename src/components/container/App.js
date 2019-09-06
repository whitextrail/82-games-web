import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { CssBaseline, Grid } from '@material-ui/core';
import {
  withRouter,
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import { authenticateUser } from '../../state/actions';
import Nav from './Nav';
import Games from './Games';
import Account from './Account';
import Body from '../presentational/Body';
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
      nav,
      user,
      teams,
      games,
    } = this.props;
    const { isOpen } = nav;
    const isLoading = user.inProgress || teams.inProgress || games.inProgress;

    return (
      <Grid style={{ overflow: 'hidden' }}>
        <Router>
          <CssBaseline />
          <Progress show={isLoading} />
          <Route component={Nav} />
          <Body navMenuIsOpen={isOpen}>
            <Switch>
              <Route exact path="/account" component={Account} />
              <Route path="/" component={Games} />
            </Switch>
          </Body>
        </Router>
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
