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

const styles = {
  container: {
    marginTop: 15,
    height: 360,
    position: 'relative',
  },
};

const DATA = [
  {
    name: 'brooklyn',
    PTS: 113,
    AST: 29,
    REB: 68,
    fill: 'rgba(0,0,0, 0.24)',
    stroke: '#000',
  },
  {
    name: 'miami',
    PTS: 94,
    AST: 22,
    REB: 54,
    fill: 'rgba(231,76,60, 0.24)',
    stroke: '#E74C3C',
  },
  {
    name: 'player',
    PTS: 40,
    AST: 15,
    REB: 5,
    fill: 'rgba(142,68,173,0.84)',
    stroke: '#8E44AD',
    fillOpacity: 1,
  },
];

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

const GameAthleteStatsRadar = memo(() => {
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
              {name: 'PTS', domain: [0, 113], getValue: d => d.PTS},
              {name: 'REB', domain: [0, 68], getValue: d => d.REB},
              {name: 'AST', domain: [0, 29], getValue: d => d.AST},
            ]}
            style={{
              polygons: {
                strokeWidth: 5,
                strokeOpacity: 1,
              },
              labels: {
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
              bottom: 0,
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
