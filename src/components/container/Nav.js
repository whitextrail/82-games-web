import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import shallowCompare from 'react-addons-shallow-compare';
import {
  setNavState,
  toggleNavMenu,
  selectNavId,
} from '../../state/actions';
import NavBar from '../presentational/nav/NavBar';
import NavMenu from '../presentational/nav/NavMenu';

class NavContainer extends Component {
  constructor(props) {
    super(props);

    // Set initial nav state if it has previously not been set
    if (!props.nav.selectedId) {
      props.setNavState();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      nav,
      location,
    } = this.props;
    const rootPathname = location.pathname.split('/')[1];

    // Check whether the nav title properly reflects the pathname
    if (rootPathname && (rootPathname !== nav.selectedId)) {
      this.props.selectNavId(rootPathname);
    }

    return shallowCompare(this, nextProps, nextState);
  }

  handleMenuItemClick = ({ currentTarget: { id }}) => this.props.selectNavId(id);

  render = () => {
    const {
      nav,
      navBarProps = {},
      navMenuProps = {},
      toggleNavMenu: toggleNavMenuAction,
    } = this.props;
    const {
      isOpen,
      byId,
      allIds,
      selectedId,
    } = nav;
    const navBarTitle = (byId && selectedId) ? byId[selectedId].title : '';

    return (
      <Grid container direction="column">
        <NavBar
          menuIsOpen={isOpen}
          navBarTitle={navBarTitle}
          navBarIconClickHandler={toggleNavMenuAction}
          {...navBarProps}
        />
        <NavMenu
          byId={byId}
          selectedId={selectedId}
          isOpen={isOpen}
          allIds={allIds}
          handleMenuItemClick={this.handleMenuItemClick}
          {...navMenuProps}
        />
      </Grid>
    );
  }
};

const mapStateToProps = ({ nav }) => ({
  nav,
});

export default withRouter(connect(mapStateToProps, {
  setNavState,
  toggleNavMenu,
  selectNavId,
})(NavContainer));
