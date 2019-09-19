import React, { PureComponent } from 'react';
import {
  CssBaseline,
  Grid,
} from '@material-ui/core';
import { Route } from 'react-router-dom';
import Games from './Games';
import Athlete from '../functional/Athlete';
import { setupTronWeb } from '../../util/tronweb';

class App extends PureComponent {
  componentDidMount() {
    // Initialize TronWeb and hook-up any available provider (ie. TronLink)
    setupTronWeb();
  };

  render = () => (
    <Grid container direction="column">
      <CssBaseline />
      <Route exact path="/" component={Games} />
      <Route path="/games" component={Games} />
      <Route path="/athletes" component={Athlete} />
    </Grid>
  );
};

export default App;
