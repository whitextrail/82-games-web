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
      id,
      dateTime,
    } = value;

    // Check whether the current time is before the game's date/time
    const isUpcoming = moment().isBefore(moment(dateTime));
    const isLastSeason = moment(dateTime).isBefore('2019-04-11T00:00:00.001Z');
    const season = isLastSeason ? 'S2018-2019' : 'S2019-2020';
    const gameNumber = id > 82 ? (id - 82) : id;

    const game = {
      ...value,
      season,
      gameNumber,
    };

    if (isUpcoming) {
      return {
        ...accumulator,
        upcoming: [
          ...accumulator.upcoming,
          game,
        ]
      };
    }

    return {
      ...accumulator,
      previous: [
        game,
        ...accumulator.previous,
      ]
    };
  }, {
    previous: [],
    live: [],
    upcoming: [],
  })
);

// TODO: Differentiate between "closed" and "live" games
const segmentGameIdsByTeamId = gamesById => (
  reduce(gamesById, (accumulator, value) => {
    const {
      id,
      homeTeamId,
      awayTeamId,
    } = value;
    const gameNumber = id > 82 ? (id - 82) : id;

    const gameIdsByTeamId = {
      ...accumulator,
    };

    if (homeTeamId !== 1) {
      if (gameIdsByTeamId[homeTeamId]) {
        gameIdsByTeamId[homeTeamId].push(gameNumber);
        sortNumbersAscending(gameIdsByTeamId[homeTeamId]);
      } else {
        gameIdsByTeamId[homeTeamId] = [gameNumber];
      }
    }

    if (awayTeamId !== 1) {
      if (gameIdsByTeamId[awayTeamId]) {
        gameIdsByTeamId[awayTeamId].push(gameNumber);
        sortNumbersAscending(gameIdsByTeamId[awayTeamId]);
      } else {
        gameIdsByTeamId[awayTeamId] = [gameNumber];
      }
    }

    return gameIdsByTeamId;
  }, {})
);

export {
  normalizeGameList,
};
