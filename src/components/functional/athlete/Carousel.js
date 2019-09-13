import React, { useState } from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@material-ui/icons';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
import CarouselItem from './CarouselItem';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const styles = {
  container: {
    height: 185,
    marginTop: 10,
    marginBottom: 20,
  },
  headerContainer: {
    paddingLeft: 10,
    height: 40,
  },
  header: {
    fontWeight: 600,
    fontSize: 14,
  },
  carouselContainer: {
    height: 145,
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'relative',
  },
  swipeContainer: {
    width: '100%',
    height: 'auto',
    position: 'absolute',
  },
  swipe: {
    padding: '0px 60px 0px 60px',
  },
  slide: {
    padding: '0px 10px 0px 10px',
  },
  swipeIconContainer: {
    width: 50,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  leftSwipeIconContainer: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    left: 0,
  },
  rightSwipeIconContainer: {
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    right: 0,
  },
  swipeIcon: {
    fontSize: 36,
    color: '#EFEFEF',
  },
};

const slideRenderer = (params) => {
  const { index, key } = params;

  switch (mod(index, 3)) {
    case 0:
      return (
        <CarouselItem
          key={key}
          gameNumber={1}
          seasonTag="PRE-SEASON"
          seasonYear="19-20"
          gameOutcome={null}
          gamePoints={null}
          homeTeam={{
            name: 'Brooklyn',
            id: 1,
          }}
          awayTeam={{
            name: 'Franca',
            id: 2,
          }}
          isHome
        />
      );

    case 1:
      return (
        <CarouselItem
          key={key}
          gameNumber={1}
          seasonTag="PRE-SEASON"
          seasonYear="19-20"
          gameOutcome={null}
          gamePoints={null}
          homeTeam={{
            name: 'Brooklyn',
            id: 1,
          }}
          awayTeam={{
            name: 'Franca',
            id: 2,
          }}
          isHome
        />
      );

    case 2:
      return (
        <CarouselItem
          key={key}
          gameNumber={1}
          seasonTag="SEASON"
          seasonYear="18-19"
          gameOutcome="W"
          gamePoints="113-94"
          homeTeam={{
            name: 'Brooklyn',
            id: 1,
          }}
          awayTeam={{
            name: 'Miami',
            id: 21,
          }}
          isHome
        />
      );

    default:
      return null;
  }
};

const GamesCarousel = () => {
  const [activeStep, updateActiveStep] = useState(0);

  return (
    <Grid container direction="column" style={styles.container}>
      <Grid container justify="center" alignItems="center" style={styles.headerContainer}>
        <Typography variant="body2" color="secondary" style={styles.header}>UPCOMING</Typography>
      </Grid>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={styles.carouselContainer}
      >
        <Grid container justify="center" alignItems="center" style={styles.swipeContainer}>
          <VirtualizeSwipeableViews
            index={activeStep}
            style={styles.swipe}
            slideStyle={styles.slide}
            slideRenderer={slideRenderer}
          />
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{
            ...styles.leftSwipeIconContainer,
            ...styles.swipeIconContainer,
          }}
        >
          <KeyboardArrowLeft style={styles.swipeIcon} onClick={() => updateActiveStep(activeStep - 1)} />
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{
            ...styles.rightSwipeIconContainer,
            ...styles.swipeIconContainer,
          }}
        >
          <KeyboardArrowRight style={styles.swipeIcon} onClick={() => updateActiveStep(activeStep + 1)} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GamesCarousel;
