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
            <GameTeamStats {...selectedGameStats} />
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
