let list = [
  { id: 1, title: '待办 1', status: 0 },
  { id: 2, title: '待办 2', status: 1 },
  { id: 3, title: '待办 3', status: 2 },
  { id: 4, title: '待办 4', status: 0 },
  { id: 5, title: '待办 5', status: 0 },
  { id: 6, title: '待办 6', status: 1 },
  { id: 7, title: '待办 7', status: 2 },
  { id: 8, title: '待办 8', status: 2 },
];

export default {
  'GET /api/shop/todolist': (req, res) => {
    res.send(list.sort((a, b) => b.id - a.id));
  },
  'PUT /api/shop/todolist': (req, res) => {
    const { id, status } = req.body;
    const item = list.find((v) => v.id === id);
    item && (item.status = status);
    res.send({
      success: true,
    });
  },
  'POST /api/shop/todolist': (req, res) => {
    const { title } = req.body;

    list.push({
      id: list.length + 1,
      title,
      status: 0,
    });
    res.send({
      success: true,
    });
  },
};
