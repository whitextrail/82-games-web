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

const GameTeamStats = memo(({ selectedGameWithStats }) => {
  const {
    homeTeamId,
    homeTeamName,
    awayTeamId,
    awayTeamName,
    homeTeamStatistics,
    awayTeamStatistics,
  } = selectedGameWithStats;
  const teamStats = [{
    teamName: homeTeamName,
    resourceId: `${homeTeamName}_${homeTeamId}`,
    wL: homeTeamStatistics.PTS > awayTeamStatistics.PTS ? 'W': 'L',
    ...homeTeamStatistics,
  }, {
    teamName: awayTeamName,
    resourceId: `${awayTeamName}_${awayTeamId}`,
    wL: homeTeamStatistics.PTS < awayTeamStatistics.PTS ? 'W': 'L',
    ...awayTeamStatistics,
  }];

  return (
    <Grid container alignItems="center" direction="column" style={styles.container}>
      <GameTeamStatsBox teamStats={teamStats}>
        <GameTeamStatsBoxChart {...selectedGameWithStats} />
        <GameTeamStatsBreakdown {...selectedGameWithStats} />
      </GameTeamStatsBox>
    </Grid>
  );
});

export default GameTeamStats;
