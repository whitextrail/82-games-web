import React, { memo } from 'react';
import {
  map,
  reduce,
} from 'lodash';
import {
  Card,
  Grid,
  Typography,
} from '@material-ui/core';
import { teamColors } from '../../../../../styles/constants';
import * as jerseys from '../../../../../assets/teams/jerseys';
import * as numbers from '../../../../../assets/teams/numbers';

const styles = {
  card: {
    width: 355,
    height: 250,
    marginTop: 15,
    borderRadius: 0,
  },
  list: {
    width: '100%',
    overflow: 'auto',
    maxHeight: 250,
  },
  teamStatsHeader: {
    height: 50,
  },
  teamStatsTitle: {
    fontSize: 12,
    maxWidth: 100,
  },
  teamStatsText: {
    minWidth: 30,
    fontSize: 14,
  },
  teamStats: {
    height: 100,
    backgroundColor: '#EFEFEF',
  },
  jersey: {
    height: 65,
    position: 'absolute',
    top: 17.5,
    left: 35.735,
  },
  jerseyNumber: {
    height: 15,
    position: 'absolute',
    bottom: 27.5,
  },
};

const GameTeamStats = memo(({
  gameNumber,
  byGameStatsId,
}) => {
  const totalTeamStats = reduce(byGameStatsId, (acc, game) => {
    const {
      homeTeamId,
      awayTeamId,
      homeTeamPoints,
      awayTeamPoints,
      homeTeamStatistics: homeStats,
      awayTeamStatistics: awayStats,
    } = game;
    const accHome = acc[homeTeamId] || {
      WIN: 0,
      PTS: 0,
      AST: 0,
      REB: 0,
    };
    const accAway = acc[awayTeamId] || {
      WIN: 0,
      PTS: 0,
      AST: 0,
      REB: 0,
    };

    return ({
      [homeTeamId]: {
        WIN: accHome.WIN + (homeTeamPoints > awayTeamPoints ? 1 : 0),
        PTS: accHome.PTS + homeTeamPoints,
        AST: accHome.AST + homeStats.AST,
        REB: accHome.REB + homeStats.REB,
      },
      [awayTeamId]: {
        WIN: accAway.WIN + (awayTeamPoints > homeTeamPoints ? 1 : 0),
        PTS: accAway.PTS + awayTeamPoints,
        AST: accAway.AST + awayStats.AST,
        REB: accAway.REB + awayStats.REB,
      }
    });
  }, {});
  const numberOfGames = Object.keys(byGameStatsId).length;

  return (
    <Card raised style={styles.card} component={Grid} container justify="center" alignItems="center" direction="column">
      <Grid container justify="center" alignItems="center" style={styles.teamStatsHeader}>
        <Grid item xs={4} container justify="center" alignItems="center">
          <Typography variant="body2" align="center" style={styles.teamStatsTitle}>Past Team Match-up Statistics</Typography>
        </Grid>
        <Grid item xs={8} container justify="space-around" alignItems="center">
          <Typography variant="body2" align="center" style={styles.teamStatsText}>PTS</Typography>
          <Typography variant="body2" align="center" style={styles.teamStatsText}>AST</Typography>
          <Typography variant="body2" align="center" style={styles.teamStatsText}>REB</Typography>
          <Typography variant="body2" align="center" style={styles.teamStatsText}>W %</Typography>
        </Grid>
      </Grid>
      {
        map(totalTeamStats, ({ PTS, AST, REB, WIN }, key) => {
          const teamResourceId = `team_${key}`;
          const teamStatsStyle = {
            fontWeight: 600,
            color: teamColors[key].primary.hex,
            ...styles.teamStatsText,
          };
          const winPercentage = (WIN / numberOfGames) * 100;

          return (
            <Grid container justify="center" alignItems="center" key={key} style={styles.teamStats}>
              <Grid item xs={4} container justify="center" alignItems="center" style={{ position: 'relative' }}>
                <img src={jerseys[teamResourceId]} style={styles.jersey} alt={teamResourceId} />
                <img src={numbers[`number_white_${gameNumber}`]} style={styles.jerseyNumber} alt={teamResourceId} />
              </Grid>
              <Grid item xs={8} container justify="space-around" alignItems="center">
                <Typography variant="body2" align="center" style={teamStatsStyle}>{PTS}</Typography>
                <Typography variant="body2" align="center" style={teamStatsStyle}>{AST}</Typography>
                <Typography variant="body2" align="center" style={teamStatsStyle}>{REB}</Typography>
                <Typography variant="body2" align="center" style={teamStatsStyle}>{`${winPercentage}%`}</Typography>
              </Grid>
            </Grid>
          );
        })
      }
    </Card>
  );
});

export default GameTeamStats;
