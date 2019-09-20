import React, {
  memo,
  createElement,
  useContext,
} from 'react';
import {
  Grid,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  LocalPlaySharp,
  EqualizerSharp,
  StarSharp,
  CloseSharp,
} from '@material-ui/icons';
import { NavContext } from '../../container/Nav';
import NavBar from './NavBar';
import {
  primaryColor,
  secondaryTextColor,
} from '../../../styles/constants';
import Link from '../reusable/Link';

const navMenuItems = [{
  id: 'games',
  title: 'Games',
  routePath: '/games',
  icon: LocalPlaySharp,
}, {
  id: 'athletes',
  title: 'Athletes',
  routePath: '/athletes',
  icon: StarSharp,
}, {
  id: 'leaderboard',
  title: 'Leaderboard',
  routePath: '/leaderboard',
  icon: EqualizerSharp,
}];

const styles = {
  navMenu: {
    height: window.innerHeight - 56,
    backgroundColor: primaryColor,
  },
  navMenuListItem: {
    padding: 12,
    height: 40,
    marginBottom: 12,
    color: secondaryTextColor,
  },
  navMenuListItemIcon: {
    minWidth: 0,
    width: 24,
    height: 24,
    marginRight: 24,
  },
};

const NavMenu = memo(() => {
  const {
    state: {
      menuOpen,
      selectedId,
    },
    toggleMenu,
  } = useContext(NavContext);

  return (
    <Collapse in={menuOpen}>
      <NavBar icon={<CloseSharp />} />
      <List style={styles.navMenu}>
        { navMenuItems.map((menuItem) => {
          const {
            id,
            icon,
            title,
            routePath = '',
          } = menuItem;
          const isSelected = id === selectedId;
          const iconElement = createElement(icon, { color: 'secondary' });

          return (
            <Link key={title} to={routePath}>
              <ListItem
                id={title}
                button
                disableGutters
                alignItems="center"
                selected={isSelected}
                style={styles.navMenuListItem}
                onClick={toggleMenu}
              >
                <ListItemIcon style={styles.navMenuListItemIcon}>
                  <Grid container justify="center" alignItems="center">
                    { iconElement }
                  </Grid>
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            </Link>
          );
        }) }
      </List>
    </Collapse>
  );
});

export default NavMenu;