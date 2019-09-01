import React, { memo } from 'react';
import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Slide,
  Typography,
} from '@material-ui/core';
import {
  MenuSharp,
  CloseSharp,
  StopSharp,
  PlayArrowSharp,
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
  contextualNavIcon: {
    color: secondaryTextColor,
    fontSize: 18,
  },
};

// const contextualNavIcons = {
//   games: (

//   ),
// };

const NavBar = memo(({
  toggleNavMenu,
  isOpen,
  title,
}) => {
  const menuIcon = isOpen
    ? <CloseSharp style={styles.menuIcon} color="secondary" />
    : <MenuSharp style={styles.menuIcon} color="secondary" />;

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar disableGutters>
        <Grid container item xs={12} alignItems="center" style={styles.navContainer}>
          <Grid container justify="flex-start" alignItems="center">
            <IconButton style={styles.menuIconButton} onClick={toggleNavMenu}>
              {menuIcon}
            </IconButton>
            <Typography variant="h6">{title}</Typography>
          </Grid>
          <Slide direction="down" in={!isOpen}>
            <Grid container justify="flex-end" alignItems="center">
              <IconButton size="small" style={{ marginRight: 12 }}>
                <StopSharp style={{ fontSize: 24 }} color="secondary" />
              </IconButton>
              <IconButton size="small" style={{ marginRight: 13 }}>
                <PlayArrowSharp style={{ fontSize: 24 }} color="secondary" />
              </IconButton>
            </Grid>
          </Slide>
        </Grid>
      </Toolbar>
    </AppBar>
  );
});

export default NavBar;
