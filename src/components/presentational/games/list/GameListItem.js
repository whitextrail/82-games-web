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
import { primaryColor } from '../../../../styles/constants';

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
    backgroundColor: primaryColor,
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
    id,
    gameNumber,
    season,
  },
  homeTeam,
  awayTeam,
  selectGame,
}) => (
  <Grid container direction="column" style={styles.container}>
    <ListItem disableGutters style={styles.listItem}>
      <Card raised style={styles.card}>
        <CardHeader
          title={`GAME ${gameNumber}`}
          subheader={season}
          action={(
            <Button
              id={id}
              variant="contained"
              size="small"
              style={styles.actionButton}
              onClick={selectGame}
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
