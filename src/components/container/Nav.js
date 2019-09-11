import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import shallowCompare from 'react-addons-shallow-compare';
import {
  setNavState,
  toggleNavMenu,
  logOutUser,
  selectNavId,
} from '../../state/actions';
import NavBar from '../presentational/header/nav/NavBar';
import NavMenu from '../presentational/header/nav/NavMenu';
import { authenticationStates } from '../../util/constants';

class NavContainer extends Component {
  constructor(props) {
    super(props);

    props.setNavState();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      nav,
      location,
    } = this.props;
    const rootPathname = location.pathname.split('/')[1];

    // Check whether the nav title properly reflects the pathname
    if (rootPathname !== nav.selectedId) {
      this.props.selectNavId(rootPathname);
    }

    return shallowCompare(this, nextProps, nextState);
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
          menuIsOpen={isOpen}
          navBarTitle={navBarTitle}
          navBarIconClickHandler={toggleNavMenuAction}
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

export default withRouter(connect(mapStateToProps, {
  setNavState,
  toggleNavMenu,
  logOutUser,
  selectNavId,
})(NavContainer));
