import React, { memo } from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import { teamColors } from '../../../../../styles/constants';

const styles = {
  container: {
    width: 345,
    height: 200,
    paddingTop: 10,
  },
  statsRow: {
    height: 75,
    paddingTop: 10,
  },
  topStatsContainer: {
    width: 100,
    height: 55,
  },
  statsContainer: {
    height: 40,
  },
  text: {
    fontSize: 18,
    fontWeight: 600,
  },
  bottomStatsContainer: {
    width: 100,
    height: 55,
  },
  type: {
    fontSize: 16,
  },
  separator: {
    fontSize: 18,
    marginLeft: 3,
    marginRight: 3,
    fontWeight: 400,
  },
};

const GameTeamStatsBreakdown = memo(({
  homeTeamId,
  awayTeamId,
  homeTeamStatistics,
  awayTeamStatistics,
}) => {
  const topStatsTypes = ['PTS', 'REB', 'AST'];
  const bottomStatsTypes = ['FG_PCT', 'FT_PCT', 'FG3_PCT'];
  const homeStatStyles = {
    ...styles.text,
    color: teamColors[homeTeamId].primary.hex,
  };
  const awayStatStyles = {
    ...styles.text,
    color: teamColors[awayTeamId].primary.hex,
  };

  return (
    <Grid container justify="flex-start" alignItems="center" direction="column" style={styles.container}>
      <Typography variant="body1" color="secondary">Stats Breakdown</Typography>
      <Grid container justify="space-around" alignItems="flex-start" style={styles.statsRow}>
        {
          topStatsTypes.map(type => (
            <Grid key={type} container justify="space-between" alignItems="center" direction="column" style={styles.topStatsContainer}>
              <Grid container justify="center" alignItems="center" style={styles.statsContainer}>
                <Typography variant="body2" color="secondary" style={homeStatStyles}>{homeTeamStatistics[type]}</Typography>
                <Typography variant="body2" color="secondary" style={styles.separator}>-</Typography>
                <Typography variant="body2" color="secondary" style={awayStatStyles}>{awayTeamStatistics[type]}</Typography>
              </Grid>
              <Typography variant="body2" color="secondary" style={styles.type}>{type}</Typography>
            </Grid>
          ))
        }
      </Grid>
      <Grid container justify="space-around" alignItems="flex-start" style={styles.statsRow}>
        {
          bottomStatsTypes.map((type) => {
            const parsedHomeStat = parseFloat(homeTeamStatistics[type]).toFixed(2);
            const parsedAwayStat = parseFloat(awayTeamStatistics[type]).toFixed(2);
            const formattedType = `${type.split('_')[0]}%`;

            return (
              <Grid key={type} container justify="space-between" alignItems="center" direction="column" style={styles.bottomStatsContainer}>
                <Grid container justify="center" alignItems="center" style={styles.statsContainer}>
                  <Typography variant="body2" color="secondary" style={homeStatStyles}>{parsedHomeStat}</Typography>
                  <Typography variant="body2" color="secondary" style={styles.separator}>-</Typography>
                  <Typography variant="body2" color="secondary" style={awayStatStyles}>{parsedAwayStat}</Typography>
                </Grid>
                <Typography variant="body2" color="secondary" style={styles.type}>{formattedType}</Typography>
              </Grid>
            );
          })
        }
      </Grid>
    </Grid>
  );
});

export default GameTeamStatsBreakdown;
