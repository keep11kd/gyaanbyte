import RoleGuard from "@/features/auth/components/RoleGuard";
import SalesDashboard from "@/features/dashboard/pages/SalesDashboard";

export default function SalesRoute() {
  return (
    <RoleGuard allowedRoles={["ROLE_SALES"]}>
      <SalesDashboard />
    </RoleGuard>
  );
}
