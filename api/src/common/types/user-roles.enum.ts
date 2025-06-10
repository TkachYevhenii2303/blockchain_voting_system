export const UserRoles = {
  ADMIN: 'admin',
  CANDIDATE: 'candidate',
};

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];
