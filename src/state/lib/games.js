import { normalize, schema } from 'normalizr';
import moment from 'moment-timezone';

const gameSchema = new schema.Entity('games', {}, {
  processStrategy: value => ({
    ...value,
    dateTime: moment(value.dateTime).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('MMMM D [at] h:mm A z'),
  })
});
const gameListSchema = new schema.Array(gameSchema);

const normalizeGameList = data => normalize(data, gameListSchema);

export {
  normalizeGameList,
};
