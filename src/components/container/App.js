import React, {
  PureComponent,
  Fragment,
} from 'react';
import { connect } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import {
  setNavState,
  authenticateUser,
  fetchTeams,
  fetchGamesByTeamId,
  filterGamesByStatusId,
} from '../../state/actions';
import {
  Header,
  Body,
  Footer,
} from '../presentational/layout';
import Nav from '../functional/Nav';
import Games from '../functional/Games';
import Progress from '../presentational/reusable/Progress';
import { checkSessionAsync } from '../../util/auth';

class App extends PureComponent {
  constructor(props) {
    super(props);

    props.setNavStateAction();
  }

  componentDidMount = () => (
    // Check for Auth0 user session
    checkSessionAsync()
      .then((result) => {
        const { email } = result.idTokenPayload;

        // Session exists, dispatch authenticateUser with credentials
        return this.props.authenticateUserAction({ email });
      })
      // Error checking for user session, ship them off to Auth0
      .catch((err) => {
        console.log(err);
        // TODO: Handle and report error
      })
  );

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
      user: { inProgress },
      filterGamesByStatusIdAction,
    } = this.props;
    const {
      isOpen,
      selectedId: navSelectedId,
    } = nav;
    const { selectedId: teamsSelectedId } = teams;
    const { selectedId: gamesSelectedId } = games;
    const initialStateLoaded = !!(navSelectedId && teamsSelectedId && gamesSelectedId && !inProgress);

    return (
      <Fragment>
        <CssBaseline />
        <Header>
          <Nav {...nav} />
        </Header>
        <Body navMenuIsOpen={isOpen}>
          { !initialStateLoaded ? <Progress /> : (
            <Games
              teams={teams}
              games={games}
              navMenuIsOpen={isOpen}
              filterGamesByStatusId={filterGamesByStatusIdAction}
            />
          ) }
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
  user,
}) => ({
  nav,
  teams,
  games,
  user,
});

export default connect(mapStateToProps, {
  setNavStateAction: setNavState,
  authenticateUserAction: authenticateUser,
  fetchTeamsAction: fetchTeams,
  fetchGamesByTeamIdAction: fetchGamesByTeamId,
  filterGamesByStatusIdAction: filterGamesByStatusId,
})(App);
