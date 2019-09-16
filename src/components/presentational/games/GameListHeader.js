import React, { memo } from 'react';
import { Paper } from '@material-ui/core';
import {
  ReplaySharp,
  PlayCircleOutlineSharp,
  FastForwardSharp,
} from '@material-ui/icons';
import {
  primaryColor,
  primaryTextColor,
} from '../../../styles/constants';
import Tabs from '../reusable/Tabs';

const tabIcons = {
  previous: <ReplaySharp />,
  live: <PlayCircleOutlineSharp />,
  upcoming: <FastForwardSharp />,
};

const styles = {
  paper: {
    height: 48,
    paddingRight: 7.5,
    paddingLeft: 7.5,
    width: '100%',
    backgroundColor: primaryColor,
  },
  text: {
    color: primaryTextColor,
    fontSize: 18,
  },
};

const GameListHeader = memo(({
  statusId,
  allStatusIds,
  handleTabClick,
  inProgress,
}) => (
  <Paper square style={styles.paper}>
    <Tabs
      selectedTabId={statusId}
      inProgress={inProgress}
      onChange={handleTabClick}
      allTabIds={allStatusIds}
      tabIcons={tabIcons}
    />
  </Paper>
));

export default GameListHeader;
