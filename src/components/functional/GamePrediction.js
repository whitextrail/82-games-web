import React, {
  memo,
  useReducer,
} from 'react';
import {
  Grid,
  Paper,
} from '@material-ui/core';
import GamePrediction from '../presentational/body/games/predictions/GamePrediction';

const styles = {
  container: {
    height: 145,
    width: 355,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  textContainer: {
    paddingTop: 5,
    height: 75
  },
  textFieldContainer: {
    height: 70,
    width: 280,
  },
  header: {
    fontWeight: 600,
  },
  text: {
    fontSize: 12,
    color: '#333',
  },
  textField: {
    width: 60,
  },
  textFieldInputLabel: {
    color: '#333',
  },
  button: {
    height: 40,
    width: 40,
    backgroundColor: 'rgb(241,196,15)',
    color: '#FFF',
    marginTop: 7.5,
  },
};

const types = {
  UPDATE_PREDICTION_STAT: 'UPDATE_PREDICTION_STAT',
};

const initialState = {
  byPredictionStat: {
    PTS: 0,
    REB: 0,
    AST: 0,
  },
  allPredictionStats: ['PTS', 'REB', 'AST'],
};

const reducer = (state, action) => {
  const {
    type,
    response,
  } = action;

  switch(type) {
    case 'UPDATE_PREDICTION_STAT':
      const {
        id,
        value,
      } = response;

      return {
        ...state,
        byPredictionStat: {
          ...state.byPredictionStat,
          [id]: value,
        },
      };
    default:
      return state;
  }
};

const GamePredictionFunctional = memo(({
  gameOver,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    byPredictionStat,
    allPredictionStats,
  } = state;

  const updatePredictionStat = ({
    currentTarget: {
      id,
      value,
    },
  }) => dispatch({
    type: types.UPDATE_PREDICTION_STAT,
    response: {
      id,
      value,
    },
  });

  return (
    <Paper
      component={Grid}
      container
      alignItems="center"
      direction="column"
      style={styles.container}
    >
      <GamePrediction
        updatePredictionStat={updatePredictionStat}
        byPredictionStat={byPredictionStat}
        allPredictionStats={allPredictionStats}
        gameOver={gameOver}
      />
    </Paper>
  );
});

export default GamePredictionFunctional;
