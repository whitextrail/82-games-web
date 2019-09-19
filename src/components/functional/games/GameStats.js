import React, {
  memo,
  useReducer,
} from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchGameStatisticById } from '../../../state/actions';
import GamePrediction from './GamePrediction';
import GameStatsHeader from '../../presentational/games/stats/GameStatsHeader';
import GamePrizes from '../../presentational/games/stats/GamePrizes';
import GameTeamStats from '../../presentational/games/stats/GameTeamStats';
import GameAthleteStats from '../../presentational/games/stats/GameAthleteStats';

const initialState = {
  byPeriod: {
    '1st': {
      period: 1,
      prize: {
        name: 'wristband',
        quantity: 50,
      },
    },
    '2nd': {
      period: 2,
      prize: {
        name: 'shirt',
        quantity: 25,
      },
    },
    '3rd': {
      period: 3,
      prize: {
        name: 'basketball',
        quantity: 5,
      },
    },
    '4th': {
      period: 4,
      prize: {
        name: 'sneakers',
        quantity: 1,
      },
    }
  },
  allPeriods: ['1st', '2nd', '3rd', '4th'],
  remainingGameTime: 2880,
};

const reducer = (state, action) => {
  const { type } = action;

  switch(type) {
    default:
      return state;
  }
};

const styles = {
  container: {
    backgroundColor: '#333',
    height: '100vh',
  },
};

const GameStats = memo(({
  teamsById,
  game: {
    id: gameId,
    homeTeamPoints,
    awayTeamPoints,
    homeTeamStatistics,
    awayTeamStatistics,
    homeTeamId,
    awayTeamId,
  },
  athlete: {
    name: athleteName,
    performanceStatistics: { PTS, REB, AST },
  },
  fetchGameStatisticById: fetchGameStatisticByIdAction,
}) => {
  // TODO: Use the dispatcher function to update remainingGameTime
  const [state,] = useReducer(reducer, initialState);
  const hasTeamStatistics = homeTeamStatistics && awayTeamStatistics;

  if (!hasTeamStatistics) {
    fetchGameStatisticByIdAction(gameId);
  }

  return hasTeamStatistics && (
    <Grid
      container
      alignItems="center"
      direction="column"
      style={styles.container}
    >
      <GameStatsHeader />
      <GamePrizes {...state} />
      <GamePrediction gameOver={!state.remainingGameTime} />
      <GameAthleteStats
        name={athleteName.toUpperCase()}
        PTS={PTS}
        AST={AST}
        REB={REB}
      />
      <GameTeamStats
        homeTeam={teamsById[homeTeamId]}
        homeTeamPoints={homeTeamPoints}
        homeTeamStatistics={homeTeamStatistics}
        awayTeam={teamsById[awayTeamId]}
        awayTeamPoints={awayTeamPoints}
        awayTeamStatistics={awayTeamStatistics}
      />
    </Grid>
  );
});

export default connect(null, {
  fetchGameStatisticById,
})(GameStats);
