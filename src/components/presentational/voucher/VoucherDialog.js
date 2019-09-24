import React, {
  memo,
  Fragment,
  useState,
} from 'react';
import {
  Grid,
  Typography,
  IconButton,
} from '@material-ui/core';
import {
  LocalActivitySharp,
  RemoveCircleOutlineSharp,
  AddCircleOutlineSharp,
} from '@material-ui/icons';
import Dialog from '../reusable/Dialog';
import { primaryColor } from '../../../styles/constants';
import ProgressSpinner from '../reusable/ProgressSpinner';

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
  counterButton: {
    backgroundColor: '#661A76',
  },
  counterButtonText: {
    fontSize: 24,
    color: '#FFF',
  },
  currentCounter: {
    width: '35%',
    backgroundColor: primaryColor,
    margin: 0,
  },
  currentCounterText: {
    fontSize: 28,
    color:'#FFF',
  },
  dialogActions: {
    minHeight: 40,
    height: 40,
    marginBottom: 5,
  },
};

const VoucherDialog = memo(({
  user,
  purchaseVoucher,
  hideDialog,
}) => {
  const {
    address,
    inProgress,
    voucherCount,
  } = user;
  // Set a range of possible number of vouchers purchasable in one transaction
  const minCount = 1;
  const maxCount = 10;
  const [selectedVoucherCount, updateSelectedVoucherCount] = useState(1);

  return (
    <Dialog>
      <Dialog.Title>
        <Grid justify="flex-start" alignItems="center" container spacing={2} style={styles.dialogTitle}>
          <LocalActivitySharp />
          <Typography variant="h6" style={styles.dialogTitleText}>{voucherCount}</Typography>
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
            <Grid container direction="row" alignItems="center" justify="center">
              <Grid item style={styles.counterButton}>
                <IconButton
                  disabled={selectedVoucherCount <= minCount}
                  onClick={() => updateSelectedVoucherCount(selectedVoucherCount - 1)}
                >
                  <RemoveCircleOutlineSharp style={styles.counterButtonText} />
                </IconButton>
              </Grid>
              <Grid justify="center" alignItems="center" direction="column" container spacing={2} style={styles.currentCounter}>
                <Typography variant="h6" align="center" style={styles.currentCounterText}>
                  {selectedVoucherCount}
                </Typography>
              </Grid>
              <Grid item style={styles.counterButton}>
                <IconButton
                  disabled={selectedVoucherCount >= maxCount}
                  onClick={() => updateSelectedVoucherCount(selectedVoucherCount + 1)}
                >
                  <AddCircleOutlineSharp style={styles.counterButtonText} />
                </IconButton>
              </Grid>
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
                <Dialog.ConfirmAction text="BUY VOUCHERS" onClick={() => purchaseVoucher(selectedVoucherCount)} />
              )}
            </Grid>
          )}
        </Fragment>
      </Dialog.Actions>
    </Dialog>
  );
});

export default VoucherDialog;
