import React, { memo } from 'react';
import {
  Grid,
  Card,
  Typography,
} from '@material-ui/core';
import * as svg from '../../../../assets/svg/index';

const styles = {
  container: {
    height: 170,
    width: 355,
    background: '#333',
    paddingBottom: 10,
  },
  statsBoxHeaderContainer: {
    height: 40,
    paddingLeft: 79,
  },
  statsBoxHeader: {
    width: 69,
    color: '#FFF',
    fontSize: 18,
    textDecoration: 'underline',
  },
  statsBoxTeamContainer: {
    height: 65,
  },
  teamImageContainer: {
    width: 79,
    position: 'relative',
  },
  teamImage: {
    height: 45,
    right: 5,
    position: 'absolute',
  },
  quarterPoints: {
    width: 69,
    color: '#FFF',
    fontSize: 18,
  },
  winLoseText: {
    width: 55,
  },
};

const GameTeamStats = memo(({ teamStats }) => {
  return (
    <Card
      raised
      component={Grid}
      container
      justify="center"
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
        teamStats.map(({ teamName, resourceId, Q1, Q2, Q3, Q4 }) => (
          <Grid container justify="center" alignItems="center" style={styles.statsBoxTeamContainer}>
            <Grid container justify="center" alignItems="center" style={styles.teamImageContainer}>
              <img src={svg[resourceId]} alt={teamName} style={styles.teamImage} />
            </Grid>
            <Typography variant="body2" align="center" style={styles.quarterPoints}>{Q1}</Typography>
            <Typography variant="body2" align="center" style={styles.quarterPoints}>{Q2}</Typography>
            <Typography variant="body2" align="center" style={styles.quarterPoints}>{Q3}</Typography>
            <Typography variant="body2" align="center" style={styles.quarterPoints}>{Q4}</Typography>
          </Grid>
        ))
      }
    </Card>
  );
});

export default GameTeamStats;
