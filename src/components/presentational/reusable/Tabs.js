import React, { memo } from 'react';
import {
  Tabs,
  Tab,
} from '@material-ui/core';

const ReusableTabs = memo(({
  selectedTabId,
  onChange,
  allTabIds,
  tabIcons,
  tabIndicatorProps
}) => {
  return (
    <Tabs
      value={selectedTabId}
      indicatorColor="secondary"
      textColor="secondary"
      variant="fullWidth"
      onChange={onChange}
      TabIndicatorProps={tabIndicatorProps}
    >
      { allTabIds.map(id => <Tab id={id} key={id} icon={tabIcons[id]} value={id} />) }
    </Tabs>
  );
});

export default ReusableTabs;
