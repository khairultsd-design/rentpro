export interface Property {
  id: string;

  name: string;
  type: string;
  address: string;

  agreementStart: Date;
  agreementEnd: Date;

  totalRooms: number;
  availableRooms: number;

  status: string;

  createdAt: Date;
  updatedAt: Date;
}