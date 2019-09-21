import React, { memo } from 'react';
import {
  Grid,
  Card,
} from '@material-ui/core';
import {
  FaceSharp,
  SupervisedUserCircleSharp,
  KeyboardArrowLeftSharp,
} from '@material-ui/icons';
import NavBar from '../../nav/NavBar';
import Carousel from '../../reusable/Carousel';
import Tabs from '../../reusable/Tabs';

const styles = {
  container: {
    height: 152,
  },
  controlsContainer: {
    height: 96,
    width: 375,
    paddingRight: 5,
  },
  tabsContainer: {
    height: 96,
    width: 72,
    borderRadius: 0,
    backgroundColor: '#8E44AD',
  },
  carouselContainer: {
    height: 96,
    width: 288,
    backgroundColor: 'rgba(0,0,0,0.24)',
    borderRadius: 2,
  },
};
const tabsIndicatorProps = {
  style: {
    backgroundColor: '#FFF',
    left: 0,
    width: 3,
  },
};
const iconStyles = { color: '#FFF' };
const navBarStyleClasses = {
  colorDefault: {
    backgroundColor: '#333333',
    color: '#FFF',
  }
};

const GameStatsHeader = memo(({
  navButtonClickHandler,
  game,
  teamGames,
  allStatsTypes,
  selectedStatsType,
  selectStatsType,
}) => (
  <Grid container direction="column" style={styles.container}>
    <NavBar
      elevation={0}
      icon={<KeyboardArrowLeftSharp styles={iconStyles} />}
      styleClasses={navBarStyleClasses}
      iconButtonClickHandler={navButtonClickHandler}
    />
    <Grid
      container
      justify="space-between"
      alignItems="center"
      style={styles.controlsContainer}
    >
      <Card
        raised
        component={Grid}
        container
        justify="center"
        alignItems="center"
        style={styles.tabsContainer}
      >
        <Tabs
          onChange={selectStatsType}
          selectedTabId={selectedStatsType}
          allTabIds={allStatsTypes}
          tabIcons={{
            player: <FaceSharp />,
            teams: <SupervisedUserCircleSharp />,
          }}
          tabIndicatorProps={tabsIndicatorProps}
          orientation="vertical"
        />
      </Card>
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        style={styles.carouselContainer}
      >
        <Carousel gameId={game.id} teamGames={teamGames} />
      </Grid>
    </Grid>
  </Grid>
));

export default GameStatsHeader;

