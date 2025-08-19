export interface CountryType {
  id: number;
  name: string;
  phone_code: number;
  shortname: string;
  states: any[]; // Keeping this as any[] for now, but we can define a more specific type if needed
  uuid: string | null;
}

export interface CountryResponse {
  type: string;
  message: string;
  data: CountryType[];
}

