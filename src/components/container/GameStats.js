import React, { PureComponent } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchGameStats,
  changeGameStatsGroup,
  changeSelectedGameStatsId,
} from '../../state/actions';
import GameStatsPrevious from '../presentational/games/stats/GameStatsPrevious';
import Progress from '../presentational/reusable/Progress';

class GameStats extends PureComponent {
  constructor(props) {
    super(props);
    const {
      gamesById,
      gameIdsByTeamId,
      match: { params },
    } = props;
    const parsedRouteGameId = parseInt(params.gameId, 10);
    const {
      homeTeamId,
      awayTeamId,
     } = gamesById[parsedRouteGameId];

    props.fetchGameStats(gameIdsByTeamId[awayTeamId] || gameIdsByTeamId[homeTeamId], parsedRouteGameId);
  }

  goBackRoute = () => this.props.history.goBack()

  changeGameStatsGroup = ({ currentTarget : { id } }) => this.props.changeGameStatsGroup(id)

  render = () => {
    const {
      gamesById,
      gameStats,
      athlete,
      changeSelectedGameStatsId: changeSelectedGameStatsIdAction,
    } = this.props;
    const {
      byGameStatsId,
      allGameStatsGroups,
      selectedGameStatsGroup,
      allGameStatsIds,
      selectedGameStatsId,
    } = gameStats;
    const gameStatsFetched = !selectedGameStatsId;
    const gameStatsGroupIndex = allGameStatsGroups.indexOf(selectedGameStatsGroup);
    const {
      [selectedGameStatsId]: selectedGameStats,
      ...otherGameStats
    } = byGameStatsId;
    const athleteGameStats = allGameStatsIds.reduce((acc, gameStatId) => ({
      ...acc,
      [gameStatId]: { ...athlete.performanceStatistics[gameStatId] }
    }), {});

    return gameStatsFetched
      ? <Progress show />
      : (
        <Switch>
          <Route
            exact
            path="/games/previous/:gameId"
            render={() => (
              <GameStatsPrevious
                goBackRoute={this.goBackRoute}
                changeGameStatsGroup={this.changeGameStatsGroup}
                gamesById={gamesById}
                allGameStatsGroups={allGameStatsGroups}
                selectedGameStatsGroup={selectedGameStatsGroup}
                allGameStatsIds={allGameStatsIds}
                selectedGameStatsId={selectedGameStatsId}
                gameStatsGroupIndex={gameStatsGroupIndex}
                athleteGameStats={athleteGameStats}
                otherGameStats={otherGameStats}
                selectedGameStats={selectedGameStats}
                changeSelectedGameStatsId={changeSelectedGameStatsIdAction}
              />
            )}
          />
          <Route
            exact
            path="/games/upcoming/:gameId"
            render={() => (
              <div>Upcoming</div>
            )}
          />
        </Switch>
    );
  }
}

const mapStateToProps = ({ gameStats }) => ({ gameStats });

export default connect(mapStateToProps, {
  fetchGameStats,
  changeGameStatsGroup,
  changeSelectedGameStatsId,
})(GameStats);
