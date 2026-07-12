export const AuditModule = {
  PROPERTY: "PROPERTY",
  ROOM: "ROOM",
  TENANT: "TENANT",
  TENANCY: "TENANCY",
  PAYMENT: "PAYMENT",
  EXPENSE: "EXPENSE",
  USER: "USER",
  COMPANY: "COMPANY",
  AUTH: "AUTH",
} as const;

export const AuditAction = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  CHECK_IN: "CHECK_IN",
  CHECK_OUT: "CHECK_OUT",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  ENABLE: "ENABLE",
  DISABLE: "DISABLE",
} as const;