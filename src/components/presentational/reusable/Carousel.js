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
  },
  carouselContainer: {
    height: 96,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  swipe: {
    width: '100%',
    height: 'auto',
    position: 'absolute',
  },
  slide: {
    padding: '0px 10px 0px 10px',
  },
  swipeButton: {
    width: 30,
    minWidth: 30,
    backgroundColor: 'transparent',
    height: '100%',
    position: 'absolute',
  },
  leftSwipeIconContainer: {
    left: 0,
  },
  rightSwipeIconContainer: {
    right: 0,
  },
  swipeIcon: {
    fontSize: 30,
    color: '#FFF',
  },
};

const GamesCarousel = ({
  gameId,
  teamGames,
}) => {
  const teamGameIds = Object.keys(teamGames).sort();
  const [activeStep, updateActiveStep] = useState(teamGameIds.indexOf(`${gameId}`));

  return (
    <Grid container direction="column" style={styles.container}>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={styles.carouselContainer}
      >
        <SwipeableViews
          index={activeStep}
          style={styles.swipe}
          slideStyle={styles.slide}
        >
          {
            teamGameIds.map((id) => {
              const {
                homeTeamName,
                awayTeamName,
                localGameDateTime,
                arena,
              } = teamGames[id];

              return (
                <Grid key={id} container justify="space-around" alignItems="center" direction="column" style={{ height: 76 }}>
                  <Typography align="center" variant="body1" color="secondary" style={{ fontSize: 14, fontWeight: 600 }}>
                    {`Game ${id} - ${homeTeamName} vs. ${awayTeamName}`}
                  </Typography>
                  <Typography align="center" variant="body2" color="secondary" style={{ fontSize: 12 }}>
                    {localGameDateTime}
                  </Typography>
                  <Typography align="center" variant="body2" color="secondary" noWrap style={{ fontSize: 12 }}>
                    {arena}
                  </Typography>
                </Grid>
              );
            })
          }
        </SwipeableViews>
        <Button style={{ ...styles.swipeButton, ...styles.leftSwipeIconContainer}}>
          <ArrowLeftSharp style={styles.swipeIcon} onClick={() => updateActiveStep(activeStep - 1)} />
        </Button>
        <Button style={{ ...styles.swipeButton, ...styles.rightSwipeIconContainer}}>
          <ArrowRightSharp style={styles.swipeIcon} onClick={() => updateActiveStep(activeStep + 1)} />
        </Button>
      </Grid>
    </Grid>
  );
};

export default GamesCarousel;
