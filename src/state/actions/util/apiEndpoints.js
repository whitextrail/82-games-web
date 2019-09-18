import { API_URL } from '../../../config';

// Teams
const fetchTeams = `${API_URL}/team`;

// Games
const fetchGamesByTeamId = `${API_URL}/game/team`;
const fetchGameStatisticById = `${API_URL}/game/statistic`;

// Athletes
const fetchAthleteProfileById = `${API_URL}/athlete/profile`;

export default {
  fetchTeams,
  fetchGamesByTeamId,
  fetchGameStatisticById,
  fetchAthleteProfileById,
};
