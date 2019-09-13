import React, { memo, Fragment } from 'react';
import {
  Grid,
  Button,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  ListItem,
  ListSubheader,
  Typography,
} from '@material-ui/core';
import GameTeams from './GameTeams';
import avatar from '../../../../assets/img/spencer_dinwiddie.png';

const styles = {
  listItem: {
    paddingTop: 0,
    paddingBottom: 4,
  },
  card: {
    borderRadius: 3,
    width: '100%',
  },
  cardContent: {
    height: 240,
    padding: 0,
  },
  gameDetailsContainer: {
    height: '25%',
    width: '90%',
    borderTop: '1px solid #EFEFEF',
    borderBottom: '1px solid #EFEFEF',
    paddingTop: 7,
    paddingBottom: 7,
  },
  actionButton: {
    marginTop: 5,
    marginRight: 5,
  },
};

const GameActionButton = memo(({ selectedStatusId }) => {
  let buttonText = '';
  let buttonProps = {
    size: 'small',
    style: { ...styles.actionButton },
  };

  switch (selectedStatusId) {
    case 'Previous':
      buttonText = 'RESULTS';
      buttonProps = {
        ...buttonProps,
        variant: 'contained',
        color: 'secondary',
      };
      break;
    case 'Live':
      buttonText = 'FEED';
      buttonProps = {
        ...buttonProps,
        variant: 'outlined',
        color: 'primary',
      };
      break;
    case 'Upcoming':
      buttonText = 'PREDICT';
      buttonProps = {
        ...buttonProps,
        variant: 'contained',
        color: 'primary',
      };
      break;
    default:
      return null;
  }

  return <Button {...buttonProps}>{buttonText}</Button>;
});

const Game = memo(({
  selectedStatusId,
  season,
  gameNumber,
  localGameDateTime,
  arena,
  homeTeam,
  awayTeam,
}) => (
  <Fragment>
    <ListSubheader disableSticky>
      {`Game ${gameNumber} (${season})`}
    </ListSubheader>
    <ListItem disableGutters style={styles.listItem}>
      <Card style={styles.card}>
        <CardHeader
          avatar={<Avatar src={avatar} />}
          action={<GameActionButton selectedStatusId={selectedStatusId} />}
          title="Spencer Dinwiddie"
          subheader="0 PTS - 0 STL - 0 AST"
        />
        <CardContent
          component={Grid}
          container
          alignItems="center"
          direction="column"
          style={styles.cardContent}
        >
          <Grid
            container
            justify="space-between"
            alignItems="center"
            direction="column"
            style={styles.gameDetailsContainer}
          >
            <Typography variant="body2">{localGameDateTime}</Typography>
            <Typography variant="body2">{arena}</Typography>
          </Grid>
          <GameTeams homeTeam={homeTeam} awayTeam={awayTeam} />
        </CardContent>
      </Card>
    </ListItem>
  </Fragment>
));

export default Game;
