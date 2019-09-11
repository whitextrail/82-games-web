import React, { memo } from 'react';
import {
  Grid,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import {
  KeyboardArrowLeftSharp,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import avatar from '../../../../assets/img/sdin.png';

const styles = {
  container: {
    // paddingTop: 20,
    position: 'relative'
  },
  img: {
    // height: 120,
    width: 295,
  },
  statsContainer: {
    padding: '60px 20px 20px 20px',
    height: 485,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
  },
  athleteStatsContainer: {
    height: 200,
    width: 200,
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
      height: '15%',
      width: 125,
      marginBottom: 20,
    },
    statsBarLabelsContainer: {
      width: '100%',
    },
    statsBarValueLabel: {
      fontWeight: 600,
      fontSize: 14,
    },
    statsBar: {
      height: 7.5,
      borderRadius: 15,
    },
  };

  return (
    <Grid container justify="space-around" direction="column" style={styles.statsBarContainer}>
      <Grid container justify="space-between" style={styles.statsBarLabelsContainer}>
        <Typography variant="body2">{barNameLabel}</Typography>
        <Typography style={styles.statsBarValueLabel}>{barValueLabel}</Typography>
      </Grid>
      <LinearProgress
        color="primary"
        classes={statsBarClassStyles}
        variant="determinate"
        value={value}
        style={styles.statsBar}
      />
    </Grid>
  );
};

const GameStats = memo(() => {
  return (
    <Grid container direction="column" style={styles.container}>
      <Grid
        container
        style={{ backgroundColor: 'black', height: '43%', position: 'relative' }}
      >
        <Grid container style={{ paddingTop: 16, paddingLeft: 18, width: '10%' }}>
          <KeyboardArrowLeftSharp color="secondary" />
        </Grid>
        <Grid
          container
          direction="column"
          style={{ position: 'absolute', paddingTop: 50, paddingLeft: 26, width: 125, backgroundColor: 'transparent' }}
        >
          <Typography variant="h5" color="secondary" align="left" style={{ fontSize: 24 }}>Spencer</Typography>
          <Typography variant="h5" color="secondary" align="left" style={{ fontSize: 24 }}>Dinwiddie</Typography>
        </Grid>
        <Grid container justify="flex-end" alignItems="flex-end" style={{ width: '100%' }}>
          <img src={avatar} style={styles.img} />
        </Grid>
      </Grid>
      <Grid container style={styles.statsContainer}>
        <Grid
          container
          alignItems="center"
          direction="column"
          style={styles.athleteStatsContainer}
        >
          <Grid
            container
            alignItems="center"
            direction="column"
            style={styles.athleteStatsContainer}
          >
            <StatsBar
              barNameLabel="Game 82"
              barValueLabel="3"
              value={(3/16.8) * 100}
              barColor="#000"
              barBackgroundColor="#A9A9A9"
            />
            <StatsBar
              barNameLabel="Season"
              barValueLabel="16.8"
              value={100}
            />
            <StatsBar
              barNameLabel="Career"
              barValueLabel="11"
              value={(11/16.8) * 100}
              barColor="#0060ff"
              barBackgroundColor="#7FE1FF"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});

export default GameStats;
