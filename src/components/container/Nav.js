import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { toggleNavMenu } from '../../state/actions/nav';
import NavBar from '../presentational/header/nav/NavBar';
import NavMenu from '../presentational/header/nav/NavMenu';

class NavContainer extends PureComponent {
  render = () => {
    const {
      isOpen,
      byId,
      allIds,
      selectedId,
    } = this.props.nav;

    return selectedId && (
      <Grid container direction="column">
        <NavBar
          toggleNavMenu={this.props.toggleNavMenu}
          isOpen={isOpen}
          title={byId[selectedId].text}
          selectedId={selectedId}
        />
        <NavMenu
          byId={byId}
          selectedId={selectedId}
          isOpen={isOpen}
          allIds={allIds}
        />
      </Grid>
    );
  }
};

const mapStateToProps = ({ nav }) => ({ nav });

export default connect(mapStateToProps, {
  toggleNavMenu,
})(NavContainer);
