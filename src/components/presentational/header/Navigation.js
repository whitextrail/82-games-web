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
import {
  MenuSharp,
  CloseSharp,
  LocalPlaySharp,
  PersonSharp,
  EqualizerSharp,
  ExitToAppSharp,
} from '@material-ui/icons';
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
    fontSize: 24,
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
    width: 24,
    height: 24,
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
      text: 'Games',
      path: '/games',
      icon: <LocalPlaySharp color="secondary" />,
    },
    {
      text: 'Account',
      path: '/account',
      icon: <PersonSharp color="secondary" />,
    },
    {
      text: 'Leaderboard',
      path: '/leaderboard',
      icon: <EqualizerSharp color="secondary" />,
    },
    {
      text: 'Logout',
      path: '/logout',
      icon: <ExitToAppSharp color="secondary" />,
    }
  ],
  secondary: [
    {
      text: 'About Us',
      path: '/about',
    },
    {
      text: 'Our Team',
      path: '/team',
    },
    {
      text: 'Contact',
      path: '/contact',
    },
    {
      text: 'Terms of Service',
      path: '/terms',
    },
    {
      text: 'Privacy Policy',
      path: '/privacy',
    }
  ],
};

const NavigationMobile = memo(() => (
  navLinks.primary.map((element, index) => (
    <Link to={element.path} key={element.text}>
      <IconButton style={ (index === (navLinks.length - 1)) ? styles.lastNavIconSpacing : styles.navIconSpacing }>
        {element.icon}
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
  const menuIcon = navigationMenuOpenState ? <CloseSharp color="secondary" /> : <MenuSharp color="secondary" />;

  return (
    <Grid container direction="column">
      <Grid container item xs={12} style={styles.navContainer}>
        <Grid container justify="flex-start" alignItems="center">
          <IconButton style={styles.menuIconButton} onClick={toggleNavigationMenuOpenStateAction}>
            {menuIcon}
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
                  <Grid container justify="center" alignItems="center">
                    {element.icon}
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
