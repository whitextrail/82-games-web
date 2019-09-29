import React, { memo } from 'react';
import { Grid } from '@material-ui/core';
import GameStatsHeader from './upcoming/GameStatsHeader';
import GameStatsBanner from './upcoming/GameStatsBanner';

const styles = {
  container: {
    background: 'linear-gradient(180deg, rgba(51,51,51,1) 25%, rgba(25,25,25,1) 100%)',
    height: '100vh',
  },
  swipeableViews: {
    width: '100vw',
  },
};

const GameStatsUpcoming = memo(({
  goBackRoute,
  gameNumber,
}) => (
  <Grid
    container
    alignItems="center"
    direction="column"
    style={styles.container}
  >
    <GameStatsHeader goBackRoute={goBackRoute} />
    <GameStatsBanner gameNumber={gameNumber} />
  </Grid>
));

export default GameStatsUpcoming;
