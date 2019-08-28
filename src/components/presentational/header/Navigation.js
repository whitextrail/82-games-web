import React, { memo } from 'react';
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
import { Link } from '../reusable';

const styles = {
  navLink: {
    color: '#FFF',
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
  <Grid container item xs={10} justify="space-between" alignItems="center">
    { navLinks.map((element) => (
      <Link to={element.path} key={element.text}>
        <IconButton>
          <FontAwesomeIcon icon={element.icon} size="xs" style={styles.navLink} />
        </IconButton>
      </Link>
    )) }
  </Grid>
));

const NavigationDesktop = memo(() => (
  <Grid container item sm={12} md={8} lg={6} justify="space-between" alignItems="center">
    { navLinks.map((element) => (
      <Link to={element.path} key={element.text}>
        <Button size="large">
          <Typography align="center" color="primary" style={styles.navLink}>{ element.text }</Typography>
        </Button>
      </Link>
    )) }
  </Grid>
));

const Navigation = memo((props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Grid container>
      <Grid item xs={8} sm={6}>
        <Grid container alignItems="center">
          <Typography>82 GAMES</Typography>
        </Grid>
      </Grid>
      <Grid item xs={4} sm={6} justify="flex-end" alignItems="center">
        { matches ? <NavigationDesktop /> : <NavigationMobile /> }
      </Grid>
    </Grid>
  );
});

export default Navigation;
