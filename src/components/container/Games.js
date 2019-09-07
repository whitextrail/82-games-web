import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  withRouter,
  Route,
} from 'react-router-dom';
import { Grid } from '@material-ui/core';
import {
  fetchTeams,
  fetchGamesByTeamId,
  filterGamesByStatusId,
} from '../../state/actions';
import GameHeader from '../presentational/body/games/GameHeader';
import GameList from '../presentational/body/games/GameList';

class GamesContainer extends PureComponent {
  constructor(props) {
    super(props);

    props.fetchTeams();
  }

  componentDidUpdate({
    teams: prevTeams,
    games: prevGames,
  }) {
    const {
      teams,
      games,
      fetchGamesByTeamId: fetchGamesByTeamIdAction,
      location,
      match,
    } = this.props;

    // Teams must be successfully fetched before games
    if (!prevTeams.selectedId && teams.selectedId) {
      const rootRoutePathname = location.pathname.split('/')[0];

      fetchGamesByTeamIdAction(teams.selectedId, rootRoutePathname);
    } else if (prevGames.selectedStatusId !== games.selectedStatusId) {
      this.props.history.push(`${match.url}/${games.selectedStatusId.toLowerCase()}`);
    }
  }

  handleTabClick = (event, value) => this.props.filterGamesByStatusId(value);

  render = () => {
    const {
      games,
      teams,
      match,
    } = this.props;
    const {
      inProgress,
      byStatusId,
      allStatusIds,
      selectedStatusId,
    } = games;

    return (
      <Grid container direction="column">
        <GameHeader
          selectedStatusId={selectedStatusId}
          allStatusIds={allStatusIds}
          inProgress={inProgress}
          handleTabClick={this.handleTabClick}
        />
        { allStatusIds.map((id) => {
          const path = `${match.url}/${id.toLowerCase()}`;
          const games = byStatusId[id];

          return (
            <Route
              key={id}
              path={path}
              render={() => (
                <GameList
                  games={games}
                  teams={teams}
                  selectedStatusId={selectedStatusId}
                />
              )}
            />
          );
        }) }
      </Grid>
    );
  }
};

const mapStateToProps = ({
  teams,
  games,
}) => ({
  teams,
  games,
});

export default withRouter(connect(mapStateToProps, {
  fetchTeams,
  fetchGamesByTeamId,
  filterGamesByStatusId,
})(GamesContainer));
