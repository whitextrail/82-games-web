import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  setNavState,
  toggleNavMenu,
} from '../../state/actions/nav';
import Nav from '../presentational/header/Nav';

class NavContainer extends PureComponent {
  constructor(props) {
    super(props);

    props.setNavState();
  }

  render = () => {
    const {
      isOpen,
      byId,
      allIds,
      selectedId,
    } = this.props.nav;

    return selectedId && (
      <Nav
        toggleNavMenu={this.props.toggleNavMenu}
        isOpen={isOpen}
        byId={byId}
        allIds={allIds}
        selectedId={selectedId}
      />
    );
  }
};

const mapStateToProps = ({ nav }) => ({ nav });

export default connect(mapStateToProps, {
  setNavState,
  toggleNavMenu,
})(NavContainer);
