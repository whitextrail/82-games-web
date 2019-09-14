import React, { memo } from 'react';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import { LocalActivitySharp } from '@material-ui/icons';

const styles = {
  container: {
    height: 145,
    width: 350,
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
  button: {
    height: 40,
    width: 40,
    backgroundColor: '#2ECC71',
    color: '#FFF',
    marginTop: 4,
  },
};

const GameStats = memo(() => {
  const textFieldProps = {
    onChange: value => console.log('input', value),
    margin: 'dense',
    variant: 'outlined',
    InputLabelProps: {
      shrink: true,
      style: { color: '#333' }
    },
    style: { width: 60 },
  };

  return (
    <Paper
      component={Grid}
      container
      alignItems="center"
      direction="column"
      style={styles.container}
    >
      <Grid
        container
        justify="space-around"
        alignItems="center"
        direction="column"
        style={styles.textContainer}
      >
        <Typography variant="body2"  style={{ ...styles.header, ...styles.text }}>
          Compete to win the prizes above before time runs out!
        </Typography>
        <Typography variant="body2" style={{ ...styles.text }}>
          What will Spencer Dinwiddie's endgame stats be?
        </Typography>
      </Grid>
      <Grid container justify="space-between" style={styles.textFieldContainer}>
        <TextField
          label="PTS"
          value=""
          {...textFieldProps}
        />
        <TextField
          label="REB"
          value=""
          {...textFieldProps}
        />
        <TextField
          label="AST"
          value=""
          {...textFieldProps}
        />
        <Button variant="contained" style={{ height: 40, width: 40, backgroundColor: '#2ECC71', color: '#FFF', marginTop: 4 }}>
          <LocalActivitySharp />
        </Button>
      </Grid>
    </Paper>
  );
});

export default GameStats;
