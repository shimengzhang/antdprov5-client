import type { TableListItem as PermissionData } from '../Permissions/data';

export interface TableListItem {
  _id?: string;
  name?: string;
  nameCn?: string;
  permissions?: PermissionData[];
  updatedAt?: string;
  createdAt?: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  _id?: string;
  name?: string;
  nameCn?: string;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
}
