import { request } from 'umi';

/**
 * 获取面板数据
 * @returns
 */
export const fetchDashboard = () => {
  return request('/api/shop/getDashboard');
};
