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
    path: '/manage',
    name: 'manage',
    icon: 'UnorderedList',
    // component: './manage/User',
    routes: [
      {
        path: '/manage/user',
        name: 'userManage',
        icon: 'Team',
        component: './manage/User',
      },
      {
        path: '/manage/goods',
        name: 'goodsManage',
        icon: 'Shopping',
        component: './manage/Goods',
      },
    ],
  },
  {
    path: '/todo',
    name: 'todo',
    icon: 'OrderedList',
    component: './Todo',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    component: './Dashboard',
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
    redirect: './dashboard',
  },
  {
    component: './404',
  },
];
