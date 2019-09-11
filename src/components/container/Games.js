import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  withRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {
  fetchTeams,
  fetchGamesByTeamId,
  filterGamesByStatusId,
} from '../../state/actions';
import Games from '../presentational/body/games/Games';

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
      const childRoutePathname = location.pathname.split('/')[2];

      fetchGamesByTeamIdAction(teams.selectedId, childRoutePathname);
    } else if (
      prevGames.selectedStatusId
      && (prevGames.selectedStatusId !== games.selectedStatusId)
    ) {
      this.props.history.push(`${match.url}/${games.selectedStatusId.toLowerCase()}`);
    }
  }

  handleTabClick = (event, value) => this.props.filterGamesByStatusId(value);

  render = () => {
    const {
      games,
      teams: { byId: teamsById },
    } = this.props;
    const {
      inProgress,
      byStatusId,
      allStatusIds,
      selectedStatusId,
    } = games;
    const { url } = this.props.match;
    const fallbackPathname = allStatusIds.length && allStatusIds[0].toLowerCase();

    return (
      <Switch>
        { allStatusIds.map((id) => {
          const path = `/games/${id.toLowerCase()}`;
          const gamesByStatusId = byStatusId[id];

          return (
            <Route
              key={id}
              path={path}
              render={() => (
                <Games
                  gamesByStatusId={gamesByStatusId}
                  teamsById={teamsById}
                  inProgress={inProgress}
                  allStatusIds={allStatusIds}
                  handleTabClick={this.handleTabClick}
                  selectedStatusId={selectedStatusId}
                />
              )}
            />
          );
        }) }
        {
          fallbackPathname
            ? <Redirect from={url} to={`/games/${fallbackPathname}`} />
            : null
        }
      </Switch>
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
