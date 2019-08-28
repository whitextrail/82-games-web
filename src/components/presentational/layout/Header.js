import React, { memo } from 'react';
import {
  AppBar,
  Toolbar,
} from '@material-ui/core';

const styles = {
  toolbar: {
    height: '100%',
  }
};

const Header = memo(({ children }) => (
  <AppBar position="static" color="primary" elevation={0}>
    <Toolbar disableGutters variant="dense" style={styles.toolbar}>{ children }</Toolbar>
  </AppBar>
));

export default Header;
