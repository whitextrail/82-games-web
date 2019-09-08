import React, { memo } from 'react';
import {
  Grid,
  Avatar,
  Typography,
} from '@material-ui/core';
import avatar from '../../../../../assets/img/avatar.png';

const styles = {
  userDetailsContainer: {
    height: 185,
  },
  userAvatar: {
    height: 125,
    width: 125,
  },
  userDetails: {
    height: 50,
  },
  username: {
    fontWeight: 600,
  },
};

const Details = memo(({
  username,
  rankTitle,
}) => (
  <Grid
    container
    justify="space-around"
    alignItems="center"
    direction="column"
    style={styles.userDetailsContainer}
  >
    <Avatar src={avatar} style={styles.userAvatar} />
    <Grid container justify="center" alignItems="center" direction="column" style={styles.userDetails} >
      <Typography variant="body1" color="secondary" style={styles.username}>
        { username }
      </Typography>
      <Typography variant="body2" color="secondary">
        { rankTitle }
      </Typography>
    </Grid>
  </Grid>
));

export default Details;
