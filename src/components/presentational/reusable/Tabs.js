import React, { memo } from 'react';
import {
  Tabs,
  Tab,
} from '@material-ui/core';

const ReusableTabs = memo(({
  selectedTabId,
  inProgress,
  onChange,
  allTabIds,
  tabIcons,
}) => {
  const indicatorColor = inProgress ? 'primary' : 'secondary';

  return (
    <Tabs
      value={selectedTabId}
      indicatorColor={indicatorColor}
      textColor="secondary"
      variant="fullWidth"
      onChange={onChange}
    >
      { allTabIds.map(id => <Tab key={id} icon={tabIcons[id]} value={id} />) }
    </Tabs>
  );
});

export default ReusableTabs;
