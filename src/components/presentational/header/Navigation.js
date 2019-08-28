import React, { memo } from 'react';
import {
  Grid,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faUser,
  faTrophy,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link } from '../reusable';

const styles = {
  menuContainer: {
    width: 45,
  },
  navItem: {
    color: '#FFF',
  },
  navMenu: {
    fontSize: 20,
  },
  navLink: {
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
  <Grid container justify="space-around" alignItems="center">
    { navLinks.map((element) => (
      <Grid item key={element.text}>
        <Grid container alignItems="center" justify="center">
          <Link to={element.path}>
            <IconButton>
              <FontAwesomeIcon icon={element.icon} size="xs" style={{ ...styles.navItem, ...styles.navLink }} />
            </IconButton>
          </Link>
        </Grid>
      </Grid>
    )) }
  </Grid>
));

const NavigationDesktop = memo(() => (
  <Grid container justify="flex-end" alignItems="center">
    { navLinks.map((element) => (
      <Grid item sm={4} md={3} lg={2} key={element.text}>
        <Grid container justify="center" alignItems="center">
          <Link to={element.path}>
            <Button size="large">
              <Typography align="center" color="primary" style={{ ...styles.navItem, ...styles.navLink }}>{ element.text }</Typography>
            </Button>
          </Link>
        </Grid>
      </Grid>
    )) }
  </Grid>
));

const Navigation = memo(() => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Grid container alignItems="center">
      <Grid item xs={8} sm={6}>
        <Grid container alignItems="center">
          <Grid container justify="center" alignItems="center" style={styles.menuContainer}>
            <IconButton>
              <FontAwesomeIcon icon={faBars} size="xs" style={{ ...styles.navItem, ...styles.navMenu }} />
            </IconButton>
          </Grid>
          <Typography variant="h6">82 GAMES</Typography>
        </Grid>
      </Grid>
      <Grid item xs={4} sm={6}>
        { matches ? <NavigationDesktop /> : <NavigationMobile /> }
      </Grid>
    </Grid>
  );
});

export default Navigation;
