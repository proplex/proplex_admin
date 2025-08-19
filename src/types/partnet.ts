export type PartnerTypes = {
    id: number;                // Represents a numerical identifier.
    uuid: string;              // A unique identifier in UUID format.
    name: string;              // The name of the entity.
    description: string | null; // A description, which can be null.
    icon: string;              // A URL to the icon image.
    created_at: string;        // A timestamp in ISO 8601 format.
    updated_at: string;        // A timestamp in ISO 8601 format.
};
