import React, { PureComponent } from 'react';
import {
  CssBaseline,
  Grid,
} from '@material-ui/core';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { Nav } from './Nav';
import NavMenu from '../presentational/nav/NavMenu';
import Games from './Games';
import Athletes from './Athletes';
import { setupTronWeb } from '../../util/tronweb';

class App extends PureComponent {
  componentDidMount() {
    // Initialize TronWeb and hook-up any available provider (ie. TronLink)
    setupTronWeb();
  };

  render = () => {
    const { location: { pathname } } = this.props;

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

export default App;
