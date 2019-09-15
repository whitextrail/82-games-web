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
import { teamColors } from '../../../../../styles/constants';

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
    backgroundColor: teamColors[homeTeamResourceId].secondary.rgba(0.2),
    pointRadius: 0,
    fill: true,
    label: 'Brooklyn',
  }, {
    data: [0, ...awayTeamPointsByQuarter, 0],
    borderColor: teamColors[awayTeamResourceId].primary.rgba(),
    backgroundColor: teamColors[awayTeamResourceId].secondary.rgba(0.2),
    pointRadius: 0,
    fill: true,
    label: 'Miami',
  }],
});

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

const GameTeamStats = memo(({
  homeTeam,
  awayTeam,
}) => {
  const {
    id: homeTeamId,
    name: homeTeamName,
    points: {
      total: homeTeamTotalPoints,
      byQuarter: homeTeamPointsByQuarter,
    },
  } = homeTeam;
  const {
    id: awayTeamId,
    name: awayTeamName,
    points: {
      total: awayTeamTotalPoints,
      byQuarter: awayTeamPointsByQuarter,
    },
  } = awayTeam;
  const lineChartLabels = [
    homeTeamName,
    awayTeamName,
  ];
  const barChartDenominator = homeTeamTotalPoints > awayTeamTotalPoints
    ? homeTeamTotalPoints
    : awayTeamTotalPoints;
  const homeTeamResourceId = `${homeTeamName}_${homeTeamId}`;
  const awayTeamResourceId = `${awayTeamName}_${awayTeamId}`;

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
          data={(
            populateLineChartData(
              homeTeamResourceId,
              awayTeamResourceId,
              homeTeamPointsByQuarter,
              awayTeamPointsByQuarter,
            )
          )}
          labels={lineChartLabels}
          options={lineChartOptions}
        />
      </Grid>
      <Grid container justify="flex-start" alignItems="center" direction="column" style={styles.teamStatsContainer}>
        {
          [homeTeam, awayTeam].map(({
            name,
            id,
            points: { total }
          }) => {
            const teamResourceId = `${name}_${id}`;
            const {
              primary,
              secondary,
            } = teamColors[teamResourceId];
            const statsBarValue = (total / barChartDenominator) * 100;

            return (
              <StatsBar
                key={name}
                teamImageSrc={teamResourceId}
                barValueLabel={total}
                value={statsBarValue}
                barColor={primary.hex}
                barBackgroundColor={secondary.rgba(0.2)}
              />
            );
          })
        }
      </Grid>
    </Paper>
  );
});

export default GameTeamStats;
