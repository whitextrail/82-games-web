import { sortNumbersAscending } from './';

const calculateStatAverages = (allStatTypes, statsByGameId) => {
  const gameIds = Object.keys(statsByGameId);

  return gameIds.reduce((acc, id, index) => {
    const stats = statsByGameId[id];

    return allStatTypes.reduce((acc, type) => {
      const isLast = index < (gameIds.length - 1);
      const typeValue = !isLast
        ? (acc[type] || 0) + stats[type]
        : (acc[type] + stats[type]) / gameIds.length;

      return ({
        ...acc,
        [type]: typeValue,
      });
    }, {});
  }, {});
};

const updateBarValues = (
  selectedGameStats,
  state,
) => {
  const {
    allStatTypes,
    barValuesByStatType,
    otherAveragesByStatType,
  } = state;

  const newBarValues = allStatTypes.reduce((acc, statType) => {
    const [numerator, denominator] = sortNumbersAscending([
      selectedGameStats[statType],
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
      selectedGameStats[statType],
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
