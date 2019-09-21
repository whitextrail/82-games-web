import React, {
  memo,
  useState,
} from 'react';
import {
  Grid,
  Card,
  CardMedia,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import spencerDinwiddie from '../../../../assets/img/spencer_dinwiddie.png';

const styles = {
  container: {
    marginTop: 25,
    height: 165,
    width: 365,
    backgroundColor: '#333333',
  },
  statsBarContainer: {
    height: 105,
    width: 220,
    paddingBottom: 10,
  },
  statsBarInnerContainer: {
    height: 70,
    width: 40,
  },
  statsBarValueLabel: {
    color: '#FFF',
    fontSize: 12,
  },
  statsBar: {
    height: 20,
    width: 65,
    borderRadius: 3,
    transform: 'rotate(-90deg)',
  },
};

const GameAthleteStats = memo(({
  gameId,
  stats
}) => {
  const otherGameKeys = Object.keys(stats);
  const [barValues,updateBarValues] = useState({
    MIN: 0,
    PTS: 0,
    REB: 0,
    AST: 0,
  });

  const graduallyUpdateBarValues = (min, pts, reb, ast) => {
    let minUpdateValue = 0;
    let ptsUpdateValue = 0;
    let rebUpdateValue = 0;
    let astUpdateValue = 0;

    if (min > 0) {
      minUpdateValue = min > 20 ? (min / 5) : min;
    }

    if (pts > 0) {
      ptsUpdateValue = pts > 20 ? (pts / 5) : pts;
    }

    if (reb > 0) {
      rebUpdateValue = reb > 20 ? (reb / 5) : reb;
    }

    if (ast > 0) {
      astUpdateValue = ast > 20 ? (ast / 5) : ast;
    }

    updateBarValues(prevBarValues => ({
      ...prevBarValues,
      MIN: prevBarValues.MIN + minUpdateValue,
      PTS: prevBarValues.PTS + ptsUpdateValue,
      REB: prevBarValues.REB + rebUpdateValue,
      AST: prevBarValues.AST + astUpdateValue,
    }));

    if (min > 0 || pts > 0 || reb > 0 || ast > 0) {
      return setTimeout(() => graduallyUpdateBarValues(
        min - minUpdateValue,
        pts - ptsUpdateValue,
        reb - rebUpdateValue,
        ast - astUpdateValue,
      ), 150);
    }
  };


  if (!barValues.MIN) {
    otherGameKeys.reduce((accumulator, statsId, index) => {
      const tempTotalMIN = accumulator.tempTotalMIN + stats[statsId].MIN;
      const tempTotalPTS = accumulator.tempTotalPTS + stats[statsId].PTS;
      const tempTotalREB = accumulator.tempTotalREB + stats[statsId].REB;
      const tempTotalAST = accumulator.tempTotalAST + stats[statsId].AST;

      if (index === (otherGameKeys.length - 1)) {
        const { length } = otherGameKeys;
        const avgMin = tempTotalMIN / length;
        const gameMin = stats[gameId].MIN;
        const minNum = (gameMin > avgMin) ? avgMin : gameMin;
        const minDen = !(gameMin > avgMin) ? avgMin : gameMin;

        const avgPts = tempTotalPTS / length;
        const gamePts = stats[gameId].PTS;
        const ptsNum = (gamePts > avgPts) ? avgPts : gamePts;
        const ptsDen = !(gamePts > avgPts) ? avgPts : gamePts;

        const avgReb = tempTotalREB / length;
        const gameReb = stats[gameId].REB;
        const rebNum = (gameReb > avgReb) ? avgReb : gameReb;
        const rebDen = !(gameReb > avgReb) ? avgReb : gameReb;

        const avgAst = tempTotalAST / length;
        const gameAst = stats[gameId].AST;
        const astNum = (gameAst > avgAst) ? avgAst : gameAst;
        const astDen = !(gameAst > avgAst) ? avgAst : gameAst;

        return graduallyUpdateBarValues(
          (minNum / minDen) * 100,
          (ptsNum / ptsDen) * 100,
          (rebNum / rebDen) * 100,
          (astNum / astDen) * 100,
        );
      }

      return ({
        ...accumulator,
        tempTotalMIN,
        tempTotalPTS,
        tempTotalREB,
        tempTotalAST,
      });
    }, {
      tempTotalMIN: 0,
      tempTotalPTS: 0,
      tempTotalREB: 0,
      tempTotalAST: 0,
    });
  }

  const statsBarClasses = makeStyles({
    barColorPrimary: {
      backgroundColor: '#8E44AD',
    },
    colorPrimary: {
      backgroundColor: 'rgba(0,0,0,0.54)',
    },
  })();

  const statsBarClassStyles = {
    barColorPrimary: statsBarClasses.barColorPrimary,
    colorPrimary: statsBarClasses.colorPrimary,
  };


  return (
    <Card
      raised
      component={Grid}
      container
      justify="center"
      alignItems="center"
      style={styles.container}
    >
    <Grid container justify="center" alignItems="center" direction="column" style={{ height: 150, width: 145 }}>
      <Typography variant="body2" style={{ fontSize: 12, color: '#FFF' }}>#8 DINWIDDIE</Typography>
      <Grid
        container
        justify="center"
        alignItems="flex-end"
        style={{
          height: 85,
          width: 85,
          borderRadius: '50%',
          border: '5px solid #8E44AD',
          backgroundColor: 'rgba(0,0,0,0.54)',
          marginTop: 5,
        }}
      >
        <CardMedia image={spencerDinwiddie} style={{ height: 85, width: 85, borderRadius: '50%' }} />
      </Grid>
    </Grid>
    <Grid container justify="center" alignItems="flex-end" direction="column" style={{ width: 220 }}>
      <Grid container justify="center" alignItems="center" style={{ height: 50 }}>
        <Grid container justify="center" alignItems="center" style={{ height: 45, width: 75 }}>
          <Grid style={{ height: 15, width: 15, borderRadius: 3, marginRight: 5, backgroundColor: '#8E44AD' }} />
          <Typography variant="body2" style={{ color: '#FFF', fontSize: 12 }}>{`Game ${gameId}`}</Typography>
        </Grid>
        <Grid container justify="center" alignItems="center" style={{ height: 45, width: 120 }}>
          <Grid style={{ height: 15, width: 15, borderRadius: 3, marginRight: 5, backgroundColor: 'rgba(0,0,0,0.54)' }} />
          <Typography variant="body2" style={{ color: '#FFF', fontSize: 12 }}>{`Career Average`}</Typography>
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="flex-end" style={styles.statsBarContainer}>
        <Grid container justify="space-between" alignItems="center" direction="column" style={styles.statsBarInnerContainer}>
          <LinearProgress
            color="primary"
            classes={statsBarClassStyles}
            variant="determinate"
            value={barValues.MIN}
            style={styles.statsBar}
          />
          <Typography variant="body2" style={styles.statsBarValueLabel}>MIN</Typography>
        </Grid>
        <Grid container justify="space-between" alignItems="center" direction="column" style={styles.statsBarInnerContainer}>
          <LinearProgress
            color="primary"
            classes={statsBarClassStyles}
            variant="determinate"
            value={barValues.PTS}
            style={styles.statsBar}
          />
          <Typography variant="body2" style={styles.statsBarValueLabel}>PTS</Typography>
        </Grid>
        <Grid container justify="space-between" alignItems="center" direction="column" style={styles.statsBarInnerContainer}>
          <LinearProgress
            color="primary"
            classes={statsBarClassStyles}
            variant="determinate"
            value={barValues.REB}
            style={styles.statsBar}
          />
          <Typography variant="body2" style={styles.statsBarValueLabel}>REB</Typography>
        </Grid>
        <Grid container justify="space-between" alignItems="center" direction="column" style={styles.statsBarInnerContainer}>
          <LinearProgress
            color="primary"
            classes={statsBarClassStyles}
            variant="determinate"
            value={barValues.AST}
            style={styles.statsBar}
          />
          <Typography variant="body2" style={styles.statsBarValueLabel}>AST</Typography>
        </Grid>
        </Grid>
      </Grid>
    </Card>
  );
});

export default GameAthleteStats;
