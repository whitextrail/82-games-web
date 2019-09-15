import React, {
  memo,
  Fragment,
} from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import { LocalActivitySharp } from '@material-ui/icons';

const styles = {
  container: {
    height: 145,
    width: 355,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  textContainer: {
    paddingTop: 5,
    height: 75
  },
  textFieldContainer: {
    height: 70,
    width: 280,
  },
  header: {
    fontWeight: 600,
  },
  text: {
    fontSize: 12,
    color: '#333',
  },
  textField: {
    width: 60,
  },
  textFieldInputLabel: {
    color: '#333',
  },
  button: {
    height: 40,
    width: 40,
    backgroundColor: 'rgb(241,196,15)',
    color: '#FFF',
    marginTop: 7.5,
  },
};

const GamePredictionText = ({
  gameOver,
}) => {
  const GameOpenText = () => (
    gameOver ? (
      <Typography variant="body2"  style={{ ...styles.header, ...styles.text }}>
        Game has ended.
      </Typography>
    ) : (
      <Fragment>
        <Typography variant="body2"  style={{ ...styles.header, ...styles.text }}>
          Compete to win the prizes above before time runs out!
        </Typography>
        <Typography variant="body2" style={{ ...styles.text }}>
          What will Spencer Dinwiddie's endgame stats be?
        </Typography>
      </Fragment>
    )
  );

  return (
    <Grid
      container
      justify="space-around"
      alignItems="center"
      direction="column"
      style={styles.textContainer}
    >
      <GameOpenText />
    </Grid>
  );
};

const GamePredictionForm = memo(({
  updatePredictionStat,
  byPredictionStat,
  allPredictionStats,
}) => (
  <Grid container justify="space-between" style={styles.textFieldContainer}>
    {
      allPredictionStats.map(stat => {
        const {
          shorthand,
          value,
        } = byPredictionStat[stat];

        return (
          <TextField
            id={stat}
            key={stat}
            label={shorthand}
            value={value}
            onChange={updatePredictionStat}
            margin="dense"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
              style: styles.textFieldInputLabel,
            }}
            style={styles.textField}
          />
        );
      })
    }
    <Button variant="contained" style={styles.button}>
      <LocalActivitySharp />
    </Button>
  </Grid>
));

const GamePrediction = memo(({
  updatePredictionStat,
  byPredictionStat,
  allPredictionStats,
  gameOver,
}) => (
  <Fragment>
    <GamePredictionText gameOver={gameOver} />
    <GamePredictionForm
      updatePredictionStat={updatePredictionStat}
      byPredictionStat={byPredictionStat}
      allPredictionStats={allPredictionStats}
    />
  </Fragment>
));

export default GamePrediction;
