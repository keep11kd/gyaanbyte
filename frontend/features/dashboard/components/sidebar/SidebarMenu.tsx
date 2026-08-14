"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  FolderKanban,
  BriefcaseBusiness,
  Users,
  BookOpen,
  FileText,
  MessageSquare,
  Bell,
  Settings,
} from "lucide-react";

interface SidebarMenuProps {
  isCollapsed?: boolean;
  onItemClick?: () => void;
}

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Training",
    href: "/training",
    icon: GraduationCap,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Services",
    href: "/services",
    icon: BriefcaseBusiness,
  },
  {
    title: "CRM",
    href: "/crm",
    icon: Users,
  },
  {
    title: "Blog",
    href: "/blog",
    icon: BookOpen,
  },
  {
    title: "Documentation",
    href: "/documentation",
    icon: FileText,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function SidebarMenu({
  isCollapsed = false,
  onItemClick,
}: Readonly<SidebarMenuProps>) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const active =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            title={isCollapsed ? item.title : undefined}
            className={`
              group
              flex
              items-center
              gap-3.5
              rounded-xl
              px-3.5
              py-2.5
              text-sm
              font-medium
              transition-all
              duration-150
              ${
                active
                  ? "bg-indigo-50 text-indigo-600 font-semibold"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
              }
              ${isCollapsed ? "justify-center px-0" : ""}
            `.trim()}
          >
            <Icon
              className={`h-5 w-5 shrink-0 transition-colors ${
                active
                  ? "text-indigo-600"
                  : "text-slate-400 group-hover:text-slate-700"
              }`}
            />

            {!isCollapsed && <span className="truncate">{item.title}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
