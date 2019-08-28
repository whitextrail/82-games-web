import React, { memo } from 'react';
import {
  Grid,
  Paper,
} from '@material-ui/core';

const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#FF3B3F',
  },
  paper: {
    height: '100%',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
}

const Body = memo(({ children }) => (
  <Grid style={styles.container}>
    <Paper style={styles.paper}>{ children }</Paper>
  </Grid>
));

export default Body;
