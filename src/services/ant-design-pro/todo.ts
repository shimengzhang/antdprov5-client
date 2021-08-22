import { request } from 'umi';

/**
 * 获取所有的 todolist
 * @returns
 */
export const getTodoList = async () => {
  return request('/api/shop/todolist');
};

/**
 * 添加 todo
 * @returns
 */
export const addTodo = async (data) => {
  return request('/api/shop/todolist', {
    method: 'POST',
    data,
  });
};

/**
 * 更新 todo
 * @returns
 */
export const updateTodo = async (data) => {
  return request('/api/shop/todolist', {
    method: 'PUT',
    data,
  });
};
