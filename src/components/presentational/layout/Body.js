import React, { memo } from 'react';
import { Grid } from '@material-ui/core';
import { primaryColor } from '../../../styles/constants';

const styles = {
  container: {
    height: '100vh',
    backgroundColor: primaryColor,
  },
};

const Body = memo(({ children }) => (
  <Grid style={styles.container}>
    { children }
  </Grid>
));

export default Body;
