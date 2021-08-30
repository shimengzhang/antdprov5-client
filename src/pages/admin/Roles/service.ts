// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

/** 获取用户列表 GET /admin/users */
export async function queryRoles(params?: TableListParams) {
  return request('/admin/roles', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/** 新建角色 POST /admin/roles */
export async function addRole(params?: TableListItem) {
  return request('/admin/roles', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/** 修改角色 PUT /admin/roles/:id */
export async function updateRole(params?: TableListItem) {
  console.log('update', params);
  const { nameCn, name, _id } = params;
  return request(`/admin/roles/${_id}`, {
    method: 'PUT',
    data: {
      nameCn,
      name,
    },
  });
}

/** 修改角色的权限 POST /admin/roles/:id/permissions */
export async function updatePermissions(options?: TableListItem) {
  console.log('update', options);
  const { _id, ...data } = options;
  return request(`/admin/roles/${_id}/permissions`, {
    method: 'POST',
    data,
  });
}
