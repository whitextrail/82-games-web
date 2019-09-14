import React, { memo } from 'react';
import {
  Grid,
  Paper,
  Fab,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import sneakerIcon from '../../../../../assets/img/sneaker.png';
import shirtIcon from '../../../../../assets/img/shirt.png';
import wristIcon from '../../../../../assets/img/wrist.png';
import basketballIcon from '../../../../../assets/img/basketball.png';

const styles = {
  gamePrizesContainer: {
    marginTop: 15,
    height: 80,
    borderRadius: 5,
    width: 350,
    position: 'relative',
  },
  gamePrizesCountdown: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    borderRadius: 5,
  },
  gamePrizesByQuarterContainer: {
    position: 'absolute',
  },
  gamePrizeContainer: {
    height: 65
  },
  gamePrizeIcon: {
    backgroundColor: 'white',
    height: 36,
    width: 36,
  },
  quarter: {
    fontWeight: 600,
  },
};

const GameStats = memo(() => {
  const prizeBarClasses = makeStyles({
    barColorPrimary: {
      backgroundColor: '#9B59B6',
    },
    colorPrimary: {
      backgroundColor: '#8E44AD',
    },
  })();

  const gamePrizesCountdownClassStyles = {
    barColorPrimary: prizeBarClasses.barColorPrimary,
    colorPrimary: prizeBarClasses.colorPrimary,
  };

  const gamePrizesByQuarter = [{
    iconSrc: basketballIcon,
    iconStyle: { height: 15 },
    iconAlt: 'basketball',
    text: 'Q1',
  }, {
    iconSrc: wristIcon,
    iconStyle: { height: 20 },
    iconAlt: 'wristband',
    text: 'Q2',
  }, {
    iconSrc: shirtIcon,
    iconStyle: { height: 17.5 },
    iconAlt: 'shirt',
    text: 'Q3',
  }, {
    iconSrc: sneakerIcon,
    iconStyle: { height: 22.5 },
    iconAlt: 'sneaker',
    text: 'Q4',
  }];

  return (
    <Paper
      component={Grid}
      container
      justify="space-around"
      alignItems="center"
      direction="column"
      style={styles.gamePrizesContainer}
    >
      <LinearProgress
        color="primary"
        variant="determinate"
        value={15}
        style={styles.gamePrizesCountdown}
        classes={gamePrizesCountdownClassStyles}
      />
      <Grid container alignItems="center" style={styles.gamePrizesByQuarterContainer}>
        {
          gamePrizesByQuarter.map(({
            iconSrc,
            iconStyle,
            text,
          }) => (
            <Grid
              key={text}
              container
              justify="space-around"
              alignItems="center"
              direction="column"
              style={styles.gamePrizeContainer}
            >
              <Fab style={styles.gamePrizeIcon}>
                <img src={iconSrc} style={iconStyle} alt="basketball" />
              </Fab>
              <Typography variant="body2" color="secondary" style={styles.quarter}>
                {text}
              </Typography>
            </Grid>
          ))
        }
      </Grid>
    </Paper>
  );
});

export default GameStats;
