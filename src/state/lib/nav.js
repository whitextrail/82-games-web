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
  account: {
    text: 'Account',
    routePath: '/account',
    icon: PersonSharp,
    authenticationState: authenticationStates.AUTHENTICATED,
  },
  leaderboard: {
    text: 'Leaderboard',
    routePath: '/leaderboard',
    icon: EqualizerSharp,
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
  about: {
    text: 'About Us',
    routePath: '/about',
  },
  team: {
    text: 'Our Team',
    routePath: '/team',
  },
  contact: {
    text: 'Contact',
    routePath: '/contact',
  },
  terms: {
    text: 'Terms of Service',
    routePath: '/terms',
  },
  privacy: {
    text: 'Privacy Policy',
    routePath: '/privacy',
  },
};

export {
  navList,
};
