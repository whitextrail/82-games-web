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
import { primaryColor } from '../../../../styles/constants';

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
  navigateButton: {
    width: 40,
    minWidth: 40,
    backgroundColor: 'transparent',
    height: '100%',
    position: 'absolute',
  },
  leftNavigateIconContainer: {
    left: 0,
  },
  rightNavigateIconContainer: {
    right: 0,
  },
  navigateIcon: {
    fontSize: 30,
    color: '#FFF',
  },
  carouselStepper: {
    bottom: 2.5,
    height: 20,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
};

const GameStatsHeaderCarousel = memo(({
  gamesById,
  allGameStatsIds,
  selectedGameStatsId,
  changeSelectedGameStatsId,
}) => {
  const indexOfSelectedGameStatsId = allGameStatsIds.indexOf(selectedGameStatsId);
  const mobileStepperClasses = makeStyles({ dotActive: { backgroundColor: primaryColor } })();

  const navigateLeft = () => {
    const leftItemIndex = indexOfSelectedGameStatsId - 1;
    const gameStatsId = allGameStatsIds[(leftItemIndex > 0) ? leftItemIndex : allGameStatsIds.length - 1];

    return changeSelectedGameStatsId(gameStatsId);
  };

  const navigateRight = () => {
    const rightItemIndex = indexOfSelectedGameStatsId - 1;
    const gameStatsId = allGameStatsIds[(rightItemIndex < allGameStatsIds.length) ? rightItemIndex : 0];

    return changeSelectedGameStatsId(gameStatsId);
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
          index={indexOfSelectedGameStatsId}
          style={styles.swipe}
          slideStyle={styles.slide}
        >
          {
            allGameStatsIds.map((id) => {
              const {
                arena,
                gameNumber,
                localGameDateTime,
              } = gamesById[id];

              return (
                <Grid key={`gameStats-${id}`} container justify="space-around" alignItems="center" direction="column" style={{ height: 66 }}>
                  <Typography variant="body1" color="secondary" style={{ fontSize: 14, fontWeight: 600 }}>
                    {`Game ${gameNumber}`}
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
        <Button style={{ ...styles.navigateButton, ...styles.leftNavigateIconContainer}}>
          <ArrowLeftSharp id="left" style={styles.navigateIcon} onClick={navigateLeft} />
        </Button>
        <Button style={{ ...styles.navigateButton, ...styles.rightNavigateIconContainer}}>
          <ArrowRightSharp id="right" style={styles.navigateIcon} onClick={navigateRight} />
        </Button>
        <MobileStepper
          variant="dots"
          position="static"
          steps={allGameStatsIds.length}
          activeStep={indexOfSelectedGameStatsId}
          style={styles.carouselStepper}
          classes={mobileStepperClasses}
        />
      </Grid>
    </Grid>
  );
});

export default GameStatsHeaderCarousel;

