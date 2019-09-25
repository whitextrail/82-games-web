import React, { PureComponent } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import {
  fetchGameStats,
  changeGameStatsGroup,
  changeSelectedGameStatsId,
} from '../../state/actions';
import GameStatsHeader from '../presentational/games/stats/GameStatsHeader';
import GameAthleteStats from '../presentational/games/stats/GameAthleteStats';
import GameTeamStats from '../presentational/games/stats/GameTeamStats';
import Progress from '../presentational/reusable/Progress';

const styles = {
  container: {
    background: 'linear-gradient(180deg, rgba(51,51,51,1) 25%, rgba(25,25,25,1) 100%)',
    height: '100vh',
  },
  swipeableViews: {
    width: '100vw',
  },
};

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
    const showProgress = !selectedGameStatsId;
    const indexOfGameStatsGroup = allGameStatsGroups.indexOf(selectedGameStatsGroup);
    const {
      [selectedGameStatsId]: selectedGameStats,
      ...otherGameStats
    } = byGameStatsId;
    const athleteGameStats = allGameStatsIds.reduce((acc, gameStatId) => ({
      ...acc,
      [gameStatId]: { ...athlete.performanceStatistics[gameStatId] }
    }), {});


    // const {
    //   history,
    //   statusId,
    //   gamesById,
    //   gameIds,
    //   teamsById,
    //   athlete,
    //   fetchGameStats,
    //   allGameStatsGroups,
    //   selectedGameStatsGroup,
    //   changeGameStatsGroup,
    //   selectGameStatsIndex,
    //   selectedGameStatsIndex,
    // } = this.props;
    // const gameWithStatsId = gameIds[selectedGameStatsIndex];
    // const {
    //   homeTeamId,
    //   awayTeamId,
    // } = gamesById[gameWithStatsId];
    // const homeTeam = teamsById[homeTeamId];
    // const awayTeam = teamsById[awayTeamId];

    // // Check whether the stats for each teams' games against each other have been fetched
    // const hasTeamStats = gameIds.every(gameId => (
    //   gamesById[gameId].homeTeamStatistics && gamesById[gameId].awayTeamStatistics
    // ));

    // let gamesWithStats = {};

    // if (!hasTeamStats) {
    //   fetchGameStats(gameIds);
    // } else {
    //   gamesWithStats = gameIds.reduce((accumulator, gameId) => {
    //     const athleteSplitName = athlete.name.split(' ');
    //     const {
    //       arena,
    //       localGameDateTime,
    //       homeTeamStatistics,
    //       awayTeamStatistics,
    //     } = gamesById[gameId];

    //     return athlete.performanceStatisticsByGameId[gameId]
    //       ? ({
    //         ...accumulator,
    //         [gameId]: {
    //           arena,
    //           localGameDateTime,
    //           homeTeamId: homeTeam.id,
    //           homeTeamName: homeTeam.name,
    //           awayTeamId: awayTeam.id,
    //           awayTeamName: awayTeam.name,
    //           athleteName: athleteSplitName[athleteSplitName.length - 1],
    //           homeTeamStatistics: {
    //             PTS: (
    //               homeTeamStatistics.PTS_QTR1 +
    //               homeTeamStatistics.PTS_QTR2 +
    //               homeTeamStatistics.PTS_QTR3 +
    //               homeTeamStatistics.PTS_QTR4
    //             ),
    //             ...homeTeamStatistics,
    //           },
    //           awayTeamStatistics: {
    //             PTS: (
    //               awayTeamStatistics.PTS_QTR1 +
    //               awayTeamStatistics.PTS_QTR2 +
    //               awayTeamStatistics.PTS_QTR3 +
    //               awayTeamStatistics.PTS_QTR4
    //             ),
    //             ...awayTeamStatistics,
    //           },
    //           statsKeys: ['PTS', 'REB', 'AST'],
    //           athleteStatistics: { ...athlete.performanceStatisticsByGameId[gameId] },
    //         },
    //       })
    //       : accumulator;
    //   }, gamesWithStats);
    // }

    return showProgress
      ? <Progress show />
      : (
        <Grid
          container
          alignItems="center"
          direction="column"
          style={styles.container}
        >
          <GameStatsHeader
            goBackRoute={this.goBackRoute}
            changeGameStatsGroup={this.changeGameStatsGroup}
            gamesById={gamesById}
            allGameStatsGroups={allGameStatsGroups}
            selectedGameStatsGroup={selectedGameStatsGroup}
            allGameStatsIds={allGameStatsIds}
            selectedGameStatsId={selectedGameStatsId}
            changeSelectedGameStatsId={changeSelectedGameStatsIdAction}
          />
          <SwipeableViews index={indexOfGameStatsGroup} style={styles.swipeableViews}>
            <GameAthleteStats
              athleteGameStats={athleteGameStats}
              otherGameStats={otherGameStats}
              selectedGameStats={selectedGameStats}
              selectedGameStatsId={selectedGameStatsId}
              selectedAthleteGameStats={athleteGameStats[selectedGameStatsId]}
            />
            {/* <GameTeamStats selectedGameWithStats={gamesWithStats[gameWithStatsId]} /> */}
          </SwipeableViews>
      </Grid>
    );
  }
}

const mapStateToProps = ({ gameStats }) => ({ gameStats });

export default connect(mapStateToProps, {
  fetchGameStats,
  changeGameStatsGroup,
  changeSelectedGameStatsId,
})(GameStats);
