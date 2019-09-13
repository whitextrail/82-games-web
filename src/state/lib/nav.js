import {
  LocalPlaySharp,
  PersonSharp,
  EqualizerSharp,
  ExitToAppSharp,
  StarSharp,
} from '@material-ui/icons';
import { authenticationStates } from '../../util/constants';

const navList = {
  games: {
    title: 'Games',
    routePath: '/games',
    icon: LocalPlaySharp,
  },
  athletes: {
    title: 'Athletes',
    routePath: '/athletes',
    icon: StarSharp,
  },
  leaderboard: {
    title: 'Leaderboard',
    routePath: '/leaderboard',
    icon: EqualizerSharp,
  },
  account: {
    title: 'Account',
    routePath: '/account',
    icon: PersonSharp,
    authenticationState: authenticationStates.AUTHENTICATED,
  },
  login: {
    title: 'Login/Register',
    icon: PersonSharp,
    authenticationState: authenticationStates.UNAUTHENTICATED,
  },
  logout: {
    title: 'Logout',
    icon: ExitToAppSharp,
    authenticationState: authenticationStates.AUTHENTICATED,
  },
  // about: {
  //   title: 'About Us',
  //   icon: null,
  //   routePath: '/about',
  // },
  // team: {
  //   title: 'Our Team',
  //   icon: null,
  //   routePath: '/team',
  // },
  // contact: {
  //   title: 'Contact',
  //   icon: null,
  //   routePath: '/contact',
  // },
  // terms: {
  //   title: 'Terms of Service',
  //   icon: null,
  //   routePath: '/terms',
  // },
  // privacy: {
  //   title: 'Privacy Policy',
  //   icon: null,
  //   routePath: '/privacy',
  // },
};

export {
  navList,
};
