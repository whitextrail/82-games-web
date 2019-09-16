import React, { memo, Fragment } from 'react';
import {
  Grid,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  ListItem,
  ListSubheader,
  Typography,
} from '@material-ui/core';
import GameListItemTeams from './GameListItemTeams';
import avatar from '../../../../assets/img/spencer_dinwiddie.png';

const styles = {
  listItem: {
    paddingTop: 0,
    paddingBottom: 4,
  },
  card: {
    borderRadius: 3,
    width: '100%',
  },
  cardContent: {
    height: 240,
    padding: 0,
  },
  gameDetailsContainer: {
    height: '25%',
    width: '90%',
    borderTop: '1px solid #EFEFEF',
    borderBottom: '1px solid #EFEFEF',
    paddingTop: 7,
    paddingBottom: 7,
  },
  actionButton: {
    marginTop: 5,
    marginRight: 5,
  },
};

const GameListItem = memo(({
  game: {
    season,
    gameNumber,
    localGameDateTime,
    arena,
  },
  athlete: {
    name: athleteName,
    teamId: athleteTeamId,
    performanceStatistics: { PTS, REB, AST },
  },
  homeTeam,
  awayTeam,
}) => (
  <Fragment>
    <ListSubheader disableSticky>
      {`Game ${gameNumber} (${season})`}
    </ListSubheader>
    <ListItem disableGutters style={styles.listItem}>
      <Card style={styles.card}>
        <CardHeader
          avatar={<Avatar src={avatar} />}
          // TODO: Create a set of buttons for interacting with GameListItem
          // action={<GameActionButton selectedStatusId={selectedStatusId} />}
          title={athleteName}
          subheader={`${PTS} PTS - ${REB} REB - ${AST} AST`}
        />
        <CardContent
          component={Grid}
          container
          alignItems="center"
          direction="column"
          style={styles.cardContent}
        >
          <Grid
            container
            justify="space-between"
            alignItems="center"
            direction="column"
            style={styles.gameDetailsContainer}
          >
            <Typography variant="body2">{localGameDateTime}</Typography>
            <Typography variant="body2">{arena}</Typography>
          </Grid>
          <GameListItemTeams isHome={homeTeam.id === athleteTeamId} homeTeam={homeTeam} awayTeam={awayTeam} />
        </CardContent>
      </Card>
    </ListItem>
  </Fragment>
));

export default GameListItem;
