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
  homeTeamName,
  awayTeamName,
  homeTeamResourceId,
  awayTeamResourceId,
  homeTeamPointsByQuarter,
  awayTeamPointsByQuarter,
) => ({
  labels: ['', 'Q1', 'Q2', 'Q3', 'Q4', ''],
  datasets: [{
    data: [0, ...homeTeamPointsByQuarter, 0],
    borderColor: teamColors[homeTeamResourceId].primary.rgba(),
    backgroundColor: teamColors[homeTeamResourceId].secondary.rgba(0.25),
    pointRadius: 0,
    fill: true,
    label: homeTeamName,
  }, {
    data: [0, ...awayTeamPointsByQuarter, 0],
    borderColor: teamColors[awayTeamResourceId].primary.rgba(),
    backgroundColor: teamColors[awayTeamResourceId].secondary.rgba(0.25),
    pointRadius: 0,
    fill: true,
    label: awayTeamName,
  }],
});

const populateLineChartOptions = () => ({
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
});

const GameTeamStatsBoxChart = memo(({
  homeTeamId,
  homeTeamName,
  awayTeamId,
  awayTeamName,
  homeTeamStatistics,
  awayTeamStatistics,
}) => {
  const homeTeamResourceId = `${homeTeamName}_${homeTeamId}`;
  const awayTeamResourceId = `${awayTeamName}_${awayTeamId}`;

  const lineChartLabels = [homeTeamName, awayTeamName];
  const lineChartData = populateLineChartData(
    homeTeamName,
    awayTeamName,
    homeTeamResourceId,
    awayTeamResourceId,
    [
      homeTeamStatistics.PTS_QTR1,
      homeTeamStatistics.PTS_QTR2,
      homeTeamStatistics.PTS_QTR3,
      homeTeamStatistics.PTS_QTR4,
    ],
    [
      awayTeamStatistics.PTS_QTR1,
      awayTeamStatistics.PTS_QTR2,
      awayTeamStatistics.PTS_QTR3,
      awayTeamStatistics.PTS_QTR4,
    ],
  );
  const lineChartOptions = populateLineChartOptions(
    homeTeamName.toUpperCase(),
    awayTeamName.toUpperCase(),
  );

  return (
    <Grid container justify="center" alignItems="flex-end" style={styles.lineChartContainer}>
      <Line data={lineChartData} labels={lineChartLabels} options={lineChartOptions} />
    </Grid>
  );
});

export default GameTeamStatsBoxChart;
