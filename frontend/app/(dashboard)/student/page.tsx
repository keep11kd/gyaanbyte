import RoleGuard from "@/features/auth/components/RoleGuard";
import StudentDashboard from "@/features/dashboard/pages/StudentDashboard";

export default function StudentRoute() {
  return (
    <RoleGuard allowedRoles={["ROLE_STUDENT"]}>
      <StudentDashboard />
    </RoleGuard>
  );
}
