import React, {
  memo,
  Fragment,
} from 'react';
import { List } from '@material-ui/core';
import GameListHeader from './GameListHeader';
import GameListItem from './GameListItem';

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
  byStatusId,
  allStatusIds,
  match: {
    params: { statusId }
  },
}) => (
  <Fragment>
    <GameListHeader statusId={statusId} allStatusIds={allStatusIds} />
    <List disablePadding style={styles.list} subheader={<li />}>
      {
        byStatusId[statusId].map(({
          homeTeamId,
          awayTeamId,
          ...game
        }, index) => (
          <GameListItem
            key={index}
            game={game}
            homeTeam={teamsById[homeTeamId]}
            awayTeam={teamsById[awayTeamId]}
          />
        ))
      }
    </List>
  </Fragment>
));

export default GameList;
