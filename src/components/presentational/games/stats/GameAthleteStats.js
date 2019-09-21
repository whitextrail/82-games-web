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
    ...pastGamesStats
  } = statsByGameId;
  const [state, updateState] = useState(initialState);
  const {
    pastAveragesCalculated,
    barValuesUpdated,
    allStatTypes,
  } = state;

  const calculatePastGamesStatsAverages = useCallback(() => {
    const pastGamesStatsTotals = {};
    const pastGameIds = Object.keys(pastGamesStats);

    // Calculate average stats for past games
    pastGameIds.forEach((id) => {
      const pastGameStats = pastGamesStats[id];

      allStatTypes.forEach((type) => {
        pastGamesStatsTotals[type] = pastGamesStatsTotals[type] + pastGameStats[type];
      });
    });

    return updateState({
      ...state,
      pastAveragesCalculated: true,
      pastAveragesByStatType: allStatTypes.reduce((acc, type) => ({
        ...acc,
        [type]: pastGamesStatsTotals[type] / pastGameIds.length,
      }), {}),
    });
  }, [
    state,
    pastGamesStats,
    allStatTypes,
  ]);

  const updateBarValuesLinearly = useCallback((latestState) => {
    // Latest state must be passed in due to `state` being previous state values
    const {
      barValuesByStatType,
      pastAveragesByStatType,
    } = latestState;

    const newBarValues = allStatTypes.reduce((acc, statType) => {
      const past = pastAveragesByStatType[statType];
      const bar = barValuesByStatType[statType];
      const percentageOfPast = past * 0.1;
      const barPastDifference = past - bar;

      // Check whether subtracting percentageOfPast will cause the bar value to exceed past value
      const barIncrementValue = (barPastDifference - percentageOfPast) > 0
        ? percentageOfPast
        : barPastDifference;

      return {
        ...acc,
        [statType]: bar + barIncrementValue,
      };
    }, {});

    // Check whether bar and past values are equal
    const barPastValueParity = allStatTypes.every((statType) => (
      pastAveragesByStatType[statType] === newBarValues[statType]
    ));

    return setTimeout(() => updateState({
      ...latestState,
      barValuesByStatType: newBarValues,
      barValuesUpdated: barPastValueParity,
    }), 150);
  }, [
    allStatTypes,
  ]);

  useEffect(() => {
    if (!pastAveragesCalculated) {
      calculatePastGamesStatsAverages();
    } else if (!barValuesUpdated) {
      updateBarValuesLinearly(state);
    }
  }, [
    state,
    pastAveragesCalculated,
    barValuesUpdated,
    calculatePastGamesStatsAverages,
    updateBarValuesLinearly,
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
    </Card>
  );
});

export default GameAthleteStats;
