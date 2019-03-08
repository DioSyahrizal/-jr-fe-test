import { SidebarMainMenu } from '~/interfaces/types';

const menus: Record<string, SidebarMainMenu> = {
  first: {
    title: 'Home',
    path: '/heroes',
    icon: 'docs'
  },
  second: {
    title: 'About',
    path: '/about',
    icon: 'dict'
  }
};

export { menus };
