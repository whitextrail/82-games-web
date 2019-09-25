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
  fetchTeamGames,
  selectGameStatusId,
  fetchAthleteProfileById,
  selectGameId,
  fetchGameStats,
  selectGameStatsView,
  selectGameStatsIndex,
} from '../../state/actions';
import { Grid } from '@material-ui/core';
import GameList from '../presentational/games/list/GameList';
import GameStats from '../functional/games/GameStats';
import Progress from '../presentational/reusable/Progress';
import { sortNumbersAscending } from '../../util';

class GamesContainer extends PureComponent {
  constructor(props) {
    super(props);

    props.fetchTeams();
    props.fetchTeamGames();
    props.fetchAthleteProfileById();
  }

  selectGameStatus = ({ currentTarget: { id } }) => this.props.history.push(`/games/${id}`);

  selectGameFromList = (statusId) => (
    ({ currentTarget: { id } }) => {
      const {
        history,
        selectGameId: selectGameIdAction,
      } = this.props;

      selectGameIdAction(id);

      return history.push(`/games/${statusId}/${id}`);
    }
  );

  selectGameStatsView = ({ currentTarget: { id } }) => this.props.selectGameStatsView(id)

  render = () => {
    const {
      inProgress,
      isFetched,
      athlete,
      teamsById,
      gamesById,
      gamesByStatusId,
      gameIdsByTeamId,
      allGameStatusIds,
      allGameStatsViews,
      selectedGameId,
      selectedGameStatsView,
      selectedGameStatsIndex,
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
                  render={({ match: { params } }) => (
                    <GameList
                      teamsById={teamsById}
                      gamesByStatusId={gamesByStatusId}
                      allGameStatusIds={allGameStatusIds}
                      athlete={athlete}
                      statusId={params.statusId}
                      selectGameStatus={this.selectGameStatus}
                      selectGameFromList={this.selectGameFromList(params.statusId)}
                    />
                  )}
                />
                <Route
                  exact
                  path="/games/:statusId/:routeGameId"
                  render={({ match: { params }, history }) => {
                    const {
                      statusId,
                      routeGameId,
                    } = params;
                    const {
                      gameNumber,
                      homeTeamId,
                      awayTeamId,
                    } = gamesById[routeGameId];
                    const {
                      selectGameId: selectGameIdAction,
                      selectGameStatsIndex: selectGameStatsIndexAction,
                      fetchGameStats: fetchGameStatsAction,
                    } = this.props;

                    // Due to the fact that we're not storing the id of the team used for fetching games,
                    // (e.g. brooklyn's id is 1 so gamesByTeam[1] === undefined), we can use the OR operator
                    // to grab only the opponent's games
                    const gameIds = sortNumbersAscending(
                      gameIdsByTeamId[homeTeamId]
                      || gameIdsByTeamId[awayTeamId]
                    );
                    const gameIdsIndex = gameIds.indexOf(gameNumber);
                    const statsIndexSet = Number.isInteger(selectedGameStatsIndex) && (selectedGameStatsIndex >= 0);

                    if (routeGameId !== selectedGameId) {
                      selectGameIdAction(gameNumber);
                    }

                    if (!statsIndexSet) {
                      selectGameStatsIndexAction(gameIdsIndex);
                    }

                    const showStats = !!(gameIds.length && selectedGameId);

                    return showStats && (
                      <GameStats
                        history={history}
                        statusId={statusId}
                        gameIds={gameIds}
                        athlete={athlete}
                        gamesById={gamesById}
                        teamsById={teamsById}
                        fetchGameStats={fetchGameStatsAction}
                        allGameStatsViews={allGameStatsViews}
                        selectedGameStatsView={selectedGameStatsView}
                        selectGameStatsIndex={selectGameStatsIndexAction}
                        selectGameStatsView={this.selectGameStatsView}
                        selectedGameStatsIndex={statsIndexSet ? selectedGameStatsIndex : gameIdsIndex}
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
    idsByTeamId: gameIdsByTeamId,
    selectedId: selectedGameId,
  },
  gameStats: {
    allStatsViews: allGameStatsViews,
    selectedStatsView: selectedGameStatsView,
    selectedStatsIndex: selectedGameStatsIndex,
  },
  athletes: {
    byId: athletesById,
    selectedId: selectedAthleteId,
    inProgress: athletesInProgress,
  },
}) => ({
  inProgress: teamsInProgress || gamesInProgress || athletesInProgress,
  isFetched: selectedGameId && selectedTeamId && selectedGameStatusId && selectedAthleteId,
  athlete: athletesById[selectedAthleteId],
  teamsById,
  gamesById,
  gamesByStatusId,
  gameIdsByTeamId,
  allGameStatusIds,
  allGameStatsViews,
  selectedGameId,
  selectedGameStatsView,
  selectedGameStatsIndex,
});

export default withRouter(connect(mapStateToProps, {
  fetchTeams,
  fetchTeamGames,
  selectGameStatusId,
  fetchAthleteProfileById,
  selectGameId,
  fetchGameStats,
  selectGameStatsView,
  selectGameStatsIndex,
})(GamesContainer));
