import React, {
  memo,
  useReducer,
  useCallback,
  useEffect,
} from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { fetchGameStatisticById } from '../../../state/actions';
import GameStatsHeader from '../../presentational/games/stats/GameStatsHeader';
import GameAthleteStats from '../../presentational/games/stats/GameAthleteStats';
import GameTeamStats from '../../presentational/games/stats/GameTeamStats';

const initialState = {
  allStatsViews: ['player', 'teams'],
  selectedStatsView: 'player',
  gameId: 0,
  remainingGameTime: 2880,
  gameStatsFetched: false,
};

const actionTypes = {
  CHANGE_STATS_VIEW: 'CHANGE_STATS_VIEW',
  CHANGE_ATHLETE_GAME_ID: 'CHANGE_ATHLETE_GAME_ID',
  UPDATE_GAME_STATS_FETCHED: 'UPDATE_GAME_STATS_FETCHED',
};

const reducer = (state, action) => {
  const {
    type,
    payload,
  } = action;
  const {
    CHANGE_STATS_VIEW,
    CHANGE_ATHLETE_GAME_ID,
    UPDATE_GAME_STATS_FETCHED,
  } = actionTypes;

  switch(type) {
    case CHANGE_STATS_VIEW:
      return {
        ...state,
        selectedStatsView: payload,
      };
    case CHANGE_ATHLETE_GAME_ID:
      return {
        ...state,
        gameId: payload,
      };
    case UPDATE_GAME_STATS_FETCHED:
      return {
        ...state,
        gameStatsFetched: true,
      };
    default:
      return state;
  }
};

const styles = {
  container: {
    background: 'linear-gradient(180deg, rgba(51,51,51,1) 25%, rgba(25,25,25,1) 100%)',
    height: '100vh',
  },
};

const GameStats = memo(({
  history,
  statusId,
  gameId,
  gamesById,
  teamGameIds,
  teamsById,
  athlete,
  fetchGameStatisticById: fetchGameStatisticByIdAction,
}) => {
  // TODO: Use the dispatcher function to update remainingGameTime
  const [state,dispatch] = useReducer(reducer, { ...initialState });
  const {
    selectedStatsView,
    allStatsViews,
    gameStatsFetched,
  } = state;

  const changeStatsView = useCallback(
    ({ currentTarget: { id } }) => dispatch({ type: actionTypes.CHANGE_STATS_VIEW, payload: id }),
    [dispatch]
  );

  const changeAthleteGameId = useCallback(
    id => dispatch({ type: actionTypes.CHANGE_ATHLETE_GAME_ID, payload: id }),
    [dispatch]
  );

  useEffect(() => {
    if (!gameStatsFetched) {
      teamGameIds.forEach((id, index) => {
        const {
          homeTeamStatistics,
          awayTeamStatistics,
        } = gamesById[id];

        if (!homeTeamStatistics || !awayTeamStatistics) {
          return fetchGameStatisticByIdAction(id);
        } else if (index === (teamGameIds.length - 1)) {
          return dispatch({ type: actionTypes.UPDATE_GAME_STATS_FETCHED });
        }
      });
    }
  });

  const {
    homeTeamId,
    awayTeamId,
  } = gamesById[gameId];
  const homeTeam = teamsById[homeTeamId];
  const awayTeam = teamsById[awayTeamId];

  let athleteGames;

  if (gameStatsFetched) {
    athleteGames = teamGameIds.reduce((accumulator, value) => {
      if (athlete.performanceStatisticsByGameId[value]) {
        const athleteSplitName = athlete.name.split(' ');
        const {
          arena,
          localGameDateTime,
          homeTeamStatistics: currentHomeTeamStatistics,
          awayTeamStatistics: currentAwayTeamStatistics,
        } = gamesById[value];

        return {
          ...accumulator,
          [value]: {
            arena,
            localGameDateTime,
            homeTeamId: homeTeam.id,
            homeTeamName: homeTeam.name,
            awayTeamId: awayTeam.id,
            awayTeamName: awayTeam.name,
            athleteName: athleteSplitName[athleteSplitName.length - 1],
            homeTeamStatistics: {
              PTS: (
                currentHomeTeamStatistics.PTS_QTR1 +
                currentHomeTeamStatistics.PTS_QTR2 +
                currentHomeTeamStatistics.PTS_QTR3 +
                currentHomeTeamStatistics.PTS_QTR4
              ),
              REB: currentHomeTeamStatistics.REB,
              AST: currentHomeTeamStatistics.AST,
              Q1: currentHomeTeamStatistics.PTS_QTR1,
              Q2: currentHomeTeamStatistics.PTS_QTR2,
              Q3: currentHomeTeamStatistics.PTS_QTR3,
              Q4: currentHomeTeamStatistics.PTS_QTR4,
              ...currentHomeTeamStatistics,
            },
            awayTeamStatistics: {
              PTS: (
                currentAwayTeamStatistics.PTS_QTR1 +
                currentAwayTeamStatistics.PTS_QTR2 +
                currentAwayTeamStatistics.PTS_QTR3 +
                currentAwayTeamStatistics.PTS_QTR4
              ),
              REB: currentAwayTeamStatistics.REB,
              AST: currentAwayTeamStatistics.AST,
              Q1: currentAwayTeamStatistics.PTS_QTR1,
              Q2: currentAwayTeamStatistics.PTS_QTR2,
              Q3: currentAwayTeamStatistics.PTS_QTR3,
              Q4: currentAwayTeamStatistics.PTS_QTR4,
              ...currentAwayTeamStatistics,
            },
            statsKeys: ['PTS', 'REB', 'AST'],
            athleteStatistics: { ...athlete.performanceStatisticsByGameId[value] },
          },
        };
      }

      return accumulator;
    }, {});
  }

  return gameStatsFetched && (
    <Grid
      container
      alignItems="center"
      direction="column"
      style={styles.container}
    >
      <GameStatsHeader
        navButtonClickHandler={() => history.push(`/games/${statusId}`)}
        allStatsViews={allStatsViews}
        selectedStatsView={selectedStatsView}
        changeStatsView={changeStatsView}
        gameId={gameId}
        changeAthleteGameId={changeAthleteGameId}
        athleteGames={athleteGames}
      />
      <SwipeableViews index={allStatsViews.indexOf(selectedStatsView)} style={{ width: '100vw' }}>
        <GameAthleteStats
          gameId={gameId}
          athleteGames={athleteGames}
        />
        <GameTeamStats
          gameId={gameId}
          athleteGames={athleteGames}
        />
      </SwipeableViews>
    </Grid>
  );
});

export default connect(null, {
  fetchGameStatisticById,
})(GameStats);
