export interface Address {
  _id: string;
  userId: string;
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  lat: number;
  lng: number;
  label: "Home" | "Work" | "Other";
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}
