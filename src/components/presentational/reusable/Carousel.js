import React, { useState } from 'react';
import {
  Grid,
  Button,
  Typography,
} from '@material-ui/core';
import {
  ArrowLeftSharp,
  ArrowRightSharp,
} from '@material-ui/icons';
import SwipeableViews from 'react-swipeable-views';

const styles = {
  container: {
    height: 96,
    paddingRight: 10,
  },
  carouselContainer: {
    height: 96,
    backgroundColor: 'transparent',
  },
  swipe: {
    width: '100%',
    height: 'auto',
  },
  slide: {
    padding: '0px 10px 0px 10px',
  },
  swipeButton: {
    width: 24,
    minWidth: 24,
    backgroundColor: 'transparent',
    height: '100%',
  },
  leftSwipeIconContainer: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  rightSwipeIconContainer: {
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  swipeIcon: {
    fontSize: 30,
    color: '#EFEFEF',
  },
};

const GamesCarousel = ({
  homeTeamName,
  awayTeamName,
  localGameDateTime,
  arena,
}) => {
  const [activeStep, updateActiveStep] = useState(0);

  return (
    <Grid container direction="column" style={styles.container}>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={styles.carouselContainer}
      >
        <Button style={styles.swipeButton}>
          <ArrowLeftSharp style={styles.swipeIcon} onClick={() => updateActiveStep(activeStep - 1)} />
        </Button>
        <SwipeableViews
          index={activeStep}
          style={styles.swipe}
          slideStyle={styles.slide}
        >
          <Grid container justify="space-around" alignItems="center" direction="column" style={{ height: 76 }}>
            <Typography align="center" variant="body1" color="secondary" style={{ fontSize: 16, fontWeight: 600 }}>
              {`${homeTeamName} vs. ${awayTeamName}`}
            </Typography>
            <Typography align="center" variant="body2" color="secondary">
              {arena}
            </Typography>
            <Typography align="center" variant="body2" color="secondary">
              {localGameDateTime}
            </Typography>
          </Grid>
        </SwipeableViews>
        <Button style={styles.swipeButton}>
          <ArrowRightSharp style={styles.swipeIcon} onClick={() => updateActiveStep(activeStep + 1)} />
        </Button>
      </Grid>
    </Grid>
  );
};

export default GamesCarousel;
