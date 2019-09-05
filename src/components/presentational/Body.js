import React, { memo } from 'react';
import {
  Grid,
  Collapse,
} from '@material-ui/core';

const styles = {
  container: {
    height: window.innerHeight - 56,
  },
};

const Body = memo(({
  navMenuIsOpen,
  children,
}) => (
  <Collapse in={!navMenuIsOpen} direction="down">
    <Grid style={styles.container}>
      {children}
    </Grid>
  </Collapse>
));

export default Body;
