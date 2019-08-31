import React, { memo } from 'react';
import {
  Grid,
  Typography,
  IconButton,
  Button,
  Collapse,
  Slide,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faUser,
  faTrophy,
  faSignOutAlt,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link } from '../reusable';
import {
  secondaryTextColor,
  primaryColor,
} from '../../../styles/constants';

const styles = {
  navContainer: {
    height: 56,
  },
  menuIcon: {
    color: secondaryTextColor,
    fontSize: 24,
  },
  menuIconButton: {
    marginLeft: 6,
    marginRight: 12,
  },
  navIcon: {
    color: secondaryTextColor,
    fontSize: 18,
  },
  navIconSpacing: {
    marginRight: 6,
  },
  lastNavIconSpacing: {
    marginRight: 2,
  },
  navMenu: {
    height: '86.6vh',
    backgroundColor: primaryColor,
  },
  navMenuList: {
    padding: 18,
    height: 40,
    marginBottom: 12,
  },
  navMenuListItemIcon: {
    minWidth: 0,
    width: 18,
    height: 18,
    marginRight: 24,
  },
  navMenuDivider: {
    marginTop: 24,
    marginBottom: 20,
  },
};

const navLinks = {
  primary: [
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
  ],
  secondary: [
    {
      text: 'About Us',
      path: '/about',
      icon: faUser,
    },
    {
      text: 'Our Team',
      path: '/team',
      icon: faTrophy,
    },
    {
      text: 'Contact',
      path: '/contact',
      icon: faSignOutAlt,
    },
    {
      text: 'Terms of Service',
      path: '/terms',
      icon: faSignOutAlt,
    },
    {
      text: 'Privacy Policy',
      path: '/privacy',
      icon: faSignOutAlt,
    }
  ],
};

const NavigationMobile = memo(() => (
  navLinks.primary.map((element, index) => (
    <Link to={element.path} key={element.text}>
      <IconButton style={ (index === (navLinks.length - 1)) ? styles.lastNavIconSpacing : styles.navIconSpacing }>
        <FontAwesomeIcon icon={element.icon} style={styles.navIcon} />
      </IconButton>
    </Link>
  ))
));

const NavigationDesktop = memo(() => (
  navLinks.primary.map((element) => (
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

const Navigation = memo(({
  toggleNavigationMenuOpenStateAction,
  navigationMenuOpenState,
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const menuIcon = navigationMenuOpenState ? faTimes : faBars;

  return (
    <Grid container direction="column">
      <Grid container item xs={12} style={styles.navContainer}>
        <Grid container justify="flex-start" alignItems="center">
          <IconButton style={styles.menuIconButton} onClick={toggleNavigationMenuOpenStateAction}>
            <FontAwesomeIcon icon={menuIcon} style={styles.menuIcon} />
          </IconButton>
          <Typography variant="h6">82 Games</Typography>
        </Grid>
        <Slide direction="down" in={!navigationMenuOpenState}>
          <Grid container justify="flex-end" alignItems="center">
            { matches ? <NavigationDesktop /> : <NavigationMobile /> }
          </Grid>
        </Slide>
      </Grid>
      <Grid item xs={12}>
        <Collapse in={navigationMenuOpenState} timeout={{ enter: 500, exit: 100 }}>
          <List component="nav" disablePadding style={styles.navMenu}>
            { navLinks.primary.map((element, index) => (
              <ListItem alignItems="center" key={index} button disableGutters style={styles.navMenuList}>
                <ListItemIcon style={styles.navMenuListItemIcon}>
                  <Grid container justify="center">
                    <FontAwesomeIcon icon={element.icon} style={styles.navIcon} />
                  </Grid>
                </ListItemIcon>
                <ListItemText primary={element.text} />
              </ListItem>
            )) }
            <Divider style={styles.navMenuDivider} />
            { navLinks.secondary.map((element, index) => (
              <ListItem alignItems="center" disableGutters style={styles.navMenuList} key={index}>
                <ListItemText primary={element.text} />
              </ListItem>
            )) }
          </List>
        </Collapse>
      </Grid>
    </Grid>
  );
});

export default Navigation;
