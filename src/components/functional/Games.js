import React, { memo, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Slide,
} from '@material-ui/core';
import GameHeader from '../presentational/body/games/GameHeader';
import GameList from '../presentational/body/games/GameList';

const GamesContainer = memo(({
  games: {
    byStatusId,
    selectedStatusId,
  },
  teams,
}) => (
  selectedStatusId
    ? (
      <Slide in={!!selectedStatusId} direction="up">
        <Grid container direction="column">
          <GameHeader status={selectedStatusId} />
          <GameList status={selectedStatusId} games={byStatusId[selectedStatusId]} teams={teams} />
        </Grid>
      </Slide>
    )
    : <Fragment />
));

const mapStateToProps = ({ teams, games }) => ({
  teams,
  games,
});

export default connect(mapStateToProps)(GamesContainer);
