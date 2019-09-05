import React, { memo } from 'react';
import { Grid } from '@material-ui/core';
import Nav from '../../container/Nav';

const Header = memo(() => (
  <Grid container>
    <Nav />
  </Grid>
));

export default Header;
