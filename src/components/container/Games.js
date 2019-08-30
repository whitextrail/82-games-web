import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchTeams } from '../../state/actions/teams';
import {
  fetchGamesByTeamId,
  filterGamesByStatusId,
} from '../../state/actions/games';
import Games from '../presentational/body/Games';

class GamesContainer extends PureComponent {
  componentDidMount() {
    if (!this.props.teams.selectedId) {
      this.props.fetchTeams();
    }
  }

  componentDidUpdate(prevProps) {
    const { teams } = this.props;

    if (!prevProps.teams.selectedId && teams.selectedId) {
      this.props.fetchGamesByTeamId(teams.selectedId)
    }
  }

  render = () => (
    <Games
      teams={this.props.teams}
      games={this.props.games}
      filterGamesByStatusId={this.props.filterGamesByStatusId}
    />
  );
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
