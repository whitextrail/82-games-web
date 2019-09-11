import React, { memo } from 'react';
import {
  Grid,
  Paper,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import { ChevronLeftSharp, ChevronRightSharp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import avatar from '../../assets/img/sdin.png';
import { primaryColor } from '../../styles/constants';
import AthleteStats from './AthleteStats';

const styles = {
  container: {
    position: 'absolute',
    backgroundColor: 'black',
  },
  backgroundContainer: {
    backgroundColor: 'black',
    height: '40%',
    position: 'relative',
    top: 0,
  },
  imgTextContainer: {
    paddingLeft: 26,
    width: 125,
    height: 65,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  imgText: {
    fontSize: 24,
    fontWeight: 600,
  },
  img: {
    width: 305,
    height: 310,
  },
  statsContainer: {
    paddingTop: 45,
    width: '100%',
    backgroundColor: 'transparent',
    position: 'relative',
    bottom: 0,
  },
  athleteStatsContainer: {
    height: 300,
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

const GameStats = memo(() => {
  return (
    <Grid container direction="column" style={styles.container}>
      <Grid container style={styles.backgroundContainer}>
        <Grid container direction="column" style={styles.imgTextContainer}>
          <Typography variant="h5" color="secondary" align="left" style={styles.imgText}>#8</Typography>
          <Typography variant="h5" color="secondary" align="left" style={styles.imgText}>SPENCER</Typography>
          <Typography variant="h5" color="secondary" align="left" style={styles.imgText}>DINWIDDIE</Typography>
        </Grid>
        <Grid container justify="flex-end" style={styles.imgContainer}>
          <img src={avatar} style={styles.img} alt="Spencer Dinwiddie" />
        </Grid>
      </Grid>
      <Grid container direction="column" style={styles.statsContainer}>
        <Grid container>
          <Grid container justify="center" style={{ marginLeft: 5 }}>
            <Paper
              component={Grid}
              container
              justify="center"
              alignItems="center"
              direction="column"
              style={{
                height: 210,
                width: 175,
                borderRadius: 5,
                paddingTop: 12.5,
              }}
            >
              <AthleteStats />
              <Grid container justify="space-between" alignItems="center" style={{ height: 60, paddingRight: 7.5, paddingLeft: 7.5 }}>
                <Grid container justify="center" alignItems="center" style={{ width: 40 }}>
                  <ChevronLeftSharp style={{ fontSize: 18, color: '#A9A9A9' }} />
                  <Typography variant="body2" style={{ fontSize: 10, color: '#A9A9A9' }}>REB</Typography>
                </Grid>
                <Grid container justify="center" alignItems="center" style={{ width: 40 }}>
                  <Typography variant="body2" style={{ fontSize: 16, fontWeight: 900 }}>PTS</Typography>
                </Grid>
                <Grid container justify="center" alignItems="center" style={{ width: 40 }}>
                  <Typography variant="body2" style={{ fontSize: 10, color: '#A9A9A9' }}>AST</Typography>
                  <ChevronRightSharp style={{ fontSize: 18, color: '#A9A9A9' }} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid container justify="center" style={{ marginRight: 5 }}>
            <Paper
              component={Grid}
              container
              justify="center"
              alignItems="center"
              direction="column"
              style={{
                height: 210,
                width: 175,
                borderRadius: 5,
                backgroundColor: primaryColor
              }}
            >
              <Grid container alignItems="center" direction="column">
                <Grid container justify="space-between" alignItems="center" direction="column" style={{ paddingTop: 10, height: 80, marginBottom: 10 }}>
                  <Typography variant="body2" color="secondary" style={{ fontSize: 14, fontWeight: 600 }}>GAME #82 STATS</Typography>
                  <Typography variant="body2" align="center" style={{ fontSize: 10 }}>vs. season '18-19 averages</Typography>
                </Grid>
                <Grid container justify="flex-start" alignItems="center" direction="column">
                  <StatsBar
                    barNameLabel="PTS"
                    barValueLabel="8"
                    value={(8/16.8) * 100}
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
                    barValueLabel="5"
                    value={(4.6/4.6) * 100}
                    barColor="#FFF"
                    barBackgroundColor="rgba(0,0,0,0.54)"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});

            // <StatsBar
            //   barNameLabel="Season"
            //   barValueLabel="16.8"
            //   value={100}
            //   barColor="#FFF"
            //   barBackgroundColor="rgba(0,0,0,0.54)"
            // />
            // <StatsBar
            //   barNameLabel="Career"
            //   barValueLabel="11"
            //   value={(11/16.8) * 100}
            //   barColor="#FFF"
            //   barBackgroundColor="rgba(0,0,0,0.54)"
            // />

export default GameStats;
