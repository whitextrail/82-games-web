import React, {
  memo,
  useState,
  useEffect,
} from 'react';
import {
  Grid,
  Card,
} from '@material-ui/core';
import GameAthleteStatsProfile from './GameAthleteStatsProfile';
import GameAthleteStatsBars from './GameAthleteStatsBars';
import GameAthleteStatsComparison from './GameAthleteStatsComparison';

import {
  calculateStatAverages,
  updateBarValues,
} from '../../../../util/gameStats';

const initialState = {
  pastAveragesByStatType: {
    MIN: 0,
    PTS: 0,
    REB: 0,
    AST: 0,
  },
  barValuesByStatType: {
    MIN: 0,
    PTS: 0,
    REB: 0,
    AST: 0,
  },
  allStatTypes: ['MIN', 'PTS', 'REB', 'AST'],
  pastAveragesCalculated: false,
  barValuesUpdated: false,
};

const styles = {
  container: {
    height: 595,
    width: 365,
    marginTop: 15,
  },
  barsContainer: {
    height: 150,
    background: '#333',
  },
};

const GameAthleteStats = memo(({
  currentGameId,
  statsByGameId,
}) => {
  const {
    [currentGameId]: currentGameStats,
    ...pastGamesStats
  } = statsByGameId;
  const [state, updateState] = useState(initialState);
  const {
    barValuesByStatType,
    pastAveragesByStatType,
    pastAveragesCalculated,
    barValuesUpdated,
    allStatTypes,
  } = state;

  useEffect(() => {
    if (!pastAveragesCalculated) {
      return updateState({
        ...state,
        pastAveragesByStatType: calculateStatAverages(allStatTypes, pastGamesStats),
        pastAveragesCalculated: true,
      });
    } else if (!barValuesUpdated) {
      setTimeout(() => updateState(updateBarValues(currentGameStats, state)), 100);
    }
  }, [
    state,
    pastAveragesCalculated,
    barValuesUpdated,
    allStatTypes,
    currentGameStats,
    pastGamesStats,
  ]);

  return (
    <Grid container justify="center" alignItems="center" direction="column" style={styles.container}>
      <Card
        raised
        component={Grid}
        container
        justify="center"
        alignItems="center"
        style={styles.barsContainer}
      >
        <GameAthleteStatsProfile />
        <GameAthleteStatsBars
          allStatTypes={allStatTypes}
          currentGameStats={currentGameStats}
          pastAveragesByStatType={pastAveragesByStatType}
          barValuesByStatType={barValuesByStatType}
        />
      </Card>
      <GameAthleteStatsComparison />
    </Grid>
  );
});

export default GameAthleteStats;
