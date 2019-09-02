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
import Nav from '../functional/Nav';
import Games from '../functional/Games';
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
      nav,
      teams,
      games,
    } = this.props;
    const {
      selectedId: navSelectedId,
      isOpen,
    } = nav;
    const {
      selectedId: teamsSelectedId,
      inProgress: teamsInProgress,
    } = teams;
    const {
      selectedId: gamesSelectedId,
      inProgress: gamesInProgress,
    } = games;
    const initialStateLoaded = !!(navSelectedId && teamsSelectedId && gamesSelectedId);
    const showProgress = !initialStateLoaded || (teamsInProgress || gamesInProgress);

    return (
      <Fragment>
        <CssBaseline />
        <Header>
          <Nav {...nav} />
        </Header>
        <Body navMenuIsOpen={isOpen}>
          { showProgress ? <Progress /> : <Games teams={teams} games={games} /> }
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
