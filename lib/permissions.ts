export const ROLES = {
    admin: ["event:dashboard","event:create", "event:read", "event:update", "event:delete", "manage_users", "manage_settings"],
    user: ["event:read"],
} as const;

export type Role = keyof typeof ROLES;
export type Permission = (typeof ROLES)[Role][number];

export function hasPermission(
    userRole: Role,
    permission: Permission
): boolean {
    const rolePermissions: readonly Permission[] = ROLES[userRole];
    return rolePermissions.includes(permission);
}