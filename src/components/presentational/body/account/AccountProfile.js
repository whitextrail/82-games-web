import React, { memo } from 'react';
import { Grid } from '@material-ui/core';
import background from '../../../../assets/img/background.png';
import Details from './profile/Details';
import Badges from './profile/Badges';
import GameHistory from './profile/GameHistory';

const styles = {
  container: {
    height: '100%',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingTop: 25,
  },
};

const AccountProfile = memo(({
  username,
}) => {
  return (
    <Grid style={styles.container}>
      <Grid container alignItems="center" direction="column" style={styles.overlay}>
        <Details username={username} rankTitle="Pro" />
        <Badges />
        <GameHistory />
      </Grid>
    </Grid>
  );
});

export default AccountProfile;
