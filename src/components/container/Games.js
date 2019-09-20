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
import GameList from '../presentational/games/list/GameList';
import GameStats from '../functional/games/GameStats';
import Progress from '../presentational/reusable/Progress';

class GamesContainer extends PureComponent {
  constructor(props) {
    super(props);

    props.fetchTeams();
    props.fetchGamesByTeamId();
    props.fetchAthleteProfileById();
  }

  render = () => {
    const {
      inProgress,
      isFetched,
      athlete,
      teamsById,
      gamesById,
      gamesByStatusId,
      gameIdsByTeam,
      allGameStatusIds,
    } = this.props;
    const showProgress = inProgress || !isFetched;

    return (
      <Grid container direction="column">
        {
          showProgress
            ? <Progress show />
            : (
              <Switch>
                <Route exact path="/games" render={() => <Redirect to="/games/previous" />} />
                <Route
                  exact
                  path="/games/:statusId"
                  render={routeProps => (
                    <GameList
                      teamsById={teamsById}
                      gamesByStatusId={gamesByStatusId}
                      allGameStatusIds={allGameStatusIds}
                      athlete={athlete}
                      {...routeProps}
                    />
                  )}
                />
                <Route
                  exact
                  path="/games/:statusId/:gameId"
                  render={({ match: { params: { gameId } } }) => {
                    const game = gamesById[gameId];

                    // Since we already have games from Brooklyn, we just want the game ids they have against
                    // their opponents
                    const teamGameIds = gameIdsByTeam[game.homeTeamId] || gameIdsByTeam[game.awayTeamId];

                    return (
                      <GameStats
                        game={game}
                        gamesById={gamesById}
                        teamGameIds={teamGameIds}
                        teamsById={teamsById}
                        athlete={{
                          ...athlete,
                          performanceStatistics: athlete.performanceStatisticsByGameId[gameId] || {
                            PTS: 0,
                            REB: 0,
                            AST: 0,
                          }
                        }}
                      />
                    );
                  }}
                />
              </Switch>
            )
        }
      </Grid>
    );
  }
};

const mapStateToProps = ({
  teams: {
    byId: teamsById,
    selectedId: selectedTeamId,
    inProgress: teamsInProgress,
  },
  games: {
    byId: gamesById,
    byStatusId: gamesByStatusId,
    allStatusIds: allGameStatusIds,
    selectedStatusId: selectedGameStatusId,
    inProgress: gamesInProgress,
    idsByTeam: gameIdsByTeam,
  },
  athletes: {
    byId: athletesById,
    selectedId: selectedAthleteId,
    inProgress: athletesInProgress,
  },
}) => ({
  inProgress: teamsInProgress || gamesInProgress || athletesInProgress,
  isFetched: selectedTeamId && selectedGameStatusId && selectedAthleteId,
  athlete: athletesById[selectedAthleteId],
  teamsById,
  gamesById,
  gamesByStatusId,
  gameIdsByTeam,
  allGameStatusIds,
});

export default withRouter(connect(mapStateToProps, {
  fetchTeams,
  fetchGamesByTeamId,
  filterGamesByStatusId,
  fetchAthleteProfileById,
})(GamesContainer));
