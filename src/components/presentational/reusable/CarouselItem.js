import React, { memo } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import {
  HomeSharp,
  AirplanemodeActiveSharp,
} from '@material-ui/icons';
import * as svg from '../../../assets/svg/index';

const styles = {
  card: {
    height: 75,
    padding: 0,
  },
  cardContent: {
    height: '100%',
    padding: 0,
  },
  textContainer: {
    height: 40,
  },
  gameSeasonContainer: {
    width: 155,
    paddingLeft: 10,
  },
  gameNumber: {
    color: '#333',
  },
  season: {
    fontSize: 10,
    color: '#A9A9A9',
  },
  gamePointsContainer: {
    paddingRight: 10,
    paddingTop: 9,
    width: 60,
  },
  gameWinOutcome: {
    color: '#2ECC71'
  },
  gameLoseOutcome: {
    color: '#E74C3C',
  },
  gamePoints: {
    color: '#A9A9A9',
  },
  text: {
    fontSize: 12,
    fontWeight: 600,
  },
  teamsContainer: {
    height: 96,
    padding: 0,
  },
  teamContainer: {
    width: '50%',
  },
  locationText: {
    fontSize: 10,
  },
  locationIcon: {
    fontSize: 14,
  },
  teamImage: {
    height: 65,
    width: 65,
  },
  awayIcon: {
    transform: `rotate(90deg)`,
  },
  typographyContainer: {
    width: 50,
    height: 60,
  },
};

const CarouselItem = memo(({
  gameNumber,
  seasonTag,
  seasonYear,
  gameOutcome,
  gamePoints,
  homeTeam,
  awayTeam,
  isHome,
}) => (
  <Card style={styles.card}>
    <CardContent component={Grid} style={styles.cardContent}>
      <Grid container style={styles.textContainer}>
        <Grid container direction="column" justify="flex-end" style={styles.gameSeasonContainer}>
          <Typography variant="body2" style={{ ...styles.gameNumber, ...styles.text }}>{`G${gameNumber}`}</Typography>
          <Typography variant="body2" style={styles.season}>{`${seasonTag} '${seasonYear}`}</Typography>
        </Grid>
        {
          gameOutcome && (
            <Grid container justify="space-between" style={styles.gamePointsContainer}>
              <Typography
                variant="body2"
                style={{
                  ...styles.text,
                  ...gameOutcome === 'W' ? styles.gameWinOutcome : styles.gameLoseOutcome
                }}
              >
                { gameOutcome }
              </Typography>
              <Typography variant="body2" style={{ ...styles.text, ...styles.gamePoints}}>
                { gamePoints }
              </Typography>
            </Grid>
          )
        }
      </Grid>
      <Grid container justify="center" alignItems="center" style={styles.teamsContainer}>
        <Grid container justify="center" alignItems="center" style={styles.teamContainer}>
          <CardMedia style={styles.teamImage} image={svg[`${homeTeam.name}_${homeTeam.id}`]} />
        </Grid>
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="center"
          style={styles.typographyContainer}
        >
          <Typography variant="body2" style={styles.locationText}>{isHome ? 'HOME' : 'AWAY' }</Typography>
            {
              isHome
                ? <HomeSharp style={styles.locationIcon} />
                : <AirplanemodeActiveSharp style={{ ...styles.locationIcon, ...styles.awayIcon }} />
            }
          <Typography variant="body2"  style={styles.locationText}>GAME</Typography>
        </Grid>
        <Grid container justify="center" alignItems="center" style={styles.teamContainer}>
          <CardMedia style={styles.teamImage} image={svg[`${awayTeam.name}_${awayTeam.id}`]} />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
));

export default CarouselItem;
