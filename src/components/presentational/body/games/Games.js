import React, { memo } from 'react';
import {
  Grid,
  List,
} from '@material-ui/core';
import GameHeader from './GameHeader';

const styles = {
  list: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: '100%',
    paddingRight: 5,
    paddingLeft: 5,
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 4,
  },
  card: {
    borderRadius: 3,
    width: '100%',
  },
  cardContent: {
    height: 240,
    padding: 0,
  },
  actionButton: {
    marginTop: 5,
    marginRight: 5,
  },
};

const Games = memo(({
  inProgress,
  allStatusIds,
  selectedStatusId,
  handleTabClick,
  renderGamesByStatusId,
}) => {
  return (
    <Grid container direction="column">
      <GameHeader
        selectedStatusId={selectedStatusId}
        allStatusIds={allStatusIds}
        inProgress={inProgress}
        handleTabClick={handleTabClick}
      />
        <List disablePadding style={styles.list} subheader={<li />}>
          {renderGamesByStatusId()}
        </List>
    </Grid>
  );
});

export default Games;
