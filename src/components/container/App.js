import React, {
  PureComponent,
  Fragment,
} from 'react';
import { connect } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import {
  setNavState,
  fetchTeams,
  fetchGamesByTeamId,
} from '../../state/actions';
import {
  Header,
  Body,
  Footer,
} from '../presentational/layout';
import Nav from './Nav';
import Games from './Games';
import Progress from '../presentational/reusable/Progress';

class App extends PureComponent {
  constructor(props) {
    super(props);

    props.setNavStateAction();
  }

  componentDidUpdate({ teams: {
    selectedId: prevTeamsSelectedId
  } }) {
    const {
      nav: { selectedId: navSelectedId },
      teams: {
        selectedId: teamsSelectedId,
        inProgress: teamsInProgress,
      },
      games: {
        selectedId: gamesSelectedId,
        inProgress: gamesInProgress,
      },
    } = this.props;

    if (!teamsInProgress && !gamesInProgress) {
      if (navSelectedId && !teamsSelectedId) {
        setTimeout(this.props.fetchTeamsAction, 1000);
      } else if (!prevTeamsSelectedId && teamsSelectedId && !gamesSelectedId) {
        this.props.fetchGamesByTeamIdAction();
      }
    }
  }

  render = () => {
    const {
      nav: {
        selectedId: navSelectedId,
      },
      teams: {
        selectedId: teamsSelectedId,
        inProgress: teamsInProgress,
      },
      games: {
        selectedId: gamesSelectedId,
        inProgress: gamesInProgress,
      },
    } = this.props;
    const initialStateLoaded = !!(navSelectedId && teamsSelectedId && gamesSelectedId);
    const showProgress = !initialStateLoaded || (teamsInProgress || gamesInProgress);

    return (
      <Fragment>
        <CssBaseline />
        <Header>
          <Nav />
        </Header>
        <Body>
          { showProgress ? <Progress /> : <Games /> }
        </Body>
        <Footer />
      </Fragment>
    );
  }
};

const mapStateToProps = ({
  nav,
  teams,
  games,
}) => ({
  nav,
  teams,
  games,
});

export default connect(mapStateToProps, {
  setNavStateAction: setNavState,
  fetchTeamsAction: fetchTeams,
  fetchGamesByTeamIdAction: fetchGamesByTeamId,
})(App);
