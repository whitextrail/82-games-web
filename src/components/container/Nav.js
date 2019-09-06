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

    props.setNavState(props.location.pathname);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { location: nextLocation } = nextProps;
    const { location } = this.props;

    if (nextLocation.key !== location.key) {
      if (nextLocation.pathname !== location.pathname) {
        this.props.setNavState(nextLocation.pathname);
      }
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

export default withRouter(connect(mapStateToProps, {
  setNavState,
  toggleNavMenu,
  logOutUser,
  selectNavId,
})(NavContainer));
