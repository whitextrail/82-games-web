import {
  LocalPlaySharp,
  PersonSharp,
  EqualizerSharp,
  ExitToAppSharp,
} from '@material-ui/icons';
import { authenticationStates } from '../../util/constants';

const navList = {
  games: {
    text: 'Games',
    routePath: '/games',
    icon: LocalPlaySharp,
  },
  leaderboard: {
    text: 'Leaderboard',
    routePath: '/leaderboard',
    icon: EqualizerSharp,
  },
  account: {
    text: 'Account',
    routePath: '/account',
    icon: PersonSharp,
    authenticationState: authenticationStates.AUTHENTICATED,
  },
  authenticate: {
    text: 'Login/Register',
    icon: PersonSharp,
    authenticationState: authenticationStates.UNAUTHENTICATED,
  },
  logout: {
    text: 'Logout',
    icon: ExitToAppSharp,
    authenticationState: authenticationStates.AUTHENTICATED,
  },
  // about: {
  //   text: 'About Us',
  //   icon: null,
  //   routePath: '/about',
  // },
  // team: {
  //   text: 'Our Team',
  //   icon: null,
  //   routePath: '/team',
  // },
  // contact: {
  //   text: 'Contact',
  //   icon: null,
  //   routePath: '/contact',
  // },
  // terms: {
  //   text: 'Terms of Service',
  //   icon: null,
  //   routePath: '/terms',
  // },
  // privacy: {
  //   text: 'Privacy Policy',
  //   icon: null,
  //   routePath: '/privacy',
  // },
};

export {
  navList,
};
