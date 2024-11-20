export const UserRoles = {
    ADMIN: 'ADMIN',
    RESTAURANT_OWNER: 'RESTAURANT_OWNER'
  } as const
  
  export type UserRole = typeof UserRoles[keyof typeof UserRoles]