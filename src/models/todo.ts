import { getTodoList, addTodo, updateTodo } from '@/services/ant-design-pro/todo';
import { useState, useEffect, useCallback } from 'react';

export default () => {
  const [data, setData] = useState([]);
  async function fetchData() {
    const resData = await getTodoList();
    console.log('resData', resData);

    setData(resData);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const addData = useCallback(async (todo) => {
    const response = await addTodo(todo);
    if (response.success) {
      fetchData();
    }
  }, []);

  const updateData = useCallback(async (todo) => {
    const response = await updateTodo(todo);
    if (response.success) {
      fetchData();
    }
  }, []);
  const count = data.filter((d) => d.status === 0).length;
  return { data, setData, count, addData, updateData };
};
