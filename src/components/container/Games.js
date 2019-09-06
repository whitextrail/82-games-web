import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import {
  fetchTeams,
  fetchGamesByTeamId,
  filterGamesByStatusId,
} from '../../state/actions';
import GameHeader from '../presentational/body/games/GameHeader';
import GameList from '../presentational/body/games/GameList';

class GamesContainer extends PureComponent {
  constructor(props) {
    super(props);

    props.fetchTeams();
  }

  componentDidUpdate({ teams: prevTeams }) {
    const {
      teams,
      fetchGamesByTeamId: fetchGamesByTeamIdAction,
      location,
    } = this.props;

    // Teams must be successfully fetched before games
    if (!prevTeams.selectedId && teams.selectedId) {
      const pathnameFragments = location.pathname.split('/');
      const statusFromPathname = pathnameFragments[pathnameFragments.length - 1];

      fetchGamesByTeamIdAction(teams.selectedId, statusFromPathname);
    }
  }

  render = () => {
    const {
      games,
      teams,
      filterGamesByStatusId: filterGamesByStatusIdAction,
    } = this.props;
    const {
      inProgress,
      byStatusId,
      allStatusIds,
      selectedStatusId,
    } = games;
    const gamesByStatusId = (byStatusId && selectedStatusId) ? byStatusId[selectedStatusId] : [];

    return (
      <Grid container direction="column">
        <GameHeader
          selectedStatusId={selectedStatusId}
          allStatusIds={allStatusIds}
          inProgress={inProgress}
          filterGamesByStatusId={filterGamesByStatusIdAction}
        />
        <GameList
          games={gamesByStatusId}
          teams={teams}
          selectedStatusId={selectedStatusId}
        />
      </Grid>
    );
  }
};

const mapStateToProps = ({
  teams,
  games,
}) => ({
  teams,
  games,
});

export default withRouter(connect(mapStateToProps, {
  fetchTeams,
  fetchGamesByTeamId,
  filterGamesByStatusId,
})(GamesContainer));
