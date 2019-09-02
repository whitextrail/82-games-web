import React, { memo } from 'react';
import {
  Grid,
  Paper,
  Tabs,
  Tab,
  Slide,
} from '@material-ui/core';
import {
  ReplaySharp,
  PlayCircleOutlineSharp,
  FastForwardSharp,
} from '@material-ui/icons';
import {
  primaryColor,
  secondaryColor,
  primaryTextColor,
} from '../../../../styles/constants';

const tabIcons = {
  'Previous': <ReplaySharp />,
  'Live': <PlayCircleOutlineSharp />,
  'Upcoming': <FastForwardSharp />,
};

const styles = {
  container: {
    height: 82,
    backgroundColor: secondaryColor,
  },
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
  navMenuIsOpen,
  filterGamesByStatusId,
}) => (
  <Slide in={!!selectedStatusId && !navMenuIsOpen} direction="down">
    <Grid container justify="center" alignItems="flex-start" style={styles.container}>
      <Paper square style={styles.paper}>
        <Tabs
          value={selectedStatusId}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          style={{ height: '100%' }}
          onChange={(evt, value) => filterGamesByStatusId(value)}
        >
          {
            allStatusIds.map(statusId => (
              <Tab
                key={statusId}
                icon={tabIcons[statusId]}
                label={statusId}
                value={statusId}
              />
            ))
          }
        </Tabs>
      </Paper>
    </Grid>
  </Slide>
));

export default GameHeader;
