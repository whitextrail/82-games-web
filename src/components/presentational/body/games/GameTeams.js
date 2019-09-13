import React, { memo } from 'react';
import {
  Grid,
  Typography,
  CardMedia,
} from '@material-ui/core';
import {
  HomeSharp,
  AirplanemodeActiveSharp,
} from '@material-ui/icons';
import * as svg from '../../../../assets/svg/index';

const styles = {
  container: {
    height: '75%',
  },
  teamImage: {
    marginBottom: 10,
    height: 100,
    width: 100,
  },
  textContainer: {
    width: 50,
    height: 100,
  },
  winningTeamPoints: {
    color: '#2ECC71',
  },
  loserTeamPoints: {
    color: '#E74C3C',
  },
};

const TeamImage = memo(({
  team: {
    id,
    name,
    points,
  },
  isWinner,
}) => {
  const teamImageName = `${name.split(' ').join('_')}_${id}`;
  const teamPointsStyle = isWinner ? styles.winningTeamPoints : styles.loserTeamPoints;

  return svg[teamImageName] && (
    <Grid container justify="center" alignItems="center" direction="column">
      <CardMedia style={styles.teamImage} image={svg[teamImageName]} />
      <Typography variant="body1" style={teamPointsStyle}>{points}</Typography>
    </Grid>
  );
});

const TeamLocation = memo(({
  isHome,
}) => {
  const headerText = isHome ? 'HOME' : 'AWAY';
  const icon = isHome
    ? <HomeSharp />
    : <AirplanemodeActiveSharp style={{ transform: `rotate(90deg)` }} />;

  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems="center"
      style={styles.textContainer}
    >
      <Typography variant="body2">{headerText}</Typography>
        {icon}
      <Typography variant="body2">GAME</Typography>
    </Grid>
  );
});

const GameTeams = memo(({
  homeTeam,
  awayTeam,
}) => {
  // TODO: Update to check athlete's team
  const isHome = homeTeam.id === 1;

  const homeWinner = homeTeam.points > awayTeam.points;
  const awayWinner = homeTeam.points < awayTeam.points;

  return (
    <Grid container alignItems="center" style={styles.container}>
      <TeamImage
        team={isHome ? homeTeam : awayTeam}
        isHome={isHome}
        isWinner={homeWinner}
      />
      <TeamLocation isHome={isHome} />
      <TeamImage
        team={isHome ? awayTeam : homeTeam}
        isHome={isHome}
        isWinner={awayWinner}
      />
    </Grid>
  );
});

export default GameTeams;
