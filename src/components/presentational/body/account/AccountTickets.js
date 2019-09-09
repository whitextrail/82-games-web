import React, { memo } from 'react';
import {
  Grid,
  Fab,
  Typography,
  Card,
  Badge,
  Button,
} from '@material-ui/core';
import { LocalActivitySharp } from '@material-ui/icons';
import background from '../../../../assets/img/tickets-background.png';
import { primaryColor } from '../../../../styles/constants';

const styles = {
  backgroundContainer: {
    height: '100%',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
  },
  backgroundOverlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingTop: 25,
  },
  container: {
    height: 100,
    width: 325,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  ticketBalanceIcon: {
    height: 70,
    width: 70,
    borderRadius: '50%',
    backgroundColor: primaryColor,
  },
  ticketBalanceTextContainer: {
    height: 100,
    width: 230,
    paddingLeft: 15,
  },
  ticketBalanceTextHeader: {
    fontWeight: 600,
  },
  ticketPackagesContainer: {
    paddingTop: 10,
    width: 325,
    height: 475,
  },
  ticketPackagesRow: {
    width: 325,
    height: '50%',
  },
  ticketPackage: {
    width: 150,
    height: 200,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  ticketPackageBuyButton: {
    marginTop: 10,
    borderRadius: 25,
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
const ticketPackages = [{
  id: 'sku_Fl4EPEQSJK10AT',
  title: '1 Ticket',
  price: '$0.99',
  discount: null,
}, {
  id: 'sku_Fl4IVCmLjHHynK',
  title: '10 Tickets',
  price: '$8.99',
  discount: '-10%',
}, {
  id: 'sku_Fl4JYjEdlKvQfx',
  title: '25 Tickets',
  price: '$19.99',
  discount: '-20%',
}, {
  id: 'sku_Fm45yp0FXqjLkc',
  title: '100 Tickets',
  price: '$69.99',
  discount: '-30%',
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

const renderTicketPackages = (onClick) => {
  const TicketPackageRow = ({ children }) => (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      style={styles.ticketPackagesRow}
    >
      { children }
    </Grid>
  );

  const TicketPackage = ({
    id,
    discount,
    title,
    price,
  }) => (
    <Badge badgeContent={discount} color="primary">
      <Card
        component={Grid}
        container
        alignItems="center"
        justify="center"
        direction="column"
        style={styles.ticketPackage}
      >
        <LocalActivitySharp color="primary" style={{ fontSize: 64 }} />
        <Typography variant="h6" align="center">{title}</Typography>
        <Typography variant="body1" align="center">{price}</Typography>
        <Button
          id={id}
          variant="contained"
          color="primary"
          style={styles.ticketPackageBuyButton}
          onClick={onClick}
        >
          Buy
        </Button>
      </Card>
    </Badge>
  );

  let ticketPackageRowItems = [];
  let ticketPackageRows = [];

  ticketPackages.forEach((ticketPackage, index) => {
    ticketPackageRowItems.push(<TicketPackage key={index} {...ticketPackage} />);

    // Render a row for every two ticket packages
    if (index % 2) {
      const ticketPackageRowProps = {
        key: ticketPackageRows.length + 1,
      };

      ticketPackageRows.push(React.createElement(
        TicketPackageRow,
        ticketPackageRowProps,
        ticketPackageRowItems
      ));

      // Reset row items list for next row
      ticketPackageRowItems = [];
    }
  });

  return ticketPackageRows;
};

const AccountTickets = memo(({ user }) => {
    const {
      authId,
      ticketCount,
    } = user;

    const ticketPackageClickHandler = (event) => checkout(event.currentTarget.id, authId);

    return (
      <Grid style={styles.backgroundContainer}>
        <Grid container alignItems="center" direction="column" style={styles.backgroundOverlay}>
          <Grid
            container
            justify="center"
            alignItems="center"
            style={styles.container}
          >
            <Fab
              variant="round"
              component={Grid}
              container
              justify="center"
              alignItems="center"
              style={styles.ticketBalanceIcon}
            >
              <LocalActivitySharp color="secondary" fontSize="large" />
            </Fab>
            <Grid
              container
              justify="center"
              direction="column"
              style={styles.ticketBalanceTextContainer}
            >
              <Typography variant="body1" style={styles.ticketBalanceTextHeader}>
                You have {ticketCount} ticket(s)
              </Typography>
              <Typography variant="body2">
                Tickets are used to make game predictions. Get them below!
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justify="space-between"
            direction="column"
            alignItems="center"
            style={styles.ticketPackagesContainer}
          >
            { renderTicketPackages(ticketPackageClickHandler) }
          </Grid>
        </Grid>
      </Grid>
    );
});

export default AccountTickets;
