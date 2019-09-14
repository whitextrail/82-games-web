import React, { memo } from 'react';
import {
  Grid,
  Paper,
} from '@material-ui/core';
import GamePrizes from './stats/GamePrizes';

const styles = {
  container: {
    backgroundColor: '#333',
    height: '100vh',
  },
  athleteStats: {
    marginTop: 15,
    height: 150,
    width: 350,
  },
};

const GameStats = memo(() => {
  return (
    <Grid container alignItems="center" direction="column" style={styles.container}>
      <GamePrizes />
      <Paper
        component={Grid}
        container
        justify="center"
        alignItems="center"
        direction="column"
        style={styles.athleteStats}
      >

      </Paper>
    </Grid>
  );
});

export default GameStats;
