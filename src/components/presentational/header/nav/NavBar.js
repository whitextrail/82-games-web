import React, { memo } from 'react';
import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import {
  MenuSharp,
  CloseSharp,
} from '@material-ui/icons';
import { secondaryTextColor } from '../../../../styles/constants';

const styles = {
  navContainer: {
    height: 56,
    minHeight: 56,
  },
  menuIcon: {
    color: secondaryTextColor,
    fontSize: 24,
  },
  menuIconButton: {
    marginLeft: 6,
    marginRight: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 500,
    fontFamily: 'Source Sans Pro',
  },
};

const NavBar = memo(({
  toggleNavMenu,
  isOpen,
  title,
}) => {
  const menuIcon = isOpen
    ? <CloseSharp style={styles.menuIcon} color="secondary" />
    : <MenuSharp style={styles.menuIcon} color="secondary" />;
  const menuTitle = isOpen ? '82 GAMES' : title;

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar disableGutters style={styles.navContainer}>
        <Grid container justify="flex-start" alignItems="center">
          <IconButton style={styles.menuIconButton} onClick={toggleNavMenu}>
            {menuIcon}
          </IconButton>
          <Typography style={styles.title}>{menuTitle}</Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  );
});

export default NavBar;
