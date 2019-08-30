import React, { memo } from 'react';
import {
  Grid,
  Button,
  Avatar,
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';
import {
  GameStatusFilter,
  GameTime,
  GameTeams,
} from './games/';
import avatar from '../../../assets/img/spencer_dinwiddie.png';

const styles = {
  gameFilterContainer: {
    height: 55,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    backgroundColor: '#EFEFEF',
  },
  gamesContainer: {
    height: '100%',
    backgroundColor: '#EFEFEF',
  },
  card: {
    marginRight: 4,
    marginLeft: 3,
    borderRadius: 2,
  },
  cardHeaderAction: {
    color: '#FFF',
    backgroundColor: '#FF3B3F',
  },
  cardContent: {
    height: 200,
    padding: 0,
  },
}

const Games = memo(({
  teams,
  games,
  filterGamesByStatusId,
}) => {
  return (
    <Grid container direction="column">
      <Grid item style={styles.gameFilterContainer}>
        <GameStatusFilter
          gameStatusesById={games.gameStatusesById}
          selectedGameStatusId={games.selectedGameStatusId}
          filterGamesByStatusId={filterGamesByStatusId}
        />
      </Grid>
      <Grid item xs={12} style={styles.gamesContainer}>
        <Card style={styles.card}>
          <CardHeader
            avatar={<Avatar src={avatar} />}
            action={<Button size="small" variant="contained" style={styles.cardHeaderAction}>JOIN</Button>}
            title="Spencer Dinwiddie"
            subheader="Point guard"
          />
          <CardContent style={styles.cardContent}>
            <GameTime />
            <GameTeams />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
});

export default Games;
