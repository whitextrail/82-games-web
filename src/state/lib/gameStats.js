import { normalize, schema } from 'normalizr';

const gameStatsSchema = new schema.Entity('gameStats');
const gameStatsListSchema = new schema.Array(gameStatsSchema);

const normalizeGameStatsList = data => normalize(data, gameStatsListSchema);

export {
  normalizeGameStatsList,
};
