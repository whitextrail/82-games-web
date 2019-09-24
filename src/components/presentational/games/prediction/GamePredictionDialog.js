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
  information: {
    color: '#FFF',
  },
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
    backgroundColor: '#661A76',
    color: '#FFF',
    fontSize: 20,
    padding: 10,
    marginRight: 10,
    borderRadius: 3,
    border: '4px solid #361840',
  },
  dialogActions: {
    minHeight: 40,
    height: 40,
    marginBottom: 5,
  },
  statInput: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  statInputField: {
    fontSize: 20,
    textAlign: 'right',
    backgroundColor: primaryColor,
  },
};

const renderStatInput = (title, val, modifier, minCount, maxCount) => (
  <Grid container direction="row" alignItems="center" justify="center" style={styles.statInput}>
    <Grid item>
      <Typography variant="subtitle1" align="center" style={styles.currentCounterTitle}>
        {title}
      </Typography>
    </Grid>
    <Grid item>
      <InputField
        id={`stat-${title}`}
        value={`${val}`}
        type="number"
        inputStyle={styles.statInputField}
        onChange={({ target }) => {
          let onlyNums = target.value.replace(/[^0-9]/g, '') * 1;
          if (onlyNums < minCount) {
            onlyNums = minCount;
          } else if (onlyNums > maxCount) {
            onlyNums = maxCount;
          }
          modifier(onlyNums * 1);
        }}
      />
    </Grid>
  </Grid>
);

const GamePredictionDialog = memo(({
  user,
  userPredictions,
  gameId,
  sendPrediction,
  hideDialog,
}) => {
  const {
    address,
    inProgress: userInProgress,
  } = user;
  const { inProgress: predictionInProgress } = userPredictions;
  const inProgress = userInProgress || predictionInProgress;

  // Set a range of possible number of vouchers purchasable in one transaction
  const minCount = 0;
  const maxCount = 100;
  const [points, updatePoints] = useState(minCount);
  const [rebounds, updateRebounds] = useState(minCount);
  const [assists, updateAssists] = useState(minCount);
  console.log(userPredictions.byId);
  return (
    <Dialog>
      <Dialog.Title>
        <Grid justify="flex-start" alignItems="center" container spacing={2} style={styles.dialogTitle}>
          <SportsBasketballSharp />
          <Typography variant="h6" style={styles.dialogTitleText}>{`Game ${gameId}`}</Typography>
        </Grid>
      </Dialog.Title>
      <Dialog.Content>
        <Fragment>
          { inProgress && <ProgressSpinner /> }
          { !inProgress && !address && (
            <Grid container direction="row" alignItems="center" justify="center">
              <Typography variant="subtitle1" align="center" style={styles.information}>
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
              <Dialog.CancelAction text="CLOSE" onClick={() => hideDialog()} />
              { address && (
                <Dialog.ConfirmAction
                  text="SUBMIT"
                  onClick={() => sendPrediction({ gameId, points, rebounds, assists })}
                />
              )}
            </Grid>
          )}
        </Fragment>
      </Dialog.Actions>
    </Dialog>
  );
});

export default GamePredictionDialog;
