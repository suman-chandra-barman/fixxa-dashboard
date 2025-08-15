import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  DollarSign,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import logo from "../assets/logo.png";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "User List",
    href: "/users",
    icon: Users,
  },
  {
    title: "Transition",
    href: "/transition",
    icon: DollarSign,
  },
];

const bottomItems = [
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logout clicked");
  };

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 h-[100px] p-6">
          {!collapsed && (
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="w-full h-auto" />
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2">
          {navigationItems.map((item) => {
            const isActive =
              location.pathname === item.href ||
              (item.href === "/dashboard" && location.pathname === "/");

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <item.icon
                  className={cn(
                    "flex-shrink-0 transition-colors duration-200",
                    collapsed ? "h-5 w-5" : "h-5 w-5 mr-3",
                    isActive
                      ? "text-white"
                      : "text-gray-500 group-hover:text-gray-700"
                  )}
                />
                {!collapsed && <span className="truncate">{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Items */}
        <div className="px-3 py-4 border-t border-gray-200 space-y-2">
          {bottomItems.map((item) => {
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <item.icon
                  className={cn(
                    "flex-shrink-0 transition-colors duration-200",
                    collapsed ? "h-5 w-5" : "h-5 w-5 mr-3",
                    isActive
                      ? "text-white"
                      : "text-gray-500 group-hover:text-gray-700"
                  )}
                />
                {!collapsed && <span className="truncate">{item.title}</span>}
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center w-full rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group",
              "text-gray-700 hover:bg-red-50 hover:text-red-600"
            )}
          >
            <LogOut
              className={cn(
                "flex-shrink-0 transition-colors duration-200",
                collapsed ? "h-5 w-5" : "h-5 w-5 mr-3",
                "text-gray-500 group-hover:text-red-500"
              )}
            />
            {!collapsed && <span className="truncate">Log out</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
