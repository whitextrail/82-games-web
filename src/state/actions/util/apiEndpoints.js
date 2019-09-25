import { API_URL } from '../../../config';

// Teams
const fetchTeams = `${API_URL}/team`;

// Games
const fetchTeamGames = `${API_URL}/game/athlete`;

// Game Stats
const fetchGameStats = `${API_URL}/game/statistic`;

// Athletes
const fetchAthlete = `${API_URL}/athlete/profile`;
const fetchAthleteTweets = `${API_URL}/athlete/tweets`;

export default {
  fetchTeams,
  fetchTeamGames,
  fetchGameStats,
  fetchAthlete,
  fetchAthleteTweets,
};
