import { sortNumbersAscending } from './';

const calculateStatAverages = (athleteGameStats) => {
  const athleteGameIds = Object.keys(athleteGameStats);

  return athleteGameIds.reduce((acc, id, index) => {
    const {
      MIN,
      PTS,
      REB,
      AST,
    } = athleteGameStats[id];
    const newAcc = {
      MIN: acc.MIN + MIN,
      PTS: acc.PTS + PTS,
      REB: acc.REB + REB,
      AST: acc.AST + AST,
    };

    if (index === (athleteGameIds.length - 1)) {
      // Change totals to average values
      newAcc.MIN = newAcc.MIN / athleteGameIds.length;
      newAcc.PTS = newAcc.PTS / athleteGameIds.length;
      newAcc.REB = newAcc.REB / athleteGameIds.length;
      newAcc.AST = newAcc.AST / athleteGameIds.length;
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
  selectedAthleteGameStats,
  state,
) => {
  const {
    allStatTypes,
    barValuesByStatType,
    otherAveragesByStatType,
  } = state;

  const newBarValues = allStatTypes.reduce((acc, statType) => {
    const [numerator, denominator] = sortNumbersAscending([
      selectedAthleteGameStats[statType],
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
      selectedAthleteGameStats[statType],
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

const sumNumbers = (...args) => args.reduce((total, number) => total + number, 0);

export {
  calculateStatAverages,
  updateBarValues,
  sumNumbers,
};
