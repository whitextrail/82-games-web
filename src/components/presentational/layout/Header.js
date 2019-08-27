import React, { memo } from 'react';
import {
  Grid,
  AppBar,
  Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles = {
  toolbar: {
    height: '100%',
  }
};

const makeClasses = makeStyles({
  appBarBackgroundColor: {
    backgroundColor: '#FFFFFF',
  },
});

const Header = memo(({ children }) => {
  const classes = makeClasses();

  return (
    <Grid container component="header" alignContent="center">
      <AppBar position="static" color="primary" elevation={0} classes={{ colorPrimary: classes.appBarBackgroundColor }}>
        <Toolbar style={styles.toolbar}>{ children }</Toolbar>
      </AppBar>
    </Grid>
  );
});

export default Header;
