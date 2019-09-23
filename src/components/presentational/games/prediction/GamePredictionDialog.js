import React, {
  memo,
  Fragment,
  useState,
} from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import { SportsBasketballSharp } from '@material-ui/icons';
import Dialog from '../../reusable/Dialog';
import InputField from '../../reusable/InputField';
import ProgressSpinner from '../../reusable/ProgressSpinner';
import { primaryColor } from '../../../../styles/constants';

const styles = {
  dialogTitle: {
    minHeight: 40,
    height: 40,
  },
  dialogTitleText: {
    marginLeft: 10,
  },
  counterButtonText: {
    fontSize: 40,
    padding: 5,
  },
  currentCounterText: {
    color: '#FFF',
    fontSize: 28,
    paddingRight: 3,
  },
  currentCounterTitle: {
    color: '#FFF',
    fontSize: 20,
  },
  dialogActions: {
    minHeight: 40,
    height: 40,
    marginBottom: 15,
  },
};

const renderStatInput = (title, val, modifier, minCount, maxCount) => (
  <Grid container direction="row" alignItems="center" justify="center" style={{ width: '100%', backgroundColor: primaryColor, marginTop: 10, marginBottom: 10 }}>
    <Grid item>
      <InputField
        id={`stat-${title}`}
        value={`${val}`}
        type="number"
        inputStyle={{ fontSize: 18, textAlign: 'right' }}
        onChange={({ target }) => {
          let onlyNums = target.value.replace(/[^0-9]/g, '') * 1;
          if (onlyNums < minCount) {
            onlyNums = minCount;
          } else if (onlyNums > maxCount) {
            onlyNums = maxCount;
          }
          modifier(onlyNums * 1);
        }}
        startAdornmentIcon={(
          <Typography variant="subtitle1" align="center" style={styles.currentCounterTitle}>
            {title}
          </Typography>
        )}
      />
    </Grid>
  </Grid>
);

const GamePredictionDialog = memo(({
  user,
  gameId,
  sendPrediction,
  hideDialog,
}) => {
  const {
    address,
    inProgress,
  } = user;
  // Set a range of possible number of vouchers purchasable in one transaction
  const minCount = 0;
  const maxCount = 100;
  const [points, updatePoints] = useState(1);
  const [rebounds, updateRebounds] = useState(1);
  const [assists, updateAssists] = useState(1);

  return (
    <Dialog>
      <Dialog.Title>
        <Grid justify="flex-start" alignItems="center" container spacing={2} style={styles.dialogTitle}>
          <SportsBasketballSharp />
          <Typography variant="h6" style={styles.dialogTitleText}>{`Game #${gameId}`}</Typography>
        </Grid>
      </Dialog.Title>
      <Dialog.Content>
        <Fragment>
          { inProgress && <ProgressSpinner /> }
          { !inProgress && !address && (
            <Grid container direction="row" alignItems="center" justify="center">
              <Typography variant="subtitle1" align="center">
                TronLink account required.
                <br/>
                Please install TronLink Chrome Extension and login to proceed.
              </Typography>
            </Grid>
          )}
          { !inProgress && address && (
            <Grid container direction="column" alignItems="center" justify="center">
              {renderStatInput('PTS', points, updatePoints, minCount, maxCount)}
              {renderStatInput('REB', rebounds, updateRebounds, minCount, maxCount)}
              {renderStatInput('AST', assists, updateAssists, minCount, maxCount)}
            </Grid>
          )}
        </Fragment>
      </Dialog.Content>
      <Dialog.Actions>
        <Fragment>
          { !inProgress && (
            <Grid justify="center" alignItems="center" container style={styles.dialogActions}>
              <Dialog.CancelAction text="Close" onClick={() => hideDialog()} />
              { address && (
                <Dialog.ConfirmAction text="Submit" onClick={() => sendPrediction({ gameId, points, rebounds, assists })} />
              )}
            </Grid>
          )}
        </Fragment>
      </Dialog.Actions>
    </Dialog>
  );
});

export default GamePredictionDialog;
