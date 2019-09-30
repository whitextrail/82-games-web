import React, { memo } from 'react';
import {
  Grid,
  Button,
  Card,
  Typography,
  CardActions,
} from '@material-ui/core';
import signed_sneakers from '../../../../../assets/prizes/signed_sneakers.svg';
import { primaryColor } from '../../../../../styles/constants';

const styles = {
  container: {
    height: 170,
  },
  card: {
    backgroundColor: primaryColor,
  },
  bannerHeader: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 600,
  },
  bannerText: {
    fontSize: 14,
    color: '#FFF',
    paddingRight: 10,
    paddingLeft: 10,
  },
  imgContainer: {
    height: 85,
    width: 85,
    borderRadius: '50%',
    backgroundColor: 'rgba(0,0,0,0.54)',
    position: 'relative',
  },
  img: {
    height: 75,
    width: 75,
    top: 5,
    left: 5,
    position: 'absolute',
  },
  headerActions: {
    minHeight: 40,
    height: 40,
    marginBottom: 12,
  },
  headerButton: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
};

const GamePrizes = memo(({ gameNumber }) => (
  <Grid container justify="center" style={styles.container}>
    <Card raised square component={Grid} container direction="column" item xs={12} style={styles.card}>
      <Grid container direction="row">
        <Grid container justify="center" alignItems="center" item xs={9} direction="column">
          <Typography variant="body1" style={styles.bannerHeader}>
            Want to win Dinwiddie's sneakers?
          </Typography>
          <Typography variant="body2" align="center" style={styles.bannerText}>
            {`Score the highest with your prediction of Spencer's Game ${gameNumber} stats and you will win a pair - personally signed by him!`}
          </Typography>
        </Grid>
        <Grid container alignItems="center" item xs={3}>
          <Grid item style={styles.imgContainer}>
            <img
              src={signed_sneakers}
              style={styles.img}
              alt="Signed Spencer Dinwiddie Sneakers"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid justify="center" alignItems="center" container style={styles.headerActions}>
        <Button
          color="secondary"
          variant="contained"
          style={styles.headerButton}
        >
          PREDICT
        </Button>
      </Grid>
    </Card>
  </Grid>
));

export default GamePrizes;
