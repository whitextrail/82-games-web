import React, {
  memo,
  useState,
  useEffect,
} from 'react';
import {
  Grid,
  Card,
} from '@material-ui/core';
import GameAthleteStatsProfile from './GameAthleteStatsProfile';
import GameAthleteStatsBars from './GameAthleteStatsBars';
import {
  calculateStatAverages,
  updateBarValues,
} from '../../../../util/gameStats';

const initialState = {
  pastAveragesByStatType: {
    MIN: 0,
    PTS: 0,
    REB: 0,
    AST: 0,
  },
  barValuesByStatType: {
    MIN: 0,
    PTS: 0,
    REB: 0,
    AST: 0,
  },
  allStatTypes: ['MIN', 'PTS', 'REB', 'AST'],
  pastAveragesCalculated: false,
  barValuesUpdated: false,
};

const styles = {
  container: {
    marginTop: 15,
    height: 165,
    width: 365,
    backgroundColor: '#333333',
  },
};

const GameAthleteStats = memo(({
  currentGameId,
  statsByGameId,
}) => {
  const {
    [currentGameId]: currentGameStats,
    ...pastGamesStats
  } = statsByGameId;
  const [state, updateState] = useState(initialState);
  const {
    barValuesByStatType,
    pastAveragesByStatType,
    pastAveragesCalculated,
    barValuesUpdated,
    allStatTypes,
  } = state;

  useEffect(() => {
    if (!pastAveragesCalculated) {
      return updateState({
        ...state,
        pastAveragesByStatType: calculateStatAverages(allStatTypes, pastGamesStats),
        pastAveragesCalculated: true,
      });
    } else if (!barValuesUpdated) {
      setTimeout(() => updateState(updateBarValues(currentGameStats, state)), 150);
    }
  }, [
    state,
    pastAveragesCalculated,
    barValuesUpdated,
    allStatTypes,
    currentGameStats,
    pastGamesStats,
  ]);

  return (
    <Card
      raised
      component={Grid}
      container
      justify="center"
      alignItems="center"
      style={styles.container}
    >
      <GameAthleteStatsProfile />
      <GameAthleteStatsBars
        allStatTypes={allStatTypes}
        currentGameStats={currentGameStats}
        pastAveragesByStatType={pastAveragesByStatType}
        barValuesByStatType={barValuesByStatType}
      />
    </Card>
  );
});

export default GameAthleteStats;
