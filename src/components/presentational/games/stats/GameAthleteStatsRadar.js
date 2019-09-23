import React, {
  memo,
} from 'react';
import {
  Grid,
  Zoom,
  Typography,
} from '@material-ui/core';
import {
  RadarChart,
  DiscreteColorLegend,
} from 'react-vis';
import {
  primaryColor,
  teamColors,
} from '../../../../styles/constants';

const styles = {
  container: {
    marginTop: 20,
    marginBottom: 20,
    height: 325,
    position: 'relative',
  },
  legendItem: {
    color: '#FFF',
  },
};

const GameAthleteStatsRadar = memo(({
  selectedGameStats,
}) => {
  const {
    athleteName,
    athleteStatistics,
    homeTeamName,
    homeTeamStatistics,
    awayTeamName,
    awayTeamStatistics,
    statsKeys,
  } = selectedGameStats;

  const domain = {
    PTS: 0,
    REB: 0,
    AST: 0,
  };

  const homeTeamColors = teamColors[`${selectedGameStats.homeTeamName}_${selectedGameStats.homeTeamId}`];
  const awayTeamColors = teamColors[`${selectedGameStats.awayTeamName}_${selectedGameStats.awayTeamId}`];

  statsKeys.forEach((key) => {
    if (homeTeamStatistics[key] > domain[key]) {
      domain[key] = homeTeamStatistics[key];
    }

    if (awayTeamStatistics[key] > domain[key]) {
      domain[key] = awayTeamStatistics[key];
    }
  });

  const scaledAthleteStatistics = () => {
    return statsKeys.reduce((acc, key) => {
      return {
        ...acc,
        [key]: athleteStatistics[key],
      };
    }, {});
  };

  const DATA = [
    {
      name: homeTeamName,
      ...homeTeamStatistics,
      fill: homeTeamColors.primary.rgba(0.84),
      stroke: homeTeamColors.secondary.rgba(),
    },
    {
      name: awayTeamName,
      ...awayTeamStatistics,
      fill: awayTeamColors.primary.rgba(0.84),
      stroke: awayTeamColors.secondary.rgba(),
    },
    {
      name: athleteName,
      ...scaledAthleteStatistics(),
      fill: primaryColor,
      stroke: 'rgba(142,68,173,0.24)',
      fillOpacity: 1,
    },
  ].sort((a, b) => {
    return b.PTS - a.PTS;
  });

  const legendItems = [(
    <Typography variant="body2" noWrap style={styles.legendItem}>
      {homeTeamName}
    </Typography>
  ), (
    <Typography variant="body2" noWrap style={styles.legendItem}>
      {awayTeamName}
    </Typography>
  ), (
    <Typography variant="body2" noWrap style={styles.legendItem}>
      {athleteName}
    </Typography>
  )];

  const legendColors = [
    homeTeamColors.primary.hex,
    awayTeamColors.primary.hex,
    primaryColor,
  ];

  return (
    <Zoom in timeout={2250}>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        style={styles.container}
      >
        <RadarChart
          animation
          data={DATA}
          tickFormat={() => {
            return '';
          }}
          height={350}
          width={350}
          domains={[
            {name: 'PTS', domain: [0, domain.PTS * 1.2], getValue: d => d.PTS},
            {name: 'REB', domain: [0, domain.REB * 1.2], getValue: d => d.REB},
            {name: 'AST', domain: [0, domain.AST * 1.2], getValue: d => d.AST},
          ]}
          style={{
            polygons: {
              strokeWidth: 5,
              strokeOpacity: 1,
            },
            labels: {
              fill: '#FFF',
              textAnchor: 'middle',
              fontSize: 14,
              fontFamily: ['Red Hat Display', 'sans-serif'],
            },
            axes: {
              line: {
                fillOpacity: 1,
                strokeWidth: 20,
                strokeOpacity: 1
              },
              ticks: {
                fillOpacity: 0,
                strokeOpacity: 0
              },
            },
          }}
          margin={{
            left: 30,
            top: 40,
            bottom: -20,
            right: 30
          }}
          renderAxesOverPolygons={false}
        />
        <DiscreteColorLegend
          items={legendItems}
          colors={legendColors}
          orientation="vertical"
          height={200}
          width={150}
          style={{
            position: 'absolute',
            top: 0,
            left: 10,
          }}
        />
    </Grid>
  </Zoom>
  );
});

export default GameAthleteStatsRadar;
