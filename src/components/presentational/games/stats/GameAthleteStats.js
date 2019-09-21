import React, {
  memo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  Grid,
  Card,
} from '@material-ui/core';
import GameAthleteStatsProfile from './GameAthleteStatsProfile';
import GameAthleteStatsBars from './GameAthleteStatsBars';
import { calculateStatAverages } from '../../../../util/gameStats';

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
  statsBarContainer: {
    height: 105,
    width: 220,
    paddingBottom: 10,
  },
  statsBarInnerContainer: {
    height: 70,
    width: 50,
  },
  statsBarValueLabel: {
    color: '#FFF',
    fontSize: 12,
  },
  statsBar: {
    height: 20,
    width: 65,
    borderRadius: 3,
    transform: 'rotate(-90deg)',
  },
};

const GameAthleteStats = memo(({
  statsByGameId,
}) => {
  const {
    currentGameStats,
    ...pastGamesStats
  } = statsByGameId;
  const [state, updateState] = useState(initialState);
  const {
    pastAveragesCalculated,
    barValuesUpdated,
    allStatTypes,
  } = state;

  useEffect(() => {
    if (!pastAveragesCalculated) {
      return updateState({
        pastAveragesByStatType: calculateStatAverages(allStatTypes, pastGamesStats),
        pastAveragesCalculated: true,
      });
    }

    console.log(state);
  }, [
    state,
    pastAveragesCalculated,
    barValuesUpdated,
    // calculatePastGamesStatsAverages,
    // updateBarValuesLinearly,
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
      {/* <GameAthleteStatsBars /> */}
    </Card>
  );
});

export default GameAthleteStats;
