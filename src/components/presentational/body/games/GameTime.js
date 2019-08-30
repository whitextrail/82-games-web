import React, { memo } from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';

const styles = {
  container: {
    height: '15%',
  },
  typographyContainer: {
    width: '90%',
    borderTop: '1px solid #EFEFEF',
    borderBottom: '1px solid #EFEFEF',
  },
  typography: {
    fontSize: 14,
  },
};

const GameTime = memo(() => (
  <Grid container justify="center" style={styles.container}>
    <Grid container justify="center" alignItems="center" style={styles.typographyContainer}>
      <Typography align="center" style={styles.typography}>Game 4 / October 30, 7:30 PM EST</Typography>
    </Grid>
  </Grid>
));

export default GameTime;
