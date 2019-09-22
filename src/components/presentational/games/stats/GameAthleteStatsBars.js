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
    width: 240,
    paddingTop: 25,
  },
  statsBarContainer: {
    height: 115,
    width: 220,
    paddingBottom: 10,
  },
  statsBarInnerContainer: {
    paddingTop: 5,
    height: 85,
    width: 55,
  },
  statsBarValueLabel: {
    color: '#FFF',
    fontSize: 12,
  },
  statsBar: {
    height: 27,
    width: 85,
    borderRadius: 3,
    transform: 'rotate(-90deg)',
    border: '5px solid rgba(0,0,0,0.84)',
  },
};

const GameAthleteStatsBars = memo(({
  allStatTypes,
  barValuesByStatType,
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
    <Grid container justify="center" alignItems="center" direction="column" style={styles.container}>
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
