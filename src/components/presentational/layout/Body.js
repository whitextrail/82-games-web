import React, { memo } from 'react';
import { Grid } from '@material-ui/core';
import { secondaryColor } from '../../../styles/constants';

const styles = {
  container: {
    height: '100vh',
    backgroundColor: secondaryColor,
  },
  paper: {
    height: '100%',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
};

const Body = memo(({ children }) => (
  <Grid style={styles.container}>
    { children }
  </Grid>
));

export default Body;
