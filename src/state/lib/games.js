import { normalize, schema } from 'normalizr';
import moment from 'moment-timezone';
import { reduce } from 'lodash';

const gameSchema = new schema.Entity('games', {}, {
  processStrategy: value => ({
    ...value,
    localGameDateTime: moment(value.dateTime).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('MMMM D [at] h:mm A z'),
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
        Upcoming: [
          ...accumulator.Upcoming,
          game,
        ]
      };
    }

    return {
      ...accumulator,
      Previous: [
        game,
        ...accumulator.Previous,
      ]
    };
  }, {
    Previous: [],
    Live: [],
    Upcoming: [],
  })
);

export {
  normalizeGameList,
  segmentGamesByStatus,
};
