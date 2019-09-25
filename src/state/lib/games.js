import { normalize, schema } from 'normalizr';
import moment from 'moment-timezone';
import { reduce } from 'lodash';
import { sortNumbersAscending } from '../../util';

const gameSchema = new schema.Entity('games', {}, {
  processStrategy: value => ({
    ...value,
    localGameDateTime: moment(value.dateTime).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('MMMM D, YYYY [-] h:mm A z'),
  })
});
const gameListSchema = new schema.Array(gameSchema);

const normalizeGameList = data => {
  const {
    entities,
    result,
  } = normalize(data, gameListSchema);

  return {
    entities: {
      ...entities,
      gamesByStatus: segmentGamesByStatus(entities.games),
      gameIdsByTeam: segmentGameIdsByTeamId(entities.games),
    },
    result,
  };
};

// TODO: Differentiate between "closed" and "live" games
const segmentGamesByStatus = gamesById => (
  reduce(gamesById, (accumulator, value) => {
    const {
      seasonYears,
      homeTeamPoints,
      awayTeamPoints,
    } = value;
    const season = `S${seasonYears[0]}-${seasonYears[1]}`;

    if (!homeTeamPoints && !awayTeamPoints) {
      const upcoming = [...accumulator.upcoming];

      upcoming.push({
        season,
        ...value,
      });

      return {
        ...accumulator,
        upcoming,
      };
    }

    const previous = [...accumulator.previous];

    previous.unshift({
      season,
      ...value,
    });

    return {
      ...accumulator,
      previous,
    };
  }, {
    previous: [],
    live: [],
    upcoming: [],
  })
);

const segmentGameIdsByTeamId = gamesById => (
  reduce(gamesById, (accumulator, value) => {
    const {
      homeTeamId,
      awayTeamId,
      gameNumber,
      awayTeamPoints,
      homeTeamPoints,
    } = value;

    if (!awayTeamPoints && !homeTeamPoints) {
      return accumulator;
    }

    const {
      [homeTeamId]: accHomeTeamId = [],
      [awayTeamId]: accAwayTeamId = [],
    } = accumulator;

    return {
      ...accumulator,
      ...homeTeamId !== 1 && {
        [homeTeamId]: sortNumbersAscending([
          ...accHomeTeamId,
          gameNumber,
        ]),
      },
      ...awayTeamId !== 1 && {
        [awayTeamId]: sortNumbersAscending([
          ...accAwayTeamId,
          gameNumber,
        ]),
      },
    };
  }, {})
);

export {
  normalizeGameList,
};
