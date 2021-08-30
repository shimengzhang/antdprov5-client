// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

/** 获取用户列表 GET /admin/users */
export async function queryPermissions(params?: TableListParams) {
  return request('/admin/permissions', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/** 新建角色 POST /admin/permissions */
export async function addPermission(params?: TableListItem) {
  return request('/admin/permissions', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/** 修改角色 PUT /admin/permissions/:id */
export async function updatePermission(params?: TableListItem) {
  console.log('update', params);
  const { _id, ...data } = params;
  return request(`/admin/permissions/${_id}`, {
    method: 'PUT',
    data,
  });
}
