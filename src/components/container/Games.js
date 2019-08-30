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
  state = {
    menuAnchorEl: null,
  }

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

  openMenu = event => this.setState({ menuAnchorEl: event.currentTarget });

  closeMenu = (event) => {
    this.props.filterGamesByStatusId(event.currentTarget.value);
    this.setState({ menuAnchorEl: null });
  };

  render = () => {
    const { games } = this.props;

    return (
      <Grid container direction="column">
        <GameStatusFilter
          gameStatusesById={games.gameStatusesById}
          selectedGameStatusId={games.selectedGameStatusId}
          openMenu={this.openMenu}
          closeMenu={this.closeMenu}
          menuAnchorEl={this.state.menuAnchorEl}
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
