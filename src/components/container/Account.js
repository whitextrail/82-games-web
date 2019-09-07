import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import AccountVoucher from './account/AccountVoucher';
import AccountHeader from '../presentational/body/account/AccountHeader';

class AccountContainer extends PureComponent {
  render = () => {
    return (
      <Grid container direction="column">
        <AccountHeader />
        <AccountVoucher />
      </Grid>
    );
  }
};

const mapStateToProps = ({
  teams,
  games,
}) => ({
  teams,
  games,
});

export default withRouter(connect(mapStateToProps)(AccountContainer));
