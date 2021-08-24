import { request } from 'umi';

// 获取商品列表
export const getGoods = (params) => {
  console.log('params', params);

  return request('/api/shop/goods', {
    params,
  });
};

/**
 * 上架和下架商品
 * @param gid
 * @returns
 */
export const updateGoodsOn = (gid) => {
  return request(`/api/shop/goods/${gid}/on`, {
    method: 'PATCH',
  });
};

/**
 * 推荐和不推荐商品
 * @param gid
 * @returns
 */
export const updateGoodsRecommend = (gid) => {
  return request(`/api/shop/goods/${gid}/recommend`, {
    method: 'PATCH',
  });
};

// /**
//  * 添加用户
//  * @param
//  * @returns
//  */
// export const addShopUser = (data) => {
//   return request(`/api/shop/userlist`, {
//     method: 'POST',
//     data,
//   });
// };

// /**
//  * 更新用户
//  * @param
//  * @returns
//  */
// export const updateShopUser = (id, data) => {
//   return request(`/api/shop/userlist/${id}`, {
//     method: 'PUT',
//     data,
//   });
// };
