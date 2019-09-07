import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  withRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Grid } from '@material-ui/core';
import AccountVoucher from '../presentational/body/account/AccountVoucher';
import AccountHeader from '../presentational/body/account/AccountHeader';
import AccountProfile from '../presentational/body/account/AccountProfile';

class AccountContainer extends PureComponent {
  render = () => {
    const { url } = this.props.match;

    return (
      <Grid container direction="column">
        <AccountHeader />
        <Switch>
          <Route exact path={`${url}/profile`} component={AccountProfile} />
          <Route exact path={`${url}/vouchers`} render={() => <AccountVoucher user={this.props.user} />} />
          <Redirect from={url} to={`${url}/profile`} />
        </Switch>
      </Grid>
    );
  }
};

const mapStateToProps = ({ user }) => ({ user });

export default withRouter(connect(mapStateToProps)(AccountContainer));
