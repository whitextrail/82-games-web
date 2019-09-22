import React, { memo } from 'react';
import {
  Grid,
  CardMedia,
} from '@material-ui/core';
import { AllInclusiveSharp } from '@material-ui/icons';
import * as svg from '../../../../assets/svg/index';

const styles = {
  container: {
    height: 140,
  },
  innerContainer: {
    height: 110,
  },
  teamImage: {
    height: 110,
    width: 110,
  },
  icon: {
    width: 50,
    color: '#FFF',
  },
};

const GameListItemTeams = memo(({
  homeTeam,
  awayTeam,
}) => {
  const homeTeamImage = svg[`${homeTeam.name.split(' ').join('_')}_${homeTeam.id}`];
  const awayTeamImage = svg[`${awayTeam.name.split(' ').join('_')}_${awayTeam.id}`];

  return !!(homeTeamImage && awayTeamImage) && (
    <Grid container justify="center" style={styles.container}>
      <Grid container justify="center" alignItems="center" style={styles.innerContainer}>
        <CardMedia style={styles.teamImage} image={homeTeamImage} />
        <AllInclusiveSharp style={styles.icon} />
        <CardMedia style={styles.teamImage} image={awayTeamImage} />
      </Grid>
    </Grid>
  );
});

export default GameListItemTeams;
