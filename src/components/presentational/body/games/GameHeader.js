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
  FastForwardSharp
} from '@material-ui/icons';
import {
  primaryColor,
  secondaryColor,
  primaryTextColor,
} from '../../../../styles/constants';

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
  navMenuIsOpen,
}) => (
  <Slide in={!!selectedStatusId && !navMenuIsOpen} direction="down">
    <Grid container justify="center" alignItems="flex-start" style={styles.container}>
      <Paper square style={styles.paper}>
        <Tabs
          value="Live"
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          style={{ height: '100%' }}
        >
          <Tab icon={<ReplaySharp />} label="Previous" value="Previous" onClick={null} />
          <Tab icon={<PlayCircleOutlineSharp />} label="Live" value="Live" onClick={null} />
          <Tab icon={<FastForwardSharp />} label="Upcoming" value="Upcoming" onClick={null} />
        </Tabs>
      </Paper>
    </Grid>
  </Slide>
));

export default GameHeader;
