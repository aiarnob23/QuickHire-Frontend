"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, LogOut } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Jobs",
      href: "/dashboard",
      icon: Briefcase,
    },
  ];

  return (
    <aside className="w-64 min-h-screen flex flex-col bg-background border-r border-border">
      
      {/* Header */}
      <div className="px-6 py-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">
          Admin Panel
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }
              `}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-border">
        <button
          className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-lg  text-red-500 font-medium hover:bg-slate-200 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </aside>
  );
}