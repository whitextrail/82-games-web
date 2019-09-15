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
  fetchAthleteProfileById,
} from '../../state/actions';
import { Grid } from '@material-ui/core';
import Nav from './Nav';
import Games from '../presentational/body/games/Games';
import Game from '../presentational/body/games/Game';
import GameStats from '../functional/GameStats';
import GameStatsNav from '../presentational/body/games/stats/GameStatsNav';

class GamesContainer extends PureComponent {
  constructor(props) {
    super(props);

    props.fetchTeams();
    props.fetchAthleteProfileById(1);
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
    } = this.props;

    // Teams must be successfully fetched before games
    if (!prevTeams.selectedId && teams.selectedId) {
      const childRoutePathname = location.pathname.split('/')[2];

      fetchGamesByTeamIdAction(teams.selectedId, childRoutePathname);
    } else if (location.pathname === '/') {
      this.props.history.push(`/games/previous`);
    } else if (
      prevGames.selectedStatusId
      && (prevGames.selectedStatusId !== games.selectedStatusId)
    ) {
      this.props.history.push(`/games/${games.selectedStatusId.toLowerCase()}`);
    }
  }

  handleTabClick = (event, value) => this.props.filterGamesByStatusId(value);

  renderGamesByStatusId = (
    gamesByStatusId,
    teamsById,
    { performanceStatisticsByGameId },
  ) => (
    gamesByStatusId.map(({
      homeTeamId,
      homeTeamPoints,
      awayTeamId,
      awayTeamPoints,
      ...game
    }, index) => {
      const homeTeam = {
        id: homeTeamId,
        name: teamsById[homeTeamId].name,
        points: homeTeamPoints,
      };
      const awayTeam = {
        id: awayTeamId,
        name: teamsById[awayTeamId].name,
        points: awayTeamPoints,
      };

      return (
        <Game
          {...game}
          key={index}
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          athleteStats={performanceStatisticsByGameId[game.id]}
        />
      );
    }
));

  render = () => {
    const {
      games: {
        byId: gamesById,
        inProgress,
        byStatusId,
        allStatusIds,
        selectedStatusId,
      },
      teams: {
        byId: teamsById,
      },
      athletes: {
        selectedId: selectedAthleteId,
        byId: athletesById,
      }
    } = this.props;
    const gameListProps = {
      inProgress,
      allStatusIds,
      selectedStatusId,
      handleTabClick: this.handleTabClick,
      renderGamesByStatusId: !!(selectedStatusId && selectedAthleteId) && (() => (
        this.renderGamesByStatusId(
        byStatusId[selectedStatusId],
        teamsById,
        athletesById[selectedAthleteId],
      ))),
    };
    const renderRoute = (elementType, props) => React.createElement(
      elementType,
      {
        ...props,
        ...gameListProps
      },
    );
    const renderGamesRoute = routeProps => renderRoute(Games, routeProps);
    const renderGameStatsRoute = ({
      match: {
        params: { gameId },
      }
    }) => {
      const game = gamesById[gameId];

      return renderRoute(GameStats, {
        game,
        homeTeam: teamsById[game.homeTeamId],
        awayTeam: teamsById[game.awayTeamId],
        athlete: athletesById[selectedAthleteId],
      });
    };

    return !!selectedStatusId && (
      <Grid container direction="column">
        <Switch>
          <Route exact path="/games/:timeframe/:gameSeason/:gameId" render={() => <GameStatsNav location={this.props.location} />} />
          <Route exact path="/games/:timeframe" component={Nav} />
        </Switch>
        <Grid container>
          <Switch>
            <Route exact path="/games/:timeframe" render={renderGamesRoute} />
            <Route exact path="/games/:timeframe/:gameSeason/:gameId" render={renderGameStatsRoute} />
            <Redirect from="/games" to="/games/previous" />
          </Switch>
        </Grid>
      </Grid>
    );
  }
};

const mapStateToProps = ({
  teams,
  games,
  athletes,
}) => ({
  teams,
  games,
  athletes,
});

export default withRouter(connect(mapStateToProps, {
  fetchTeams,
  fetchGamesByTeamId,
  filterGamesByStatusId,
  fetchAthleteProfileById,
})(GamesContainer));
