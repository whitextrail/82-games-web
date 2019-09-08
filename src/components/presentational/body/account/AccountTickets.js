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
import background from '../../../../assets/img/tickets-background.png';

const styles = {
  container: {
    height: '100%',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingTop: 25,
  },
  userTicketPanel: {
    height: '90%',
    borderRadius: 16,
    backgroundColor: '#d70219',
    width: '70%',
  },
  buyTicketPanel: {
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
  title: '1 Ticket',
}, {
  id: 'sku_Fl4IVCmLjHHynK',
  title: '5 Tickets',
}, {
  id: 'sku_Fl4JYjEdlKvQfx',
  title: '10 Tickets',
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

const renderTicketPackages = (packages, userAuthId) => (
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

const AccountTickets = memo(({ user }) => {
    const {
      authId,
      voucherCount,
    } = user;

    return (
      <Grid style={styles.container}>
        <Grid container alignItems="center" direction="column" style={styles.overlay}>
          <Grid container justify="center" direction="column" alignItems="center" style={{ height: '20%', marginTop: 30 }}>
            <Grid container justify="center" direction="column" alignItems="center" style={styles.userTicketPanel}>
              <Grid container item justify="center" alignItems="center" style={{ paddingTop: 5 }}>
                <LocalActivitySharp style={{ fontSize: 72, color: '#FFF' }} />
              </Grid>
              <Grid container item justify="center" alignItems="center">
                <Typography variant="body1" align="center" style={{ color: '#FFF' }}>You have {voucherCount} voucher(s)</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container justify="center" direction="column" alignItems="center" style={{ height: '50%' }}>
            <Grid container item justify="center" direction="column" style={styles.buyTicketPanel}>
              <Grid container item justify="center" alignItems="center" style={{ height: '15%', marginTop: 15 }}>
                <Typography variant="body1" align="center" style={{ color: '#FFF' }}>Buy Tickets</Typography>
              </Grid>
              <Grid container item justify="center" alignItems="center">
                <List>
                  {renderTicketPackages(packages, authId)}
                </List>
              </Grid>
            </Grid>
          </Grid>
          <Grid container style={{ height: '15%' }}>
          </Grid>
        </Grid>
      </Grid>
    );
});

export default AccountTickets;
