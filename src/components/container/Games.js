import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { fetchTeams } from '../../state/actions/teams';
import {
  fetchGamesByTeamId,
  filterGamesByStatusId,
  segmentGamesByStatus,
} from '../../state/actions/games';
import GameList from '../presentational/body/games/GameList';
import GameStatusFilter from '../presentational/body/games/GameStatusFilter';

class GamesContainer extends PureComponent {
  state = {
    menuAnchorEl: null,
  }

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

  openMenu = event => this.setState({ menuAnchorEl: event.currentTarget });

  closeMenu = (event) => {
    this.props.filterGamesByStatusId(event.currentTarget.value);
    this.setState({ menuAnchorEl: null });
  };

  render = () => {
    const { games, teams } = this.props;
    const status = games.allStatuses[games.statusIndex];

    return Object.keys(games.byStatus).length && (
      <Grid container direction="column">
        <GameStatusFilter
          allStatuses={games.allStatuses}
          statusIndex={games.statusIndex}
          openMenu={this.openMenu}
          closeMenu={this.closeMenu}
          menuAnchorEl={this.state.menuAnchorEl}
        />
        <GameList status={status} games={games.byStatus[status]} teams={teams} />
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
  segmentGamesByStatus,
})(GamesContainer);
