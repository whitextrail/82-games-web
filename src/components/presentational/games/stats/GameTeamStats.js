import React, { memo } from 'react';
import {
  Grid,
} from '@material-ui/core';
import GameTeamStatsBox from './GameTeamStatsBox';
import GameTeamStatsLineChart from './GameTeamStatsLineChart';

const styles = {
  container: {
    height: 595,
    width: 375,
    marginTop: 15,
  },
  barsContainer: {
    height: 200,
    width: 355,
    background: '#333',
    paddingBottom: 10,
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
    <Grid container justify="center" alignItems="center" direction="column" style={styles.container}>
      <GameTeamStatsBox teamStats={teamStats} />
      <GameTeamStatsLineChart
        homeTeamId={homeTeamId}
        homeTeamName={homeTeamName}
        awayTeamId={awayTeamId}
        awayTeamName={awayTeamName}
        homeTeamStatistics={homeTeamStatistics}
        awayTeamStatistics={awayTeamStatistics}
      />
    </Grid>
  );
});

export default GameTeamStats;
