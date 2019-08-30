import React, { memo, Fragment } from 'react';
import {
  Grid,
  Button,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListSubheader,
} from '@material-ui/core';
import GameDetails from './GameDetails';
import GameTeams from './GameTeams';
import avatar from '../../../../assets/img/spencer_dinwiddie.png';
import {
  primaryColor,
  secondaryColor,
  secondaryTextColor,
} from '../../../../styles/constants';

const styles = {
  container: {
    height: '100%',
    backgroundColor: secondaryColor,
    overflow: 'hidden',
  },
  list: {
    width: '100%',
    backgroundColor: secondaryColor,
    position: 'relative',
    overflow: 'auto',
    maxHeight: '100%',
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 4,
  },
  card: {
    marginRight: 4,
    marginLeft: 3,
    borderRadius: 2,
    width: '100%',
  },
  cardHeaderAction: {
    color: secondaryTextColor,
    backgroundColor: primaryColor,
  },
  cardContent: {
    height: 225,
    padding: 0,
  },
};

const ListChildren = memo(({
  games,
  teamsById,
}) => (
  games.allIds.map((gameId) => {
    const {
      homeTeamId,
      awayTeamId,
      dateTime,
      arena,
    } = games.byId[gameId];
    const { name: homeTeamName } = teamsById[homeTeamId];
    const { name: awayTeamName } = teamsById[awayTeamId];

    return (
      <Fragment key={gameId}>
        <ListSubheader>{`Game ${gameId} - ${homeTeamName} vs. ${awayTeamName}`}</ListSubheader>
        <ListItem disableGutters style={styles.listItem} key={gameId}>
          <Card style={styles.card}>
            <CardHeader
              avatar={<Avatar src={avatar} />}
              action={<Button size="small" variant="contained" style={styles.cardHeaderAction}>JOIN</Button>}
              title="Spencer Dinwiddie"
              subheader="0 PTS - 0 STL - 0 AST"
            />
            <CardContent style={styles.cardContent}>
              <GameDetails dateTime={dateTime} arena={arena} />
              <GameTeams />
            </CardContent>
          </Card>
        </ListItem>
      </Fragment>
    );
  }))
);

const Games = memo(({ games, teams }) => {
  return (
    <Grid item xs={12} style={styles.container}>
      <List disablePadding style={styles.list} subheader={<li />}>
        <ListChildren games={games} teamsById={teams.byId} />
      </List>
    </Grid>
  );
});

export default Games;
