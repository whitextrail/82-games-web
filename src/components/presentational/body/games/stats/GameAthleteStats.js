import React, { memo } from 'react';
import {
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';

const styles = {
  container: {
    marginTop: 15,
    height: 240,
    width: 355,
    backgroundColor: 'transparent',
    border: '3px solid #333'
  },
  statsContainer: {
    paddingTop: 20,
  },
  athleteName: {
    fontSize: 14,
    fontWeight: 600,
  },
  chartContainer: {
    position: 'relative',
    width: 275,
    marginTop: 25,
  },
};

const populateDoughnutChartData = (PTS, REB, AST) => ({
	labels: [
		`PTS: ${PTS}`,
		`REB: ${REB}`,
		`AST: ${AST}`,
	],
	datasets: [{
    data: [PTS, REB, AST],
    borderColor: [
      'rgba(46,204,113,1)',
      'rgba(255,59,63,1)',
      'rgba(52,152,219,1)',
    ],
		backgroundColor: [
		'rgba(46,204,113,0.1)',
		'rgba(255,59,63,0.1)',
		'rgba(52,152,219,0.1)'
		],
	}]
});

const doughnutChartOptions = {
  response: true,
  legend: {
    display: true,
    position: 'right'
  },
};

const GameAthleteStats = memo(({
  name,
  stats: {
    PTS,
    REB,
    AST,
  }
}) => {
  return (
    <Paper
      component={Grid}
      container
      justify="flex-end"
      alignItems="center"
      direction="column"
      style={styles.container}
    >
      <Grid container justify="center" alignItems="center" direction="column" style={styles.statsContainer}>
        <Typography variant="body2" color="secondary" style={styles.athleteName}>
          {name}
        </Typography>
        <Grid container style={styles.chartContainer}>
          <Doughnut
            data={populateDoughnutChartData(PTS, REB, AST)}
            options={doughnutChartOptions}
          />
        </Grid>
      </Grid>
    </Paper>
  );
});

export default GameAthleteStats;
