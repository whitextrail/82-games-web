import { normalize, schema } from 'normalizr';

const teamSchema = new schema.Entity('teams');
const teamListSchema = new schema.Array(teamSchema);

const normalizeTeamList = data => normalize(data, teamListSchema);

export {
  normalizeTeamList,
};
