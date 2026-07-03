export interface Tenant {
  id: string;

  fullName: string;
  phone: string;
  email?: string;

  icPassport: string;

  checkInDate: Date;
  checkOutDate?: Date;

  status: "ACTIVE" | "Checked Out";

  roomId: string;
}

export interface CreateTenantDto {
  fullName: string;
  phone: string;
  email?: string;

  icPassport: string;

  checkInDate: Date;
  checkOutDate?: Date;

  roomId: string;
}