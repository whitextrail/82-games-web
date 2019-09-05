import React, { memo } from 'react';
import {
  Grid,
  Collapse,
} from '@material-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Games from '../container/Games';

const styles = {
  container: {
    height: window.innerHeight - 56,
  },
};

const Body = memo(({ navMenuIsOpen }) => (
  <Collapse in={!navMenuIsOpen} direction="down">
    <Grid style={styles.container}>
      <Router>
        <Route exact path="/" component={Games} />
        <Route exact path="/games" component={Games} />
      </Router>
    </Grid>
  </Collapse>
));

export default Body;
