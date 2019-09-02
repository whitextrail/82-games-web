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
  textContainer: {
    width: '90%',
    borderTop: '1px solid #EFEFEF',
    borderBottom: '1px solid #EFEFEF',
    paddingTop: 7,
    paddingBottom: 7
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
    <Grid style={styles.textContainer}>
      <Typography align="center" style={styles.typography}>{localGameDateTime}</Typography>
      <Typography align="center" style={styles.typography}>{arena}</Typography>
    </Grid>
  </Grid>
));

export default GameDetails;
