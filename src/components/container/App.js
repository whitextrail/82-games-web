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
      filterGamesByStatusIdAction,
    } = this.props;
    const {
      isOpen,
      selectedId: navSelectedId,
    } = nav;
    const { selectedId: teamsSelectedId } = teams;
    const { selectedId: gamesSelectedId } = games;
    const initialStateLoaded = !!(navSelectedId && teamsSelectedId && gamesSelectedId);

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
}) => ({
  nav,
  teams,
  games,
});

export default connect(mapStateToProps, {
  setNavStateAction: setNavState,
  fetchTeamsAction: fetchTeams,
  fetchGamesByTeamIdAction: fetchGamesByTeamId,
  filterGamesByStatusIdAction: filterGamesByStatusId,
})(App);
