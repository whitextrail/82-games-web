import React, { PureComponent } from 'react';
import { Grid } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import GameStatsHeader from '../presentational/games/stats/GameStatsHeader';
import GameAthleteStats from '../presentational/games/stats/GameAthleteStats';
import GameTeamStats from '../presentational/games/stats/GameTeamStats';

const styles = {
  container: {
    background: 'linear-gradient(180deg, rgba(51,51,51,1) 25%, rgba(25,25,25,1) 100%)',
    height: '100vh',
  },
};

class GameStats extends PureComponent {
  constructor(props) {
    super(props);

    console.log('props', props);
  }

  render = () => {
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
    //   selectGameStatsGroup,
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

    return (
      <Grid />
      // <Grid
      //   container
      //   alignItems="center"
      //   direction="column"
      //   style={styles.container}
      // >
      //   <GameStatsHeader
      //     navButtonClickHandler={() => history.push(`/games/${statusId}`)}
      //     gamesWithStats={gamesWithStats}
      //     allGameStatsGroups={allGameStatsGroups}
      //     selectGameStatsGroup={selectGameStatsGroup}
      //     selectedGameStatsGroup={selectedGameStatsGroup}
      //     selectGameStatsIndex={selectGameStatsIndex}
      //     selectedGameStatsIndex={selectedGameStatsIndex}
      //     gameIds={gameIds}
      //   />
      //   <SwipeableViews index={allGameStatsGroups.indexOf(selectedGameStatsGroup)} style={{ width: '100vw' }}>
      //     <GameAthleteStats gameWithStatsId={gameWithStatsId} gamesWithStats={gamesWithStats} />
      //     <GameTeamStats selectedGameWithStats={gamesWithStats[gameWithStatsId]} />
      //   </SwipeableViews>
      // </Grid>
    );
  }
}

export default GameStats;
