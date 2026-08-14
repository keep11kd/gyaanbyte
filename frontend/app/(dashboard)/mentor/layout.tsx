import RoleGuard from "@/features/auth/components/RoleGuard";

export default function MentorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RoleGuard allowedRoles={["ROLE_INSTRUCTOR"]}>
      {children}
    </RoleGuard>
  );
}
