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

const sumUpQuarterlyPoints = teamStats => (
  ['PTS_QTR1', 'PTS_QTR2', 'PTS_QTR3', 'PTS_QTR4'].reduce((acc, val) => acc + teamStats[val], 0)
);

const GameAthleteStatsComparison = memo(({
  selectedGameStats,
  selectedAthleteGameStats,
}) => {
  const {
    homeTeamStatistics,
    awayTeamStatistics,
  } = selectedGameStats;
  const homeTeamStats = {
    PTS: sumUpQuarterlyPoints(homeTeamStatistics),
    REB: homeTeamStatistics.REB,
    AST: homeTeamStatistics.AST,
  };
  const awayTeamStats = {
    PTS: sumUpQuarterlyPoints(awayTeamStatistics),
    REB: awayTeamStatistics.REB,
    AST: awayTeamStatistics.AST,
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
