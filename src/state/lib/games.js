import { normalize, schema } from 'normalizr';

const gameSchema = new schema.Entity('games');
const gameListSchema = new schema.Array(gameSchema);

const normalizeGameList = data => normalize(data, gameListSchema);

export {
  normalizeGameList,
};
