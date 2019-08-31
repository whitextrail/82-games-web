import React, { memo } from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import { primaryTextColor } from '../../../../styles/constants';

const styles = {
  container: {
    height: '25%',
  },
  localGameDateTime: {
    width: '90%',
    paddingTop: 7,
    paddingBottom: 2,
    borderTop: '1px solid #EFEFEF',
  },
  arena: {
    width: '90%',
    paddingTop: 2,
    paddingBottom: 7,
    borderBottom: '1px solid #EFEFEF',
  },
  typography: {
    fontSize: 14,
    color: primaryTextColor,
  },
};

const GameDetails = memo(({
  localGameDateTime,
  arena,
}) => (
  <Grid container alignItems="center" direction="column" style={styles.container}>
    <Grid container justify="center" alignItems="center" style={styles.localGameDateTime}>
      <Typography color="primary" align="center" style={styles.typography}>{localGameDateTime}</Typography>
    </Grid>
    <Grid container justify="center" alignItems="center" style={styles.arena}>
      <Typography color="primary" align="center" style={styles.typography}>{arena}</Typography>
    </Grid>
  </Grid>
));

export default GameDetails;
