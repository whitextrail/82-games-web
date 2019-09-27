import React, { memo } from 'react';
import {
  Grid,
  Card,
  Typography,
} from '@material-ui/core';
import {
  AccessibilityNewSharp,
  FitnessCenterSharp,
  CakeSharp,
} from '@material-ui/icons';

const styles = {
  card: {
    height: 40,
    maxHeight: 40,
    borderRadius: 5,
    backgroundColor: '#FFF',
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
    color: '#333',
  },
};

const AthletePersonalStats = memo(() => (
  <Card
    raised
    component={Grid}
    container
    item
    xs={11}
    justify="space-around"
    alignItems="center"
    style={styles.card}
  >
    <Grid container justify="center" alignItems="center" item xs={12}>
      <AccessibilityNewSharp style={{ ...styles.icon, ...styles.heightIcon }} />
      <Typography variant="body2" style={styles.statText}>6'6" (198cm)</Typography>
    </Grid>
    <Grid container justify="center" alignItems="center" item xs={12}>
      <FitnessCenterSharp style={{ ...styles.icon, ...styles.weightIcon }} />
      <Typography variant="body2" style={styles.statText}>210lbs (95kg)</Typography>
    </Grid>
    <Grid container justify="center" alignItems="center" item xs={12}>
      <CakeSharp style={{ ...styles.icon, ...styles.birthdayIcon }} />
      <Typography variant="body2" style={styles.statText}>4/6/93</Typography>
    </Grid>
  </Card>
));

export default AthletePersonalStats;
