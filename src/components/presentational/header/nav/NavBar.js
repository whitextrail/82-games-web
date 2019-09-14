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

const createNavBarClasses = (classes) => makeStyles(classes)();

const NavBar = memo(({
  menuIsOpen,
  navBarTitle,
  navBarIconClickHandler,
  navBarElevation = 0,
  navBarIcon = null,
  navBarStyles = {
    colorDefault: {
      backgroundColor: primaryColor,
      color: 'white',
    },
  },
  navBarIconStyles = {},
}) => {
  const combinedNavBarIconStyles = {
    ...styles.navBarIcon,
    ...navBarIconStyles,
  };
  const defaultNavBarIcon = menuIsOpen
    ? <CloseSharp style={combinedNavBarIconStyles} />
    : <MenuSharp style={combinedNavBarIconStyles} />;
  const navBarClasses = createNavBarClasses({ ...navBarStyles });

  return (
    <Grid container direction="column">
      <AppBar position="static" elevation={menuIsOpen ? 0 : navBarElevation} color="default" classes={{ ...navBarClasses }}>
        <Toolbar
          disableGutters
          style={styles.toolbar}
          component={Grid}
          container
          justify="flex-start"
          alignItems="center"
        >
          <IconButton style={styles.navBarIconButton} onClick={navBarIconClickHandler}>
            {
              navBarIcon
                ? React.cloneElement(navBarIcon, { style: combinedNavBarIconStyles })
                : defaultNavBarIcon
            }
          </IconButton>
          <Typography variant="h6">
            {menuIsOpen ? '82 GAMES' : navBarTitle}
          </Typography>
        </Toolbar>
      </AppBar>
    </Grid>
  );
});

export default NavBar;
