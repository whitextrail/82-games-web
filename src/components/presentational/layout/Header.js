import React, { memo } from 'react';
import {
  Grid,
} from '@material-ui/core';

const Header = memo(({ children }) => <Grid container>{ children }</Grid>);

export default Header;
