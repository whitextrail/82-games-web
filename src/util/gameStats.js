import { sortNumbersAscending } from './';

const calculateStatAverages = (allStatTypes, statsByGameId) => {
  const gameIds = Object.keys(statsByGameId);

  return gameIds.reduce((acc, id, index) => {
    const {
      athleteStatistics: {
        MIN,
        PTS,
        REB,
        AST,
      }
    } = statsByGameId[id];
    const newAcc = {
      MIN: acc.MIN + MIN,
      PTS: acc.PTS + PTS,
      REB: acc.REB + REB,
      AST: acc.AST + AST,
    };

    if (index === (gameIds.length - 1)) {
      // Change totals to average values
      newAcc.MIN = newAcc.MIN / gameIds.length;
      newAcc.PTS = newAcc.PTS / gameIds.length;
      newAcc.REB = newAcc.REB / gameIds.length;
      newAcc.AST = newAcc.AST / gameIds.length;
    }

    return {
      ...newAcc,
    };
  }, {
    MIN: 0,
    PTS: 0,
    REB: 0,
    AST: 0,
  });
};

const updateBarValues = (
  athleteStats,
  state,
) => {
  const {
    allStatTypes,
    barValuesByStatType,
    otherAveragesByStatType,
  } = state;

  const newBarValues = allStatTypes.reduce((acc, statType) => {
    const [numerator, denominator] = sortNumbersAscending([
      athleteStats[statType],
      otherAveragesByStatType[statType]
    ]);
    const targetValue = denominator ? (numerator / denominator) * 100 : 0;
    const barValue = barValuesByStatType[statType];
    const percentageOfTarget = targetValue * 0.1;
    const targetDifference = targetValue - barValue;

    // Check whether subtracting percentageOfPast will cause the bar value to exceed past value
    const barIncrementValue = (targetDifference - percentageOfTarget) > 0
      ? percentageOfTarget
      : targetDifference;

    return {
      ...acc,
      [statType]: barValue + barIncrementValue,
    };
  }, {});

  // Check whether all bar and target values are equal
  const barTargetReached = allStatTypes.every((statType) => {
    const [numerator, denominator] = sortNumbersAscending([
      athleteStats[statType],
      otherAveragesByStatType[statType]
    ]);
    const targetValue = denominator ? (numerator / denominator) * 100 : 0;

    return targetValue === newBarValues[statType];
  });

  return {
    ...state,
    barValuesByStatType: newBarValues,
    barValuesUpdated: barTargetReached,
  };
};

export {
  calculateStatAverages,
  updateBarValues,
};
