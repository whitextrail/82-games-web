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
    paddingRight: 5,
  },
  title: {
    fontSize: 12,
    color: '#FFF',
  },
  photoContainer: {
    height: 95,
    width: 95,
    borderRadius: '50%',
    border: '5px solid #333',
    backgroundColor: 'transparent'
  },
  photo: {
    height: 85,
    width: 85,
    borderRadius: '50%',
    border: '3px solid #FFF',
    backgroundColor: '#000',
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
    </Card>
  </Grid>
));

export default GameAthleteStatsProfile;
