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
    path: '/todo',
    name: 'todo',
    icon: 'OrderedList',
    component: './Todo',
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
    path: '/',
  },
  {
    component: './404',
  },
];
