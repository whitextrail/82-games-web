import React, { memo } from 'react';
import {
  KeyboardArrowLeftSharp,
} from '@material-ui/icons';
import Nav from '../../container/Nav';

const AthleteNav = memo(({
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
          backgroundColor: 'black',
          color: 'white',
        },
      },
      navBarIconStyles: { color: 'white' },
    }}
  />
));

export default AthleteNav;
