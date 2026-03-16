export type Role = 'admin' | 'editor' | 'viewer';

type UserWithRole = {
  roles?: Role | null;
} | null;

export const hasRole = (
  user: UserWithRole,
  roles: Role[] = []
): boolean => {
  if (!user || !user.roles) return false;
  return roles.includes(user.roles);
};


