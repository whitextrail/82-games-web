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
import GameStatsUpcoming from '../presentational/games/stats/GameStatsUpcoming';
import Progress from '../presentational/reusable/Progress';

class GameStats extends PureComponent {
  constructor(props) {
    super(props);
    const {
      gamesById,
      gameIdsByTeamId,
      games: { byStatusId },
      match: {
        params: {
          statusId,
          gameId,
        },
      },
      history,
    } = props;

    // Check for invalid status id or game id
    if (!byStatusId[statusId]) {
      return history.goBack();
    }

    const parsedRouteGameId = parseInt(gameId, 10);
    const {
      homeTeamId,
      awayTeamId,
    } = gamesById[parsedRouteGameId];

    // We are not storing Brooklyn games so we're relying on the non-Brooklyn team id to give us the game ids
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
    const showPreviousGames = selectedGameStatsId && allGameStatsIds.includes(selectedGameStatsId);
    const showUpcomingGames = selectedGameStatsId && allGameStatsIds.length && !showPreviousGames;
    const gameStatsGroupIndex = allGameStatsGroups.indexOf(selectedGameStatsGroup);
    const {
      [selectedGameStatsId]: selectedGameStats,
      ...otherGameStats
    } = byGameStatsId;
    const athleteGameStats = allGameStatsIds.reduce((acc, gameStatId) => ({
      ...acc,
      [gameStatId]: {
        ...athlete.performanceStatistics[gameStatId],
        gameNumber: gamesById[gameStatId].gameNumber,
        seasonYears: gamesById[gameStatId].seasonYears,
      }
    }), {});

    return (
      selectedGameStatsId
        ? (
          <Switch>
            <Route
              exact
              path="/games/previous/:gameId"
              render={() => (
                !showPreviousGames
                  ? <Progress show />
                  : (
                    <GameStatsPrevious
                      changeGameStatsGroup={this.changeGameStatsGroup}
                      gamesById={gamesById}
                      allGameStatsGroups={allGameStatsGroups}
                      selectedGameStatsGroup={selectedGameStatsGroup}
                      allGameStatsIds={allGameStatsIds}
                      selectedGameStatsId={selectedGameStatsId}
                      gameStatsGroupIndex={gameStatsGroupIndex}
                      otherGameStats={otherGameStats}
                      selectedGameStats={selectedGameStats}
                      changeSelectedGameStatsId={changeSelectedGameStatsIdAction}
                      goBackRoute={this.goBackRoute}
                      athleteGameStats={athleteGameStats}
                    />
                  )
              )}
            />
            <Route
              exact
              path="/games/upcoming/:gameId"
              render={({ match: { params }}) => (
                !showUpcomingGames
                  ? <Progress show />
                  : (
                    <GameStatsUpcoming
                      goBackRoute={this.goBackRoute}
                      athleteGameStats={athleteGameStats}
                      gameNumber={gamesById[params.gameId].gameNumber}
                      byGameStatsId={byGameStatsId}
                    />
                  )
              )}
            />
          </Switch>
        )
        : <Progress show />
    );
  }
}

const mapStateToProps = ({
  games,
  gameStats,
}) => ({
  games,
  gameStats,
});

export default connect(mapStateToProps, {
  fetchGameStats,
  changeGameStatsGroup,
  changeSelectedGameStatsId,
})(GameStats);
