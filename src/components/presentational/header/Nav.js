import React, { memo } from 'react';
import { Grid } from '@material-ui/core';
import NavBar from './nav/NavBar';
import NavMenu from './nav/NavMenu';
import { primaryColor } from '../../../styles/constants';

const styles = {
  container: {
    backgroundColor: primaryColor,
  },
};

const Nav = memo(({
  toggleNavMenu,
  isOpen,
  byId,
  allIds,
  selectedId,
}) => {
  const { text } = byId[selectedId];

  return (
    <Grid container direction="column" style={styles.container}>
      <NavBar toggleNavMenu={toggleNavMenu} isOpen={isOpen} title={text} />
      <NavMenu
        byId={byId}
        selectedId={selectedId}
        isOpen={isOpen}
        allIds={allIds}
      />
    </Grid>
  );
});

export default Nav;
