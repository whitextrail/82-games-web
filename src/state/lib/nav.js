import {
  LocalPlaySharp,
  EqualizerSharp,
  StarSharp,
} from '@material-ui/icons';

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
