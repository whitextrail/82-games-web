import React, { useState } from 'react';
import {
  Grid,
  Button,
  Typography,
  MobileStepper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
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
    top: 7.5,
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

  const mobileStepperClasses = makeStyles({
    dotActive: {
      backgroundColor: '#8E44AD',
    }
  })();

  const handleSwipeButtonClick = ({ currentTarget: { id }}) => {
    switch(id) {
      case 'left':
        const decremented = activeStep - 1;
        return updateActiveStep(decremented < 0 ? (teamGameIds.length - 1) : decremented);
      case 'right':
          const incremented = activeStep + 1;
        return updateActiveStep(incremented === teamGameIds.length ? 0 : incremented);
      default:
        return;
    }
  };

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
                <Grid key={id} container justify="space-around" alignItems="center" direction="column" style={{ height: 66 }}>
                  <Typography variant="body1" color="secondary" style={{ fontSize: 14, fontWeight: 600 }}>
                    {`Game ${id} - ${homeTeamName} vs. ${awayTeamName}`}
                  </Typography>
                  <Typography variant="body2" color="secondary" style={{ fontSize: 12 }}>
                    {localGameDateTime}
                  </Typography>
                  <Typography variant="body2" color="secondary" noWrap style={{ fontSize: 12 }}>
                    {arena}
                  </Typography>
                </Grid>
              );
            })
          }
        </SwipeableViews>
        <Button style={{ ...styles.swipeButton, ...styles.leftSwipeIconContainer}}>
          <ArrowLeftSharp id="left" style={styles.swipeIcon} onClick={handleSwipeButtonClick} />
        </Button>
        <Button style={{ ...styles.swipeButton, ...styles.rightSwipeIconContainer}}>
          <ArrowRightSharp id="right" style={styles.swipeIcon} onClick={handleSwipeButtonClick} />
        </Button>
        <MobileStepper
          classes={mobileStepperClasses}
          variant="dots"
          steps={teamGameIds.length}
          position="static"
          activeStep={activeStep}
          style={{ bottom: 2.5, height: 20, width: 100, position: 'absolute', backgroundColor: 'transparent' }}
        />
      </Grid>
    </Grid>
  );
};

export default GamesCarousel;
