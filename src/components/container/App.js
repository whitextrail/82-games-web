import React, { memo } from 'react';
import {
  CssBaseline,
  Grid,
} from '@material-ui/core';
import { Route } from 'react-router-dom';
import { Nav } from './Nav';
import Games from './Games';
import Athlete from '../functional/Athlete';

const App = memo(() => (
  <Grid container direction="column">
    <CssBaseline />
    <Nav>
      <Route exact path="/" component={Games} />
      <Route path="/games" component={Games} />
      <Route path="/athletes" component={Athlete} />
    </Nav>
  </Grid>
));

export default App;
