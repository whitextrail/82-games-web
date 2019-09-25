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
  fetchAthlete,
  selectGameId,
} from '../../state/actions';
import { Grid } from '@material-ui/core';
import GameList from '../presentational/games/list/GameList';
import GameStats from './GameStats';
import Progress from '../presentational/reusable/Progress';

class GamesContainer extends PureComponent {
  constructor(props) {
    super(props);

    props.fetchTeams();
    props.fetchTeamGames();
    props.fetchAthlete();
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
                  render={(routeProps) => (
                    <GameStats
                      {...routeProps}
                      athlete={athlete}
                      gamesById={gamesById}
                      teamsById={teamsById}
                    />
                  )}
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
});

export default withRouter(connect(mapStateToProps, {
  fetchTeams,
  fetchTeamGames,
  selectGameStatusId,
  fetchAthlete,
  selectGameId,
})(GamesContainer));
