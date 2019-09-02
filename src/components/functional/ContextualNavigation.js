
import React, { memo } from 'react';
import { Slide, Grid } from '@material-ui/core';
import Games from './contextualNavigation/Games';

const contextNavs = {
  games: <Games />
};

const ContextualNavigation = memo(({
  isOpen,
  selectedId,
}) => (
  <Slide direction="down" in={!isOpen}>
    <Grid>
      {
        // This is being wrapped in a Grid component due to an issue
        // with forwarding refs directly to the Slide component
        contextNavs[selectedId]
      }
    </Grid>
  </Slide>
));

export default ContextualNavigation;
