import React, { memo } from 'react';
import NavBar from '../../nav/NavBar';
import { primaryColor } from '../../../../styles/constants';

const GameListHeader = memo(() => (
  <NavBar
    title="Games"
    styleClasses={{
      colorDefault: {
        backgroundColor: primaryColor,
        color: '#FFF',
      },
    }}
  />
));

export default GameListHeader;
