import React, { memo } from 'react';
import {
  Polar,
} from 'react-chartjs-2';
import {
  Grid,
} from '@material-ui/core';

const data = {
  datasets: [{
    data: [
      3,
      16.8,
      11,
    ],
    backgroundColor: [
      'rgb(44,62,80)',
      'rgb(231,76,60)',
      'rgb(230,126,34)',
    ],
    borderAlign: 'inner'
  }],
  labels: [
    'Game',
    'Season',
    'Career',
  ]
};

const AthleteStats = memo(() => (
  <Grid container justify="center" style={{ position: 'relative', width: 300 }}>
    <Polar
      data={data}
      options={{
        responsive: true,
        legend: {
          fullWidth: false,
          position: 'top',
          labels: {
            boxWidth: 10,
            padding: 5,
            fontSize: 10,
            fontColor: '#333',
            fontFamily: 'Red Hat Display, sans-serif', 
          },
        },
        scale: {
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
          },
        }
      }}
    />
  </Grid>
));

export default AthleteStats;
