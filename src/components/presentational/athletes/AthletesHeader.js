import React, { memo } from 'react';
import {
  KeyboardArrowLeftSharp,
} from '@material-ui/icons';
import NavBar from '../nav/NavBar';

const iconStyles = { color: '#FFF' };
const navBarStyleClasses = {
  colorDefault: {
    backgroundColor: '#333333',
    color: '#FFF',
  },
};

const AthletesHeader = memo(() => (
  <NavBar
    title="Athletes"
    iconClickHandler={() => console.log('TODO')}
    icon={<KeyboardArrowLeftSharp style={iconStyles} />}
    styleClasses={navBarStyleClasses}
  />
));

export default AthletesHeader;
