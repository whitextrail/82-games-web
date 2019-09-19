import React, { memo } from 'react';
import {
  KeyboardArrowLeftSharp,
} from '@material-ui/icons';
import NavBar from '../nav/NavBar';

const iconStyles = { color: 'white' };

const AthleteNav = memo(() => (
  <NavBar
    iconClickHandler={() => console.log('TODO')}
    icon={<KeyboardArrowLeftSharp style={iconStyles} />}
    styleClasses={{
      colorDefault: {
        backgroundColor: 'black',
        color: 'white',
      },
    }}
  />
));

export default AthleteNav;
