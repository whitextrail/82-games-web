import React, { memo } from 'react';
import {
  Grid,
  CssBaseline,
} from '@material-ui/core';
import {
  Header,
  Body,
  Footer,
} from './layout';
import { Navigation } from './header';

const App = memo(() => (
  <Grid container direction="column" wrap="nowrap">
    <CssBaseline />
    <Header>
      <Navigation />
    </Header>
    <Body />
    <Footer />
  </Grid>
));

export default App;
