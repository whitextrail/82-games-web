import React, { memo } from 'react';
import {
  Grid,
  Paper,
} from '@material-ui/core';
import { primaryColor } from '../../../styles/constants';

const styles = {
  container: {
    height: '100vh',
    backgroundColor: primaryColor,
  },
  paper: {
    height: '100%',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
};

const Body = memo(({ children }) => (
  <Grid style={styles.container}>
    <Paper style={styles.paper}>{ children }</Paper>
  </Grid>
));

export default Body;
