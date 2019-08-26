import React, { memo } from 'react';
import {
  Brand,
} from './';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import Link from '../reusable/Link';

const styles = {
  navLinkContainer: {
    // TODO: Use media queries
    width: 500,
  },
  navLink: {
    color: 'black',
  },
};

const navLinks = [
  {
    text: 'Account',
    path: '/account',
  },
  {
    text: 'Leaderboard',
    path: '/leaderboard',
  },
  {
    text: 'Logout',
    path: '/logout',
  }
];

const Navigation = memo(() => {
  return (
    <Grid container wrap="nowrap">
      <Brand />
      <Grid container wrap="nowrap" justify="flex-end" style={styles.navLinkContainer}>
        { navLinks.map((element) => (
          <Grid item xs={12} key={element.text}>
            <Link to={element.path}>
              <Typography align="center" style={styles.navLink}>
                { element.text }
              </Typography>
            </Link>
          </Grid>
        )) }
      </Grid>
    </Grid>
  );
});

export default Navigation;
