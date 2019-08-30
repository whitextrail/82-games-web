import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { fetchTeams } from '../../state/actions/teams';
import {
  fetchGamesByTeamId,
  filterGamesByStatusId,
} from '../../state/actions/games';
import Games from '../presentational/body/games/Games';
import GameStatusFilter from '../presentational/body/games/GameStatusFilter';

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
    const { games } = this.props;

    return (
      <Grid container direction="column">
        <GameStatusFilter
          gameStatusesById={games.gameStatusesById}
          selectedGameStatusId={games.selectedGameStatusId}
          filterGamesByStatusId={this.props.filterGamesByStatusId}
        />
        <Games />
      </Grid>
    );
  };
}

const mapStateToProps = ({ teams, games }) => ({
  teams,
  games,
});

export default connect(mapStateToProps, {
  fetchTeams,
  fetchGamesByTeamId,
  filterGamesByStatusId,
})(GamesContainer);
