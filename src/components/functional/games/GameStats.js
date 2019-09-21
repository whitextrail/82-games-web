import React, {
  memo,
  useReducer,
  useCallback,
} from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchGameStatisticById } from '../../../state/actions';
import GameStatsHeader from '../../presentational/games/stats/GameStatsHeader';
import GameAthleteStats from '../../presentational/games/stats/GameAthleteStats';

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
  byStatsType: {
    player: {},
    teams: {},
  },
  allStatsTypes: ['player', 'teams'],
  selectedStatsType: 'player',
  remainingGameTime: 2880,
};

const actionTypes = {
  SELECT_STATS_TYPE: 'SELECT_STATS_TYPE',
};

const reducer = (state, action) => {
  const {
    type,
    payload,
  } = action;

  switch(type) {
    case actionTypes.SELECT_STATS_TYPE:
      return {
        ...state,
        selectedStatsType: payload,
      };
    default:
      return state;
  }
};

const styles = {
  container: {
    backgroundColor: '#333',
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
  const [state,dispatch] = useReducer(reducer, initialState);
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
  const teamGames = teamGameIds.reduce((accumulator, value) => {
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
      },
    };
  }, {});
  const athletePerformanceStatsByGame = teamGameIds.reduce((accumulator, value) => (
    athlete.performanceStatisticsByGameId[value]
    ? ({
        ...accumulator,
        [value]: athlete.performanceStatisticsByGameId[value],
      })
    : accumulator
  ), {});

  const selectStatsType = useCallback(
    ({ currentTarget: { id } }) => dispatch({ type: actionTypes.SELECT_STATS_TYPE, payload: id }),
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
        game={game}
        teamGames={teamGames}
        allStatsTypes={state.allStatsTypes}
        selectedStatsType={state.selectedStatsType}
        selectStatsType={selectStatsType}
      />
      <GameAthleteStats gameId={game.id} stats={athletePerformanceStatsByGame} />
    </Grid>
  );
});

export default connect(null, {
  fetchGameStatisticById,
})(GameStats);
