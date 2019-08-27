import React, { memo } from 'react';
import {
  Brand,
} from './';
import {
  Grid,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faTrophy,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  Link,
} from '../reusable';

const styles = {
  navMobileContainer: {
    height: '100%',
  },
  navDesktopContainer: {
    height: '100%',
  },
  navLinkText: {
    color: 'black',
    fontSize: 12,
  },
  navLinkIcon: {
    fontSize: 14,
  },
};

const navLinks = [
  {
    text: 'Account',
    path: '/account',
    icon: faUser,
  },
  {
    text: 'Leaderboard',
    path: '/leaderboard',
    icon: faTrophy,
  },
  {
    text: 'Logout',
    path: '/logout',
    icon: faSignOutAlt,
  }
];

const NavigationMobile = memo(() => (
  <Grid container item xs={12} justify="space-around" alignItems="center" style={styles.navMobileContainer}>
    { navLinks.map((element) => (
      <Link to={element.path} key={element.text}>
        <IconButton>
          <FontAwesomeIcon icon={element.icon} size="xs" style={styles.navLinkIcon} />
        </IconButton>
      </Link>
    )) }
  </Grid>
));

const NavigationDesktop = memo(() => (
  <Grid container item sm={12} md={8} lg={6} justify="space-around" alignItems="center" style={styles.navDesktopContainer}>
    { navLinks.map((element) => (
        <Link to={element.path} key={element.text}>
          <Button>
            <Typography align="center" variant="body1" style={styles.navLinkText}>
              { element.text }
            </Typography>
          </Button>
        </Link>
    )) }
  </Grid>
));

const Navigation = memo(() => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Grid container style={{ height: '100%' }}>
      <Grid container item xs={8} sm={6} alignItems="center">
        <Brand />
      </Grid>
      <Grid container item xs={4} sm={6} justify="flex-end" alignItems="center">
        { matches ? <NavigationDesktop /> : <NavigationMobile /> }
      </Grid>
    </Grid>
  );
});

export default Navigation;
