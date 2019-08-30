import React, { memo } from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';

const styles = {
  container: {
    height: '20%',
  },
  dateTime: {
    width: '90%',
    paddingTop: 5,
    paddingBottom: 2,
    borderTop: '1px solid #EFEFEF',
  },
  arena: {
    width: '90%',
    paddingTop: 2,
    paddingBottom: 5,
    borderBottom: '1px solid #EFEFEF',
  },
  typography: {
    fontSize: 14,
  },
};

const GameDetails = memo(({
  dateTime,
  arena,
}) => (
  <Grid container alignItems="center" direction="column" style={styles.container}>
    <Grid container justify="center" alignItems="center" style={styles.dateTime}>
      <Typography align="center" style={styles.typography}>{dateTime}</Typography>
    </Grid>
    <Grid container justify="center" alignItems="center" style={styles.arena}>
      <Typography align="center" style={styles.typography}>{arena}</Typography>
    </Grid>
  </Grid>
));

export default GameDetails;
