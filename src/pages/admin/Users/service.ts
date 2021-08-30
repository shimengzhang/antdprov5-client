// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

/** 获取用户列表 GET /admin/users */
export async function queryUsers(params?: TableListParams) {
  // console.log('sorter', sorter);
  return request('/admin/users', {
    method: 'GET',
    params: {
      ...params,
    },
    // ...(sorter || {}),
  });
}

/** 新建用户 POST /admin/users */
export async function addUser(params: TableListItem) {
  return request('/admin/users', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
/** 修改用户 PUT /admin/users/:id */
export async function updateUser(params: TableListItem) {
  const { _id, ...data } = params;
  return request(`/admin/users/${_id}`, {
    method: 'PUT',
    data,
  });
}

/** 分配角色 PUT /admin/users/:id */
export async function setRoles(params: TableListItem) {
  const { _id, ...data } = params;
  return request(`/admin/users/${_id}/roles`, {
    method: 'POST',
    data,
  });
}
