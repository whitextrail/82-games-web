import React, { memo } from 'react';
import { Grid } from '@material-ui/core';
import GameStatsHeader from './upcoming/GameStatsHeader';
import GameStatsBanner from './upcoming/GameStatsBanner';
import GameAthleteStats from './upcoming/GameAthleteStats';
import GameTeamStats from './upcoming/GameTeamStats';

const styles = {
  container: {
    background: '#333',
    height: '100vh',
  },
  swipeableViews: {
    width: '100vw',
  },
};

const GameStatsUpcoming = memo(({
  goBackRoute,
  gameNumber,
  athleteGameStats,
}) => (
  <Grid
    container
    alignItems="center"
    direction="column"
    style={styles.container}
  >
    <GameStatsHeader goBackRoute={goBackRoute} />
    <GameStatsBanner gameNumber={gameNumber} />
    <GameAthleteStats
      athleteGameStats={athleteGameStats}
    />
  </Grid>
));

export default GameStatsUpcoming;
