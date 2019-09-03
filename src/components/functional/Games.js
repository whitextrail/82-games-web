import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import GameHeader from '../presentational/body/games/GameHeader';
import GameList from '../presentational/body/games/GameList';
import Progress from '../presentational/reusable/Progress';

const GamesContainer = memo(({
  games: {
    byStatusId,
    allStatusIds,
    selectedStatusId,
    inProgress,
  },
  teams,
  filterGamesByStatusId,
}) =>(
  <Grid container direction="column">
    <GameHeader
      selectedStatusId={selectedStatusId}
      allStatusIds={allStatusIds}
      inProgress={inProgress}
      filterGamesByStatusId={filterGamesByStatusId}
    />
    { inProgress ? <Progress /> : (
      <GameList
        games={byStatusId[selectedStatusId]}
        teams={teams}
        selectedStatusId={selectedStatusId}
      /> ) }
  </Grid>
));

const mapStateToProps = ({ teams, games }) => ({
  teams,
  games,
});

export default connect(mapStateToProps)(GamesContainer);
