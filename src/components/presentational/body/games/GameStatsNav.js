import React, { memo } from 'react';
import {
  KeyboardArrowLeftSharp,
} from '@material-ui/icons';
import Nav from '../../../container/Nav';

const GameStatsNav = memo(() => (
  <Nav
    navBarProps={{
      navBarTitle: '',
      navBarIconClickHandler: () => console.log('YOLO'),
      navBarIcon: <KeyboardArrowLeftSharp />,
      navBarStyles: {
        colorDefault: {
          backgroundColor: 'black',
          color: 'white',
        },
      },
      navBarIconStyles: { color: 'white' },
    }}
  />
));

export default GameStatsNav;
