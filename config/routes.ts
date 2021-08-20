export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin/401',
    // name: 'admin',
    // icon: 'crown',
    component: './Admin',
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  {
    name: 'admin',
    icon: 'table',
    path: '/admin',
    access: 'canAdmin',
    component: './admin/Users',
    routes: [
      {
        name: 'users',
        icon: 'user',
        path: '/admin/users',
        component: './admin/Users',
      },
    ],
  },
  {
    name: 'form',
    icon: 'table',
    path: '/form',
    component: './form/Basic',
    routes: [
      {
        name: 'basic',
        icon: 'table',
        path: '/form/basic',
        component: './form/Basic',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
