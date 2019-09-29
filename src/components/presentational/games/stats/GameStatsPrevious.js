import React, { memo } from 'react';
import { Grid } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import GameStatsHeader from './previous/GameStatsHeader';
import GameAthleteStats from './previous/GameAthleteStats';
import GameTeamStats from './previous/GameTeamStats';

const styles = {
  container: {
    background: 'linear-gradient(180deg, rgba(51,51,51,1) 25%, rgba(25,25,25,1) 100%)',
    height: '100vh',
  },
  swipeableViews: {
    width: '100vw',
  },
};

const GameStatsPrevious = memo(({
  goBackRoute,
  changeGameStatsGroup,
  gamesById,
  allGameStatsGroups,
  selectedGameStatsGroup,
  allGameStatsIds,
  selectedGameStatsId,
  gameStatsGroupIndex,
  athleteGameStats,
  otherGameStats,
  selectedGameStats,
  changeSelectedGameStatsId,
}) => (
  <Grid
    container
    alignItems="center"
    direction="column"
    style={styles.container}
  >
    <GameStatsHeader
      goBackRoute={goBackRoute}
      changeGameStatsGroup={changeGameStatsGroup}
      gamesById={gamesById}
      allGameStatsGroups={allGameStatsGroups}
      selectedGameStatsGroup={selectedGameStatsGroup}
      allGameStatsIds={allGameStatsIds}
      selectedGameStatsId={selectedGameStatsId}
      changeSelectedGameStatsId={changeSelectedGameStatsId}
    />
    <SwipeableViews index={gameStatsGroupIndex} style={styles.swipeableViews}>
      <GameAthleteStats
        athleteGameStats={athleteGameStats}
        otherGameStats={otherGameStats}
        selectedGameStats={selectedGameStats}
        selectedGameStatsId={selectedGameStatsId}
        selectedAthleteGameStats={athleteGameStats[selectedGameStatsId]}
      />
      <GameTeamStats {...selectedGameStats} />
    </SwipeableViews>
  </Grid>
));

export default GameStatsPrevious;
