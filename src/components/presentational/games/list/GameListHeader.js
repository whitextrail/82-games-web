import React, { memo } from 'react';
import NavBar from '../../nav/NavBar';

const GameListHeader = memo(() => (
  <NavBar
    title="Games"
    styleClasses={{
      colorDefault: {
        backgroundColor: '#8E44AD',
        color: '#FFF',
      },
    }}
  />
));

export default GameListHeader;
