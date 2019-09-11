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
import { makeStyles } from '@material-ui/styles';
import { secondaryTextColor, primaryColor } from '../../../../styles/constants';

const styles = {
  toolbar: {
    height: 56,
    minHeight: 56,
  },
  navBarIcon: {
    color: secondaryTextColor,
    fontSize: 24,
  },
  navBarIconButton: {
    marginLeft: 6,
    marginRight: 12,
  },
};

const createNavBarClasses = (classes) => makeStyles(classes);

const NavBar = memo(({
  menuIsOpen,
  navBarTitle,
  navBarIconClickHandler,
  navBarIcon = null,
  navBarStyles = {
    colorDefault: {
      backgroundColor: primaryColor,
      color: 'white',
    },
  },
  navBarIconStyles = {},
}) => {
  const defaultNavBarIconStyles = {
    ...styles.navBarIcon,
    ...navBarIconStyles,
  };
  const defaultNavBarIcon = menuIsOpen
    ? <CloseSharp style={defaultNavBarIconStyles} />
    : <MenuSharp style={defaultNavBarIconStyles} />;
  const navBarClasses = createNavBarClasses({ ...navBarStyles });

  return (
    <AppBar position="static" elevation={0} classes={{ ...navBarClasses }}>
      <Toolbar
        component={Grid}
        disableGutters
        style={styles.toolbar}
        container
        justify="flex-start"
        alignItems="center"
      >
        <IconButton style={styles.navBarIconButton} onClick={navBarIconClickHandler}>
          {navBarIcon || defaultNavBarIcon}
        </IconButton>
        <Typography variant="h6">
          {menuIsOpen ? '82 GAMES' : navBarTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
});

export default NavBar;
