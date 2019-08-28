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
  container: {
    height: 56,
  },
  navIcon: {
    color: '#FFF',
    fontSize: 20,
  },
  menuTitleSpacing: {
    marginRight: 4,
  },
  navIconSpacing: {
    marginRight: 8,
  },
  lastNavIconSpacing: {
    marginRight: 4,
  }
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
  navLinks.map((element, index) => (
    <Link to={element.path} key={element.text}>
      <IconButton style={ (index === (navLinks.length - 1)) ? styles.lastNavIconSpacing : styles.navIconSpacing }>
        <FontAwesomeIcon icon={element.icon} style={styles.navIcon} />
      </IconButton>
    </Link>
  ))
));

const NavigationDesktop = memo(() => (
  navLinks.map((element) => (
    <Grid item sm={4} md={3} lg={2} key={element.text}>
      <Grid container justify="center" alignItems="center">
        <Link to={element.path}>
          <Button style={styles.linkButton}>
            <Typography align="center" color="primary">{ element.text }</Typography>
          </Button>
        </Link>
      </Grid>
    </Grid>
  ))
));

const Navigation = memo(() => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Grid container style={styles.container}>
      <Grid container alignItems="center">
        <IconButton style={styles.menuTitleSpacing}>
          <FontAwesomeIcon icon={faBars} style={styles.navIcon} />
        </IconButton>
        <Typography variant="h6">82 Games</Typography>
      </Grid>
      <Grid container justify="flex-end" alignItems="center">
        { matches ? <NavigationDesktop /> : <NavigationMobile /> }
      </Grid>
    </Grid>
  );
});

export default Navigation;
