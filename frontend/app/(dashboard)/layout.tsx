import AuthGuard from "@/features/auth/components/AuthGuard";
import DashboardLayout from "@/features/dashboard/layouts/DashboardLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </AuthGuard>
  );
}
