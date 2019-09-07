import React, { memo } from 'react';
import {
  Grid,
  Typography,
  Button,
} from '@material-ui/core';
import { EqualizerSharp } from '@material-ui/icons';
import trophy from '../../../../../assets/svg/trophy.svg';

const styles = {
  userBadgesContainer: {
    height: 60,
    width: 230,
  },
  userBadge: {
    width: 110,
    borderRadius: '30px',
  },
  userRankBadgeIcon: {
    color: '#0060ff',
  },
  userBadgeIcon: {
    marginLeft: 5,
    marginRight: -5,
  },
};

const Badges = memo(() => (
  <Grid container justify="space-between" alignItems="center" style={styles.userBadgesContainer}>
    <Button variant="contained" size="large" style={{ ...styles.userBadge, ...styles.userRankBadge  }}>
      <Typography variant="body1">#47</Typography>
      <EqualizerSharp style={{ ...styles.userBadgeIcon, ...styles.userRankBadgeIcon }} />
    </Button>
    <Button variant="contained" size="large" color="primary" style={styles.userBadge}>
      <Typography variant="body1" color="secondary">7,331</Typography>
      <img style={styles.userBadgeIcon} src={trophy} alt="trophy_icon" />
    </Button>
  </Grid>
));

export default Badges;
