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
  otherAveragesByStatType: {
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
  otherAveragesCalculated: false,
  barValuesUpdated: false,
  calculatedGameId: null,
};

const styles = {
  container: {
    height: 595,
    width: 375,
    marginTop: 15,
  },
  barsContainer: {
    height: 150,
    width: 355,
    background: '#333',
  },
};

const GameAthleteStats = memo(({
  gameId,
  athleteGames,
}) => {
  const {
    [gameId]: selectedGameStats,
    ...otherGameStats
  } = athleteGames;
  const [state, updateState] = useState(initialState);
  const {
    barValuesByStatType,
    otherAveragesCalculated,
    barValuesUpdated,
    allStatTypes,
    calculatedGameId,
  } = state;

  useEffect(() => {
    if (!otherAveragesCalculated) {
      return updateState({
        ...state,
        calculatedGameId: gameId,
        otherAveragesByStatType: calculateStatAverages(allStatTypes, otherGameStats),
        otherAveragesCalculated: true,
      });
    } else if (!barValuesUpdated) {
      setTimeout(() => updateState(updateBarValues(selectedGameStats.athleteStatistics, state)), 100);
    } else if (otherAveragesCalculated && barValuesUpdated && (calculatedGameId !== gameId)) {
      return updateState({
        ...state,
        calculatedGameId: null,
        otherAveragesCalculated: false,
        barValuesUpdated: false,
      });
    }
  }, [
    state,
    otherAveragesCalculated,
    barValuesUpdated,
    allStatTypes,
    selectedGameStats,
    otherGameStats,
    calculatedGameId,
    gameId,
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
          barValuesByStatType={barValuesByStatType}
          athleteStatistics={selectedGameStats.athleteStatistics}
        />
      </Card>
      <GameAthleteStatsComparison selectedGameStats={selectedGameStats} />
    </Grid>
  );
});

export default GameAthleteStats;
