import React, { memo } from 'react';
import {
  KeyboardArrowLeftSharp,
} from '@material-ui/icons';
import NavBar from '../../../nav/NavBar';

const iconStyles = { color: '#FFF' };
const navBarStyleClasses = {
  colorDefault: {
    backgroundColor: '#333333',
    color: '#FFF',
  }
};

const GameStatsHeader = memo(({
  goBackRoute,
}) => (
  <NavBar
    elevation={0}
    icon={<KeyboardArrowLeftSharp styles={iconStyles} />}
    styleClasses={navBarStyleClasses}
    iconButtonClickHandler={goBackRoute}
  />
));

export default GameStatsHeader;

