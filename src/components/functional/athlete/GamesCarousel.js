import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  HomeSharp,
} from '@material-ui/icons';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
import * as svg from '../../../assets/svg/index';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const styles = {
  teamImage: {
    height: 70,
    width: 70,
  },
  typographyContainer: {
    width: 50,
    height: 50,
  },
};

const slideRenderer = (params) => {
  const { index, key } = params;

  switch (mod(index, 3)) {
    case 0:
      return (
        <Card key={key} style={{ height: 145, padding: 0 }}>
          <CardContent component={Grid} direction="column" style={{ height: '100%', padding: 0 }}>
          <Grid container style={{ height: 40 }}>
            <Grid container direction="column" justify="flex-end" style={{ width: 155, paddingLeft: 10 }}>
              <Typography variant="body2" style={{ fontSize: 12, fontWeight: 600, color: '#333' }}>G1</Typography>
              <Typography variant="body2" style={{ fontSize: 10, color: '#A9A9A9' }}>PRE-SEASON '19-20</Typography>
            </Grid>
            <Grid container justify="space-between" style={{ paddingRight: 10, paddingTop: 9, width: 60 }}>
              <Typography variant="body2" style={{ fontSize: 12, fontWeight: 600, color: '#2ECC71' }}></Typography>
              <Typography variant="body2" style={{ fontSize: 12, fontWeight: 600, color: '#A9A9A9' }}></Typography>
              <Typography variant="body2" style={{ fontSize: 12, fontWeight: 600, color: '#E74C3C' }}></Typography>
            </Grid>
          </Grid>
            <Grid container justify="center" alignItems="center" style={{ height: 105, padding: 0 }}>
              <Grid container justify="center" alignItems="center" style={{ width: '50%' }}>
                <CardMedia style={styles.teamImage} image={svg['Brooklyn_1']} />
              </Grid>
              <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="center"
                style={styles.typographyContainer}
              >
                <Typography variant="body2" style={{ fontSize: 10 }}>HOME</Typography>
                  <HomeSharp style={{ fontSize: 14 }} />
                <Typography variant="body2" style={{ fontSize: 10 }}>GAME</Typography>
              </Grid>
              <Grid container justify="center" alignItems="center" style={{ width: '50%' }}>
                <CardMedia style={styles.teamImage} image={svg['Franca_2']} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      );

    case 1:
      return (
        <Card key={key} style={{ height: 145, padding: 0 }}>
          <CardContent component={Grid} direction="column" style={{ height: '100%', padding: 0 }}>
          <Grid container style={{ height: 40 }}>
            <Grid container direction="column" justify="flex-end" style={{ width: 155, paddingLeft: 10 }}>
              <Typography variant="body2" style={{ fontSize: 12, fontWeight: 600, color: '#333' }}>G2</Typography>
              <Typography variant="body2" style={{ fontSize: 10, color: '#A9A9A9' }}>PRE-SEASON '19-20</Typography>
            </Grid>
            <Grid container justify="space-between" style={{ paddingRight: 10, paddingTop: 9, width: 60 }}>
              <Typography variant="body2" style={{ fontSize: 12, fontWeight: 600, color: '#2ECC71' }}>W</Typography>
              <Typography variant="body2" style={{ fontSize: 12, fontWeight: 600, color: '#A9A9A9' }}>108-96</Typography>
            </Grid>
          </Grid>
            <Grid container justify="center" alignItems="center" style={{ height: 105, padding: 0 }}>
              <Grid container justify="center" alignItems="center" style={{ width: '50%' }}>
                <CardMedia style={styles.teamImage} image={svg['Brooklyn_1']} />
              </Grid>
              <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="center"
                style={styles.typographyContainer}
              >
                <Typography variant="body2" style={{ fontSize: 10 }}>HOME</Typography>
                  <HomeSharp style={{ fontSize: 14 }} />
                <Typography variant="body2" style={{ fontSize: 10 }}>GAME</Typography>
              </Grid>
              <Grid container justify="center" alignItems="center" style={{ width: '50%' }}>
                <CardMedia style={styles.teamImage} image={svg['Indiana_8']} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      );

    case 2:
      return (
        <Card key={key} style={{ height: 145, padding: 0 }}>
          <CardContent component={Grid} direction="column" style={{ height: '100%', padding: 0 }}>
          <Grid container style={{ height: 40 }}>
            <Grid container direction="column" justify="flex-end" style={{ width: 155, paddingLeft: 10 }}>
              <Typography variant="body2" style={{ fontSize: 12, fontWeight: 600, color: '#333' }}>G82</Typography>
              <Typography variant="body2" style={{ fontSize: 10, color: '#A9A9A9' }}>SEASON '18-19</Typography>
            </Grid>
            <Grid container justify="space-between" style={{ paddingRight: 10, paddingTop: 9, width: 60 }}>
              <Typography variant="body2" style={{ fontSize: 12, fontWeight: 600, color: '#2ECC71' }}>W</Typography>
              <Typography variant="body2" style={{ fontSize: 12, fontWeight: 600, color: '#333' }}>113-94</Typography>
            </Grid>
          </Grid>
            <Grid container justify="center" alignItems="center" style={{ height: 105, padding: 0 }}>
              <Grid container justify="center" alignItems="center" style={{ width: '50%' }}>
                <CardMedia style={styles.teamImage} image={svg['Brooklyn_1']} />
              </Grid>
              <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="center"
                style={styles.typographyContainer}
              >
                <Typography variant="body2" style={{ fontSize: 10 }}>HOME</Typography>
                  <HomeSharp style={{ fontSize: 14 }} />
                <Typography variant="body2" style={{ fontSize: 10 }}>GAME</Typography>
              </Grid>
              <Grid container justify="center" alignItems="center" style={{ width: '50%' }}>
                <CardMedia style={styles.teamImage} image={svg['Miami_21']} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      );

    default:
      return null;
  }
};

