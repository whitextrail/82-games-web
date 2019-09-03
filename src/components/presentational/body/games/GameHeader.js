import React, { memo } from 'react';
import {
  Paper,
  Tabs,
  Tab,
} from '@material-ui/core';
import {
  ReplaySharp,
  PlayCircleOutlineSharp,
  FastForwardSharp,
} from '@material-ui/icons';
import {
  primaryColor,
  primaryTextColor,
} from '../../../../styles/constants';

const tabIcons = {
  'Previous': <ReplaySharp />,
  'Live': <PlayCircleOutlineSharp />,
  'Upcoming': <FastForwardSharp />,
};

const styles = {
  paper: {
    height: 72,
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
      value={selectedStatusId}
      indicatorColor={inProgress ? "primary" : "secondary"}
      textColor="secondary"
      variant="fullWidth"
      style={{ height: '100%' }}
      onChange={(evt, value) => filterGamesByStatusId(value)}
    >
      { allStatusIds.map(statusId => (
        <Tab
          key={statusId}
          icon={tabIcons[statusId]}
          label={statusId}
          value={statusId}
        />
      )) }
    </Tabs>
  </Paper>
));

export default GameHeader;
