type PropertyType = {
    label: string;  // Example: "FILM"
    value: string;  // Example: "FILM"
    percentage: string;  // Example: "4" (percentage as a string)
  };
  
  type TypeOption = {
    label: string;  // Example: "BUY"
    value: string;  // Example: "BUY"
  };
  
  type DataItem = {
    id: number;  // Example: 59
    uuid: string;  // Example: "344bd319-470b-4c87-8f42-16c7f13edd3d"
    name: string;  // Example: "Legal Fee"
    value: string;  // Example: "4"
    property_id: number;  // Example: 49
    percentage_id: number;  // Example: 3
    property_types: PropertyType[];  // Example: [{ label: "FILM", value: "FILM", percentage: "4" }]
    types: TypeOption[] | null;  // Example: [{ label: "BUY", value: "BUY" }, { label: "SELL", value: "SELL" }] or null
    status: boolean;  // Example: false
    created_at: string;  // Example: "2024-12-18T11:48:38.000Z"
    updated_at: string;  // Example: "2024-12-18T11:48:38.000Z"
  };
  
 export  type DataList = DataItem[];  // Represents an array of DataItem
  