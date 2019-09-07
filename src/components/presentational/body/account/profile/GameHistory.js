import React, { memo } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Card,
  List,
  ListItem,
  ListSubheader,
} from '@material-ui/core';
import { HistorySharp } from '@material-ui/icons';
import trophy from '../../../../../assets/svg/trophy.svg';
import * as svg from '../../../../../assets/svg/index';

const styles = {
  gameHistoryContainer: {
    height: 445,
    padding: '10px 10px 15px 10px',
  },
  gameHistoryBackground: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 5,
  },
  gameHistoryHeader: {
    height: '15%',
    width: '100%',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: 'rgba(255,255,255,0.85)'
  },
  gameHistoryHeaderText: {
    width: 150,
  },
  list: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    height: '100%',
    paddingRight: 7.5,
    paddingLeft: 7.5,
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 10,
  },
  card: {
    borderRadius: 3,
    width: '100%',
    height: 85,
    padding: 0,
    backgroundColor: 'rgba(255,255,255,0.85)'
  },
  teamsContainer: {
    width: '43%',
  },
  teamLogo: {
    height: 47,
    width: 47,
  },
  teamGameText: {
    width: 20,
    marginLeft: 2,
    marginRight: 2,
  },
  statsContainer: {
    width: '32%',
  },
  trophiesContainer: {
    width: '25%',
  },
  statsPrimaryText: {
    fontSize: 22,
    fontWeight: 600,
    color: '#4cbb17',
  },
};

const Game = memo(({
  game,
  trophies,
  teamOne,
  teamTwo,
}) => {
  const Teams = () => (
    <Grid container justify="center" alignItems="center" style={styles.teamsContainer}>
      <Grid container alignItems="center" justify="flex-end">
        <img src={svg[teamOne]} alt="teamLogo" style={styles.teamLogo} />
      </Grid>
      <Grid container alignItems="center" justify="flex-end" style={styles.teamGameText}>
        <Typography variant="body2" align="center">{ game }</Typography>
      </Grid>
      <Grid container alignItems="center" justify="flex-start">
        <img src={svg[teamTwo]} alt="teamLogo" style={styles.teamLogo} />
      </Grid>
    </Grid>
  );

  const Stats = ({
    byStatsId = {
      PTS: {
        text: 'PTS',
        value: 0,
      },
      STL: {
        text: 'STL',
        value: 0,
      },
      RBD: {
        text: 'RBD',
        value: 0,
      },
    },
    allStatsIds = ['PTS', 'STL', 'RBD'],
  }) => (
    <Grid container justify="center" alignItems="center" style={styles.statsContainer}>
      { allStatsIds.map(id => {
        const {
          text,
          value,
        } = byStatsId[id];

        return (
          <Grid
            key={text}
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Typography variant="h6" style={styles.statsPrimaryText}>{ value }</Typography>
            <Typography variant="body2">{ text }</Typography>
          </Grid>
        );
      }) }
    </Grid>
  );

  const Trophies = () => (
    <Grid container justify="center" alignItems="center" direction="column" style={styles.trophiesContainer}>
      { /* TODO: Programatically render trophies based on points */}
      <img src={trophy} alt="trophy_icon" style={{ height: 35 }} />
      <Typography variant="body2" color="primary">{trophies}/1K</Typography>
    </Grid>
  );

  return (
    <ListItem disableGutters style={styles.listItem}>
      <Card component={Grid} container justify="space-between" style={styles.card}>
        <Teams />
        <Stats />
        <Trophies />
      </Card>
    </ListItem>
  );
});

const GameHistory = memo(() => {
  return (
    <Grid container justify="center" alignItems="center" style={styles.gameHistoryContainer}>
      <Grid container direction="column" style={styles.gameHistoryBackground}>
        <Paper component={Grid} container justify="center" alignItems="center" style={styles.gameHistoryHeader}>
          <Grid container justify="space-around" alignItems="center" style={styles.gameHistoryHeaderText}>
            <Typography variant="body1">Game History</Typography>
            <HistorySharp />
          </Grid>
        </Paper>
        <List disablePadding style={styles.list} subheader={<li />}>
          { /* Below is a placeholder */ }
          <ListSubheader disableSticky>
            S2018-2019
          </ListSubheader>
          <Game
            game="82"
            points={10}
            steals={0}
            rebounds={2}
            trophies={729}
            numberTrophies={[0,1]}
            teamOne="Brooklyn_1"
            teamTwo="Milwaukee_28"
          />
        </List>
      </Grid>
    </Grid>
  );
});

export default GameHistory;
