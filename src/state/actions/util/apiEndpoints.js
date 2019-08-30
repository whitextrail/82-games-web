import { API_URL } from '../../../config';

const fetchTeams = `${API_URL}/team`;
const fetchGamesByTeamId = `${API_URL}/game/team`;

export default {
  fetchTeams,
  fetchGamesByTeamId,
};
