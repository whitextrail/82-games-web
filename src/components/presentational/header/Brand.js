import React, { memo } from 'react';
import { Grid, Typography } from '@material-ui/core';

const styles = {
  container: {
    marginLeft: '2vw',
  },
  brand: {
    color: 'black',
  },
}

const Brand = memo(() => (
  <Grid container item alignContent="center" style={styles.container}>
    <Typography style={styles.brand}>82 GAMES</Typography>
  </Grid>
));

export default Brand;
