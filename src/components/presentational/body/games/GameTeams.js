import React, { memo } from 'react';
import {
  Grid,
  Typography,
  CardMedia,
} from '@material-ui/core';
import {
  HomeSharp,
  AirplanemodeActiveSharp,
} from '@material-ui/icons';
import * as svg from '../../../../assets/svg/index';

const styles = {
  container: {
    height: '75%',
  },
  teamImage: {
    marginBottom: 10,
    height: 100,
    width: 100,
  },
  typographyContainer: {
    width: 50,
    height: 100,
  },
};

const Team = memo(({
  name,
  wins = 0,
  losses = 0,
}) => (
  <Grid container justify="center" alignItems="center" direction="column">
    <CardMedia style={styles.teamImage} image={svg[name]} />
    <Typography variant="body2">{`${wins} / ${losses}`}</Typography>
  </Grid>
));

const GameTeams = memo(({
  homeTeamName,
  awayTeamName,
  homeTeamId,
  awayTeamId,
}) => {
  const homeName = `${homeTeamName.split(' ').join('_')}_${homeTeamId}`;
  const awayName = `${awayTeamName.split(' ').join('_')}_${awayTeamId}`;
  const isHome = homeTeamId === 1;

  return (
    <Grid container alignItems="center" style={styles.container}>
      <Team name={isHome ? homeName : awayName} />
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center"
        style={styles.typographyContainer}
      >
        <Typography variant="body2">{isHome ? 'HOME' : 'AWAY' }</Typography>
        { isHome ? <HomeSharp /> : <AirplanemodeActiveSharp style={{ transform: `rotate(90deg)` }} /> }
        <Typography variant="body2">GAME</Typography>
      </Grid>
      <Team name={isHome ? awayName : homeName} />
    </Grid>
  );
});

export default GameTeams;
