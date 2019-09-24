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
  sendPrediction,
  fetchUserPredictions,
  logOutUser,
} from '../../state/actions';
import { Nav } from './Nav';
import NavMenu from '../presentational/nav/NavMenu';
import VoucherDialog from '../presentational/voucher/VoucherDialog';
import GamePredictionDialog from '../presentational/games/prediction/GamePredictionDialog';
import Games from './Games';
import Athletes from './Athletes';
import { setupTronWeb } from '../../util/tronweb';

const dialogTypes = {
  NONE: 0,
  VOUCHER_DIALOG: 1,
  PREDICTION_DIALOG: 2,
};;

class App extends PureComponent {
  state = {
    currentDialogType: dialogTypes.NONE,
  };

  componentDidMount = () => {
    // Initialize TronWeb and hook-up any available provider (ie. TronLink)
    setupTronWeb(this.onAccountChanged);
  };

  componentDidUpdate = (prevProps) => {
    // Check for newly initialized user account and get the user's predictions
    if (prevProps.user.address !== this.props.user.address) {
      this.props.fetchUserPredictions();
    }
  };

  // showVoucherDialog = () => this.setState({ currentDialogType: dialogTypes.VOUCHER_DIALOG });
  showVoucherDialog = () => this.setState({ currentDialogType: dialogTypes.PREDICTION_DIALOG });
  hideDialog = () => this.setState({ currentDialogType: dialogTypes.NONE });

  renderDialog = () => {
    const {
      user,
      userPredictions,
      purchaseVoucher,
      sendPrediction,
    } = this.props;
    const { currentDialogType } = this.state;
    const { VOUCHER_DIALOG, PREDICTION_DIALOG } = dialogTypes;

    switch (currentDialogType) {
      case VOUCHER_DIALOG:
        return (
          <VoucherDialog
            user={user}
            purchaseVoucher={purchaseVoucher}
            hideDialog={this.hideDialog}
          />
        );
      case PREDICTION_DIALOG:
        return (
          <GamePredictionDialog
            user={user}
            userPredictions={userPredictions}
            gameId={2}
            sendPrediction={sendPrediction}
            hideDialog={this.hideDialog}
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
        <CssBaseline />
        <Nav pathname={pathname} showVoucherDialog={this.showVoucherDialog}>
          <NavMenu />
          <Route exact path="/" render={() => <Redirect to="/games" /> } />
          <Route path="/games" component={Games} />
          <Route path="/athletes" component={Athletes} />
        </Nav>
        { this.renderDialog() }
      </Grid>
    );
  };
};

const mapStateToProps = ({
  user,
  userPredictions,
}) => ({
  user,
  userPredictions,
});

export default connect(mapStateToProps, {
  authenticateUser,
  purchaseVoucher,
  sendPrediction,
  fetchUserPredictions,
  logOutUser,
})(App);
