import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  withRouter,
  Switch,
  Route,
} from 'react-router-dom';
import {
  fetchTeams,
  fetchGamesByTeamId,
  filterGamesByStatusId,
} from '../../state/actions';
import Games from '../presentational/body/games/Games';
import Game from '../presentational/body/games/Game';

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

  renderGamesByStatusId = (
    gamesByStatusId,
    teamsById,
  ) => (
    gamesByStatusId.map(({
      homeTeamId,
      awayTeamId,
      ...game
    }, index) => {
      const homeTeam = {
        id: homeTeamId,
        name: teamsById[homeTeamId].name,
      };
      const awayTeam = {
        id: awayTeamId,
        name: teamsById[awayTeamId].name,
      };

      return (
        <Game
          {...game}
          key={index}
          homeTeam={homeTeam}
          awayTeam={awayTeam}
        />
      );
    }
));

  render = () => {
    const {
      games: {
        inProgress,
        byStatusId,
        allStatusIds,
        selectedStatusId,
      },
      teams: {
        byId: teamsById,
      },
    } = this.props;
    const gameListProps = {
      inProgress,
      allStatusIds,
      selectedStatusId,
      handleTabClick: this.handleTabClick,
      renderGamesByStatusId: !!selectedStatusId && (() => (
        this.renderGamesByStatusId(
        byStatusId[selectedStatusId],
        teamsById
      ))),
    };

    return !!selectedStatusId && (
      <Switch>
        <Route path="/games/previous" render={() => <Games {...gameListProps} />} />
        <Route path="/games/live" render={() => <Games {...gameListProps} />} />
        <Route path="/games/upcoming" render={() => <Games {...gameListProps} />} />
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
