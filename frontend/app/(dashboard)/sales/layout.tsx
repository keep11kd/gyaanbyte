import RoleGuard from "@/features/auth/components/RoleGuard";
import { USER_ROLES } from "@/features/auth/config/auth-roles";

export default function SalesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RoleGuard allowedRoles={[USER_ROLES.SALES]}>
      {children}
    </RoleGuard>
  );
}
