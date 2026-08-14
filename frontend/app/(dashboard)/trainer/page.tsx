import RoleGuard from "@/features/auth/components/RoleGuard";
import TrainerDashboard from "@/features/dashboard/pages/TrainerDashboard";

export default function TrainerRoute() {
  return (
    <RoleGuard allowedRoles={["ROLE_INSTRUCTOR"]}>
      <TrainerDashboard />
    </RoleGuard>
  );
}
