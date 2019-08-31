import React, { memo } from 'react';
import {
  Grid,
  Paper,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {
  secondaryColor,
  primaryTextColor,
} from '../../../../styles/constants';

const styles = {
  container: {
    height: 66,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    backgroundColor: secondaryColor,
  },
  paper: {
    height: 56,
    width: '100%',
    paddingLeft: 16,
    paddingTop: 8,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  breadcrumbButton: {
    color: primaryTextColor,
    fontSize: 16,
    paddingLeft: 0,
    fontWeight: 400,
  },
  breadcrumbButtonIcon: {
    marginLeft: 6,
    fontSize: 14,
  },
};

const GameStatusFilter = memo(({
  allStatuses,
  statusIndex,
  openMenu,
  closeMenu,
  menuAnchorEl,
}) => (
  <Grid item style={styles.container}>
    <Paper style={styles.paper}>
      <Button
        variant="text"
        style={styles.breadcrumbButton}
        onClick={openMenu}
      >
        { `Status: ${allStatuses[statusIndex]}` }
        <FontAwesomeIcon icon={faChevronDown} style={styles.breadcrumbButtonIcon} />
      </Button>
      <Menu anchorEl={menuAnchorEl} open={!!menuAnchorEl} onClose={closeMenu}>
        { allStatuses.map((item, index) => {
          const isSelected = statusIndex === index;

          return (
            <MenuItem dense key={item} selected={isSelected} value={index} onClick={closeMenu}>
              { item }
            </MenuItem>
          );
        }) }
      </Menu>
    </Paper>
  </Grid>
));

export default GameStatusFilter;
