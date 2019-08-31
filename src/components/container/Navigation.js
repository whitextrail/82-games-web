import React, { memo } from 'react';
import { connect } from 'react-redux';
import { toggleNavigationMenuOpenState } from '../../state/actions/app';
import Navigation from '../presentational/header/Navigation';

const NavigationContainer = memo(({
  toggleNavigationMenuOpenState: toggleNavigationMenuOpenStateAction,
  navigationMenuOpenState
}) => (
  <Navigation
    toggleNavigationMenuOpenStateAction={toggleNavigationMenuOpenStateAction}
    navigationMenuOpenState={navigationMenuOpenState}
  />
));

const mapStateToProps = ({ app }) => ({
  navigationMenuOpenState: app.navigationMenuOpenState,
});

export default connect(mapStateToProps, {
  toggleNavigationMenuOpenState,
})(NavigationContainer);
