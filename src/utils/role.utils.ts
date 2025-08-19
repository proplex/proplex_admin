

// Utility functions for role management

import { Permissions, PermissionSet, Role } from '../types/role.types';

export const permissionTypes = [
  { id: 'read', name: 'Read' },
  { id: 'write', name: 'Write' },
  { id: 'edit', name: 'Edit' },
  { id: 'delete', name: 'Delete' },
  { id: 'manage', name: 'Manage' },
];

export const permissionDescriptions = {
  read: 'View information and records',
  write: 'Create new entries and records',
  edit: 'Modify existing entries and settings',
  delete: 'Remove entries and records',
  manage: 'Administer settings and control access',
};

export const defaultCategories = [
  { id: 'property', name: 'Property' },
  { id: 'company', name: 'Company' },
  { id: 'configuration', name: 'Configuration' },
  { id: 'amenity', name: 'Amenity' },
];

export const defaultPermissions: Permissions = {
  property: {
    read: true,
    write: false,
    edit: false,
    delete: false,
    manage: false,
  },
  company: {
    read: true,
    write: false,
    edit: false,
    delete: false,
    manage: false,
  },
  configuration: {
    read: true,
    write: false,
    edit: false,
    delete: false,
    manage: false,
  },
  amenity: {
    read: true,
    write: false,
    edit: false,
    delete: false,
    manage: false,
  },
};

export const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full access to all resources',
    permissions: {
      property: {
        read: true,
        write: true,
        edit: true,
        delete: true,
        manage: true,
      },
      company: {
        read: true,
        write: true,
        edit: true,
        delete: true,
        manage: true,
      },
      configuration: {
        read: true,
        write: true,
        edit: true,
        delete: true,
        manage: true,
      },
      amenity: {
        read: true,
        write: true,
        edit: true,
        delete: true,
        manage: true,
      },
    },
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2023-06-20T00:00:00Z',
  },
  {
    id: '2',
    name: 'Manager',
    description: 'Can manage properties and amenities',
    permissions: {
      property: {
        read: true,
        write: true,
        edit: true,
        delete: false,
        manage: true,
      },
      company: {
        read: true,
        write: false,
        edit: false,
        delete: false,
        manage: false,
      },
      configuration: {
        read: true,
        write: false,
        edit: false,
        delete: false,
        manage: false,
      },
      amenity: {
        read: true,
        write: true,
        edit: true,
        delete: false,
        manage: true,
      },
    },
    createdAt: '2023-02-10T00:00:00Z',
    updatedAt: '2023-05-15T00:00:00Z',
  },
  {
    id: '3',
    name: 'Viewer',
    description: 'Read-only access',
    permissions: {
      property: {
        read: true,
        write: false,
        edit: false,
        delete: false,
        manage: false,
      },
      company: {
        read: true,
        write: false,
        edit: false,
        delete: false,
        manage: false,
      },
      configuration: {
        read: true,
        write: false,
        edit: false,
        delete: false,
        manage: false,
      },
      amenity: {
        read: true,
        write: false,
        edit: false,
        delete: false,
        manage: false,
      },
    },
    createdAt: '2023-03-05T00:00:00Z',
    updatedAt: '2023-03-05T00:00:00Z',
  },
];

export const togglePermission = (
  permissions: Permissions,
  categoryId: string,
  permissionId: keyof PermissionSet
): Permissions => {
  return {
    ...permissions,
    [categoryId]: {
      ...permissions[categoryId],
      [permissionId]: !permissions[categoryId][permissionId],
    },
  };
};

export const toggleAllPermissionsForCategory = (
  permissions: Permissions,
  categoryId: string
): Permissions => {
  const allSelected = Object.values(permissions[categoryId]).every(
    (value) => value === true
  );

  return {
    ...permissions,
    [categoryId]: {
      read: !allSelected,
      write: !allSelected,
      edit: !allSelected,
      delete: !allSelected,
      manage: !allSelected,
    },
  };
};

export const toggleAllCategoriesForPermission = (
  permissions: Permissions,
  permissionId: keyof PermissionSet
): Permissions => {
  const allSelected = Object.keys(permissions).every(
    (categoryId) => permissions[categoryId][permissionId] === true
  );

  const updatedPermissions = { ...permissions };

  Object.keys(updatedPermissions).forEach((categoryId) => {
    updatedPermissions[categoryId] = {
      ...updatedPermissions[categoryId],
      [permissionId]: !allSelected,
    };
  });

  return updatedPermissions;
};

export const createSlugId = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

export const initializePermissions = (categoryId: string): PermissionSet => {
  return {
    read: false,
    write: false,
    edit: false,
    delete: false,
    manage: false,
  };
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};
