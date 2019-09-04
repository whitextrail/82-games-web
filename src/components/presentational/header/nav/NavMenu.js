import React, { memo } from 'react';
import {
  Grid,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import {
  LocalPlaySharp,
  PersonSharp,
  EqualizerSharp,
  ExitToAppSharp,
} from '@material-ui/icons';
import { authorize } from '../../../../util/auth';
import {
  primaryColor,
  secondaryTextColor,
} from '../../../../styles/constants';

const navIcons = {
  games: <LocalPlaySharp color="secondary" />,
  account: <PersonSharp color="secondary" />,
  authenticate: <PersonSharp color="secondary" />,
  leaderboard: <EqualizerSharp color="secondary" />,
  logout: <ExitToAppSharp color="secondary" />,
};

const styles = {
  navMenu: {
    height: window.innerHeight - 56,
    backgroundColor: primaryColor,
  },
  navMenuListItem: {
    padding: 18,
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
  navMenuDivider: {
    marginTop: 20,
    marginBottom: 16,
  },
};

const NavMenuListItems = ({
  byId,
  allIds,
  selectedId,
  logOutUserAction,
  authState,
}) => {
  // Pre-defined custom actions on some menu items
  const navActions = {
    authenticate: () => authorize(), // Redirect to Auth0 login page
    logout: () => logOutUserAction(), // Clear user state
  };

  let hasIcons = true;

  const menuItems = [];

  allIds.forEach((id) => {
    const menuItem = byId[id];
    const { authenticationState } = menuItem;
    let showItem = true;

    // If the authentication state check exists for this item, confirm if the current user auth state matches it
    if (authenticationState && (authenticationState !== authState)) {
      showItem = false;
    }

    if (showItem) {
      const menuAction = (navActions[id] ? { onClick: () => navActions[id]() } : {});
      const listItemProps = {
        key: id,
        style: styles.navMenuListItem,
        button: true,
        disableGutters: true,
        alignItems: 'center',
        selected: id === selectedId,
        ...menuAction,
      };
  
      if (hasIcons && !menuItem.hasIcon) {
        hasIcons = false;
        menuItems.push(<Divider key="navMenuItemDivider" style={styles.navMenuDivider} />);
      }
  
      menuItems.push((
        <ListItem {...listItemProps}>
          { hasIcons && (
            <ListItemIcon style={styles.navMenuListItemIcon}>
              <Grid container justify="center" alignItems="center">
                {navIcons[id]}
              </Grid>
            </ListItemIcon>
          ) }
          <ListItemText primary={menuItem.text} />
        </ListItem>
      ));
    }
  });

  return menuItems;
};

const NavMenu = memo(({
  byId,
  allIds,
  isOpen,
  selectedId,
  authState,
  logOutUser,
}) => (
  <Collapse in={isOpen}>
    <List style={styles.navMenu}>
      <NavMenuListItems
        byId={byId}
        allIds={allIds}
        selectedId={selectedId}
        authState={authState}
        logOutUserAction={logOutUser}
      />
    </List>
  </Collapse>
));

export default NavMenu;
