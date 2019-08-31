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
import {
  primaryColor,
  secondaryColor,
  secondaryTextColor,
  primaryTextColor,
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
  actionButton: {
    marginTop: 7,
    marginRight: 5,
  },
  closedGameActionButton: {
    color: primaryTextColor,
    backgroundColor: secondaryColor,
  },
  openGameActionButton: {
    color: secondaryTextColor,
    backgroundColor: primaryColor,
  },
  liveGameActionButton: {
    color: secondaryTextColor,
    backgroundColor: '#01d727',
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

const GameActionButton = memo(({ status }) => {
  const {
    actionButton,
    closedGameActionButton,
    liveGameActionButton,
    openGameActionButton,
  } = styles;

  let buttonText = '';
  let buttonStyle = {};

  switch (status) {
    case 'Closed':
      buttonText = 'SEE RESULTS';
      buttonStyle = {
        ...actionButton,
        ...closedGameActionButton,
      };
      break;
    case 'Live':
      buttonText = 'VIEW FEED';
      buttonStyle = {
        ...actionButton,
        ...liveGameActionButton,
      };
      break;
    case 'Open':
      buttonText = 'PREDICT STATS';
      buttonStyle = {
        ...actionButton,
        ...openGameActionButton,
      };
      break;
    default:
      return null;
  }

  return <Button size="small" variant="contained" style={buttonStyle}>{buttonText}</Button>;
});

const ListChildren = memo(({
  status,
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
    const seasonYearRange = `S${moment(dateTime).format('YYYY')}-${moment(dateTime).add(1, 'y').format('YY')}`;

    return (
      <Fragment key={id}>
        <ListSubheader>{`Game ${id} (${seasonYearRange}) - ${homeTeamName} vs. ${awayTeamName}`}</ListSubheader>
        <ListItem disableGutters style={styles.listItem} key={id}>
          <Card style={styles.card}>
            <CardHeader
              avatar={<Avatar src={avatar} />}
              action={<GameActionButton status={status} />}
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

const Games = memo(({
  status,
  games,
  teams,
}) => (
  <Grid item xs={12} style={styles.container}>
    <List disablePadding style={styles.list} subheader={<li />}>
      { games.length ? <ListChildren status={status} games={games} teamsById={teams.byId} /> : <NoGamesFound /> }
    </List>
  </Grid>
));

export default Games;
