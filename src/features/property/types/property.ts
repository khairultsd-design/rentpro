import type { Property } from "@prisma/client";

export type { Property };

export interface CreatePropertyDto {
  name: string;
  type: string;
  address: string;

  agreementStart: Date;
  agreementEnd: Date;

  totalRooms: number;
  availableRooms: number;

  status: string;
}