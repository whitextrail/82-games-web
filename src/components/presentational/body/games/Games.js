import React, { memo } from 'react';
import {
  Grid,
  Button,
  Avatar,
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';
import GameTime from './GameTime';
import GameTeams from './GameTeams';
import avatar from '../../../../assets/img/spencer_dinwiddie.png';
import {
  primaryColor,
  secondaryColor,
  secondaryTextColor,
} from '../../../../styles/constants';

const styles = {
  container: {
    height: '100%',
    backgroundColor: secondaryColor,
  },
  card: {
    marginRight: 4,
    marginLeft: 3,
    borderRadius: 2,
  },
  cardHeaderAction: {
    color: secondaryTextColor,
    backgroundColor: primaryColor,
  },
  cardContent: {
    height: 200,
    padding: 0,
  },
};

const Games = memo(() => {
  return (
    <Grid item xs={12} style={styles.container}>
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
  );
});

export default Games;
