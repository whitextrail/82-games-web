import React, { memo } from 'react';
import {
  Grid,
  LinearProgress,
} from '@material-ui/core';
import { primaryColor } from '../../../styles/constants';

const styles = {
  grid: {
    height: 4, // Same height as LinearProgress
    width: '100%',
    backgroundColor: primaryColor,
  }
};

const ReusableProgress = memo(({ show }) => show ? <LinearProgress color="primary" /> : <Grid style={styles.grid} />);

export default ReusableProgress;
