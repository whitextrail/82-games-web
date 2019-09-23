import React, { memo } from 'react';
import {
  Grid,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import * as svg from '../../../../assets/svg/index';
import { teamColors } from '../../../../styles/constants';

const styles = {
  container: {
    marginTop: 15,
    height: 280,
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

const populateLineChartData = (
  homeTeamResourceId,
  awayTeamResourceId,
  homeTeamPointsByQuarter,
  awayTeamPointsByQuarter,
) => ({
  labels: ['', '1st', '2nd', '3rd', '4th', ''],
  datasets: [{
    data: [0, ...homeTeamPointsByQuarter, 0],
    borderColor: teamColors[homeTeamResourceId].primary.rgba(),
    backgroundColor: teamColors[homeTeamResourceId].secondary.rgba(0.25),
    pointRadius: 0,
    fill: true,
    label: homeTeamResourceId,
  }, {
    data: [0, ...awayTeamPointsByQuarter, 0],
    borderColor: teamColors[awayTeamResourceId].primary.rgba(),
    backgroundColor: teamColors[awayTeamResourceId].secondary.rgba(0.25),
    pointRadius: 0,
    fill: true,
    label: awayTeamResourceId,
  }],
});

const populateLineChartOptions = () => ({
  responsive: true,
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
});

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

const GameTeamStats = memo(({
  homeTeamName,
  homeTeamId,
  awayTeamName,
  awayTeamId,
  homeTeamPoints,
  awayTeamPoints,
  homeQ1,
  homeQ2,
  homeQ3,
  homeQ4,
  awayQ1,
  awayQ2,
  awayQ3,
  awayQ4,
}) => {
  const homeTeamResourceId = `${homeTeamName}_${homeTeamId}`;
  const awayTeamResourceId = `${awayTeamName}_${awayTeamId}`;
  const barChartDenominator = (homeTeamPoints > awayTeamPoints)
    ? homeTeamPoints
    : awayTeamPoints;
  const homeTeamColors = teamColors[homeTeamResourceId];
  const awayTeamColors = teamColors[awayTeamResourceId];

  const lineChartLabels = [homeTeamName,awayTeamName];
  const lineChartData = populateLineChartData(
    homeTeamResourceId,
    awayTeamResourceId,
    [homeQ1,homeQ2,homeQ3,homeQ4],
    [awayQ1,awayQ2,awayQ3,awayQ4],
  );
  const lineChartOptions = populateLineChartOptions(
    homeTeamName.toUpperCase(),
    awayTeamName.toUpperCase(),
  );

  return (
    <Grid
      container
      justify="flex-end"
      alignItems="center"
      direction="column"
      style={styles.container}
    >
      <Grid container justify="center" style={styles.lineChartContainer}>
        <Line
          data={lineChartData}
          labels={lineChartLabels}
          options={lineChartOptions}
        />
      </Grid>
      <Grid container justify="flex-start" alignItems="center" direction="column" style={styles.teamStatsContainer}>
        <StatsBar
          teamImageSrc={homeTeamResourceId}
          barValueLabel={homeTeamPoints}
          value={(homeTeamPoints / barChartDenominator) * 100}
          barColor={homeTeamColors.primary.hex}
          barBackgroundColor={homeTeamColors.secondary.rgba(0.75)}
        />
        <StatsBar
          teamImageSrc={awayTeamResourceId}
          barValueLabel={awayTeamPoints}
          value={(awayTeamPoints / barChartDenominator) * 100}
          barColor={awayTeamColors.primary.hex}
          barBackgroundColor={awayTeamColors.secondary.rgba(0.75)}
        />
      </Grid>
    </Grid>
  );
});

export default GameTeamStats;
