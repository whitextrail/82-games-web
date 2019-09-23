import React, { memo } from 'react';
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
import { sortNumbersAscending } from '../../../util';
import { primaryColor } from '../../../styles/constants';

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
    width: 40,
    minWidth: 40,
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

const GamesCarousel = memo(({
  athleteGames,
  selectedAthleteGameId,
  changeAthleteGameId,
}) => {
  const athleteGameIds = sortNumbersAscending(Object.keys(athleteGames));
  const athleteGameIdIndex = athleteGameIds.indexOf(`${selectedAthleteGameId}`);

  const mobileStepperClasses = makeStyles({
    dotActive: {
      backgroundColor: primaryColor,
    }
  })();

  const handleSwipeButtonClick = ({ currentTarget: { id }}) => {
    let gameIndex;

    switch(id) {
      case 'left':
        const decremented = athleteGameIdIndex - 1;
        gameIndex = decremented >= 0 ? decremented : (athleteGameIds.length - 1);
        break;
      case 'right':
        const incremented = athleteGameIdIndex + 1;
        gameIndex = incremented <= (athleteGameIds.length - 1) ? incremented : 0;
        break;
      default:
        break;
    }

    return changeAthleteGameId(athleteGameIds[gameIndex]);
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
          index={athleteGameIdIndex}
          style={styles.swipe}
          slideStyle={styles.slide}
        >
          {
            athleteGameIds.map((id) => {
              const {
                homeTeamName,
                awayTeamName,
                localGameDateTime,
                arena,
              } = athleteGames[id];

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
          steps={athleteGameIds.length}
          position="static"
          activeStep={athleteGameIdIndex}
          style={{ bottom: 2.5, height: 20, position: 'absolute', backgroundColor: 'transparent' }}
        />
      </Grid>
    </Grid>
  );
});

export default GamesCarousel;
