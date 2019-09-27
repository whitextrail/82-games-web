import React, {
  memo,
} from 'react';
import {
  Grid,
  Zoom,
} from '@material-ui/core';
import { RadarChart } from 'react-vis';
import { primaryColor } from '../../../../styles/constants';

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
  statsTypes,
  athleteStats,
  homeTeamStats,
  awayTeamStats,
  homeTeamColors,
  awayTeamColors,
}) => {
  const domain = {
    PTS: 0,
    REB: 0,
    AST: 0,
  };

  statsTypes.forEach((key) => {
    if (homeTeamStats[key] > domain[key]) {
      domain[key] = homeTeamStats[key];
    }

    if (awayTeamStats[key] > domain[key]) {
      domain[key] = awayTeamStats[key];
    }
  });

  const scaledAthleteStatistics = statsTypes.reduce((acc, key) => ({
    ...acc,
    [key]: athleteStats[key] * 1.5,
  }), {});

  const DATA = [
    {
      ...homeTeamStats,
      fill: homeTeamColors.primary.rgba(0.84),
      stroke: homeTeamColors.secondary.rgba(),
    },
    {
      ...awayTeamStats,
      fill: awayTeamColors.primary.rgba(0.84),
      stroke: awayTeamColors.secondary.rgba(),
    },
    {
      ...scaledAthleteStatistics,
      fill: primaryColor,
      stroke: 'rgba(142,68,173,0.24)',
      fillOpacity: 1,
    },
  ].sort((a, b) => {
    return b.PTS - a.PTS;
  });

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
    </Grid>
  </Zoom>
  );
});

export default GameAthleteStatsRadar;
