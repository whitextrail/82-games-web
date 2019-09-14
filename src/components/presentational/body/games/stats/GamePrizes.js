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
    height: 115,
    width: 350,
    position: 'relative',
    backgroundColor: 'transparent',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  gamePrizesCountdown: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  gamePrizesByQuarterContainer: {
    position: 'absolute',
    top: 15,
  },
  gamePrizeContainer: {
    height: 70
  },
  gamePrizeIcon: {
    backgroundColor: 'white',
    height: 36,
    width: 70,
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
    iconSrc: wristIcon,
    iconStyle: { height: 20 },
    iconAlt: 'wristband',
    quantity: 50,
    text: 'Q1',
  }, {
    iconSrc: shirtIcon,
    iconStyle: { height: 17.5 },
    iconAlt: 'shirt',
    quantity: 25,
    text: 'Q2',
  }, {
    iconSrc: basketballIcon,
    iconStyle: { height: 15 },
    iconAlt: 'basketball',
    quantity: 5,
    text: 'Q3',
  }, {
    iconSrc: sneakerIcon,
    iconStyle: { height: 22.5 },
    iconAlt: 'sneaker',
    quantity: 1,
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
      <Grid
          component={Grid}
          container
          justify="center"
          alignItems="center"
          style={{
            height: 40,
            position: 'absolute',
            top: 0,
          }}
      >
        <Typography variant="body1" color="secondary" style={{ fontSize: 16, fontWeight: 600 }}>
          Game Countdown
        </Typography>
      </Grid>
      <Grid container alignItems="center" style={styles.gamePrizesByQuarterContainer}>
        {
          gamePrizesByQuarter.map(({
            iconSrc,
            iconStyle,
            iconAlt,
            quantity,
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
              <Fab variant="extended" style={styles.gamePrizeIcon}>
                <Typography variant="body1" style={{ fontSize: 10, marginRight: 5 }}>{quantity}x</Typography>
                <img src={iconSrc} style={iconStyle} alt={iconAlt} />
              </Fab>
              <Typography variant="body2" color="secondary">
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
