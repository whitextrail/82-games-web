import React, { memo } from 'react';
import {
  Grid,
  Card,
  Typography,
} from '@material-ui/core';

const styles = {
  container: {
    maxHeight: '95%',
    width: 355,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },
  statsBoxHeaderContainer: {
    height: 40,
    paddingLeft: 75,
  },
  statsBoxHeader: {
    width: 50,
    color: '#FFF',
    fontSize: 18,
    textDecoration: 'underline',
  },
  statsBoxTeamContainer: {
    height: 65,
  },
  teamImageContainer: {
    width: 75,
  },
  teamImage: {
    height: 40,
  },
  quarterPoints: {
    width: 50,
    color: '#FFF',
    fontSize: 18,
  },
};

const GameTeamStats = memo(({ teamStats, children }) => {
  return (
    <Card
      raised
      component={Grid}
      container
      alignItems="center"
      direction="column"
      style={styles.container}
    >
      <Grid container justify="center" alignItems="flex-end" style={styles.statsBoxHeaderContainer}>
        <Typography variant="body2" align="center" style={styles.statsBoxHeader}>Q1</Typography>
        <Typography variant="body2" align="center" style={styles.statsBoxHeader}>Q2</Typography>
        <Typography variant="body2" align="center" style={styles.statsBoxHeader}>Q3</Typography>
        <Typography variant="body2" align="center" style={styles.statsBoxHeader}>Q4</Typography>
      </Grid>
      {
        teamStats.map(({ teamId, PTS_QTR1, PTS_QTR2, PTS_QTR3, PTS_QTR4 }) => (
          <Grid key={teamId} container justify="center" alignItems="center" style={styles.statsBoxTeamContainer}>
            <Grid container justify="center" alignItems="center" style={styles.teamImageContainer}>
              {/* <img src={svg[teamId]} alt={teamId} style={styles.teamImage} /> */}
            </Grid>
            <Typography variant="body2" align="center" style={styles.quarterPoints}>{PTS_QTR1}</Typography>
            <Typography variant="body2" align="center" style={styles.quarterPoints}>{PTS_QTR2}</Typography>
            <Typography variant="body2" align="center" style={styles.quarterPoints}>{PTS_QTR3}</Typography>
            <Typography variant="body2" align="center" style={styles.quarterPoints}>{PTS_QTR4}</Typography>
          </Grid>
        ))
      }
      {children}
    </Card>
  );
});

export default GameTeamStats;
