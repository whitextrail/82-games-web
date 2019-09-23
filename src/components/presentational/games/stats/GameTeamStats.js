import React, { memo } from 'react';
import {
  Grid,
  Card,
} from '@material-ui/core';
import GameTeamStatsLineChart from './GameTeamStatsLineChart';

const styles = {
  container: {
    height: 595,
    width: 375,
    marginTop: 15,
  },
  barsContainer: {
    height: 150,
    width: 355,
    background: '#333',
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

  return (
    <Grid container justify="center" alignItems="center" direction="column" style={styles.container}>
      <Card
        raised
        component={Grid}
        container
        justify="center"
        alignItems="center"
        style={styles.barsContainer}
      >
      </Card>
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
