import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  withRouter,
  Switch,
  Route,
} from 'react-router-dom';
import {
  fetchTeams,
  fetchGamesByTeamId,
  filterGamesByStatusId,
} from '../../state/actions';
import { Grid } from '@material-ui/core';
import GameList from '../presentational/games/GameList';
import Progress from '../presentational/reusable/Progress';

class GamesContainer extends PureComponent {
  constructor(props) {
    super(props);

    props.fetchTeams();
    props.fetchGamesByTeamId();
  }

  handleTabClick = (event, value) => this.props.filterGamesByStatusId(value);

  render = () => {
    const {
      games: {
        inProgress,
        byStatusId,
        allStatusIds,
      },
      teamsById,
    } = this.props;
    const showProgress = !Object.keys(byStatusId).length || !Object.keys(teamsById) || inProgress;

    return (
      <Grid container direction="column">
        {
          showProgress ? <Progress show /> : (
            <Switch>
              <Route
                exact
                path="/games/:statusId"
                render={routeProps => (
                  <GameList
                    teamsById={teamsById}
                    byStatusId={byStatusId}
                    allStatusIds={allStatusIds}
                    {...routeProps}
                  />
                )}
              />
            </Switch>
          )
        }
      </Grid>
    );
  }
};

const mapStateToProps = ({
  teams,
  games,
}) => ({
  teamsById: teams.byId,
  games,
});

export default withRouter(connect(mapStateToProps, {
  fetchTeams,
  fetchGamesByTeamId,
  filterGamesByStatusId,
})(GamesContainer));
