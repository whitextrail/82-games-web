import React, { memo } from 'react';
import {
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import {
  secondaryColor,
  primaryTextColor,
} from '../../../../styles/constants';

const styles = {
  container: {
    height: 66,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    backgroundColor: secondaryColor,
  },
  paper: {
    height: 56,
    width: '100%',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  textContainer: {
    paddingLeft: 20,
  },
  text: {
    color: primaryTextColor,
    fontSize: 18,
  },
};

const GameHeader = memo(({
  status
}) => (
  <Grid container style={styles.container}>
    <Paper style={styles.paper}>
      <Grid container alignItems="center" style={styles.textContainer}>
        <Typography style={styles.text}>{status}</Typography>
      </Grid>
    </Paper>
  </Grid>
));

export default GameHeader;
