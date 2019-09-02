import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Slide,
} from '@material-ui/core';
import { fetchTeams } from '../../state/actions/teams';
import {
  fetchGamesByTeamId,
} from '../../state/actions/games';
import GameHeader from '../presentational/body/games/GameHeader';
import GameList from '../presentational/body/games/GameList';

class GamesContainer extends PureComponent {
  componentDidMount() {
    if (!this.props.teams.selectedId) {
      this.props.fetchTeams();
    }
  }

  componentDidUpdate(prevProps) {
    const { teams } = this.props;

    if (!prevProps.teams.selectedId && teams.selectedId) {
      this.props.fetchGamesByTeamId(teams.selectedId);
    }
  }

  render = () => {
    const {
      games: {
        byStatusId,
        selectedStatusId,
      },
      teams,
    } = this.props;

    return selectedStatusId ? (
      <Slide in={!!selectedStatusId} direction="up">
        <Grid container direction="column">
          <GameHeader status={selectedStatusId} />
          <GameList status={selectedStatusId} games={byStatusId[selectedStatusId]} teams={teams} />
        </Grid>
      </Slide>
    ) : <Grid />;
  };
}

const mapStateToProps = ({ teams, games }) => ({
  teams,
  games,
});

export default connect(mapStateToProps, {
  fetchTeams,
  fetchGamesByTeamId,
})(GamesContainer);
