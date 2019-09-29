import React, {
  memo,
  Fragment,
} from 'react';
import { reduce } from 'lodash';
import {
  Card,
  Avatar,
  CardHeader,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Typography,
  Divider,
} from '@material-ui/core';
import { primaryColor } from '../../../../../styles/constants';
import avatar from '../../../../../assets/img/spencer_dinwiddie.png';

const styles = {
  list: {
    width: '100%',
    overflow: 'auto',
    maxHeight: 250,
  },
};

const GameTeamStats = memo(({
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

  return (
    <Card raised style={{ width: 355, marginTop: 15, borderRadius: 0, }}>
      <CardHeader style={{ backgroundColor: '#333', color: '#FFF' }} avatar={<Avatar src={avatar} style={{ border: '1px solid #EFEFEF', height: 45, width: 45 }} />} title="Spencer Dinwiddie" subheader={"Past Games vs. Opponent"} subheaderTypographyProps={{ style: { color: '#FFF', fontSize: 12 } }} />
      <List disablePadding style={styles.list}>
        {
          sortedSeasonStatsKeys.map((id) => {
            const seasonGames = seasonStats[id];
            const sortedSeasonGameKeys = Object.keys(seasonGames).sort((a, b) => b - a);

            return (
              <Grid key={id} style={{ marginBottom: 2 }}>
                <ListSubheader disableSticky component={Grid} container justify="center" style={{ height: 35, backgroundColor: '#EFEFEF' }}>
                  <Grid item xs={2} container alignItems="flex-end">
                    <Typography variant="body2" style={{ fontSize: 12 }}>{`20${id}`}</Typography>
                  </Grid>
                  <Grid item xs={10} container justify="space-around" alignItems="flex-end">
                    <Typography variant="body2" align="center" style={{ minWidth: 25, fontSize: 12 }}>PTS</Typography>
                    <Typography variant="body2" align="center" style={{ minWidth: 25, fontSize: 12 }}>AST</Typography>
                    <Typography variant="body2" align="center" style={{ minWidth: 25, fontSize: 12 }}>REB</Typography>
                    <Typography variant="body2" align="center" style={{ minWidth: 25, fontSize: 12 }}>STL</Typography>
                    <Typography variant="body2" align="center" style={{ minWidth: 25, fontSize: 12 }}>BLK</Typography>
                    <Typography variant="body2" align="center" style={{ minWidth: 25, fontSize: 12 }}>PF</Typography>
                  </Grid>
                </ListSubheader>
                {
                  sortedSeasonGameKeys.map((gameId) => {
                    const {
                      PTS,
                      AST,
                      REB,
                      STL,
                      BLK,
                      PF,
                      gameNumber,
                    } = seasonGames[gameId];

                    return (
                      <ListItem key={gameNumber} component={Grid} container justify="center" alignItems="center" style={{ height: 50, backgroundColor: '#EFEFEF' }}>
                        <Grid item xs={2} container alignItems="center">
                          <Typography variant="body2" style={{ fontSize: 12 }}>G{gameNumber}</Typography>
                        </Grid>
                        <Grid item xs={10} container justify="space-around" alignItems="center">
                          <Typography variant="body2" align="center" style={{ minWidth: 25, fontSize: 12 }}>{PTS}</Typography>
                          <Typography variant="body2" align="center" style={{ minWidth: 25, fontSize: 12 }}>{AST}</Typography>
                          <Typography variant="body2" align="center" style={{ minWidth: 25, fontSize: 12 }}>{REB}</Typography>
                          <Typography variant="body2" align="center" style={{ minWidth: 25, fontSize: 12 }}>{STL}</Typography>
                          <Typography variant="body2" align="center" style={{ minWidth: 25, fontSize: 12 }}>{BLK}</Typography>
                          <Typography variant="body2" align="center" style={{ minWidth: 25, fontSize: 12 }}>{PF}</Typography>
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

export default GameTeamStats;
