import React, {
  memo,
  useReducer,
  useCallback,
} from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { fetchGameStatisticById } from '../../../state/actions';
import GameStatsHeader from '../../presentational/games/stats/GameStatsHeader';
import GameAthleteStats from '../../presentational/games/stats/GameAthleteStats';
import GameTeamStats from '../../presentational/games/stats/GameTeamStats';

const initialState = {
  byGamePeriod: {
    '1st': {
      period: 1,
      prize: {
        name: 'wristband',
        quantity: 50,
      },
    },
    '2nd': {
      period: 2,
      prize: {
        name: 'shirt',
        quantity: 25,
      },
    },
    '3rd': {
      period: 3,
      prize: {
        name: 'basketball',
        quantity: 5,
      },
    },
    '4th': {
      period: 4,
      prize: {
        name: 'sneakers',
        quantity: 1,
      },
    }
  },
  allGamePeriods: ['1st', '2nd', '3rd', '4th'],
  allStatsTypes: ['player', 'teams'],
  selectedStatsView: 'player',
  selectedAthleteGameId: 0,
  remainingGameTime: 2880,
};

const actionTypes = {
  CHANGE_STATS_VIEW: 'CHANGE_STATS_VIEW',
  CHANGE_ATHLETE_GAME_ID: 'CHANGE_ATHLETE_GAME_ID',
};

const reducer = (state, action) => {
  const {
    type,
    payload,
  } = action;
  const {
    CHANGE_STATS_VIEW,
    CHANGE_ATHLETE_GAME_ID,
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
        selectedAthleteGameId: payload,
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
  game,
  gamesById,
  teamGameIds,
  teamsById,
  athlete,
  fetchGameStatisticById: fetchGameStatisticByIdAction,
}) => {
  // TODO: Use the dispatcher function to update remainingGameTime
  const [state,dispatch] = useReducer(reducer, { ...initialState, selectedAthleteGameId: game.id });
  const {
    selectedStatsView,
    allStatsTypes,
    selectedAthleteGameId,
  } = state;
  const {
    id: gameId,
    homeTeamStatistics,
    awayTeamStatistics,
    homeTeamId,
    awayTeamId,
  } = game;
  const hasTeamStatistics = homeTeamStatistics && awayTeamStatistics;
  const homeTeam = teamsById[homeTeamId];
  const awayTeam = teamsById[awayTeamId];
  const athleteGames = teamGameIds.reduce((accumulator, value) => {
    if (athlete.performanceStatisticsByGameId[value]) {
      const {
        arena,
        localGameDateTime,
      } = gamesById[value];

      return {
        ...accumulator,
        [value]: {
          arena,
          localGameDateTime,
          homeTeamName: homeTeam.name,
          awayTeamName: awayTeam.name,
          ...athlete.performanceStatisticsByGameId[value],
        },
      };
    }

    return accumulator;
  }, {});

  const changeStatsView = useCallback(
    ({ currentTarget: { id } }) => dispatch({ type: actionTypes.CHANGE_STATS_VIEW, payload: id }),
    [dispatch]
  );

  const changeAthleteGameId = useCallback(
    id => dispatch({ type: actionTypes.CHANGE_ATHLETE_GAME_ID, payload: id }),
    [dispatch]
  );

  if (!hasTeamStatistics) {
    fetchGameStatisticByIdAction(gameId);
  }

  return hasTeamStatistics && (
    <Grid
      container
      alignItems="center"
      direction="column"
      style={styles.container}
    >
      <GameStatsHeader
        navButtonClickHandler={() => history.push(`/games/${statusId}`)}
        allStatsTypes={allStatsTypes}
        selectedStatsView={selectedStatsView}
        changeStatsView={changeStatsView}
        selectedAthleteGameId={selectedAthleteGameId}
        changeAthleteGameId={changeAthleteGameId}
        athleteGames={athleteGames}
      />
      <SwipeableViews index={allStatsTypes.indexOf(selectedStatsView)} style={{ width: '100vw' }}>
        <GameAthleteStats
          selectedAthleteGameId={selectedAthleteGameId}
          athleteGames={athleteGames}
        />
        <GameTeamStats />
      </SwipeableViews>
    </Grid>
  );
});

export default connect(null, {
  fetchGameStatisticById,
})(GameStats);
