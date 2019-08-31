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
  Typography,
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
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 2,
    width: '100%',
  },
  cardHeaderAction: {
    marginTop: 7,
    marginRight: 5,
    color: secondaryTextColor,
    backgroundColor: primaryColor,
  },
  cardContent: {
    height: 240,
    padding: 0,
  },
  noGamesFoundContainer: {
    marginTop: 20,
  },
};

const NoGamesFound = memo(() => (
  <Grid container justify="center" style={styles.noGamesFoundContainer}>
    <Typography align="center">No games found.</Typography>
  </Grid>
));

const ListChildren = memo(({
  games,
  teamsById,
}) => (
  games.map(({
    id,
    homeTeamId,
    awayTeamId,
    localGameDateTime,
    arena,
  }) => {
    const { name: homeTeamName } = teamsById[homeTeamId];
    const { name: awayTeamName } = teamsById[awayTeamId];

    return (
      <Fragment key={id}>
        <ListSubheader>{`Game ${id} - ${homeTeamName} vs. ${awayTeamName}`}</ListSubheader>
        <ListItem disableGutters style={styles.listItem} key={id}>
          <Card style={styles.card}>
            <CardHeader
              avatar={<Avatar src={avatar} />}
              action={<Button size="small" variant="contained" style={styles.cardHeaderAction}>JOIN</Button>}
              title="Spencer Dinwiddie"
              subheader="0 PTS - 0 STL - 0 AST"
            />
            <CardContent style={styles.cardContent}>
              <GameDetails localGameDateTime={localGameDateTime} arena={arena} />
              <GameTeams />
            </CardContent>
          </Card>
        </ListItem>
      </Fragment>
    );
  }))
);

const Games = memo(({ games, teams }) => (
  <Grid item xs={12} style={styles.container}>
    <List disablePadding style={styles.list} subheader={<li />}>
      { games.length ? <ListChildren games={games} teamsById={teams.byId} /> : <NoGamesFound /> }
    </List>
  </Grid>
));

export default Games;
