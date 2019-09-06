import React, { memo } from 'react';
import {
  Paper,
} from '@material-ui/core';
import {
  PersonSharp,
  LocalActivitySharp,
  SettingsApplicationsSharp,
} from '@material-ui/icons';
import {
  primaryColor,
  primaryTextColor,
} from '../../../../styles/constants';
import Tabs from '../../reusable/Tabs';

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

const AccountHeader = memo(() => {
  const tabIcons = {
    'Profile': <PersonSharp />,
    'Balance': <LocalActivitySharp />,
    'Settings': <SettingsApplicationsSharp />,
  };

  return (
    <Paper square style={styles.paper}>
      <Tabs
        selectedTabId={'Profile'}
        inProgress={false}
        onChange={() => {}}
        allTabIds={['Profile', 'Balance', 'Settings']}
        tabIcons={tabIcons}
      />
    </Paper>
  );
});

export default AccountHeader;