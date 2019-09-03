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
import moment from 'moment-timezone';
import GameDetails from './GameDetails';
import GameTeams from './GameTeams';
import avatar from '../../../../assets/img/spencer_dinwiddie.png';

const styles = {
  container: {
    height: '100%',
    overflow: 'hidden',
  },
  list: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: '100%',
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 4,
  },
  card: {
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 3,
    width: '100%',
  },
  cardContent: {
    height: 240,
    padding: 0,
  },
  actionButton: {
    marginTop: 5,
    marginRight: 5,
  },
  noGamesFoundContainer: {
    marginTop: 20,
  },
};

const NoGamesFound = memo(() => (
  <Grid container justify="center" style={styles.noGamesFoundContainer}>
    <Typography variant="body1" align="center">No games found.</Typography>
  </Grid>
));

const GameActionButton = memo(({ selectedStatusId }) => {
  let buttonText = '';
  let buttonProps = {
    size: 'small',
    style: { ...styles.actionButton },
  };

  switch (selectedStatusId) {
    case 'Previous':
      buttonText = 'RESULTS';
      buttonProps = {
        ...buttonProps,
        variant: 'contained',
        color: 'secondary',
      };
      break;
    case 'Live':
      buttonText = 'FEED';
      buttonProps = {
        ...buttonProps,
        variant: 'outlined',
        color: 'primary',
      };
      break;
    case 'Upcoming':
      buttonText = 'PREDICT';
      buttonProps = {
        ...buttonProps,
        variant: 'contained',
        color: 'primary',
      };
      break;
    default:
      return null;
  }

  return <Button {...buttonProps}>{buttonText}</Button>;
});

const ListChildren = memo(({
  selectedStatusId,
  games,
  teamsById,
}) => (
  games.map(({
    id,
    homeTeamId,
    awayTeamId,
    dateTime,
    localGameDateTime,
    arena,
  }) => {
    const { name: homeTeamName } = teamsById[homeTeamId];
    const { name: awayTeamName } = teamsById[awayTeamId];

    // Temporary patch until the "season yearly range" lookup table is complete
    const isLastSeason = moment(dateTime).isBefore('2019-04-11T00:00:00.001Z');
    const seasonYearRange = isLastSeason ? 'S2018-19' : 'S2019-20';

    const gameNumber = id > 82 ? (id - 82) : id;

    return (
      <Fragment key={id}>
        <ListSubheader disableSticky>
          {`Game ${gameNumber} (${seasonYearRange})`}
        </ListSubheader>
        <ListItem disableGutters style={styles.listItem} key={id}>
          <Card style={styles.card}>
            <CardHeader
              avatar={<Avatar src={avatar} />}
              action={<GameActionButton selectedStatusId={selectedStatusId} />}
              title="Spencer Dinwiddie"
              subheader="0 PTS - 0 STL - 0 AST"
            />
            <CardContent style={styles.cardContent}>
              <GameDetails localGameDateTime={localGameDateTime} arena={arena} />
              <GameTeams
                homeTeamId={homeTeamId}
                homeTeamName={homeTeamName}
                awayTeamName={awayTeamName}
                awayTeamId={awayTeamId}
              />
            </CardContent>
          </Card>
        </ListItem>
      </Fragment>
    );
  }))
);

const GameList = memo(({
  games,
  teams,
  selectedStatusId,
}) => (
  <Grid item xs={12} style={styles.container}>
    <List disablePadding style={styles.list} subheader={<li />}>
      {
        games.length
          ? <ListChildren selectedStatusId={selectedStatusId} games={games} teamsById={teams.byId} />
          : <NoGamesFound />
      }
    </List>
  </Grid>
));

export default GameList;
