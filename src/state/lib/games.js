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
    // Check whether the current time is before the game's date/time
    const isUpcoming = moment().isBefore(moment(value.dateTime));

    if (isUpcoming) {
      return {
        ...accumulator,
        Upcoming: [
          ...accumulator.Upcoming,
          value,
        ]
      };
    }

    return {
      ...accumulator,
      Previous: [
        value,
        ...accumulator.Previous,
      ]
    };
  }, {
    Upcoming: [],
    Live: [],
    Previous: [],
  })
);

export {
  normalizeGameList,
  segmentGamesByStatus,
};
