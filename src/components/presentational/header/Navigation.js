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
import {
  secondaryTextColor,
} from '../../../styles/constants';

const styles = {
  navContainer: {
    height: 56,
  },
  menuIcon: {
    color: secondaryTextColor,
    fontSize: 20,
  },
  navIcon: {
    color: secondaryTextColor,
    fontSize: 18,
  },
  menuTitleSpacing: {
    marginRight: 2,
  },
  navIconSpacing: {
    marginRight: 6,
  },
  lastNavIconSpacing: {
    marginRight: 2,
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
    <Grid container direction="column">
      <Grid item xs={12} style={styles.navContainer}>
        <Grid container>
          <Grid container justify="flex-start" alignItems="center">
            <IconButton style={styles.menuTitleSpacing}>
              <FontAwesomeIcon icon={faBars} style={styles.menuIcon} />
            </IconButton>
            <Typography variant="h6">82 Games</Typography>
          </Grid>
          <Grid container justify="flex-end" alignItems="center">
            { matches ? <NavigationDesktop /> : <NavigationMobile /> }
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});

export default Navigation;
