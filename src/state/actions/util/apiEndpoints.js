import { API_URL } from '../../../config';

// User
const authenticateUser = `${API_URL}/user/authenticate`;

// Teams
const fetchTeams = `${API_URL}/team`;
const fetchGamesByTeamId = `${API_URL}/game/team`;

// Athletes
const fetchAthleteProfileById = `${API_URL}/athlete/profile`;

export default {
  authenticateUser,
  fetchTeams,
  fetchGamesByTeamId,
  fetchAthleteProfileById,
};
