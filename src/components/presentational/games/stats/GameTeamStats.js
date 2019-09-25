import React, { memo } from 'react';
import {
  Grid,
} from '@material-ui/core';
import GameTeamStatsBox from './GameTeamStatsBox';
import GameTeamStatsBoxChart from './GameTeamStatsBoxChart';
import GameTeamStatsBreakdown from './GameTeamStatsBreakdown';

const styles = {
  container: {
    height: window.innerHeight - 152,
    width: 375,
    marginTop: 15,
  },
};

const GameTeamStats = memo(({ selectedGameStats }) => {
  const {
    homeTeamId,
    awayTeamId,
    homeTeamStatistics,
    awayTeamStatistics,
  } = selectedGameStats;
  const teamStats = [{
    teamId: homeTeamId,
    wL: homeTeamStatistics.PTS > awayTeamStatistics.PTS ? 'W': 'L',
    ...homeTeamStatistics,
  }, {
    teamId: awayTeamId,
    wL: homeTeamStatistics.PTS < awayTeamStatistics.PTS ? 'W': 'L',
    ...awayTeamStatistics,
  }];

  return (
    <Grid container alignItems="center" direction="column" style={styles.container}>
      <GameTeamStatsBox teamStats={teamStats}>
        <GameTeamStatsBoxChart {...selectedGameStats} />
        <GameTeamStatsBreakdown {...selectedGameStats} />
      </GameTeamStatsBox>
    </Grid>
  );
});

export default GameTeamStats;
