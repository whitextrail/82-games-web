import { normalize, schema } from 'normalizr';

const athleteSchema = new schema.Entity('athlete');

const normalizeAthlete = data => normalize(data, athleteSchema);

export { normalizeAthlete };