function GamesCarousel() {
  const [activeStep, updateActiveStep] = useState(0);

  return (
    <Grid
      container
      direction="column"
      style={{
        height: 185,
        marginTop: 10,
        marginBottom: 20,
      }}>
      <Grid container justify="center" alignItems="center" style={{ paddingLeft: 10, height: 40 }}>
        <Typography variant="body2" color="secondary" style={{ fontWeight: 600, fontSize: 14 }}>UPCOMING</Typography>
      </Grid>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{
          height: 145,
          backgroundColor: 'transparent',
          borderRadius: 5,
          position: 'relative',
        }}
      >
        <Grid container justify="center" alignItems="center" style={{ width: '100%', height: 'auto', position: 'absolute' }}>
          <VirtualizeSwipeableViews
            index={activeStep}
            style={{ padding: '0px 60px 0px 60px' }}
            slideStyle={{ padding: '0px 10px 0px 10px' }}
            slideRenderer={slideRenderer}
          />
        </Grid>
        <Grid container justify="center" alignItems="center" style={{ width: 50, borderTopRightRadius: 3, borderBottomRightRadius: 3, position: 'absolute', left: 0, backgroundColor: 'rgba(0,0,0,0.75)' }}>
          <KeyboardArrowLeft style={{ fontSize: 36, color: '#EFEFEF' }} onClick={() => updateActiveStep(activeStep - 1)} />
        </Grid>
        <Grid container justify="center" alignItems="center" style={{ width: 50, borderTopLeftRadius: 3, borderBottomLeftRadius: 3, position: 'absolute', right: 0, backgroundColor: 'rgba(0,0,0,0.75)' }}>
          <KeyboardArrowRight style={{ fontSize: 36, color: '#EFEFEF' }} onClick={() => updateActiveStep(activeStep + 1)} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default GamesCarousel;
