import React, {
  memo,
  useReducer,
  useEffect,
} from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchGameStatisticById } from '../../state/actions';
import GamePrizes from '../presentational/body/games/stats/GamePrizes';
import GamePrediction from './GamePrediction';
import GameTeamStats from '../presentational/body/games/stats/GameTeamStats';
import GameAthleteStats from '../presentational/body/games/stats/GameAthleteStats';

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
  const {
    type,
    response,
  } = action;

  switch(type) {
    case 'DEDUCT_GAME_TIME':
      return {
        ...state,
        remainingGameTime: state.remainingGameTime - response.seconds,
      };
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
  game,
  athlete,
  homeTeam: {
    id: homeTeamId,
    name: homeTeamName,
  },
  awayTeam: {
    id: awayTeamId,
    name: awayTeamName,
  },
  fetchGameStatisticById: fetchGameStatisticByIdAction,
}) => {
  useEffect(() => {
    fetchGameStatisticByIdAction(game.id);
  }, [game.id, fetchGameStatisticByIdAction]);

  const [state,] = useReducer(reducer, initialState);
  const {
    byPeriod,
    allPeriods,
    remainingGameTime,
  } = state;
  const {
    name,
    performanceStatisticsByGameId,
  } = athlete;
  const {
    PTS,
    AST,
    REB,
  } = performanceStatisticsByGameId[game.id];
  const {
    homeTeamStatistics = {},
    awayTeamStatistics = {},
    homeTeamPoints,
    awayTeamPoints,
  } = game;
  const {
    PTS_QTR1: homeQ1 = 0,
    PTS_QTR2: homeQ2 = 0,
    PTS_QTR3: homeQ3 = 0,
    PTS_QTR4: homeQ4 = 0,
  } = homeTeamStatistics;
  const {
    PTS_QTR1: awayQ1 = 0,
    PTS_QTR2: awayQ2 = 0,
    PTS_QTR3: awayQ3 = 0,
    PTS_QTR4: awayQ4 = 0,
  } = awayTeamStatistics;

  return (
    <Grid container alignItems="center" direction="column" style={styles.container}>
      <GamePrizes
        byPeriod={byPeriod}
        allPeriods={allPeriods}
        remainingGameTime={remainingGameTime}
      />
      <GamePrediction gameOver={!remainingGameTime} />
      <GameAthleteStats
        name={name.toUpperCase()}
        stats={{ PTS, AST, REB }}
      />
      <GameTeamStats
        homeTeam={{
          id: homeTeamId,
          name: homeTeamName,
          points: {
            total: homeTeamPoints,
            byQuarter: [homeQ1, homeQ2, homeQ3, homeQ4],
          },
        }}
        awayTeam={{
          id: awayTeamId,
          name: awayTeamName,
          points: {
            total: awayTeamPoints,
            byQuarter: [awayQ1, awayQ2, awayQ3, awayQ4],
          },
        }}
      />
    </Grid>
  );
});

export default connect(null, {
  fetchGameStatisticById,
})(GameStats);
