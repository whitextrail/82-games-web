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

const normalizeGameList = data => normalize(data, gameListSchema);

// TODO: Differentiate between "closed" and "live" games
const segmentGamesByStatus = gamesById => (
  reduce(gamesById, (accumulator, value) => {
    // Check whether the current time is before the game's date/time
    const isOpen = moment().isBefore(moment(value.dateTime));

    if (isOpen) {
      return {
        ...accumulator,
        Open: [
          ...accumulator.Open,
          value,
        ]
      };
    }

    return {
      ...accumulator,
      Closed: [
        value,
        ...accumulator.Closed,
      ]
    };
  }, {
    Closed: [],
    Live: [],
    Open: [],
  })
);

export {
  normalizeGameList,
  segmentGamesByStatus,
};
