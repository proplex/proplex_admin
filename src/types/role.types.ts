

// Types for the role management system

export interface Category {
  id: string;
  name: string;
}

export interface PermissionSet {
  read: boolean;
  write: boolean;
  edit: boolean;
  delete: boolean;
  manage: boolean;
}

export interface Permissions {
  [categoryId: string]: PermissionSet;
}

export interface PermissionType {
  id: string;
  name: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permissions;
  createdAt: string;
  updatedAt: string;
}
