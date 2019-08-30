import React, { memo, useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  Breadcrumbs,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const styles = {
  container: {
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
    color: '#333',
  },
  breadcrumbButton: {
    paddingLeft: 0,
    fontWeight: 400,
  },
  breadcrumbButtonIcon: {
    marginLeft: 6,
    fontSize: 14,
  },
}

const GameStatusFilter = memo(({
  gameStatusesById,
  selectedGameStatusId,
  filterGamesByStatusId,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = event => setAnchorEl(event.currentTarget);

  const closeMenu = (event) => {
    filterGamesByStatusId(event.currentTarget.value);
    setAnchorEl(null);
  }

  return (
    <Paper style={styles.container}>
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
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={closeMenu}>
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
  )
});

export default GameStatusFilter;
