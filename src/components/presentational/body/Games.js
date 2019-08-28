import React, { memo, useState } from 'react';
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
import {
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

const styles = {
  titleContainer: {
    height: 54,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    backgroundColor: '#EFEFEF',
  },
  titlePaper: {
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
  contentContainer: {
    backgroundColor: '',
  },
}

const GamesMenu = memo(({
  menuItems,
  anchorEl,
  closeMenu,
  selectedMenuItemIndex,
}) => (
  <Menu
    anchorEl={anchorEl}
    keepMounted
    open={Boolean(anchorEl)}
    onClose={closeMenu}
  >
    {
      menuItems.map((item, index) => (
        <MenuItem
          key={item}
          dense
          selected={selectedMenuItemIndex === index}
          onClick={() => closeMenu(index)}
        >
          { item }
        </MenuItem>
      ))
    }
  </Menu>
));

const Games = memo(() => {
  const menuItems = ['Previous', 'Current', 'Upcoming'];
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState(1);

  const openMenu = event => setAnchorEl(event.currentTarget);

  const closeMenu = (menuIndex) => {
    setSelectedMenuItemIndex(menuIndex);
    setAnchorEl(null)
  };

  return (
    <Grid container direction="column">
      <Grid item style={styles.titleContainer}>
        <Paper style={styles.titlePaper}>
          <Breadcrumbs>
            <Typography style={styles.breadcrumbText}>Games</Typography>
            <Button
              variant="text"
              style={{ ...styles.breadcrumbButton, ...styles.breadcrumbText }}
              onClick={openMenu}
            >
              { menuItems[selectedMenuItemIndex] }
              <FontAwesomeIcon icon={faChevronDown} style={styles.breadcrumbButtonIcon} />
            </Button>
          </Breadcrumbs>
          <GamesMenu
            menuItems={menuItems}
            anchorEl={anchorEl}
            closeMenu={closeMenu}
            selectedMenuItemIndex={selectedMenuItemIndex}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} style={{ height: '100%', backgroundColor: '#EFEFEF' }}>
      </Grid>
    </Grid>
  );
});

export default Games;
