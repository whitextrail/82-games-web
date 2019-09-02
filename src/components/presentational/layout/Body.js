import React, { memo } from 'react';
import {
  Grid,
  Collapse,
} from '@material-ui/core';
import { primaryColor } from '../../../styles/constants';

const styles = {
  container: {
    height: window.innerHeight - 56,
    backgroundColor: primaryColor,
  },
};

const Body = memo(({
  children,
  navMenuIsOpen,
}) => (
  <Collapse in={!navMenuIsOpen} direction="up">
    <Grid style={styles.container}>
      { children }
    </Grid>
  </Collapse>
));

export default Body;
