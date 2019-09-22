import React, { memo } from 'react';
import {
  Grid,
  Card,
  CardMedia,
} from '@material-ui/core';
import spencerDinwiddie from '../../../../assets/img/spencer_dinwiddie.png';

const styles = {
  container: {
    height: 125,
    width: 125,
    paddingRight: 2.5,
  },
  title: {
    fontSize: 12,
    color: '#FFF',
  },
  photoContainer: {
    height: 100,
    width: 100,
    borderRadius: '50%',
    border: '5px solid rgba(0,0,0,0.9)',
    backgroundColor: 'rgba(255,255,255,0.74)',
  },
  photo: {
    height: 90,
    width: 90,
    borderRadius: '50%',
  },
};

const GameAthleteStatsProfile = memo(() => (
  <Grid container justify="center" alignItems="flex-end" direction="column" style={styles.container}>
    <Card
      raised
      component={Grid}
      container
      justify="center"
      alignItems="flex-end"
      style={styles.photoContainer}
    >
      <CardMedia image={spencerDinwiddie} style={styles.photo} />
    </Card>
  </Grid>
));

export default GameAthleteStatsProfile;
