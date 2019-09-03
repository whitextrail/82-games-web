import React, { memo } from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';

const styles = {
  container: {
    height: '25%',
  },
  textContainer: {
    width: '90%',
    borderTop: '1px solid #EFEFEF',
    borderBottom: '1px solid #EFEFEF',
    paddingTop: 7,
    paddingBottom: 7,
  },
};

const GameDetails = memo(({
  localGameDateTime,
  arena,
}) => (
  <Grid container alignItems="center" direction="column" style={styles.container}>
    <Grid container justify="space-between" style={styles.textContainer} direction="column">
      <Typography variant="body2" align="center">{localGameDateTime}</Typography>
      <Typography variant="body2" align="center">{arena}</Typography>
    </Grid>
  </Grid>
));

export default GameDetails;
