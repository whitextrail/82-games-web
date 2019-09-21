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

const updateBarValues = (state, updateState) => {
  const {
    allStatTypes,
    barValuesByStatType,
    pastAveragesByStatType,
  } = state;

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

  // Check whether all bar and past values are equal
  const barPastValueParity = allStatTypes.every((statType) => (
    pastAveragesByStatType[statType] === newBarValues[statType]
  ));

  return setTimeout(() => updateState({
    ...state,
    barValuesByStatType: newBarValues,
    barValuesUpdated: barPastValueParity,
  }), 150);
};

export {
  calculateStatAverages,
  updateBarValues,
};
