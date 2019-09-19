import React, { memo } from 'react';
import {
  Grid,
  Card,
  Fab,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import { HelpOutlineSharp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { prizeImages } from '../../../../assets/img';

const styles = {
  container: {
    height: 100,
    width: 355,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  linearProgress: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    borderRadius: 5,
  },
  headerTextContainer: {
    height: 26,
    position: 'absolute',
    top: 0,
    paddingTop: 4,
    paddingRight: 4,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 600
  },
  prizesContainer: {
    position: 'absolute',
    width: '100%',
    paddingTop: 25,
  },
  prizeContainer: {
    height: 65,
    width: 85,
  },
  prizeFab: {
    height: 30,
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
      backgroundColor: 'rgba(0,0,0,0.54)',
    },
    colorPrimary: {
      backgroundColor: '#8E44AD',
    },
  })();

  // 2880 = 48 minutes (total NBA game time) in seconds
  const countdownCompletion = 100 - ((remainingGameTime / 2880) * 100);

  return (
    <Card
      raised
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
        value={75}
        style={styles.linearProgress}
        classes={countdownClasses}
      />
      <Grid
        container
        justify="flex-end"
        style={styles.headerTextContainer}
      >
        <HelpOutlineSharp />
      </Grid>
      <Grid container justify="center" alignItems="center" style={styles.prizesContainer}>
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
            const periodStyles = periodOver
              ? ({
                  textDecoration: 'line-through',
                  fontStyle: 'italic',
                })
              : ({
                  color: '#FFF',
                  fontWeight: 600,
                });
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
    </Card>
  );
});

export default GamePrizes;
