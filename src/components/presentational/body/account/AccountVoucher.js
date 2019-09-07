import React, { memo } from 'react';
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { LocalActivitySharp } from '@material-ui/icons';
import { primaryColor } from '../../../../styles/constants';

const styles = {
  userVoucherPanel: {
    height: '90%',
    borderRadius: 16,
    backgroundColor: '#d70219',
    width: '70%',
  },
  buyVoucherPanel: {
    height: '80%',
    backgroundColor: '#d70219',
    width: '70%',
    borderRadius: 16,
  },
  packageListItem: {
    borderRadius: 32,
    backgroundColor: '#FFF',
    marginBottom: 10,
    marginTop: 10,
  },
  packageListItemIcon: {
    fontSize: 32,
    color: '#75000d',
  },
};

// Hard-coding packages for now
const packages = [{
  id: 'sku_Fl4EPEQSJK10AT',
  title: '1 Voucher',
}, {
  id: 'sku_Fl4IVCmLjHHynK',
  title: '5 Vouchers',
}, {
  id: 'sku_Fl4JYjEdlKvQfx',
  title: '10 Vouchers',
}];

const checkout = (packageId, userAuthId) => {
  // eslint-disable-next-line no-undef
  const stripe = Stripe(process.env.STRIPE_API_KEY || 'pk_test_pLrEub8cmg1ApBYt37zqTKVx');
  const clientUrl = process.env.CLIENT_WEB_URL || 'http://localhost:8000';

  stripe.redirectToCheckout({
    items: [{ sku: packageId, quantity: 1 }],
    clientReferenceId: userAuthId,
    successUrl: `${clientUrl}/account`, // Temporarily redirect back to Account
    cancelUrl: `${clientUrl}/account`, // Temporarily redirect back to Account
  })
  .then((result) => {
    if (result.error) {
      console.log(result.error);
    }
  });
};

const renderVoucherPackages = (packages, userAuthId) => (
  packages.map(({ id, title }) => (
    <ListItem key={id} onClick={() => checkout(id, userAuthId)} style={styles.packageListItem}>
      <ListItemIcon>
        <LocalActivitySharp style={styles.packageListItemIcon} />
      </ListItemIcon>
      <ListItemText>
        <Typography variant="body1" align="center" style={{ color: '#75000d' }}>{title}</Typography>
      </ListItemText>
    </ListItem>
  ))
);

const AccountVoucherContainer = memo(({ user }) => {
    const {
      authId,
      voucherCount,
    } = user;

    return (
      <Grid container justify="center" alignItems="center" direction="column" style={{ backgroundColor: primaryColor }}>
        <Grid container style={{ height: '10%' }}>
        </Grid>
        <Grid container justify="center" direction="column" alignItems="center" style={{ height: '20%', marginTop: 30 }}>
          <Grid container justify="center" direction="column" alignItems="center" style={styles.userVoucherPanel}>
            <Grid container item justify="center" alignItems="center" style={{ paddingTop: 5 }}>
              <LocalActivitySharp style={{ fontSize: 72, color: '#FFF' }} />
            </Grid>
            <Grid container item justify="center" alignItems="center">
              <Typography variant="body1" align="center" style={{ color: '#FFF' }}>You have {voucherCount} voucher(s)</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center" direction="column" alignItems="center" style={{ height: '50%' }}>
          <Grid container item justify="center" direction="column" style={styles.buyVoucherPanel}>
            <Grid container item justify="center" alignItems="center" style={{ height: '15%', marginTop: 15 }}>
              <Typography variant="body1" align="center" style={{ color: '#FFF' }}>Buy Vouchers</Typography>
            </Grid>
            <Grid container item justify="center" alignItems="center">
              <List>
                {renderVoucherPackages(packages, authId)}
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Grid container style={{ height: '15%' }}>
        </Grid>
      </Grid>
    );
});

export default AccountVoucherContainer;
