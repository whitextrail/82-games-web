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
import { primaryColor } from '../../../../styles/constants';

const styles = {
  container: {
    marginTop: 15,
    height: 325,
    position: 'relative',
  },
};

const legendItems = [
  <Typography variant="body2" noWrap style={{ color: '#FFF', }}>Brooklyn</Typography>,
  <Typography variant="body2" noWrap style={{ color: '#FFF', }}>Miami</Typography>,
  <Typography variant="body2" noWrap style={{ color: '#FFF', }}>Dinwiddie</Typography>
];

const legendColors = [
  '#000',
  '#E74C3C',
  '#8E44AD',
];

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

  let domainPTS = 0;
  let domainREB = 0;
  let domainAST = 0;

  statsKeys.forEach(() => {
    const {
      PTS: homePTS,
      AST: homeAST,
      REB: homeREB,
    } = homeTeamStatistics;
    const {
      PTS: awayPTS,
      AST: awayAST,
      REB: awayREB,
    } = awayTeamStatistics;

    if (homePTS > domainPTS) {
      domainPTS = homePTS;
    }

    if (homeAST > domainAST) {
      domainAST = homeAST;
    }

    if (homeREB > domainREB) {
      domainREB = homeREB;
    }

    if (awayPTS > domainPTS) {
      domainPTS = awayPTS;
    }

    if (awayAST > domainAST) {
      domainAST = awayAST;
    }

    if (awayREB > domainREB) {
      domainREB = awayREB;
    }
  });

  const DATA = [
    {
      name: homeTeamName,
      ...homeTeamStatistics,
      fill: 'rgba(0,0,0, 0.24)',
      stroke: '#000',
    },
    {
      name: awayTeamName,
      ...awayTeamStatistics,
      fill: 'rgba(231,76,60, 0.24)',
      stroke: '#E74C3C',
    },
    {
      name: athleteName,
      ...athleteStatistics,
      fill: 'rgba(142,68,173,0.24)',
      stroke: primaryColor,
      fillOpacity: 1,
    },
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
          height={325}
          width={325}
          domains={[
            {name: 'PTS', domain: [0, domainPTS * 1.1], getValue: d => d.PTS},
            {name: 'REB', domain: [0, domainREB * 1.1], getValue: d => d.REB},
            {name: 'AST', domain: [0, domainAST * 1.1], getValue: d => d.AST},
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
                strokeWidth: 10,
                strokeOpacity: 0.54
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
            bottom: -40,
            right: 30
          }}
          renderAxesOverPolygons={true}
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
