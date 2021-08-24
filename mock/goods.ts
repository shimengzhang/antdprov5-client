// @ts-nocheck
const list = [
  {
    id: 1,
    title: '电脑11111电脑',
    category_id: 7,
    description: '这是一个电脑1111',
    price: 5000,
    stock: 999,
    sales: 2,
    cover: '100x100.jpg',
    cover_url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    pics: ['a.png', 'b.png'],
    pics_url: [
      'https://laravel-shop-api.oss-cn-beijing.aliyuncs.com/a.png',
      'https://laravel-shop-api.oss-cn-beijing.aliyuncs.com/b.png',
    ],
    details: '这是一个电脑这是一个电脑这是一个电脑这是一个电脑',
    is_on: 1,
    is_recommend: 1,
    created_at: '2020-12-12T07:38:37.000000Z',
    updated_at: '2020-12-12T10:13:45.000000Z',
  },
  {
    id: 2,
    title: '电脑2',
    category_id: 7,
    description: '这是一个电脑',
    price: 5000,
    stock: 999,
    sales: 2,
    cover: '/imgs/img1.png',
    cover_url: 'https://laravel-shop-api.oss-cn-beijing.aliyuncs.com//imgs/img1.png',
    pics: ['a.png', 'b.png'],
    pics_url: [
      'https://laravel-shop-api.oss-cn-beijing.aliyuncs.com/a.png',
      'https://laravel-shop-api.oss-cn-beijing.aliyuncs.com/b.png',
    ],
    details: '这是一个电脑这是一个电脑这是一个电脑这是一个电脑',
    is_on: 0,
    is_recommend: 0,
    created_at: '2020-12-12T07:38:45.000000Z',
    updated_at: '2020-12-12T07:38:45.000000Z',
  },
  {
    id: 3,
    title: '电脑11111电脑',
    category_id: 7,
    description: '这是一个电脑1111',
    price: 5000,
    stock: 999,
    sales: 2,
    cover: '100x100.jpg',
    cover_url: 'https://laravel-shop-api.oss-cn-beijing.aliyuncs.com/100x100.jpg',
    pics: ['a.png', 'b.png'],
    pics_url: [
      'https://laravel-shop-api.oss-cn-beijing.aliyuncs.com/a.png',
      'https://laravel-shop-api.oss-cn-beijing.aliyuncs.com/b.png',
    ],
    details: '这是一个电脑这是一个电脑这是一个电脑这是一个电脑',
    is_on: 1,
    is_recommend: 1,
    created_at: '2020-12-12T07:38:37.000000Z',
    updated_at: '2020-12-12T10:13:45.000000Z',
  },
  {
    id: 4,
    title: '电脑2',
    category_id: 7,
    description: '这是一个电脑',
    price: 5000,
    stock: 999,
    sales: 2,
    cover: '/imgs/img1.png',
    cover_url: 'https://laravel-shop-api.oss-cn-beijing.aliyuncs.com//imgs/img1.png',
    pics: ['a.png', 'b.png'],
    pics_url: [
      'https://laravel-shop-api.oss-cn-beijing.aliyuncs.com/a.png',
      'https://laravel-shop-api.oss-cn-beijing.aliyuncs.com/b.png',
    ],
    details: '这是一个电脑这是一个电脑这是一个电脑这是一个电脑',
    is_on: 0,
    is_recommend: 0,
    created_at: '2020-12-12T07:38:45.000000Z',
    updated_at: '2020-12-12T07:38:45.000000Z',
  },
];

export default {
  'GET /api/shop/goods': (req, res) => {
    let { current, pageSize, ...options } = req.query;
    [pageSize, current] = [+pageSize, +current - 1];
    let data = list;

    const keys = Object.keys(options).filter((k) => options[k].trim() !== '');

    if (options.is_on) {
      options.is_on = +options.is_on;
    }
    if (options.is_recommend) {
      options.is_recommend = +options.is_recommend;
    }

    if (keys.length) {
      // 过滤 list 中符合所有条件的数据
      data = list.filter((item) => keys.every((k) => item[k] === options[k]));
    }
    // console.log('data', data);

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
  'PATCH /api/shop/goods/:id/on': (req, res) => {
    const { id } = req.params;
    const user = list.find((l) => l.id === +id);
    if (user) {
      user.is_on = user.is_on ? 0 : 1;
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
  'PATCH /api/shop/goods/:id/recommend': (req, res) => {
    const { id } = req.params;
    const user = list.find((l) => l.id === +id);
    if (user) {
      user.is_recommend = user.is_recommend ? 0 : 1;
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
