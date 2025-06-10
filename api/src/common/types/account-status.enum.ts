export const AccountStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  BLOCKED: 'blocked',
};

export type AccountStatus = (typeof AccountStatus)[keyof typeof AccountStatus];
