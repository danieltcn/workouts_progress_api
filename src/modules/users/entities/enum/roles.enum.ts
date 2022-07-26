export enum RolesEnum {
  ADMIN = 'admin',
  CLIENT = 'client',
}

export const Roles = {
  ADMIN: 'admin',
  CLIENT: 'client',
} as const;
export type Roles = typeof Roles[keyof typeof Roles];
