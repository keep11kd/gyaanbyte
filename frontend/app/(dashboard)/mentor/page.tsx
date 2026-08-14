import RoleGuard from "@/features/auth/components/RoleGuard";
import MentorDashboard from "@/features/dashboard/pages/MentorDashboard";

export default function MentorRoute() {
  return (
    <RoleGuard allowedRoles={["ROLE_INSTRUCTOR"]}>
      <MentorDashboard />
    </RoleGuard>
  );
}
