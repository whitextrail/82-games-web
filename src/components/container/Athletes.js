import React, { PureComponent, Fragment } from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { KeyboardArrowLeftSharp } from '@material-ui/icons';
import { fetchAthleteTweets } from '../../state/actions';
import AthletePersonalStats from '../presentational/athletes/PersonalStats';
import AthleteCover from '../presentational/athletes/AthleteCover';
import AthleteTweets from '../presentational/athletes/AthleteTweets';
import NavBar from '../presentational/nav/NavBar';

const styles = {
  container: {
    backgroundColor: 'black',
    height: '40vh',
    position: 'relative',
  },
  imgTextContainer: {
    left: 26,
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
    height: '40vh',
    position: 'absolute',
    right: 0,
  },
  statsContainer: {
    height: '60vh',
    width: '100%',
  },
};

const navBarStyleClasses = {
  colorDefault: {
    backgroundColor: '#000000',
    color: '#FFF',
  },
};

class Athletes extends PureComponent {
  constructor(props) {
    super(props);

    props.fetchAthleteTweets();
  }

  goBackRoute = () => this.props.history.goBack()

  render = () => {
    const {
      byId,
      selectedId,
      byTweetId,
      allTweetIds,
    } = this.props;
    const {
      name
    } = byId[selectedId];
    const [firstName, lastName] = name.split(' ');

    return (
      <Fragment>
        <NavBar
          icon={<KeyboardArrowLeftSharp />}
          iconButtonClickHandler={this.goBackRoute}
          styleClasses={navBarStyleClasses}
        />
        <AthleteCover
          id={selectedId}
          firstName={firstName}
          lastName={lastName}
        />
        <Grid container justify="space-around" alignItems="center" direction="column" style={styles.statsContainer}>
          <AthletePersonalStats />
          <AthleteTweets
            byTweetId={byTweetId}
            allTweetIds={allTweetIds}
          />
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ athletes }) => ({ ...athletes });

export default connect(mapStateToProps, { fetchAthleteTweets })(Athletes);
