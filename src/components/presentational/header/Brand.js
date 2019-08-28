import React, { memo } from 'react';
import { Grid, Typography } from '@material-ui/core';

const styles = {
  brand: {
    fontWeight: 500,
  },
};

const Brand = memo(() => (
  <Grid container item alignItems="center">
    <Typography color="primary" style={styles.brand}>82 GAMES</Typography>
  </Grid>
));

export default Brand;
