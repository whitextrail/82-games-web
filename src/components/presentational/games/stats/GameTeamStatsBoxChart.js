import React, { memo } from 'react';
import { Grid } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { teamColors } from '../../../../styles/constants';

const styles = {
  lineChartContainer: {
    width: 375,
    height: 215,
    position: 'relative',
  },
};

const populateLineChartData = (
  homeTeamId,
  awayTeamId,
  homeTeamPointsByQuarter,
  awayTeamPointsByQuarter,
) => ({
  labels: ['', 'Q1', 'Q2', 'Q3', 'Q4', ''],
  datasets: [{
    data: [0, ...homeTeamPointsByQuarter, 0],
    borderColor: teamColors[homeTeamId].primary.rgba(),
    backgroundColor: teamColors[homeTeamId].secondary.rgba(0.25),
    pointRadius: 0,
    fill: true,
    label: homeTeamId,
  }, {
    data: [0, ...awayTeamPointsByQuarter, 0],
    borderColor: teamColors[awayTeamId].primary.rgba(),
    backgroundColor: teamColors[awayTeamId].secondary.rgba(0.25),
    pointRadius: 0,
    fill: true,
    label: awayTeamId,
  }],
});

const lineChartOptions = {
  responsive: true,
  layout: {
    padding: {
      bottom: -10,
    }
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

const GameTeamStatsBoxChart = memo(({
  homeTeamId,
  awayTeamId,
  homeTeamPointsByQuarter,
  awayTeamPointsByQuarter,
}) => {
  const lineChartLabels = [homeTeamId, awayTeamId];
  const lineChartData = populateLineChartData(
    homeTeamId,
    awayTeamId,
    homeTeamPointsByQuarter,
    awayTeamPointsByQuarter,
  );

  return (
    <Grid container justify="center" alignItems="flex-end" style={styles.lineChartContainer}>
      <Line data={lineChartData} labels={lineChartLabels} options={lineChartOptions} />
    </Grid>
  );
});

export default GameTeamStatsBoxChart;
