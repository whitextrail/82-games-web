import React, {
  memo,
} from 'react';
import { List, Grid } from '@material-ui/core';
import GameListHeader from './GameListHeader';
import GameListItem from './GameListItem';
import Tabs from '../../reusable/Tabs';
import {
  ReplaySharp,
  PlayCircleOutlineSharp,
  FastForwardSharp,
} from '@material-ui/icons';
import { primaryColor } from '../../../../styles/constants';

const tabIcons = {
  previous: <ReplaySharp />,
  live: <PlayCircleOutlineSharp />,
  upcoming: <FastForwardSharp />,
};

const styles = {
  container: {
    backgroundColor: '#333333',
  },
  list: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: '100vh',
    paddingTop: 10,
    scrollbarColor: primaryColor,
  },
};

const tabIndicatorProps = {
  style: {
    backgroundColor: '#333333'
  }
};

const GameList = memo(({
  teamsById,
  gamesByStatusId,
  allGameStatusIds,
  statusId,
  selectGameStatus,
  selectGameFromList,
}) => {
  return (
    <Grid container direction="column" style={styles.container}>
      <GameListHeader />
      <List disablePadding style={styles.list}>
        <Tabs
          selectedTabId={statusId}
          onChange={selectGameStatus}
          allTabIds={allGameStatusIds}
          tabIcons={tabIcons}
          tabIndicatorProps={tabIndicatorProps}
        />
        {
          gamesByStatusId[statusId].map(({
            homeTeamId,
            awayTeamId,
            ...game
          }, index) => (
            <GameListItem
              key={index}
              game={game}
              statusId={statusId}
              homeTeam={teamsById[homeTeamId]}
              awayTeam={teamsById[awayTeamId]}
              selectGameFromList={selectGameFromList}
            />
          ))
        }
      </List>
    </Grid>
  );
});

export default GameList;
