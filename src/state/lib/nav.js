import { authenticationStates } from '../../util/constants';

const navList = {
  games: {
    text: 'Games',
    routePath: '/games',
    hasIcon: true,
  },
  account: {
    text: 'Account',
    routePath: '/account',
    hasIcon: true,
    authenticationState: authenticationStates.AUTHENTICATED,
  },
  leaderboard: {
    text: 'Leaderboard',
    routePath: '/leaderboard',
    hasIcon: true,
  },
  authenticate: {
    text: 'Login/Register',
    hasIcon: true,
    authenticationState: authenticationStates.UNAUTHENTICATED,
  },
  logout: {
    text: 'Logout',
    hasIcon: true,
    authenticationState: authenticationStates.AUTHENTICATED,
  },
  about: {
    text: 'About Us',
    routePath: '/about',
    hasIcon: false,
  },
  team: {
    text: 'Our Team',
    routePath: '/team',
    hasIcon: false,
  },
  contact: {
    text: 'Contact',
    routePath: '/contact',
    hasIcon: false,
  },
  terms: {
    text: 'Terms of Service',
    routePath: '/terms',
    hasIcon: false,
  },
  privacy: {
    text: 'Privacy Policy',
    routePath: '/privacy',
    hasIcon: false,
  },
};

export {
  navList,
};
