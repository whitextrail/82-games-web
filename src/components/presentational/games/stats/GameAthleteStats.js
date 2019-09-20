import React, { memo } from 'react';
import {
  Grid,
  Card,
} from '@material-ui/core';
import {
  FaceSharp,
  SupervisedUserCircleSharp,
} from '@material-ui/icons';
import Tabs from '../../../presentational/reusable/Tabs';
import Carousel from '../../../presentational/reusable/Carousel';

const styles = {
  container: {
    height: 96,
    width: 375,
  },
};

const GameAthleteStats = memo(({
  game,
  homeTeam,
  awayTeam,
}) => (
  <Grid
    container
    justify="space-between"
    alignItems="center"
    style={styles.container}
  >
    <Card
      raised
      component={Grid}
      container
      justify="center"
      alignItems="center"
      style={{ height: 96, width: 72, backgroundColor: '#333333' }}
    >
      <Tabs
        selectedTabId={'player'}
        onChange={null}
        allTabIds={['player', 'teams']}
        tabIcons={{
          player: <FaceSharp />,
          teams: <SupervisedUserCircleSharp />,
        }}
        tabIndicatorProps={{
          style: {
            backgroundColor: '#FFF'
          }
        }}
        orientation="vertical"
      />
    </Card>
    <Grid
      container
      justify="flex-start"
      alignItems="center"
      style={{ height: 96, width: 288 }}
    >
      <Carousel
        id={game.id}
        season={game.season}
        homeTeamName={homeTeam.name}
        awayTeamName={awayTeam.name}
        localGameDateTime={game.localGameDateTime}
        arena={game.arena}
      />
    </Grid>
  </Grid>
));

export default GameAthleteStats;
