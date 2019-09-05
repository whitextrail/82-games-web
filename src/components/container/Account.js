import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import AccountHeader from '../presentational/body/account/AccountHeader';

class AccountContainer extends PureComponent {
  render = () => {
    return (
      <Grid container direction="column">
        <AccountHeader />
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

export default connect(mapStateToProps)(AccountContainer);
