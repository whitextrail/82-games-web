import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  CssBaseline,
  Grid,
} from '@material-ui/core';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import {
  authenticateUser,
  purchaseVoucher,
  logOutUser,
  fetchTeams,
  fetchTeamGames,
  fetchAthlete,
} from '../../state/actions';
import { Nav } from './Nav';
import VoucherDialog from '../presentational/voucher/VoucherDialog';
import Games from './Games';
import Athletes from './Athletes';
import { setupTronWeb } from '../../util/tronweb';

const dialogTypes = {
  NONE: 0,
  VOUCHER_DIALOG: 1,
};;

class App extends PureComponent {
  constructor(props) {
    super(props);

    props.fetchTeams();
    props.fetchTeamGames();
    props.fetchAthlete();
  }


  state = {
    currentDialogType: dialogTypes.NONE,
  };

  componentDidMount() {
    // Initialize TronWeb and hook-up any available provider (ie. TronLink)
    setupTronWeb(this.onAccountChanged);
  };

  showVoucherDialog = () => this.setState({ currentDialogType: dialogTypes.VOUCHER_DIALOG });
  hideVoucherDialog = () => this.setState({ currentDialogType: dialogTypes.NONE });

  renderDialog = () => {
    const {
      user,
      purchaseVoucher,
    } = this.props;
    const { currentDialogType } = this.state;
    const { VOUCHER_DIALOG } = dialogTypes;

    switch (currentDialogType) {
      case VOUCHER_DIALOG:
        return (
          <VoucherDialog
            user={user}
            purchaseVoucher={purchaseVoucher}
            hideVoucherDialog={this.hideVoucherDialog}
          />
        );
      default:
    }
  };

  onAccountChanged = (account) => {
    const { user: { address } } = this.props;

    if (account) {
      this.props.authenticateUser(account);
    } else if (address) {
      this.props.logOutUser();
    }
  };

  render = () => {
    const { location: { pathname } } = this.props;

    return (
      <Grid container direction="column">
        <Nav pathname={pathname} showVoucherDialog={this.showVoucherDialog}>
          <CssBaseline />
          <Route exact path="/" render={() => <Redirect to="/games" /> } />
          <Route path="/games" component={Games} />
          <Route path="/athletes" component={Athletes} />
          { this.renderDialog() }
        </Nav>
      </Grid>
    );
  };
};

const mapStateToProps = ({
  user,
}) => ({
  user,
});

export default connect(mapStateToProps, {
  authenticateUser,
  purchaseVoucher,
  logOutUser,
  fetchTeams,
  fetchTeamGames,
  fetchAthlete,
})(App);
