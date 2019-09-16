import React, { memo } from 'react';
import {
  KeyboardArrowLeftSharp,
} from '@material-ui/icons';
import NavBar from '../../nav/NavBar';

const GameStatsHeader = memo(() => (
  <NavBar
    title="Games"
    elevation={0}
    icon={<KeyboardArrowLeftSharp />}
    iconStyles={{ color: '#FFF' }}
    styleClasses={{
      colorDefault: {
        backgroundColor: '#333333',
        color: '#FFF',
      }
    }}
  />
));

export default GameStatsHeader;
