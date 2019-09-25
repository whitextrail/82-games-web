import React, { PureComponent } from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import { KeyboardArrowLeftSharp } from '@material-ui/icons';
import avatar from '../../assets/img/sdin.png';
import AthleteCoreStatsComparison from '../presentational/athletes/CoreStatsComparison';
import AthletePersonalStats from '../presentational/athletes/PersonalStats';
import AthleteCarousel from '../presentational/athletes/Carousel';
import NavBar from '../presentational/nav/NavBar';

const styles = {
  container: {
    top: 56,
    position: 'absolute',
    backgroundColor: 'black',
  },
  backgroundContainer: {
    backgroundColor: 'black',
    height: '40%',
    position: 'relative',
    top: 0,
  },
  imgTextContainer: {
    paddingLeft: 26,
    width: 125,
    height: 65,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  imgText: {
    fontSize: 24,
    fontWeight: 600,
  },
  img: {
    width: 305,
    height: 310,
  },
  statsContainer: {
    paddingTop: 45,
    width: '100%',
    backgroundColor: 'transparent',
    position: 'relative',
    bottom: 0,
  },
  paper: {
    height: 50,
    borderRadius: 5,
  },
};

const navBarStyleClasses = {
  colorDefault: {
    backgroundColor: '#000000',
    color: '#FFF',
  },
};

class Athletes extends PureComponent {
  goBackRoute = () => this.props.history.goBack()

  render = () => {

    return (
      <Grid container direction="column">
        <NavBar
          icon={<KeyboardArrowLeftSharp />}
          iconButtonClickHandler={this.goBackRoute}
          styleClasses={navBarStyleClasses}
        />
        <Grid container direction="column" style={styles.container}>
          <Grid container style={styles.backgroundContainer}>
            <Grid container direction="column" style={styles.imgTextContainer}>
              <Typography variant="h5" color="secondary" align="left" style={styles.imgText}>#8</Typography>
              <Typography variant="h5" color="secondary" align="left" style={styles.imgText}>SPENCER</Typography>
              <Typography variant="h5" color="secondary" align="left" style={styles.imgText}>DINWIDDIE</Typography>
            </Grid>
            <Grid container justify="flex-end" style={styles.imgContainer}>
              <img src={avatar} style={styles.img} alt="Spencer Dinwiddie" />
            </Grid>
          </Grid>
          <Grid container alignItems="center" direction="column" style={styles.statsContainer}>
            <AthletePersonalStats />
            <AthleteCarousel />
            <AthleteCoreStatsComparison />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Athletes;
