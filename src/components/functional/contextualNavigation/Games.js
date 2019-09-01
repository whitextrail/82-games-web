import React, { memo, useState } from 'react';
import {
  Grid,
  IconButton,
  Slide,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { VisibilitySharp } from '@material-ui/icons';
import { connect } from 'react-redux';
import { filterGamesByStatusId } from '../../../state/actions/games';

const styles = {
  iconButton: {
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
};

const GameNav = memo(({
  isOpen,
  games: {
    allStatuses,
    statusIndex,
  },
  filterGamesByStatusId: filterGamesByStatusIdAction,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const openStatusFilterMenu = event => setAnchorEl(event.currentTarget);

  const closeStatusFilterMenu = (event) => {
    filterGamesByStatusIdAction(event.currentTarget.value);

    return setAnchorEl(null);
  };

  return (
    <Slide direction="down" in={!isOpen} timeout={500}>
      <Grid container justify="flex-end" alignItems="center">
        <IconButton size="small" style={styles.iconButton} onClick={openStatusFilterMenu}>
          <VisibilitySharp style={styles.icon} color="secondary" />
        </IconButton>
        <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={closeStatusFilterMenu}>
          { allStatuses.map((item, index) => {
            const isSelected = statusIndex === index;

            return (
              <MenuItem dense key={item} selected={isSelected} value={index} onClick={closeStatusFilterMenu}>
                {item}
              </MenuItem>
            );
          }) }
        </Menu>
      </Grid>
    </Slide>
  );
});

const mapStateToProps = ({ games }) => ({
  games
});

export default connect(mapStateToProps, {
  filterGamesByStatusId,
})(GameNav);
