import React, { memo } from 'react';
import {
  Grid,
  Card,
  Typography,
} from '@material-ui/core';
import GameAthleteStatsRadar from './GameAthleteStatsRadar';

const styles = {
  container: {
    marginTop: 15,
    height: 435,
    position: 'relative',
    width: 365,
  },
};

const GameAthleteStatsComparison = memo(() => (
  <Grid container justify="center" alignItems="center" direction="column" style={styles.container}>
    <GameAthleteStatsRadar />
    <Grid
      container
      justify="space-around"
      alignItems="center"
      style={{ height: 115 }}
    >
      <Card
        raised
        component={Grid}
        container
        justify="center"
        alignItems="center"
        direction="column"
        style={{ height: 80, width: 110, backgroundColor: '#000' }}
      >
        <Typography variant="body2" style={{ fontSize: 14, color: '#FFF' }}>BROOKLYN</Typography>
        <Grid container justify="center" alignItems="center" style={{ height: 45 }}>
          <Grid container justify="center" alignItems="center" direction="column" style={{ width: 30 }}>
            <Typography variant="body2" style={{ fontSize: 16, color: '#FFF' }}>113</Typography>
            <Typography variant="body2" style={{ fontSize: 10, color: '#FFF' }}>PTS</Typography>
          </Grid>
          <Grid container justify="center" alignItems="center" direction="column" style={{ width: 30 }}>
            <Typography variant="body2" style={{ fontSize: 16, color: '#FFF' }}>29</Typography>
            <Typography variant="body2" style={{ fontSize: 10, color: '#FFF' }}>AST</Typography>
          </Grid>
          <Grid container justify="center" alignItems="center" direction="column" style={{ width: 30 }}>
            <Typography variant="body2" style={{ fontSize: 16, color: '#FFF' }}>68</Typography>
            <Typography variant="body2" style={{ fontSize: 10, color: '#FFF' }}>REB</Typography>
          </Grid>
        </Grid>
      </Card>
      <Card
        raised
        component={Grid}
        container
        justify="center"
        alignItems="center"
        direction="column"
        style={{ height: 80, width: 110, backgroundColor: '#E74C3C' }}
      >
        <Typography variant="body2" style={{ fontSize: 14, color: '#FFF' }}>MIAMI</Typography>
        <Grid container justify="center" alignItems="center" style={{ height: 45 }}>
          <Grid container justify="center" alignItems="center" direction="column" style={{ width: 30 }}>
            <Typography variant="body2" style={{ fontSize: 16, color: '#FFF' }}>94</Typography>
            <Typography variant="body2" style={{ fontSize: 10, color: '#FFF' }}>PTS</Typography>
          </Grid>
          <Grid container justify="center" alignItems="center" direction="column" style={{ width: 30 }}>
            <Typography variant="body2" style={{ fontSize: 16, color: '#FFF' }}>22</Typography>
            <Typography variant="body2" style={{ fontSize: 10, color: '#FFF' }}>AST</Typography>
          </Grid>
          <Grid container justify="center" alignItems="center" direction="column" style={{ width: 30 }}>
            <Typography variant="body2" style={{ fontSize: 16, color: '#FFF' }}>54</Typography>
            <Typography variant="body2" style={{ fontSize: 10, color: '#FFF' }}>REB</Typography>
          </Grid>
        </Grid>
      </Card>
      <Card
        raised
        component={Grid}
        container
        justify="center"
        alignItems="center"
        direction="column"
        style={{ height: 80, width: 110, backgroundColor: '#8E44AD' }}
      >
        <Typography variant="body2" style={{ fontSize: 14, color: '#FFF' }}>DINWIDDIE</Typography>
        <Grid container justify="center" alignItems="center" style={{ height: 45 }}>
          <Grid container justify="center" alignItems="center" direction="column" style={{ width: 30 }}>
            <Typography variant="body2" style={{ fontSize: 16, color: '#FFF' }}>8</Typography>
            <Typography variant="body2" style={{ fontSize: 10, color: '#FFF' }}>PTS</Typography>
          </Grid>
          <Grid container justify="center" alignItems="center" direction="column" style={{ width: 30 }}>
            <Typography variant="body2" style={{ fontSize: 16, color: '#FFF' }}>5</Typography>
            <Typography variant="body2" style={{ fontSize: 10, color: '#FFF' }}>AST</Typography>
          </Grid>
          <Grid container justify="center" alignItems="center" direction="column" style={{ width: 30 }}>
            <Typography variant="body2" style={{ fontSize: 16, color: '#FFF' }}>0</Typography>
            <Typography variant="body2" style={{ fontSize: 10, color: '#FFF' }}>REB</Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  </Grid>
));

export default GameAthleteStatsComparison;
