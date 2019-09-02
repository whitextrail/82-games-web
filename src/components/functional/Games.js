import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import GameHeader from '../presentational/body/games/GameHeader';
import GameList from '../presentational/body/games/GameList';

const GamesContainer = memo(({
  games: {
    byStatusId,
    selectedStatusId,
  },
  teams,
  navMenuIsOpen,
}) =>(
  <Grid container direction="column">
    <GameHeader selectedStatusId={selectedStatusId} navMenuIsOpen={navMenuIsOpen} />
    <GameList
      games={byStatusId[selectedStatusId]}
      teams={teams}
      selectedStatusId={selectedStatusId}
      navMenuIsOpen={navMenuIsOpen}
    />
  </Grid>
));

const mapStateToProps = ({ teams, games }) => ({
  teams,
  games,
});

export default connect(mapStateToProps)(GamesContainer);
