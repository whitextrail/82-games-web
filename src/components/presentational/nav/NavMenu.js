import React, {
  memo,
  createElement,
} from 'react';
import {
  Grid,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import connectNav from '../../container/Nav';
import {
  primaryColor,
  secondaryTextColor,
} from '../../../styles/constants';
import Link from '../reusable/Link';

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
};

const NavMenu = memo(({
  byId,
  allIds,
  isOpen,
  selectedId,
  handleMenuItemClick,
}) => (
  <Collapse in={isOpen}>
    <List style={styles.navMenu}>
      { allIds.map((id) => {
        const {
          icon,
          title,
          routePath = '',
        } = byId[id];
        const isSelected = id === selectedId;
        const iconElement = createElement(icon, { color: 'secondary' });

        return (
          <Link key={id} to={routePath}>
            <ListItem
              id={id}
              button
              disableGutters
              alignItems="center"
              selected={isSelected}
              style={styles.navMenuListItem}
              onClick={handleMenuItemClick}
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
));

export default connectNav(NavMenu);
