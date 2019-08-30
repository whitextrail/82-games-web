import React, { memo } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Button,
  Breadcrumbs,
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
    height: 55,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    backgroundColor: secondaryColor,
  },
  paper: {
    height: 48,
    width: '100%',
    paddingLeft: 16,
    paddingTop: 8,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  breadcrumbText: {
    fontSize: 16,
    color: primaryTextColor,
  },
  breadcrumbButton: {
    paddingLeft: 0,
    fontWeight: 400,
  },
  breadcrumbButtonIcon: {
    marginLeft: 6,
    fontSize: 14,
  },
};

const GameStatusFilter = memo(({
  gameStatusesById,
  selectedGameStatusId,
  openMenu,
  closeMenu,
  menuAnchorEl,
}) => (
  <Grid item style={styles.container}>
    <Paper style={styles.paper}>
      <Breadcrumbs>
        <Typography style={styles.breadcrumbText}>Games</Typography>
        <Button
          variant="text"
          style={{ ...styles.breadcrumbButton, ...styles.breadcrumbText, }}
          onClick={openMenu}
        >
          { `Status: ${gameStatusesById[selectedGameStatusId]}` }
          <FontAwesomeIcon icon={faChevronDown} style={styles.breadcrumbButtonIcon} />
        </Button>
      </Breadcrumbs>
      <Menu anchorEl={menuAnchorEl} open={!!menuAnchorEl} onClose={closeMenu}>
        { gameStatusesById.map((item, index) => {
          const isSelected = selectedGameStatusId === index;

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
