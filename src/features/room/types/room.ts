export interface Room {
  id: string;

  roomNumber: string;
  floor?: string;

  monthlyRent: number;

  status: "Available" | "Occupied" | "Maintenance";

  propertyId: string;
}