// @ts-nocheck
const list = [
  {
    id: 1,
    name: '超级管理员',
    email: 'super@a.com',
    phone: null,
    avatar: null,
    avatar_url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    is_locked: 1,
    created_at: '2020-12-22T02:58:08.000000Z',
    updated_at: '2020-12-24T06:40:44.000000Z',
  },
  {
    id: 2,
    name: '张三',
    email: '2222@qq.com',
    phone: null,
    avatar: null,
    avatar_url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    is_locked: 0,
    created_at: '2020-12-24T03:47:48.000000Z',
    updated_at: '2020-12-24T06:44:43.000000Z',
  },
  {
    id: 3,
    name: '张三',
    email: '3333@a.com',
    phone: null,
    avatar: null,
    avatar_url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    is_locked: 1,
    created_at: '2020-12-22T02:58:08.000000Z',
    updated_at: '2020-12-24T06:40:44.000000Z',
  },
  {
    id: 4,
    name: '李四',
    email: '44444@qq.com',
    phone: null,
    avatar: null,
    avatar_url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    is_locked: 0,
    created_at: '2020-12-24T03:47:48.000000Z',
    updated_at: '2020-12-24T06:44:43.000000Z',
  },
];

export default {
  'GET /api/shop/userlist': (req, res) => {
    let { current, pageSize, ...options } = req.query;
    [pageSize, current] = [+pageSize, +current - 1];
    let data = list;

    const keys = Object.keys(options).filter((k) => options[k].trim() !== '');
    if (keys.length) {
      // 过滤 list 中符合所有条件的数据
      data = list.filter((item) => keys.every((k) => item[k] === options[k]));
    }
    const { length } = data;
    const start = current * pageSize;
    const end = current * pageSize + pageSize;

    // 获取分页数据
    const resData = data
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(start, end <= length ? end : length);

    res.send({
      success: true,
      data: resData,
      total: length,
      current,
      pageSize,
    });
  },
  'PATCH /api/shop/userlist/:id/lock': (req, res) => {
    const { id } = req.params;
    const user = list.find((l) => l.id === +id);
    if (user) {
      user.is_locked = user.is_locked ? 0 : 1;
      user.updated_at = new Date().toISOString();
      res.send({
        success: true,
        message: 'OK',
      });
    } else {
      res.status(422).send({
        success: false,
        message: '未找到用户',
        errors: {
          uid: '未找到',
        },
      });
    }
  },
  'POST /api/shop/userlist': (req, res) => {
    const { name, email, password } = req.body;
    list.push({
      id: list.length,
      name,
      email,
      avatar_url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      is_locked: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    res.send({
      success: true,
      message: 'OK',
    });
  },
  'PUT /api/shop/userlist/:id': (req, res) => {
    const { name, email, password } = req.body;
    const { id } = req.params;
    const user = list.find((l) => l.id === +id);
    if (user) {
      user.name = name;
      user.email = email;
      user.updated_at = new Date().toISOString();
      res.send({
        success: true,
        message: 'OK',
      });
    } else {
      res.status(422).send({
        success: false,
        message: '未找到用户',
        errors: {
          uid: '未找到',
        },
      });
    }
  },
};
