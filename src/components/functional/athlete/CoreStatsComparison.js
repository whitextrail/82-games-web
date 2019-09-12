import React, { memo, useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  LinearProgress,
  Grow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { primaryColor } from '../../../styles/constants';
import GameStatsPolarChart from '../../presentational/body/games/stats/GameStatsPolarChart';

const styles = {
  paperOne: {
    height: 210,
    width: 175,
    borderRadius: 5,
    paddingTop: 12.5,
  },
  paperTwo: {
    height: 210,
    width: 175,
    borderRadius: 5,
    backgroundColor: primaryColor
  },
  chartContainer: {
    height: 60,
    paddingRight:7.5,
    paddingLeft: 7.5,
  },
};

const StatsBar = ({
  barNameLabel,
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
      fontWeight: 600,
      fontSize: 12,
    },
    statsBar: {
      height: 16,
      width: '55%',
      borderRadius: 5,
      marginRight: 7,
      marginLeft: 7,
    },
  };

  return (
    <Grid container justify="center" alignItems="center" style={styles.statsBarContainer}>
      <Typography style={styles.statsBarValueLabel}>{barNameLabel}</Typography>
      <LinearProgress
        color="primary"
        classes={statsBarClassStyles}
        variant="determinate"
        value={value}
        style={styles.statsBar}
      />
      <Typography style={styles.statsBarValueLabel}>{barValueLabel}</Typography>
    </Grid>
  );
};

const polarOptions = ['REB', 'PTS', 'AST'];
const polarStats = {
  REB: [0, 2.4, 2.6],
  PTS: [0, 16.8, 11],
  AST: [0, 4.6, 4.5],
};

const AthleteCoreStatsComparison = memo(() => {
  const [currentPolarPosition, changePolarPosition] = useState(polarOptions[1]);

  return (
    <Grid container justify="space-between" style={{ height: 175, width: window.innerWidth - 20 }}>
      <Grid container justify="center" style={{ width: 172.5 }}>
        <Paper
          component={Grid}
          container
          justify="center"
          alignItems="center"
          direction="column"
          style={styles.paperOne}
        >
          <GameStatsPolarChart data={polarStats[currentPolarPosition]} />
          <Grid container justify="space-between" alignItems="center" style={styles.chartContainer}>
            {
              polarOptions.map((polarOption) => (
                <Grid key={polarOption} container justify="center" alignItems="center" style={{ width: 40 }} onClick={() => changePolarPosition(polarOption)}>
                  <Grow in={true} style={currentPolarPosition === polarOption ? { fontSize: 16, fontWeight: 600 } : { fontSize: 10, color: '#A9A9A9' }}>
                    <Typography variant="body2">{polarOption}</Typography>
                  </Grow>
                </Grid>
              ))
            }
          </Grid>
        </Paper>
      </Grid>
      <Grid container justify="center" style={{ width: 172.5 }}>
        <Paper
          component={Grid}
          container
          justify="center"
          alignItems="center"
          direction="column"
          style={styles.paperTwo}
        >
          <Grid container alignItems="center" direction="column">
            <Grid container justify="space-between" alignItems="center" direction="column" style={{ paddingTop: 10, height: 80, marginBottom: 10 }}>
              <Typography variant="body2" color="secondary" style={{ fontSize: 14, fontWeight: 600 }}>G1 STATS</Typography>
              <Typography variant="body2" align="center" style={{ fontSize: 10 }}>vs. season '18-19 averages</Typography>
            </Grid>
            <Grid container justify="flex-start" alignItems="center" direction="column">
              <StatsBar
                barNameLabel="PTS"
                barValueLabel="0"
                value={(0/16.8) * 100}
                barColor="#FFF"
                barBackgroundColor="rgba(0,0,0,0.54)"
              />
              <StatsBar
                barNameLabel="REB"
                barValueLabel="0"
                value={(0/2.4) * 100}
                barColor="#FFF"
                barBackgroundColor="rgba(0,0,0,0.54)"
              />
              <StatsBar
                barNameLabel="AST"
                barValueLabel="0"
                value={(0/4.6) * 100}
                barColor="#FFF"
                barBackgroundColor="rgba(0,0,0,0.54)"
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
});

export default AthleteCoreStatsComparison;
