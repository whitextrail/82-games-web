import React, { memo } from 'react';
import {
  Grid,
} from '@material-ui/core';
import GamePrizes from './stats/GamePrizes';
import GamePrediction from './stats/GamePrediction';

const styles = {
  container: {
    backgroundColor: '#333',
    height: '100vh',
  },
  athleteStats: {
    height: 150,
    width: 350,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
};

const GameStats = memo(() => {
  return (
    <Grid container alignItems="center" direction="column" style={styles.container}>
      <GamePrizes />
      <GamePrediction />
    </Grid>
  );
});

export default GameStats;
