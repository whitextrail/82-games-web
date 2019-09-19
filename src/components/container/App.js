import React, { memo } from 'react';
import {
  CssBaseline,
  Grid,
} from '@material-ui/core';
import { Route } from 'react-router-dom';
import Games from './Games';
import Athlete from '../functional/Athlete';

const App = memo(() => (
  <Grid container direction="column">
    <CssBaseline />
    <Route exact path="/" component={Games} />
    <Route path="/games" component={Games} />
    <Route path="/athletes" component={Athlete} />
  </Grid>
));

export default App;
