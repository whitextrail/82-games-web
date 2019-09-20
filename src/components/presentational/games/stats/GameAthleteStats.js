import React, { memo } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  Typography,
} from '@material-ui/core';
import {
  FaceSharp,
  HomeSharp,
  AirplanemodeActiveSharp,
} from '@material-ui/icons';
import spencerDinwiddie from '../../../../assets/img/spencer_dinwiddie.png';
import Tabs from '../../../presentational/reusable/Tabs';

const styles = {
  container: {
    marginTop: 15,
    height: 175,
    width: 355,
    backgroundColor: '#333333',
  },
  statsContainer: {
    paddingTop: 10,
  },
  athleteName: {
    fontSize: 14,
    fontWeight: 600,
  },
  chartContainer: {
    position: 'relative',
    width: 225,
    marginTop: 15,
  },
};

const GameAthleteStats = memo(() => (
  <Card
    raised
    component={Grid}
    container
    justify="center"
    alignItems="center"
    style={styles.container}
  >
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ width: 355, height: 175 }}
    >
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ height: 175, width: 55, position: 'relative' }}
      >
        <Tabs
          selectedTabId={'player'}
          onChange={null}
          allTabIds={['player', 'homeTeam', 'awayTeam']}
          tabIcons={{
            player: <FaceSharp />,
            homeTeam: <HomeSharp />,
            awayTeam: <AirplanemodeActiveSharp />,
          }}
          tabIndicatorProps={{
            style: {
              backgroundColor: 'transparent'
            }
          }}
          orientation="vertical"
          style={{ left: -8.5, position: 'absolute' }}
        />
      </Grid>
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        style={{ height: 175, width: 298, backgroundColor: 'rgba(0,0,0,0.54)' }}
      >
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          style={{ height: 175, width: 125 }}
        >
          <CardMedia
            style={{
              height: 80,
              width: 80,
              marginBottom: 10,
              borderRadius: '50%',
              backgroundColor: 'rgba(46,204,113,0.24)',
              border: '5px solid',
              borderColor: 'rgba(46,204,113,0.74)',
            }}
            image={spencerDinwiddie}
          />
          <Typography
            variant="body2"
            align="center"
            color="secondary"
            style={{ fontSize: 12 }}
          >
            DINWIDDIE
          </Typography>
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          style={{ height: 175, width: 173 }}
        >
        </Grid>
      </Grid>
    </Grid>
  </Card>
));

export default GameAthleteStats;
