// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

/** 获取用户列表 GET /admin/users */
export async function queryMenus(params: TableListParams) {
  return request<TableListItem>('/admin/menus', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/** 新建角色 POST /admin/menus */
export async function addMenu(data?: { [key: string]: any }) {
  return request<TableListItem>('/admin/menus', {
    method: 'POST',
    data: {
      ...data,
    },
  });
}

/** 修改角色 PUT /admin/menus/:id */
export async function updateMenu(options?: { [key: string]: any }) {
  console.log('update', options);
  const { _id, ...data } = options;
  return request<TableListItem>(`/admin/menus/${_id}`, {
    method: 'PUT',
    data,
  });
}
