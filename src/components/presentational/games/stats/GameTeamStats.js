import React, { memo } from 'react';
import {
  Grid,
} from '@material-ui/core';
import GameTeamStatsBox from './GameTeamStatsBox';
import GameTeamStatsBoxChart from './GameTeamStatsBoxChart';
import GameTeamStatsBreakdown from './GameTeamStatsBreakdown';
import { sumNumbers } from '../../../../util/gameStats';

const styles = {
  container: {
    height: window.innerHeight - 152,
    width: 375,
    marginTop: 15,
  },
};

const GameTeamStats = memo(({
  homeTeamId,
  awayTeamId,
  homeTeamStatistics,
  awayTeamStatistics,
}) => {
  const {
    PTS_QTR1: homePTSQ1,
    PTS_QTR2: homePTSQ2,
    PTS_QTR3: homePTSQ3,
    PTS_QTR4: homePTSQ4,
    REB: homeREB,
    AST: homeAST,
  } = homeTeamStatistics;
  const {
    PTS_QTR1: awayPTSQ1,
    PTS_QTR2: awayPTSQ2,
    PTS_QTR3: awayPTSQ3,
    PTS_QTR4: awayPTSQ4,
    REB: awayREB,
    AST: awayAST,
  } = awayTeamStatistics;
  const homeTeamStats = {
    PTS: sumNumbers(homePTSQ1, homePTSQ2, homePTSQ3, homePTSQ4),
    REB: homeREB,
    AST: homeAST,
  };
  const awayTeamStats = {
    PTS: sumNumbers(awayPTSQ1, awayPTSQ2, awayPTSQ3, awayPTSQ4),
    REB: awayREB,
    AST: awayAST,
  };
  const teamStats = [{
    teamId: homeTeamId,
    wL: homeTeamStats.PTS > awayTeamStats.PTS ? 'W': 'L',
    ...homeTeamStatistics
  }, {
    teamId: awayTeamId,
    wL: homeTeamStats.PTS < awayTeamStats.PTS ? 'W': 'L',
    ...awayTeamStatistics
  }];

  return (
    <Grid container alignItems="center" direction="column" style={styles.container}>
      <GameTeamStatsBox teamStats={teamStats}>
        <GameTeamStatsBoxChart
          homeTeamId={homeTeamId}
          awayTeamId={awayTeamId}
          homeTeamPointsByQuarter={[homePTSQ1, homePTSQ2, homePTSQ3, homePTSQ4]}
          awayTeamPointsByQuarter={[awayPTSQ1, awayPTSQ2, awayPTSQ3, awayPTSQ4]}
        />
        <GameTeamStatsBreakdown
          homeTeamId={homeTeamId}
          awayTeamId={awayTeamId}
          homeTeamStatistics={{ ...homeTeamStatistics, ...homeTeamStats }}
          awayTeamStatistics={{ ...awayTeamStatistics, ...awayTeamStats }}
        />
      </GameTeamStatsBox>
    </Grid>
  );
});

export default GameTeamStats;
