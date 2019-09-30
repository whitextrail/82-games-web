import { normalize, schema } from 'normalizr';

const userPredictionSchema = new schema.Entity('userPredictions', {}, { idAttribute: 'gameId' });
const userPredictionListSchema = new schema.Array(userPredictionSchema);

const normalizeUserPredictionList = data => normalize(data, userPredictionListSchema);

export {
  normalizeUserPredictionList,
};
