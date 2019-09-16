import React, { memo } from 'react';
import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import { MenuSharp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { secondaryTextColor, primaryColor } from '../../../styles/constants';

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

const createNavBarClasses = (classes = {
  colorDefault: {
    backgroundColor: primaryColor,
    color: '#FFF',
  },
}) => makeStyles(classes)();

const NavBar = memo(({
  title,
  elevation,
  iconButtonClickHandler,
  navBarIcon,
  navBarStyles,
  navBarIconStyles,
}) => {
  const combinedNavBarIconStyles = {
    ...styles.navBarIcon,
    ...navBarIconStyles && navBarIconStyles,
  };
  const navBarClasses = createNavBarClasses(navBarStyles);
  return (
    <AppBar position="static" elevation={elevation} color="default" classes={navBarClasses}>
      <Toolbar
        disableGutters
        component={Grid}
        container
        justify="flex-start"
        alignItems="center"
        style={styles.toolbar}
      >
        <IconButton style={styles.navBarIconButton} onClick={iconButtonClickHandler}>
          {
            navBarIcon
              ? React.cloneElement(navBarIcon, { style: combinedNavBarIconStyles })
              : <MenuSharp style={combinedNavBarIconStyles} />
          }
        </IconButton>
        <Typography variant="h6">{title}</Typography>
      </Toolbar>
    </AppBar>
  );
});

export default NavBar;
