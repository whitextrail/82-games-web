import React, { memo } from 'react';
import {
  Grid,
  AppBar,
  Toolbar,
} from '@material-ui/core';

const styles = {
  toolbar: {
    height: '100%',
  }
};

const Header = memo(({ children }) => (
  <Grid container component="header" alignContent="center">
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar disableGutters variant="dense" style={styles.toolbar}>{ children }</Toolbar>
    </AppBar>
  </Grid>
));

export default Header;
