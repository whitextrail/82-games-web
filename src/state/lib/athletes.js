import { normalize, schema } from 'normalizr';

const athleteSchema = new schema.Entity('athlete');
const athleteTweetSchema = new schema.Entity('athleteTweet');
const athleteTweetListSchema = new schema.Array(athleteTweetSchema);

const normalizeAthlete = data => normalize(data, athleteSchema);
const normalizeAthleteTweets = data => normalize(data, athleteTweetListSchema);

export {
  normalizeAthlete,
  normalizeAthleteTweets,
};
