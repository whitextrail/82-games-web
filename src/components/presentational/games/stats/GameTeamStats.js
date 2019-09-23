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

const GameTeamStats = memo(({
  selectedAthleteGameId,
  athleteGames,
}) => {
  const {
    [selectedAthleteGameId]: selectedGameStats,
  } = athleteGames;
  const {
    homeTeamId,
    homeTeamName,
    awayTeamId,
    awayTeamName,
    homeTeamStatistics,
    awayTeamStatistics,
  } = selectedGameStats;
  const teamStats = [{
    teamName: homeTeamName,
    resourceId: `${homeTeamName}_${homeTeamId}`,
    Q1: homeTeamStatistics.Q1,
    Q2: homeTeamStatistics.Q2,
    Q3: homeTeamStatistics.Q3,
    Q4: homeTeamStatistics.Q4,
    wL: homeTeamStatistics.PTS > awayTeamStatistics.PTS ? 'W': 'L',
  }, {
    teamName: awayTeamName,
    resourceId: `${awayTeamName}_${awayTeamId}`,
    Q1: awayTeamStatistics.Q1,
    Q2: awayTeamStatistics.Q2,
    Q3: awayTeamStatistics.Q3,
    Q4: awayTeamStatistics.Q4,
    wL: homeTeamStatistics.PTS < awayTeamStatistics.PTS ? 'W': 'L',
  }];

  return (
    <Grid container alignItems="center" direction="column" style={styles.container}>
      <GameTeamStatsBox teamStats={teamStats}>
        <GameTeamStatsBoxChart
          homeTeamId={homeTeamId}
          homeTeamName={homeTeamName}
          awayTeamId={awayTeamId}
          awayTeamName={awayTeamName}
          homeTeamStatistics={homeTeamStatistics}
          awayTeamStatistics={awayTeamStatistics}
        />
        <GameTeamStatsBreakdown
          homeTeamId={homeTeamId}
          homeTeamName={homeTeamName}
          awayTeamId={awayTeamId}
          awayTeamName={awayTeamName}
          homeTeamStatistics={homeTeamStatistics}
          awayTeamStatistics={awayTeamStatistics}
        />
      </GameTeamStatsBox>
    </Grid>
  );
});

export default GameTeamStats;
