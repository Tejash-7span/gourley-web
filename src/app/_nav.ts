interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'fa fa-dashboard',
  }, {
    name: 'Bid',
    url: '/jobs/bid',
    icon: 'fa fa-gavel',
  },
  {
    name: 'Edit Jobs',
    url: '/jobs/editjob/1',
    icon: 'fa fa-edit',
  },
  {
    name: 'Search Jobs',
    url: '/jobs/1',
    icon: 'fa fa-tasks',
  },
  {
    name: 'Masters',
    url: '/',
    icon: 'fa fa-book',
    children: [
      {
        name: 'Parts',
        url: '/masters/parts',
        icon: 'fa fa-cogs',
      },
      {
        name: 'Workers',
        url: '/masters/workers',
        icon: 'fa fa-users',
      },
      {
        name: 'Status',
        url: '/masters/status',
        icon: 'fa fa-exclamation-circle',
      }
    ]
  },
  {
    name: 'Users',
    url: '/users',
    icon: 'fa fa-user-circle-o',
  }
];
