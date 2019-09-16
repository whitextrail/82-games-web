import React, { memo } from 'react';
import {
  Grid,
  Paper,
  Fab,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { prizeImages } from '../../../../../assets/img';

const styles = {
  container: {
    height: 115,
    width: 355,
    position: 'relative',
    backgroundColor: 'transparent',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  linearProgress: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  headerTextContainer: {
    height: 40,
    position: 'absolute',
    top: 0,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 600
  },
  prizesContainer: {
    position: 'absolute',
    top: 15,
    width: 340,
  },
  prizeContainer: {
    height: 65,
    width: 85,
  },
  prizeFab: {
    height: 36,
    width: 70,
  },
  prizeImage: {
    wristband: { height: 20 },
    shirt: { height: 17.5 },
    basketball: { height: 15 },
    sneakers: { height: 22.5 },
  },
  prizeQuantity: {
    fontSize: 10,
    marginRight: 5,
  },
};

const GamePrizes = memo(({
  byPeriod,
  allPeriods,
  remainingGameTime,
}) => {
  const countdownClasses = makeStyles({
    barColorPrimary: {
      backgroundColor: 'rgba(255,255,255,0.24)',
    },
    colorPrimary: {
      backgroundColor: '#F1C40F',
    },
  })();

  // 2880 = 48 minutes (total NBA game time) in seconds
  const countdownCompletion = 100 - ((remainingGameTime / 2880) * 100);

  return (
    <Paper
      component={Grid}
      container
      justify="center"
      alignItems="center"
      direction="column"
      style={styles.container}
    >
      <LinearProgress
        color="primary"
        variant="determinate"
        value={countdownCompletion}
        style={styles.linearProgress}
        classes={countdownClasses}
      />
      <Grid
        container
        justify="center"
        alignItems="center"
        style={styles.headerTextContainer}
      >
        <Typography variant="body1" color="secondary" style={styles.headerText}>
          GAME COUNTDOWN
        </Typography>
      </Grid>
      <Grid container alignItems="center" style={styles.prizesContainer}>
        {
          allPeriods.map((period) => {
            const {
              period: periodNumber,
              prize: {
                name: prizeName,
                quantity: prizeQuantity,
              }
            } = byPeriod[period];

            // Each game has 4 periods (essentially, quarters) so we can check if a period is over by
            // comparing the countdownCompletion against the period number * 25 (1/4th of 100)
            const periodOver = countdownCompletion >= (periodNumber * 25);
            const periodStyles = periodOver ? { textDecoration: 'line-through' } : {};
            const prizeFabStyles = {
              ...styles.prizeFab,
              backgroundColor: periodOver ? '#333' : '#FFF',
            };

            return (
              <Grid
                key={periodNumber}
                container
                justify="space-around"
                alignItems="center"
                direction="column"
                style={styles.prizeContainer}
              >
                <Fab variant="extended" style={prizeFabStyles}>
                  <Typography variant="body1" style={styles.prizeQuantity}>
                    {`${prizeQuantity}x`}
                  </Typography>
                  <img
                    src={prizeImages[prizeName]}
                    style={styles.prizeImage[prizeName]}
                    alt={prizeName}
                  />
                </Fab>
                <Typography variant="body2" style={periodStyles}>
                  {period}
                </Typography>
              </Grid>
            );
          })
        }
      </Grid>
    </Paper>
  );
});

export default GamePrizes;
