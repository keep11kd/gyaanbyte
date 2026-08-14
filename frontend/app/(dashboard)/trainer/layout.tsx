import RoleGuard from "@/features/auth/components/RoleGuard";
import { USER_ROLES } from "@/features/auth/config/auth-roles";

export default function TrainerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RoleGuard allowedRoles={[USER_ROLES.INSTRUCTOR]}>
      {children}
    </RoleGuard>
  );
}
