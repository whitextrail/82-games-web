import React, { memo } from 'react';
import {
  Grid,
} from '@material-ui/core';
import GamePrizes from './stats/GamePrizes';
import GamePrediction from './stats/GamePrediction';
import GameTeamStats from './stats/GameTeamStats';
import GameAthleteStats from './stats/GameAthleteStats';

const styles = {
  container: {
    backgroundColor: '#333',
    height: '100vh',
  },
};

const GameStats = memo(() => (
  <Grid container alignItems="center" direction="column" style={styles.container}>
    <GamePrizes />
    <GamePrediction />
    <GameAthleteStats />
    <GameTeamStats />
  </Grid>
));

export default GameStats;
