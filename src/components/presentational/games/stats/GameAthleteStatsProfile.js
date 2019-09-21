import React, { memo } from 'react';
import {
  Grid,
  CardMedia,
  Typography,
} from '@material-ui/core';
import spencerDinwiddie from '../../../../assets/img/spencer_dinwiddie.png';

const styles = {
  container: {
    height: 150,
    width: 125,
    paddingRight: 15,
  },
  title: {
    fontSize: 12,
    color: '#FFF',
  },
  photoContainer: {
    height: 85,
    width: 85,
    borderRadius: '50%',
    border: '5px solid #8E44AD',
    backgroundColor: 'rgba(0,0,0,0.54)',
    marginTop: 7.5,
  },
  photo: {
    height: 85,
    width: 85,
    borderRadius: '50%',
  },
};

const GameAthleteStatsProfile = memo(() => (
  <Grid container justify="center" alignItems="flex-end" direction="column" style={styles.container}>
    <Typography variant="body2" align="center" style={styles.title}>#8 DINWIDDIE</Typography>
    <Grid
      container
      justify="center"
      alignItems="flex-end"
      style={styles.photoContainer}
    >
      <CardMedia image={spencerDinwiddie} style={styles.photo} />
    </Grid>
  </Grid>
));

export default GameAthleteStatsProfile;
