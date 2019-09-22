import React, { memo } from 'react';
import {
  Grid,
  Card,
  Typography,
} from '@material-ui/core';
import GameAthleteStatsRadar from './GameAthleteStatsRadar';

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
}) => {
  const comparisonTypes = ['homeTeam', 'awayTeam', 'athlete'];

  return (
    <Grid container justify="center" alignItems="center" direction="column" style={styles.container}>
      <GameAthleteStatsRadar selectedGameStats={selectedGameStats} />
      <Grid
        container
        justify="space-around"
        alignItems="center"
        style={{ height: 115 }}
      >
        {
          comparisonTypes.map((comparisonType) => {
            const { statsKeys } = selectedGameStats;
            const name = selectedGameStats[`${comparisonType}Name`].toUpperCase();
            const comparisonStats = selectedGameStats[`${comparisonType}Statistics`];
            const {
              card,
              [`${comparisonType}Card`]: comparisonTypeCard,
              cardName,
              statsContainer,
              statValue,
              statType,
            } = styles;
            const cardStyle = { ...card, ...comparisonTypeCard };

            return (
              <Card
                key={comparisonType}
                raised
                component={Grid}
                container
                justify="center"
                alignItems="center"
                direction="column"
                style={cardStyle}
              >
                <Typography variant="body2" style={cardName}>{name}</Typography>
                <Grid container justify="center" alignItems="center" style={statsContainer}>
                  {
                    statsKeys.map((key) => (
                      <Grid key={key} container justify="center" alignItems="center" direction="column" style={{ width: 30 }}>
                        <Typography variant="body2" style={statValue}>{comparisonStats[key]}</Typography>
                        <Typography variant="body2" style={statType}>{key}</Typography>
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
