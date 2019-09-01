import React, { memo } from 'react';
import {
  Grid,
  Paper,
} from '@material-ui/core';
import {
  secondaryColor,
  primaryTextColor,
} from '../../../../styles/constants';

const styles = {
  navHeaderContainer: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    backgroundColor: secondaryColor,
    paddingBottom: 2,
  },
  navHeader: {
    height: 56,
    width: '100%',
    paddingLeft: 16,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  navHeaderText: {
    color: primaryTextColor,
    fontSize: 18,
  },
};

const NavTitle = memo(({ title }) => (
  <Grid item xs={12} style={styles.navHeaderContainer}>
    <Paper style={styles.navHeader}>
      <Grid container alignItems="center" style={styles.navHeaderText}>
        {title}
      </Grid>
    </Paper>
  </Grid>
));

export default NavTitle;
