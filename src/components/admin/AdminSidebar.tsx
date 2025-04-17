
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  Users, 
  Home, 
  DollarSign, 
  CreditCard, 
  Bell, 
  Settings, 
  Package, 
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/components/ui/use-toast";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  onClick?: () => void;
}

const SidebarItem = ({ icon, label, to, onClick }: SidebarItemProps) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center px-4 py-3 text-gray-600 hover:bg-orange-100 rounded-lg transition-colors",
          isActive && "bg-orange-100 text-orange-600"
        )
      }
    >
      <div className="mr-3">{icon}</div>
      <span>{label}</span>
    </NavLink>
  );
};

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "Successfully logged out from admin panel",
      });
      navigate("/admin/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  
  return (
    <div className={cn(
      "bg-white border-r border-gray-200 h-screen transition-all duration-300",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        {!isCollapsed && (
          <h1 className="text-xl font-semibold text-orange-500">MyStock Admin</h1>
        )}
        {isCollapsed && (
          <h1 className="text-xl font-semibold text-orange-500">MS</h1>
        )}
      </div>
      
      <div className="p-4 space-y-1">
        <SidebarItem icon={<Home size={20} />} label="Dashboard" to="/admin/dashboard" />
        <SidebarItem icon={<Users size={20} />} label="Users" to="/admin/users" />
        <SidebarItem icon={<DollarSign size={20} />} label="Deposits" to="/admin/deposits" />
        <SidebarItem icon={<CreditCard size={20} />} label="Withdrawals" to="/admin/withdrawals" />
        <SidebarItem icon={<Package size={20} />} label="Packages" to="/admin/packages" />
        <SidebarItem icon={<Bell size={20} />} label="Notices" to="/admin/notices" />
        <SidebarItem icon={<Settings size={20} />} label="Settings" to="/admin/settings" />
        <SidebarItem 
          icon={<LogOut size={20} />} 
          label="Logout" 
          to="#" 
          onClick={handleSignOut} 
        />
      </div>
    </div>
  );
};

export default AdminSidebar;
