import type { TableListItem as RoleData } from '../Roles/data';

export interface TableListItem {
  _id?: string;
  username?: string;
  password?: string;
  isAdmin?: boolean;
  roles?: RoleData[];
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
  username?: string;
  password?: string;
  isAdmin?: boolean;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
}
