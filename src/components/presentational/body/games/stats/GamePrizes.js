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
  prizeIcon: {
    backgroundColor: 'black',
    height: 36,
    width: 70,
  },
  prizeQuantity: {
    fontSize: 10,
    marginRight: 5,
  },
};

const GameStats = memo(() => {
  const prizeBarClasses = makeStyles({
    barColorPrimary: {
      backgroundColor: 'rgba(255,255,255,0.24)',
    },
    colorPrimary: {
      backgroundColor: '#F1C40F',
    },
  })();

  const linearProgressClasses = {
    barColorPrimary: prizeBarClasses.barColorPrimary,
    colorPrimary: prizeBarClasses.colorPrimary,
  };

  const prizes = [{
    iconSrc: wristIcon,
    iconStyle: { height: 20 },
    iconAlt: 'wristband',
    quantity: 50,
    text: '1st',
  }, {
    iconSrc: shirtIcon,
    iconStyle: { height: 17.5 },
    iconAlt: 'shirt',
    quantity: 25,
    text: '2nd',
  }, {
    iconSrc: basketballIcon,
    iconStyle: { height: 15 },
    iconAlt: 'basketball',
    quantity: 5,
    text: '3rd',
  }, {
    iconSrc: sneakerIcon,
    iconStyle: { height: 22.5 },
    iconAlt: 'sneaker',
    quantity: 1,
    text: '4th',
  }];

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
        value={100}
        style={styles.linearProgress}
        classes={linearProgressClasses}
      />
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{
          height: 40,
          position: 'absolute',
          top: 0,
        }}
      >
        <Typography variant="body1" color="secondary" style={styles.headerText}>
          GAME COUNTDOWN
        </Typography>
      </Grid>
      <Grid container alignItems="center" style={styles.prizesContainer}>
        {
          prizes.map(({
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
              style={styles.prizeContainer}
            >
              <Fab variant="extended" style={styles.prizeIcon}>
                <Typography variant="body1" style={styles.prizeQuantity}>{quantity}x</Typography>
                <img src={iconSrc} style={iconStyle} alt={iconAlt} />
              </Fab>
              <Typography variant="body2" style={{ textDecoration: 'line-through' }}>
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
