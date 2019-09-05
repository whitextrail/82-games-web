import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import {
  setNavState,
  toggleNavMenu,
  logOutUser,
  selectNavId,
} from '../../state/actions';
import NavBar from '../presentational/header/nav/NavBar';
import NavMenu from '../presentational/header/nav/NavMenu';
import { authenticationStates } from '../../util/constants';

class NavContainer extends PureComponent {
  constructor(props) {
    super(props);

    props.setNavState(props.location.pathname);
  }

  handleMenuItemClick = event => this.props.selectNavId(event.currentTarget.id);

  render = () => {
    const {
      nav,
      authState,
      toggleNavMenu: toggleNavMenuAction,
      logOutUser: logOutUserAction,
    } = this.props;
    const {
      isOpen,
      byId,
      allIds,
      selectedId,
    } = nav;
    const navBarTitle = (byId && byId[selectedId]) ? byId[selectedId].text : '';

    return (
      <Grid container direction="column">
        <NavBar
          toggleNavMenu={toggleNavMenuAction}
          isOpen={isOpen}
          title={navBarTitle}
          selectedId={selectedId}
        />
        <NavMenu
          byId={byId}
          selectedId={selectedId}
          isOpen={isOpen}
          allIds={allIds}
          logOutUser={logOutUserAction}
          authState={authState}
          handleMenuItemClick={this.handleMenuItemClick}
        />
      </Grid>
    );
  }
};

const mapStateToProps = ({ user, nav }) => ({
  nav,
  authState: user.id ? authenticationStates.AUTHENTICATED : authenticationStates.UNAUTHENTICATED,
});

export default connect(mapStateToProps, {
  setNavState,
  toggleNavMenu,
  logOutUser,
  selectNavId,
})(NavContainer);
