import React, { memo } from 'react';
import {
  Grid,
  Paper,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import * as svg from '../../../../../assets/svg/index';

const styles = {
  container: {
    marginTop: 15,
    height: 310,
    width: 355,
    position: 'relative',
    backgroundColor: 'transparent',
    border: '3px solid #333'
  },
  lineChartContainer: {
    position: 'relative',
    paddingRight: 5,
    width: 375,
    height: 180,
    borderRadius: 5,
  },
  teamStatsContainer: {
    height: 100,
    width: 355,
    borderRadius: 5,
  },
};

const lineChartData = {
  labels: ['', '1st', '2nd', '3rd', '4th', ''],
  datasets: [{
    data: [0, 23, 24, 24, 23, 0],
    backgroundColor: 'rgba(255,59,63,0.10)',
    borderColor: 'rgb(255,59,63)',
    pointRadius: 0,
    fill: true,
    label: 'Miami',
  }, {
    data: [0, 32, 31, 29, 21, 0],
    backgroundColor: 'rgba(0,0,0,0.10)',
    borderColor: 'rgb(0,0,0)',
    pointRadius: 0,
    fill: true,
    label: 'Brooklyn',
  }],
};

const lineChartOptions = {
  responsive: true,
  title: {
    display: true,
    fontFamily: "'Red Hat Display', sans-serif",
    fontColor: '#FFF',
    fontSize: 14,
    text: 'BROOKLYN vs MIAMI',
  },
  layout: {
    padding: { top: 0 }
  },
  legend: {
    display: false,
  },
  scales: {
    xAxes: [{
      display: true,
      offset: true,
      gridLines: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: true,
        fontFamily: "'Red Hat Display', sans-serif",
        fontColor: '#FFF',
        fontSize: 14,
      },
      scaleLabel: {
        display: true,
      }
    }],
    yAxes: [{
      display: true,
      offset: true,
      gridLines: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: false,
      },
      scaleLabel: {
        display: false,
      }
    }]
  }
};

const StatsBar = ({
  teamImageSrc,
  barValueLabel,
  value,
  barColor,
  barBackgroundColor,
}) => {
  const statsBarClasses = makeStyles({
    barColorPrimary: {
      backgroundColor: barColor,
    },
    colorPrimary: {
      backgroundColor: barBackgroundColor,
    },
  })();

  const statsBarClassStyles = {
    barColorPrimary: statsBarClasses.barColorPrimary,
    colorPrimary: statsBarClasses.colorPrimary,
  };

  const styles = {
    statsBarContainer: {
      height: 40,
      width: '100%',
    },
    statsBarLabelsContainer: {
      height: 30,
      paddingRight: 3,
      paddingLeft: 3,
    },
    statsBarValueLabel: {
      color: '#FFF',
      fontSize: 14,
    },
    statsBar: {
      height: 16,
      width: 230,
      borderRadius: 3,
      marginRight: 10,
      marginLeft: 10,
    },
  };

  return (
    <Grid container justify="center" alignItems="center" style={styles.statsBarContainer}>
      <img src={svg[teamImageSrc]} alt="Brooklyn" style={{ height: 30 }} />
      <LinearProgress
        color="primary"
        classes={statsBarClassStyles}
        variant="determinate"
        value={value}
        style={styles.statsBar}
      />
      <Typography variant="body2" style={styles.statsBarValueLabel}>{barValueLabel}</Typography>
    </Grid>
  );
};

const GameTeamStats = memo(() => {
  return (
    <Paper
      component={Grid}
      container
      justify="flex-end"
      alignItems="center"
      direction="column"
      style={styles.container}
    >
      <Grid container justify="center" style={styles.lineChartContainer}>
        <Line
          data={lineChartData}
          labels={['Brooklyn', 'Miami']}
          options={lineChartOptions}
        />
      </Grid>
      <Grid container justify="flex-start" alignItems="center" direction="column" style={styles.teamStatsContainer}>
        <StatsBar
          teamImageSrc="Brooklyn_1"
          barValueLabel="113"
          value={100}
          barColor="rgb(0,0,0)"
          barBackgroundColor="rgba(0,0,0,0.54)"
        />
        <StatsBar
          teamImageSrc="Miami_21"
          barValueLabel="94"
          value={(94/113) * 100}
          barColor="rgb(255,59,63)"
          barBackgroundColor="rgba(255,59,63,0.10)"
        />
      </Grid>
    </Paper>
  );
});

export default GameTeamStats;
