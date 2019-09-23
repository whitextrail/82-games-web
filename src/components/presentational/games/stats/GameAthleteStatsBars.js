import React, { memo } from 'react';
import {
  Grid,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { primaryColor } from '../../../../styles/constants';

const styles = {
  container: {
    width: 230,
  },
  statsBarInnerContainer: {
    height: '100%',
    width: 50,
    position: 'relative',
  },
  statsLabelContainer: {
    bottom: 10,
    position: 'absolute',
    height: 35,
  },
  statsBarTypeLabel: {
    color: '#FFF',
    fontSize: 12,
  },
  statsBarValueLabel: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 600,
  },
  statsBar: {
    height: 25,
    width: 85,
    borderRadius: 3,
    transform: 'rotate(-90deg)',
    border: '5px solid rgba(0,0,0,0.84)',
    position: 'absolute',
    top: 40,
  },
};

const GameAthleteStatsBars = memo(({
  allStatTypes,
  barValuesByStatType,
  athleteStatistics,
}) => {
  const statsBarClasses = makeStyles({
    barColorPrimary: {
      backgroundColor: primaryColor,
    },
    colorPrimary: {
      backgroundColor: 'rgba(255,255,255,0.54)',
    },
  })();

  const statsBarClassStyles = {
    barColorPrimary: statsBarClasses.barColorPrimary,
    colorPrimary: statsBarClasses.colorPrimary,
  };

  return (
    <Grid container justify="center" alignItems="center" style={styles.container}>
      {
        allStatTypes.map((statType) => (
          <Grid
            key={statType}
            container
            justify="center"
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
            <Grid container alignItems="center" direction="column" style={styles.statsLabelContainer}>
              <Typography variant="body2" style={styles.statsBarTypeLabel}>{statType}</Typography>
              <Typography variant="body2" style={styles.statsBarValueLabel}>{athleteStatistics[statType]}</Typography>
            </Grid>
          </Grid>
        ))
      }
    </Grid>
  );
});

export default GameAthleteStatsBars;
