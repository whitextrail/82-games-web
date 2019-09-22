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
  photoContainer: {
    height: 110,
    width: 110,
    position: 'relative',
    borderRadius: 5,
    border: '5px solid rgba(0,0,0,0.84)',
    backgroundColor: 'transparent',
  },
  photo: {
    height: 100,
    width: 100,
    border: '5px solid #000',
    backgroundColor: '#000',
    position: 'absolute',
  },
  playerNumber: {
    position: 'absolute',
    left: 5,
    top: 0,
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
