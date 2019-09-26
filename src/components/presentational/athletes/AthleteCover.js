import React, { memo } from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import players from '../../../assets/players';

const styles = {
  container: {
    backgroundColor: 'black',
    height: '40vh',
    position: 'relative',
  },
  textContainer: {
    left: 26,
    width: 125,
    height: 65,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  text: {
    fontSize: 24,
    fontWeight: 600,
  },
  img: {
    height: '40vh',
    position: 'absolute',
    right: 0,
  },
};

const AthleteCover = memo(({
  id,
  firstName,
  lastName
}) => {
  const playerSourceId = `${firstName}_${lastName}_${id}`;

  return (
    <Grid container direction="column" style={styles.container}>
      <img src={players[playerSourceId]} style={styles.img} alt={playerSourceId} />
      <Grid container direction="column" style={styles.textContainer}>
        <Typography variant="h5" color="secondary" align="left" style={styles.text}>{firstName.toUpperCase()}</Typography>
        <Typography variant="h5" color="secondary" align="left" style={styles.text}>{lastName.toUpperCase()}</Typography>
      </Grid>
    </Grid>
  );
});

export default AthleteCover;
