import React, {
  PureComponent,
  Fragment,
} from 'react';
import { connect } from 'react-redux';
import {
  withRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {
  selectGameStatusId,
  selectGameId,
} from '../../state/actions';
import { Grid } from '@material-ui/core';
import GameList from '../presentational/games/list/GameList';
import GameStats from './GameStats';
import NavMenu from '../presentational/nav/NavMenu';
import Progress from '../presentational/reusable/Progress';

class GamesContainer extends PureComponent {
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

  selectGameStatsGroup = ({ currentTarget: { id } }) => this.props.selectGameStatsGroup(id)

  render = () => {
    const {
      inProgress,
      isFetched,
      athlete,
      teamsById,
      gamesById,
      gamesByStatusId,
      allGameStatusIds,
      gameIdsByTeamId,
    } = this.props;
    const showProgress = inProgress || !isFetched;
    const fallbackRoute = <Redirect to="/games/previous" />;

    return (
      <Fragment>
        <NavMenu />
        <Grid container direction="column">
          {
            showProgress
              ? <Progress show />
              : (
                <Switch>
                  <Route exact path="/games" render={() => fallbackRoute} />
                  <Route
                    exact
                    path="/games/:statusId"
                    render={({ match: { params } }) => (
                      gamesByStatusId[params.statusId]
                      ? (
                        <GameList
                          teamsById={teamsById}
                          gamesByStatusId={gamesByStatusId}
                          allGameStatusIds={allGameStatusIds}
                          athlete={athlete}
                          statusId={params.statusId}
                          selectGameStatus={this.selectGameStatus}
                          selectGameFromList={this.selectGameFromList(params.statusId)}
                        />
                      )
                      : fallbackRoute
                    )}
                  />
                  <Route
                    exact
                    path="/games/:statusId/:gameId"
                    render={routeProps => (
                      <GameStats
                        athlete={athlete}
                        gamesById={gamesById}
                        teamsById={teamsById}
                        gameIdsByTeamId={gameIdsByTeamId}
                        {...routeProps}
                      />
                    )}
                  />
                </Switch>
              )
          }
        </Grid>
      </Fragment>
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
    idsByTeamId: gameIdsByTeamId,
    inProgress: gamesInProgress,
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
  allGameStatusIds,
  gameIdsByTeamId,
});

export default withRouter(connect(mapStateToProps, {
  selectGameStatusId,
  selectGameId,
})(GamesContainer));
