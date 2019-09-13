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
import { Grid } from '@material-ui/core';
import Nav from './Nav';
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
      <Grid container direction="column">
        <Switch>
          <Route component={Nav} />
        </Switch>
        <Grid container>
          <Switch>
            <Route exact path="/games/live" render={() => <Games {...gameListProps} />} />
            <Route exact path="/games/upcoming" render={() => <Games {...gameListProps} />} />
            <Route exact path="/games/previous" render={() => <Games {...gameListProps} />} />
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
}) => ({
  teams,
  games,
});

export default withRouter(connect(mapStateToProps, {
  fetchTeams,
  fetchGamesByTeamId,
  filterGamesByStatusId,
})(GamesContainer));
