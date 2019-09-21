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
import ProgressSpinner from '../reusable/ProgressSpinner';

const styles = {
  dialogTitle: {
    minHeight: 40,
    height: 40,
  },
  dialogTitleText: {
    marginLeft: 10,
  },
  counterButtonText: {
    fontSize: 36,
  },
  currentCounterText: {
    fontSize: 28,
    paddingRight: 3,
  },
  dialogActions: {
    minHeight: 40,
    height: 40,
  },
};

const VoucherDialog = memo(({
  user,
  purchaseVoucher,
  hideVoucherDialog,
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
              <Typography variant="subtitle1" align="center">
                TronLink account required.
                <br/>
                Please install TronLink Chrome Extension and login to proceed.
              </Typography>
            </Grid>
          )}
          { !inProgress && address && (
            <Grid container direction="row" alignItems="center" justify="center">
              <Grid item>
                <IconButton
                  disabled={selectedVoucherCount <= minCount}
                  onClick={() => updateSelectedVoucherCount(selectedVoucherCount - 1)}
                >
                  <RemoveCircleOutlineSharp color="primary" style={styles.counterButtonText} />
                </IconButton>
              </Grid>
              <Grid justify="center" alignItems="center" direction="column" container spacing={2} style={{ width: '35%' }}>
                <Typography variant="h6" align="center" style={styles.currentCounterText}>
                  {selectedVoucherCount}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  disabled={selectedVoucherCount >= maxCount}
                  onClick={() => updateSelectedVoucherCount(selectedVoucherCount + 1)}
                >
                  <AddCircleOutlineSharp color="primary" style={styles.counterButtonText} />
                </IconButton>
              </Grid>
            </Grid>
          )}
        </Fragment>
      </Dialog.Content>
      <Dialog.Actions>
        <Fragment>
          { !inProgress && address && (
            <Grid justify="center" alignItems="center" container style={styles.dialogActions}>
              <Dialog.CancelAction text="Close" onClick={() => hideVoucherDialog()} />
              <Dialog.ConfirmAction text="Buy Vouchers" onClick={() => purchaseVoucher(selectedVoucherCount)} />
            </Grid>
          )}
        </Fragment>
      </Dialog.Actions>
    </Dialog>
  );
});

export default VoucherDialog;
