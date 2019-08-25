import React, { memo } from 'react';
import { Grid } from '@material-ui/core';

const styles = {
  app: {
    height: '100%',
  },
};

const App = memo(() => (
  <Grid container direction="column" wrap="nowrap" style={styles.app}>
    Web Frontend Foundation
  </Grid>
));

export default App;
