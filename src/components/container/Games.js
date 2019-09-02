import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Slide,
} from '@material-ui/core';
import { fetchTeams } from '../../state/actions/teams';
import {
  fetchGamesByTeamId,
  segmentGamesByStatus,
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
    const {
      teams,
      games,
    } = this.props;

    if (!prevProps.teams.selectedId && teams.selectedId) {
      this.props.fetchGamesByTeamId(teams.selectedId);
    } else if (!prevProps.games.allIds.length && games.allIds.length) {
      this.props.segmentGamesByStatus();
    }
  }

  render = () => {
    const { games, teams } = this.props;
    const status = games.allStatuses[games.statusIndex];
    const hasGamesByStatus = !!Object.keys(games.byStatus).length;

    return hasGamesByStatus ? (
      <Slide in={hasGamesByStatus} direction="up">
        <Grid container direction="column">
          <GameHeader status={status} />
          <GameList status={status} games={games.byStatus[status]} teams={teams} />
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
  segmentGamesByStatus,
})(GamesContainer);
