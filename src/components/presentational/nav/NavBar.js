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
import {
  MenuSharp,
  LocalPlaySharp,
} from '@material-ui/icons';
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
    showVoucherDialog,
  } = useContext(NavContext);
  const appBarClasses = createNavBarClasses(styleClasses);
  const appBarElevation = menuOpen ? 0 : elevation;
  const menuButtonOnClick = iconButtonClickHandler || toggleMenu;
  const voucherButtonOnClick = showVoucherDialog || (() => {});

  let menuIcon = <MenuSharp style={styles.icon} />;
  const voucherIcon = <LocalPlaySharp style={styles.icon} />;

  if (icon) {
    menuIcon = React.cloneElement(icon, { style: styles.icon });
  }

  return (
    <AppBar position="static" elevation={appBarElevation} color="default" classes={appBarClasses}>
      <Toolbar
        disableGutters
        component={Grid}
        container
        justify="space-between"
        alignItems="center"
        style={styles.toolbar}
      >
        <IconButton style={styles.iconButton} onClick={menuButtonOnClick}>{menuIcon}</IconButton>
        <Typography variant="h6">{title}</Typography>
        { !menuOpen && (
          <IconButton style={styles.iconButton} onClick={voucherButtonOnClick}>{voucherIcon}</IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
});

export default NavBar;
