import React, { memo } from 'react';
import {
  Grid,
  List,
  Typography,
} from '@material-ui/core';
import GameHeader from './GameHeader';
import Game from './Game';

const styles = {
  list: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: '100%',
    paddingRight: 5,
    paddingLeft: 5,
  },
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

const Games = memo(({
  gamesByStatusId,
  teamsById,
  inProgress,
  allStatusIds,
  handleTabClick,
  selectedStatusId,
}) => {
  const renderGamesByStatusId = gamesByStatusId => (
    gamesByStatusId.map(({
      season,
      gameNumber,
      localGameDateTime,
      arena,
      homeTeamId,
      awayTeamId,
    }) => (
      <Game
        key={gameNumber}
        selectedStatusId={selectedStatusId}
        season={season}
        gameNumber={gameNumber}
        localGameDateTime={localGameDateTime}
        arena={arena}
        homeTeam={{
          id: homeTeamId,
          name: teamsById[homeTeamId].name,
        }}
        awayTeam={{
          id: awayTeamId,
          name: teamsById[awayTeamId].name,
        }}
      />
    ))
  );

  return (
    <Grid container direction="column">
      <GameHeader
        selectedStatusId={selectedStatusId}
        allStatusIds={allStatusIds}
        inProgress={inProgress}
        handleTabClick={handleTabClick}
      />
        <List disablePadding style={styles.list} subheader={<li />}>
          {
            gamesByStatusId.length
              ? renderGamesByStatusId(gamesByStatusId)
              : <NoGamesFound />
          }
        </List>
    </Grid>
  );
});

export default Games;
