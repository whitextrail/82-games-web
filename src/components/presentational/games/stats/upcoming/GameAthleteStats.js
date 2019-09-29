import React, { memo } from 'react';
import { reduce } from 'lodash';
import {
  Card,
  Avatar,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListSubheader,
  Typography,
} from '@material-ui/core';
import avatar from '../../../../../assets/img/spencer_dinwiddie.png';

const styles = {
  card: {
    width: 355,
    marginTop: 15,
    borderRadius: 0,
  },
  cardHeader: {
    backgroundColor: '#333',
    color: '#FFF',
  },
  cardHeaderAvatar: {
    border: '1px solid #EFEFEF',
    height: 45,
    width: 45,
  },
  cardHeaderSubheader: {
    color: '#FFF',
    fontSize: 12,
  },
  list: {
    width: '100%',
    overflow: 'auto',
    maxHeight: 250,
  },
  listItemContainer: {
    marginBottom: 2,
  },
  listSubheader: {
    height: 35,
    backgroundColor: '#FFF',
  },
  listItem: {
    height: 50,
    backgroundColor: '#EFEFEF',
  },
  athleteStatsPrimaryText: {
    fontSize: 12,
    minWidth: 42,
  },
  athleteStatsSecondaryText: {
    minWidth: 25,
    fontSize: 12,
  },
};

const GameAthleteStats = memo(({
  athleteGameStats,
}) => {
  const seasonStats = reduce(athleteGameStats, (acc, gameStats) => {
    const {
      gameId,
      seasonYears,
    } = gameStats;

    // Add years together for the purpose of sorting later
    // Larger seasonYearTotal = more recent
    const seasonYearTotal = `${seasonYears[0]}-${seasonYears[1]}`;

    return {
      ...acc,
      [seasonYearTotal]: {
        ...acc[seasonYearTotal] || {},
        [gameId]: { ...gameStats },
      },
    };
  }, {});
  const sortedSeasonStatsKeys = Object.keys(seasonStats).sort((a, b) => b.split('-')[1] - a.split('-')[1]);
  const statsTypes = ['PTS', 'AST', 'REB', 'STL', 'BLK', 'PF'];

  return (
    <Card raised style={styles.card}>
      <CardHeader
        style={styles.cardHeader}
        avatar={<Avatar src={avatar} style={styles.cardHeaderAvatar} />}
        title="Spencer Dinwiddie"
        subheader={"Past Games vs. Opponent"}
        subheaderTypographyProps={{ style: styles.cardHeaderSubheader }}
      />
      <List disablePadding style={styles.list}>
        {
          sortedSeasonStatsKeys.map((id) => {
            const seasonGames = seasonStats[id];
            const sortedSeasonGameKeys = Object.keys(seasonGames).sort((a, b) => b - a);

            return (
              <Grid key={id} style={styles.listItemContainer}>
                <ListSubheader disableSticky component={Grid} container justify="center" style={styles.listSubheader}>
                  <Grid item xs={2} container alignItems="center">
                    <Typography variant="body2" style={styles.athleteStatsPrimaryText}>{`20${id}`}</Typography>
                  </Grid>
                  <Grid item xs={10} container justify="space-around" alignItems="center">
                    {
                      statsTypes.map(type => (
                        <Typography
                          variant="body2"
                          align="center"
                          style={styles.athleteStatsSecondaryText}
                        >
                          {type}
                        </Typography>
                      ))
                    }
                  </Grid>
                </ListSubheader>
                {
                  sortedSeasonGameKeys.map((gameId) => {
                    const { gameNumber } = seasonGames[gameId];

                    return (
                      <ListItem key={gameNumber} component={Grid} container justify="center" alignItems="center" style={styles.listItem}>
                        <Grid item xs={2} container justify="center" alignItems="center">
                          <Typography variant="body2" style={styles.athleteStatsPrimaryText}>G{gameNumber}</Typography>
                        </Grid>
                        <Grid item xs={10} container justify="space-around" alignItems="center">
                          {
                            statsTypes.map(type => (
                              <Typography
                                variant="body2"
                                align="center"
                                style={styles.athleteStatsSecondaryText}
                              >
                                {seasonGames[gameId][type]}
                              </Typography>
                            ))
                          }
                        </Grid>
                      </ListItem>
                    );
                  })
                }
              </Grid>
            );
          })
        }
      </List>
    </Card>
  );
});

export default GameAthleteStats;
