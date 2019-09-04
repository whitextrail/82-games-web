import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import {
  toggleNavMenu,
  logOutUser,
} from '../../state/actions';
import NavBar from '../presentational/header/nav/NavBar';
import NavMenu from '../presentational/header/nav/NavMenu';
import { authenticationStates } from '../../util/constants';

const NavContainer = memo(({
  isOpen,
  byId,
  allIds,
  selectedId,
  toggleNavMenu,
  logOutUser,
  authState,
}) => selectedId && (
  <Grid container direction="column">
    <NavBar
      toggleNavMenu={toggleNavMenu}
      isOpen={isOpen}
      title={byId[selectedId].text}
      selectedId={selectedId}
    />
    <NavMenu
      byId={byId}
      selectedId={selectedId}
      isOpen={isOpen}
      allIds={allIds}
      logOutUser={logOutUser}
      authState={authState}
    />
  </Grid>
));

const mapStateToProps = ({ user, nav }) => ({
  nav,
  authState: user.id ? authenticationStates.AUTHENTICATED : authenticationStates.UNAUTHENTICATED,
});

export default connect(mapStateToProps, {
  toggleNavMenu,
  logOutUser,
})(NavContainer);
