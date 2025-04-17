
import { useState, useEffect } from "react";
import { Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/lib/supabaseClient";

interface AdminHeaderProps {
  title: string;
  onMenuClick?: () => void;
}

const AdminHeader = ({ title, onMenuClick }: AdminHeaderProps) => {
  const [adminName, setAdminName] = useState("Admin");
  
  useEffect(() => {
    const getAdminProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', session.user.id)
          .single();
          
        if (data?.full_name) {
          setAdminName(data.full_name);
        }
      }
    };
    
    getAdminProfile();
  }, []);
  
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="mr-4 lg:hidden"
        >
          <Menu size={20} />
        </Button>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell size={20} />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </Button>
        
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-orange-200">
              {adminName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="ml-2 font-medium hidden lg:inline-block">{adminName}</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
