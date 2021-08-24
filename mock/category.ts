const list = [
  {
    id: 1,
    pid: 0,
    name: '电子数码',
    level: 1,
    status: 1,
    children: [
      {
        id: 3,
        pid: 1,
        name: '手机',
        level: 2,
        status: 1,
        children: [
          {
            id: 5,
            pid: 3,
            name: '华为',
            level: 3,
            status: 1,
          },
          {
            id: 6,
            pid: 3,
            name: '小米',
            level: 3,
            status: 1,
          },
        ],
      },
      {
        id: 4,
        pid: 1,
        name: '电脑',
        level: 2,
        status: 1,
        children: [
          {
            id: 7,
            pid: 4,
            name: '戴尔',
            level: 3,
            status: 1,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    pid: 0,
    name: '服装衣帽',
    level: 1,
    status: 1,
    children: [
      {
        id: 9,
        pid: 2,
        name: '男装',
        level: 2,
        status: 1,
        children: [],
      },
      {
        id: 10,
        pid: 2,
        name: '女装',
        level: 2,
        status: 1,
        children: [],
      },
    ],
  },
];

export default {
  'GET /api/shop/category': (req, res) => {
    res.send({
      success: true,
      data: list,
    });
  },
};
