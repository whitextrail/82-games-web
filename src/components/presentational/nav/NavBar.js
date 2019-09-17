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
  icon: {
    color: secondaryTextColor,
    fontSize: 24,
  },
  IconButton: {
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
  icon,
  iconButtonClickHandler,
  styleClasses,
  iconStyles,
}) => {
  const combinedNavBarIconStyles = {
    ...styles.icon,
    ...iconStyles && iconStyles,
  };
  const classes = createNavBarClasses(styleClasses);

  return (
    <AppBar position="static" elevation={elevation} color="default" classes={classes}>
      <Toolbar
        disableGutters
        component={Grid}
        container
        justify="flex-start"
        alignItems="center"
        style={styles.toolbar}
      >
        <IconButton style={styles.iconButton} onClick={iconButtonClickHandler}>
          {
            icon
              ? React.cloneElement(icon, { style: combinedNavBarIconStyles })
              : <MenuSharp style={combinedNavBarIconStyles} />
          }
        </IconButton>
        <Typography variant="h6">{title}</Typography>
      </Toolbar>
    </AppBar>
  );
});

export default NavBar;
