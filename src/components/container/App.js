import React, { memo } from 'react';
import {
  CssBaseline,
  Grid,
} from '@material-ui/core';
import { Route } from 'react-router-dom';
import { Nav } from './Nav';
import Games from './Games';
import Athletes from './Athletes';

const App = memo(({ location: { pathname } }) => (
  <Grid container direction="column">
    <CssBaseline />
    <Nav pathname={pathname}>
      <Route exact path="/" component={Games} />
      <Route path="/games" component={Games} />
      <Route path="/athletes" component={Athletes} />
    </Nav>
  </Grid>
));

export default App;
