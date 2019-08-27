import React, { memo } from 'react';
import { Grid } from '@material-ui/core';

const styles = {
  body: {
    backgroundColor: 'white',
  }
}

const Body = memo(() => <Grid container style={styles.body}></Grid>);

export default Body;
