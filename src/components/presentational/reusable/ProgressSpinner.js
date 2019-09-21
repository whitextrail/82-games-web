import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  CircularProgress,
} from '@material-ui/core';

const styles = {
  gridContainer: {
    height: 100,
  },
};

const ReusableProgressSpinner = React.memo(({ style }) => (
  <Grid
    container
    justify="center"
    alignContent="center"
    spacing={0}
    direction="column"
    alignItems="center"
    style={styles.gridContainer}
  >
    <CircularProgress size={50} style={style} />
  </Grid>
));

ReusableProgressSpinner.propTypes = {
  style: PropTypes.shape({}),
};

ReusableProgressSpinner.defaultProps = {
  style: {},
};

export default ReusableProgressSpinner;
