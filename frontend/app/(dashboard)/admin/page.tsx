import RoleGuard from "@/features/auth/components/RoleGuard";
import AdminDashboard from "@/features/dashboard/pages/AdminDashboard";

export default function AdminRoute() {
  return (
    <RoleGuard allowedRoles={["ROLE_ADMIN"]}>
      <AdminDashboard />
    </RoleGuard>
  );
}
