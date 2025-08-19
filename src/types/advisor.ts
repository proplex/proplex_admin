export interface Advisor {
    id: string;
    name: string;
    email: string;
    firm: string;
    phone_number: string;
    type: 'Adviser' | 'Manager' | 'Board Member';
    area_of_expertise: string;
    note?: string;
  }
  
  