import { request } from 'umi';

// 获取分类列表 - 非禁用
export const getCategory = () => {
  return request('/api/shop/category');
};
