import React, { memo } from 'react';
import {
  AppBar,
  Toolbar,
} from '@material-ui/core';

const Header = memo(({ children }) => (
  <AppBar position="static" color="primary" elevation={0}>
    <Toolbar disableGutters>{ children }</Toolbar>
  </AppBar>
));

export default Header;
