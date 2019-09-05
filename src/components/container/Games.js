import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
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
    } = this.props;

    // Teams must be successfully fetched before games
    if (!prevTeams.selectedId && teams.selectedId) {
      fetchGamesByTeamIdAction();
    }
  }

  render = () => {
    const {
      games,
      teams,
    } = this.props;
    const {
      inProgress,
      byStatusId,
      allStatusIds,
      selectedStatusId,
      filterGamesByStatusId: filterGamesByStatusIdAction,
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

export default connect(mapStateToProps, {
  fetchTeams,
  fetchGamesByTeamId,
  filterGamesByStatusId,
})(GamesContainer);
