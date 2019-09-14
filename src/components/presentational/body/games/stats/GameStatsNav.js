import React, { memo } from 'react';
import {
  KeyboardArrowLeftSharp,
} from '@material-ui/icons';
import Nav from '../../../../container/Nav';

const GameStatsNav = memo(({
  location,
}) => (
  <Nav
    location={location}
    navBarProps={{
      navBarTitle: '',
      navBarIconClickHandler: () => console.log('TODO'),
      navBarIcon: <KeyboardArrowLeftSharp />,
      navBarStyles: {
        colorDefault: {
          backgroundColor: '#333333',
          color: 'white',
        },
      },
      navBarIconStyles: { color: 'white' },
    }}
  />
));

export default GameStatsNav;
