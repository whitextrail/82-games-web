import React, {
  memo,
  useReducer,
} from 'react';
import {
  Grid,
} from '@material-ui/core';
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
  byStat: {
    points: {
      shorthand: 'PTS',
      value: 0,
    },
    rebounds: {
      shorthand: 'RBD',
      value: 0,
    },
    assists: {
      shorthand: 'AST',
      value: 0,
    },
  },
  allStats: ['points', 'rebounds', 'assists'],
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

const GameStats = memo(() => {
  const [state,] = useReducer(reducer, initialState);
  const {
    byPeriod,
    allPeriods,
    byStat,
    allStats,
    remainingGameTime,
  } = state;

  return (
    <Grid container alignItems="center" direction="column" style={styles.container}>
      <GamePrizes byPeriod={byPeriod} allPeriods={allPeriods} />
      <GamePrediction byStat={byStat} allStats={allStats} gameOver={!remainingGameTime} />
      <GameAthleteStats />
      <GameTeamStats />
    </Grid>
  );
});

export default GameStats;
