import React, {
  memo,
  Fragment,
} from 'react';
import { List } from '@material-ui/core';
import GameListHeader from '../presentational/games/list/GameListHeader';
import GameListItem from '../presentational/games/list/GameListItem';

const styles = {
  list: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: '100%',
    paddingRight: 5,
    paddingLeft: 5,
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
    <Fragment>
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
    </Fragment>
  );
});

export default GameList;
