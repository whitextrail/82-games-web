import React, { PureComponent } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { KeyboardArrowLeftSharp } from '@material-ui/icons';
import { fetchAthleteTweets } from '../../state/actions';
import AthletePersonalStats from '../presentational/athletes/AthletePersonalStats';
import AthleteCover from '../presentational/athletes/AthleteCover';
import AthleteTweets from '../presentational/athletes/AthleteTweets';
import NavBar from '../presentational/nav/NavBar';

const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#000',
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
      name,
      twitterHandle,
    } = byId[selectedId];
    const [firstName, lastName] = name.split(' ');

    return (
      <Grid container alignItems="center" direction="column" style={styles.container}>
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
        <AthletePersonalStats />
        <AthleteTweets
          twitterHandle={twitterHandle}
          byTweetId={byTweetId}
          allTweetIds={allTweetIds}
        />
      </Grid>
    );
  }
}

const mapStateToProps = ({ athletes }) => ({ ...athletes });

export default connect(mapStateToProps, { fetchAthleteTweets })(Athletes);
