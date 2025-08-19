export type RoleTypes = {
    id: number;                // Represents a numerical identifier for the role.
    uuid: number;              // A unique identifier for the role.
    name: string;              // The name of the role (e.g., "Admin").
    org_id: number | null;     // The ID of the associated organization, which can be null.
    created_at: string;        // A timestamp in ISO 8601 format for when the role was created.
    updated_at: string;        // A timestamp in ISO 8601 format for when the role was last updated.
    permission: PermissionTypes[]; // An array of permissions associated with the role.
  };
  
  export type PermissionTypes = {
    id: number;                // Represents a numerical identifier for the permission.
    uuid: string;              // A unique identifier in UUID format for the permission.
    role_id: number;           // The ID of the associated role.
    resource: string;          // The name of the resource this permission applies to.
    action: string[];          // A list of allowed actions (e.g., "read", "write").
    created_at: string;        // A timestamp in ISO 8601 format for when the permission was created.
    updated_at: string;        // A timestamp in ISO 8601 format for when the permission was last updated.
  };
  