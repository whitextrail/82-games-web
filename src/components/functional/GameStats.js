import React, {
  memo,
  useReducer,
} from 'react';
import {
  Grid,
} from '@material-ui/core';
import GamePrizes from '../presentational/body/games/stats/GamePrizes';
import GamePrediction from '../presentational/body/games/stats/GamePrediction';
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
  remainingGameTime: 0,
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

  return (
    <Grid container alignItems="center" direction="column" style={styles.container}>
      <GamePrizes {...state} />
      <GamePrediction />
      <GameAthleteStats />
      <GameTeamStats />
    </Grid>
  );
});

export default GameStats;
