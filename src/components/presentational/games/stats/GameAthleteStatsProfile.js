import React, { memo } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  Typography,
} from '@material-ui/core';
import spencerDinwiddie from '../../../../assets/img/spencer_dinwiddie.png';

const styles = {
  container: {
    height: 150,
    width: 125,
  },
  title: {
    fontSize: 12,
    color: '#FFF',
  },
  photoContainer: {
    height: 110,
    width: 110,
    position: 'relative',
    borderRadius: 5,
    background: 'linear-gradient(333deg, rgba(89,43,108,1) 0%, rgba(142,68,173,1) 100%)',
  },
  photo: {
    height: 80,
    width: 80,
    top: 17.5,
    borderRadius: '50%',
    border: '5px solid rgba(0,0,0,0.94)',
    backgroundColor: '#FFF',
    position: 'absolute',
  },
  playerNumber: {
    position: 'absolute',
    left: 7.5,
    top: 2.5,
    color: '#FFF',
  },
};

const GameAthleteStatsProfile = memo(() => (
  <Grid container justify="center" alignItems="flex-end" direction="column" style={styles.container}>
    <Card
      raised
      component={Grid}
      container
      justify="center"
      alignItems="center"
      style={styles.photoContainer}
    >
      <CardMedia image={spencerDinwiddie} style={styles.photo} />
      <Typography variant="body2" style={styles.playerNumber}>#8</Typography>
    </Card>
  </Grid>
));

export default GameAthleteStatsProfile;
