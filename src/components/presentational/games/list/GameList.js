import React, {
  memo,
} from 'react';
import { List, Grid } from '@material-ui/core';
import GameListHeader from './GameListHeader';
import GameListItem from './GameListItem';

const styles = {
  container: {
    backgroundColor: '#333333',
  },
  list: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: '100vh',
    paddingRight: 10,
    paddingLeft: 10,
  },
};

const GameList = memo(({
  teamsById,
  gamesByStatusId,
  allGameStatusIds,
  athlete: {
    name,
    teamId,
    performanceStatisticsByGameId,
  },
  match: {
    params: { statusId }
  },
  history,
}) => {
  const handleTabClick = ({ currentTarget: { id } }) => history.push(`/games/${id}`);

  return (
    <Grid container direction="column" style={styles.container}>
      <GameListHeader
        statusId={statusId}
        allGameStatusIds={allGameStatusIds}
        handleTabClick={handleTabClick}
      />
      <List disablePadding style={styles.list} subheader={<li />}>
        {
          gamesByStatusId[statusId].map(({
            homeTeamId,
            awayTeamId,
            ...game
          }, index) => (
            <GameListItem
              key={index}
              game={game}
              homeTeam={teamsById[homeTeamId]}
              awayTeam={teamsById[awayTeamId]}
              athlete={{
                name,
                teamId,
                performanceStatistics: performanceStatisticsByGameId[game.id] || {
                  PTS: 0,
                  REB: 0,
                  AST: 0,
                },
              }}
            />
          ))
        }
      </List>
    </Grid>
  );
});

export default GameList;
