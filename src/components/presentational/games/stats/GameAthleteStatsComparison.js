import React, { memo } from 'react';
import {
  Grid,
  Card,
  Typography,
} from '@material-ui/core';
import GameAthleteStatsRadar from './GameAthleteStatsRadar';
import {
  primaryColor,
  teamColors,
} from '../../../../styles/constants';
import { sumNumbers } from '../../../../util/gameStats';

const styles = {
  container: {
    marginTop: 15,
    height: 435,
    position: 'relative',
    width: 365,
  },
  card: {
    height: 80,
    width: 110,
  },
  homeTeamCard: {
    backgroundColor: '#000',
  },
  awayTeamCard: {
    backgroundColor: '#E74C3C',
  },
  athleteCard: {
    backgroundColor: '#8E44AD',
  },
  cardName: {
    fontSize: 14,
    color: '#FFF',
  },
  statsContainer: {
    height: 45,
  },
  statValue: {
    fontSize: 16,
    color: '#FFF',
  },
  statType: {
    fontSize: 10,
    color: '#FFF',
  },
};

const GameAthleteStatsComparison = memo(({
  selectedGameStats,
  selectedAthleteGameStats,
}) => {
  const {
    homeTeamStatistics: {
      PTS_QTR1: homePTSQ1,
      PTS_QTR2: homePTSQ2,
      PTS_QTR3: homePTSQ3,
      PTS_QTR4: homePTSQ4,
      REB: homeREB,
      AST: homeAST,
    },
    awayTeamStatistics: {
      PTS_QTR1: awayPTSQ1,
      PTS_QTR2: awayPTSQ2,
      PTS_QTR3: awayPTSQ3,
      PTS_QTR4: awayPTSQ4,
      REB: awayREB,
      AST: awayAST,
    },
  } = selectedGameStats;

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
  const combinedStats = {
    athlete: selectedAthleteGameStats,
    homeTeam: homeTeamStats,
    awayTeam: awayTeamStats,
  };
  const combinedStatsKeys = Object.keys(combinedStats);
  const statsTypes = ['PTS', 'REB', 'AST'];
  const homeTeamColors = teamColors[selectedGameStats.homeTeamId];
  const awayTeamColors = teamColors[selectedGameStats.awayTeamId];
  const cardColors = {
    athlete: primaryColor,
    homeTeam: homeTeamColors.primary.hex,
    awayTeam: awayTeamColors.primary.hex,
  };

  return (
    <Grid container justify="center" alignItems="center" direction="column" style={styles.container}>
      <GameAthleteStatsRadar
        statsTypes={statsTypes}
        athleteStats={selectedAthleteGameStats}
        homeTeamStats={homeTeamStats}
        awayTeamStats={awayTeamStats}
        homeTeamColors={homeTeamColors}
        awayTeamColors={awayTeamColors}
      />
      <Grid
        container
        justify="space-around"
        alignItems="center"
        style={{ height: 115 }}
      >
        {
          combinedStatsKeys.map((key) => {
            const stats = combinedStats[key];
            const {
              card,
              statsContainer,
              statValue,
              statType,
            } = styles;
            const cardStyle = {
              ...card,
              backgroundColor: cardColors[key],
            };

            return (
              <Card
                key={key}
                raised
                component={Grid}
                container
                justify="center"
                alignItems="center"
                direction="column"
                style={cardStyle}
              >
                <Grid container justify="center" alignItems="center" style={statsContainer}>
                  {
                    statsTypes.map((type) => (
                      <Grid key={type} container justify="center" alignItems="center" direction="column" style={{ width: 30 }}>
                        <Typography variant="body2" style={statValue}>{stats[type]}</Typography>
                        <Typography variant="body2" style={statType}>{type}</Typography>
                      </Grid>
                    ))
                  }
                </Grid>
              </Card>
            );
          })
        }
      </Grid>
    </Grid>
  );
});

export default GameAthleteStatsComparison;
