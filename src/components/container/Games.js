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
  selectGameStatusId,
  fetchAthleteProfileById,
  selectGameId,
  fetchGameStatisticById,
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
    props.fetchGamesByTeamId();
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
                      homeTeamId,
                      awayTeamId,
                    } = gamesById[routeGameId];
                    const {
                      selectGameId: selectGameIdAction,
                      selectGameStatsIndex: selectGameStatsIndexAction,
                      fetchGameStatisticById: fetchGameStatisticByIdAction,
                    } = this.props;

                    // Due to the fact that we're not storing the id of the team used for fetching games,
                    // (e.g. brooklyn's id is 1 so gamesByTeam[1] === undefined), we can use the OR operator
                    // to grab only the opponent's games
                    const gameIds = sortNumbersAscending(
                      gameIdsByTeamId[homeTeamId]
                      || gameIdsByTeamId[awayTeamId]
                    );
                    const parsedRouteGameId = parseInt(routeGameId, 10);
                    const gameIdsIndex = gameIds.indexOf(parsedRouteGameId);
                    const statsIndexSet = Number.isInteger(selectedGameStatsIndex) && (selectedGameStatsIndex >= 0);

                    if (routeGameId !== selectedGameId) {
                      selectGameIdAction(parsedRouteGameId);
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
                        fetchGameStats={fetchGameStatisticByIdAction}
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
    allStatsViews: allGameStatsViews,
    selectedId: selectedGameId,
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
  fetchGamesByTeamId,
  selectGameStatusId,
  fetchAthleteProfileById,
  selectGameId,
  fetchGameStatisticById,
  selectGameStatsView,
  selectGameStatsIndex,
})(GamesContainer));
