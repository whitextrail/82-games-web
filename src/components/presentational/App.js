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

const styles = {
  app: {
    height: '100%',
  },
};

const App = memo(() => (
  <Grid container direction="column" wrap="nowrap" style={styles.app}>
    <CssBaseline />
    <Header>
      <Navigation />
    </Header>
    <Body />
    <Footer />
  </Grid>
));

export default App;
