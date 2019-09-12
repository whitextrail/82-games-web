import React, { memo } from 'react';
import {
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import {
  AccessibilityNewSharp,
  FitnessCenterSharp,
  CakeSharp,
} from '@material-ui/icons';

const styles = {
  paper: {
    height: 40,
    borderRadius: 5,
  },
  heightInnerContainer: {
    width: 125,
    height: '60%',
    borderRight: '1px solid #A9A9A9',
  },
  birthdayInnerContainer: {
    width: 95,
    height: '60%',
    borderLeft: '1px solid #A9A9A9',
  },
  icon: {
    fontSize: 18,
    marginRight: 10,
  },
  heightIcon: {
    color: '#2ECC71',
  },
  weightIcon: {
    color: '#3498DB',
  },
  birthdayIcon: {
    color: '#E74C3C',
  },
  statText: {
    fontWeight: 600,
    fontSize: 12,
    color: 'rgba(0,0,0,0.54)',
  },
};

const AthletePersonalStats = memo(() => (
  <Paper
    component={Grid}
    container
    justify="center"
    alignItems="center"
    style={styles.paper}
  >
    <Grid container justify="center" alignItems="center">
      <Grid container justify="center" alignItems="center" style={styles.heightInnerContainer}>
        <AccessibilityNewSharp style={{ ...styles.icon, ...styles.heightIcon }} />
        <Typography variant="body2" style={styles.statText}>6'6" (198cm)</Typography>
      </Grid>
    </Grid>
    <Grid container justify="center" alignItems="center">
      <FitnessCenterSharp style={{ ...styles.icon, ...styles.weightIcon }} />
      <Typography variant="body2" style={styles.statText}>210lbs (95kg)</Typography>
    </Grid>
    <Grid container justify="center" alignItems="center">
      <Grid container justify="center" alignItems="center" style={styles.birthdayInnerContainer}>
        <CakeSharp style={{ ...styles.icon, ...styles.birthdayIcon }} />
        <Typography variant="body2" style={styles.statText}>4/6/93</Typography>
      </Grid>
    </Grid>
  </Paper>
));

export default AthletePersonalStats;
