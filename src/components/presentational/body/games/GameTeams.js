import React, { memo } from 'react';
import {
  Grid,
  Typography,
  CardMedia,
} from '@material-ui/core';
import nets from '../../../../assets/img/nets.png';
import pacers from '../../../../assets/img/pacers.png';
import { primaryTextColor } from '../../../../styles/constants';

const styles = {
  container: {
    height: '75%',
  },
  teamImage: {
    marginTop: 5,
    marginBottom: 10,
    height: 110,
    width: 110,
  },
  typographyContainer: {
    width: 50,
  },
  typography: {
    fontWeight: 500,
    color: primaryTextColor,
  },
};

const teams = {
  brooklyn: {
    image: nets,
  },
  indiana: {
    image: pacers,
  }
};

const Team = memo(({
  name,
  wins,
  losses,
}) => (
  <Grid container justify="center" alignItems="center" direction="column">
    <CardMedia style={styles.teamImage} image={teams[name].image} />
    <Typography>{`${wins} W - ${losses} L`}</Typography>
  </Grid>
));

const GameTeams = memo(() => (
  <Grid container justify="center" alignItems="center" style={styles.container}>
    <Team name="brooklyn" wins={0} losses={0} />
    <Grid container alignItems="center" style={styles.typographyContainer}>
      <Typography align="center" style={styles.typography}>V.S.</Typography>
    </Grid>
    <Team name="indiana" wins={0} losses={0} />
  </Grid>
));

export default GameTeams;
