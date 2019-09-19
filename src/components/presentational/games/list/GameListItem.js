import React, { memo } from 'react';
import {
  Grid,
  Card,
  Button,
  CardHeader,
  CardContent,
  ListItem,
} from '@material-ui/core';
import { MoreHorizSharp } from '@material-ui/icons';
import GameListItemTeams from './GameListItemTeams';

const styles = {
  container: {
    padding: '5px 12.5px 0px 12.5px',
  },
  card: {
    width: '100%',
    backgroundColor: '#333333'
  },
  cardContent: {
    padding: 0,
  },
  cardActions: {
    paddingTop: 0,
    paddingBottom: 8,
  },
  actionButton: {
    marginTop: 8,
    marginRight: 8,
    backgroundColor: '#8E44AD',
    color: '#FFF',
    fontSize: 20,
    width: 30,
  },
};

const materialProps = {
  titleTypography: {
    variant: "body1",
    style: { color: 'white' }
  },
  subheaderTypography: {
    variant: "body2",
    style: { color: 'white' }
  },
};

const GameListItem = memo(({
  game: {
    gameNumber,
    season,
  },
  statusId,
  homeTeam,
  awayTeam,
}) => (
  <Grid container direction="column" style={styles.container}>
    <ListItem disableGutters style={styles.listItem}>
      <Card raised style={styles.card}>
        <CardHeader
          title={`GAME ${gameNumber}`}
          subheader={season}
          action={(
            <Button
              variant="contained"
              size="small"
              style={styles.actionButton}
              href={`/games/${statusId}/${gameNumber}`}
            >
              <MoreHorizSharp />
            </Button>
          )}
          titleTypographyProps={materialProps.titleTypography}
          subheaderTypographyProps={materialProps.subheaderTypography}
        />
        <CardContent
          component={Grid}
          container
          justify="center"
          alignItems="center"
          style={styles.cardContent}
        >
          <GameListItemTeams homeTeam={homeTeam} awayTeam={awayTeam} />
        </CardContent>
      </Card>
    </ListItem>
  </Grid>
));

export default GameListItem;
