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
import {
  primaryColor,
  secondaryTextColor,
} from '../../../../styles/constants';

const navIcons = {
  games: <LocalPlaySharp color="secondary" />,
  account: <PersonSharp color="secondary" />,
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
    marginTop: 24,
    marginBottom: 20,
  },
};

const NavMenuListItems = ({
  byId,
  allIds,
  selectedId,
}) => {
  let hasIcons = true;

  const menuItems = [];

  allIds.forEach((id) => {
    const menuItem = byId[id];
    const listItemProps = {
      key: id,
      style: styles.navMenuListItem,
      button: true,
      disableGutters: true,
      alignItems: 'center',
      selected: id === selectedId,
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
  });

  return menuItems;
};

const NavMenu = memo(({
  byId,
  allIds,
  isOpen,
  selectedId,
}) => (
  <Collapse in={isOpen}>
    <List style={styles.navMenu}>
      <NavMenuListItems byId={byId} allIds={allIds} selectedId={selectedId} />
    </List>
  </Collapse>
));

export default NavMenu;
