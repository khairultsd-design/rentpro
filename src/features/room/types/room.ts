export interface Room {
  id: string;

  roomNumber: string;
  floor?: string;

  monthlyRent: number;

  status: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE";

  propertyId: string;
}