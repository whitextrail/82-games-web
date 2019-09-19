import React, { memo } from 'react';
import NavBar from '../../nav/NavBar';

const GameListHeader = memo(() => (
  <NavBar
    title="GAMES"
    styleClasses={{
      colorDefault: {
        backgroundColor: '#333333',
        color: '#FFF',
      },
    }}
  />
));

export default GameListHeader;
