import React, { memo } from 'react';
import {
  Paper,
  Grid,
} from '@material-ui/core';
import {
  ReplaySharp,
  PlayCircleOutlineSharp,
  FastForwardSharp,
} from '@material-ui/icons';
import {
  primaryColor,
  primaryTextColor,
} from '../../../styles/constants';
import NavBar from '../nav/NavBar';
import Tabs from '../reusable/Tabs';

const tabIcons = {
  previous: <ReplaySharp />,
  live: <PlayCircleOutlineSharp />,
  upcoming: <FastForwardSharp />,
};

const styles = {
  container: {
    height: 104,
    backgroundColor: primaryColor,
  },
  text: {
    color: primaryTextColor,
    fontSize: 18,
  },
};

const GameListHeader = memo(({
  statusId,
  allGameStatusIds,
  handleTabClick,
  inProgress,
}) => (
  <Paper
    square
    component={Grid}
    container
    direction="column"
    style={styles.container}
  >
    <NavBar title="Games" elevation={0} />
    <Tabs
      selectedTabId={statusId}
      inProgress={inProgress}
      onChange={handleTabClick}
      allTabIds={allGameStatusIds}
      tabIcons={tabIcons}
    />
  </Paper>
));

export default GameListHeader;
