import React, {
  memo,
  useContext,
} from 'react';
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
import { NavContext } from '../../container/Nav';

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
}) => {
  const {
    state: { menuOpen },
    toggleMenu,
  } = useContext(NavContext);
  const appBarClasses = createNavBarClasses(styleClasses);
  const appBarElevation = menuOpen ? 0 : elevation;
  const iconButtonOnClick = iconButtonClickHandler || toggleMenu;

  let menuIcon = <MenuSharp style={styles.icon} />;

  if (icon) {
    menuIcon = React.cloneElement(icon, { style: styles.icon });
  }

  return (
    <AppBar position="static" elevation={appBarElevation} color="default" classes={appBarClasses}>
      <Toolbar
        disableGutters
        component={Grid}
        container
        justify="flex-start"
        alignItems="center"
        style={styles.toolbar}
      >
        <IconButton style={styles.iconButton} onClick={iconButtonOnClick}>{menuIcon}</IconButton>
        <Typography variant="h6">{title}</Typography>
      </Toolbar>
    </AppBar>
  );
});

export default NavBar;
