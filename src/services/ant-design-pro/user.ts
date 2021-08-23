import { request } from 'umi';

export const getUserList = (params) => {
  console.log('params', params);

  return request('/api/shop/userlist', {
    params,
  });
};

/**
 * 用户禁用或启用
 * @param uid
 * @returns
 */
export const updateUserLock = (uid) => {
  return request(`/api/shop/userlist/${uid}/lock`, {
    method: 'PATCH',
  });
};

/**
 * 添加用户
 * @param
 * @returns
 */
export const addShopUser = (data) => {
  return request(`/api/shop/userlist`, {
    method: 'POST',
    data,
  });
};

/**
 * 更新用户
 * @param
 * @returns
 */
export const updateShopUser = (id, data) => {
  return request(`/api/shop/userlist/${id}`, {
    method: 'PUT',
    data,
  });
};
