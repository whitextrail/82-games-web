import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  CssBaseline,
  Grid,
} from '@material-ui/core';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import {
  authenticateUser,
  logOutUser,
} from '../../state/actions';
import { Nav } from './Nav';
import NavMenu from '../presentational/nav/NavMenu';
import Games from './Games';
import Athletes from './Athletes';
import { setupTronWeb } from '../../util/tronweb';

class App extends PureComponent {
  componentDidMount() {
    // Initialize TronWeb and hook-up any available provider (ie. TronLink)
    setupTronWeb(this.onAccountChanged);
  };

  onAccountChanged = (account) => {
    const { user: { address } } = this.props;

    if (account) {
      this.props.authenticateUser(account);
    } else if (address) {
      this.props.logOutUser();
    }
  };

  render = () => {
    const {
      location: { pathname },
      user,
    } = this.props;
    console.log(user);
    return (
      <Grid container direction="column">
        <CssBaseline />
        <Nav pathname={pathname}>
          <NavMenu />
          <Route exact path="/" render={() => <Redirect to="/games" /> } />
          <Route path="/games" component={Games} />
          <Route path="/athletes" component={Athletes} />
        </Nav>
      </Grid>
    );
  };
};

const mapStateToProps = ({
  user,
}) => ({
  user,
});

export default connect(mapStateToProps, {
  authenticateUser,
  logOutUser,
})(App);
