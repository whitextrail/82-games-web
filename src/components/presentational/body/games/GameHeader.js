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
} from '../../../../styles/constants';
import Tabs from '../../reusable/Tabs';

const tabIcons = {
  'Previous': <ReplaySharp />,
  'Live': <PlayCircleOutlineSharp />,
  'Upcoming': <FastForwardSharp />,
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

const GameHeader = memo(({
  selectedStatusId,
  allStatusIds,
  filterGamesByStatusId,
  inProgress,
}) => (
  <Paper square style={styles.paper}>
    <Tabs
      selectedTabId={selectedStatusId}
      inProgress={inProgress}
      onChange={(evt, value) => filterGamesByStatusId(value)}
      allTabIds={allStatusIds}
      tabIcons={tabIcons}
    />
  </Paper>
));

export default GameHeader;
