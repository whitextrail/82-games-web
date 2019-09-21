import React, { memo } from 'react';
import {
  Grid,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const styles = {
  container: {
    width: 240,
  },
  legendContainer: {
    height: 45,
  },
  legendColorIndicator: {
    height: 15,
    width: 15,
    borderRadius: 3,
    marginRight: 7.5,
  },
  legendColorIndicatorCurrent: {
    backgroundColor: '#8E44AD',
  },
  legendColorIndicatorPast: {
    marginLeft: 10,
    backgroundColor: 'rgba(0,0,0,0.54)',
  },
  legendLabel: { color: '#FFF', fontSize: 12 },
  statsBarContainer: {
    height: 120,
    width: 220,
    paddingBottom: 10,
  },
  statsBarInnerContainer: {
    height: 75,
    width: 50,
  },
  statsBarValueLabel: {
    color: '#FFF',
    fontSize: 12,
  },
  statsBar: {
    height: 20,
    width: 80,
    borderRadius: 3,
    transform: 'rotate(-90deg)',
  },
};

const StatsBarLegend = memo(() => (
  <Grid container justify="center" alignItems="center" style={styles.legendContainer}>
    <Grid style={{ ...styles.legendColorIndicator, ...styles.legendColorIndicatorCurrent }} />
    <Typography variant="body2" style={styles.legendLabel}>CURRENT</Typography>
    <Grid style={{ ...styles.legendColorIndicator, ...styles.legendColorIndicatorPast }} />
    <Typography variant="body2" style={styles.legendLabel}>PAST</Typography>
  </Grid>
));

const GameAthleteStatsBars = memo(({
  allStatTypes,
  barValuesByStatType,
}) => {
  const statsBarClasses = makeStyles({
    barColorPrimary: {
      backgroundColor: '#8E44AD',
    },
    colorPrimary: {
      backgroundColor: 'rgba(0,0,0,0.54)',
    },
  })();

  const statsBarClassStyles = {
    barColorPrimary: statsBarClasses.barColorPrimary,
    colorPrimary: statsBarClasses.colorPrimary,
  };

  return (
    <Grid container justify="center" alignItems="center" direction="column" style={styles.container}>
      <StatsBarLegend />
      <Grid container justify="space-between" alignItems="flex-end" style={styles.statsBarContainer}>
        {
          allStatTypes.map((statType) => (
            <Grid
              key={statType}
              container
              justify="space-between"
              alignItems="center"
              direction="column"
              style={styles.statsBarInnerContainer}
            >
              <LinearProgress
                color="primary"
                classes={statsBarClassStyles}
                variant="determinate"
                value={barValuesByStatType[statType]}
                style={styles.statsBar}
              />
              <Typography variant="body2" style={styles.statsBarValueLabel}>{statType}</Typography>
            </Grid>
          ))
        }
      </Grid>
    </Grid>
  );
});

export default GameAthleteStatsBars;
