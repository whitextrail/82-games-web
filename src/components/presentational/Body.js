import React, { memo } from 'react';
import {
  Grid,
  Collapse,
} from '@material-ui/core';
import Games from '../container/Games';

const styles = {
  container: {
    height: window.innerHeight - 56,
  },
};

const Body = memo(({ navMenuIsOpen }) => (
  <Collapse in={!navMenuIsOpen} direction="down">
    <Grid style={styles.container}>
      <Games />
    </Grid>
  </Collapse>
));

export default Body;
