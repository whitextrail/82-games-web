import React, { memo } from 'react';
import {
  Grid,
  Collapse,
} from '@material-ui/core';
// import Router from '../reusable/Router';

const styles = {
  container: {
    height: window.innerHeight - 56,
  },
};

const Body = memo(({
  children,
  navMenuIsOpen,
}) => (
  <Collapse in={!navMenuIsOpen} direction="down">
    <Grid style={styles.container}>
      { React.Children.forEach(children, (child, index) => console.log('index', index, 'child', child))}
      { children }
    </Grid>
  </Collapse>
));

export default Body;
