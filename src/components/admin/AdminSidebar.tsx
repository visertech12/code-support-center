
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';

interface AdminSidebarProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const AdminSidebar = ({ show, setShow }: AdminSidebarProps) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path: string) => {
    return location.pathname.includes(path) ? 'bg-orange-100 text-orange-600' : 'text-gray-600 hover:bg-orange-50';
  };

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transform ${show ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <img src="https://mystock-admin.scriptbasket.com/assets/images/logoIcon/logo.png" alt="myStock Admin" className="h-8" />
          <span className="ml-2 text-xl font-semibold">Admin Panel</span>
        </div>
        {isMobile && (
          <button onClick={() => setShow(false)} className="p-1 rounded-md text-gray-500 hover:bg-gray-100">
            <X size={20} />
          </button>
        )}
      </div>
      
      <div className="py-4 overflow-y-auto">
        <ul className="space-y-1 px-3">
          <li>
            <Link to="/admin/dashboard" className={`flex items-center p-2 rounded-lg ${isActive('/admin/dashboard')}`}>
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className={`flex items-center p-2 rounded-lg ${isActive('/admin/users')}`}>
              <span className="ml-3">Users Management</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/deposits" className={`flex items-center p-2 rounded-lg ${isActive('/admin/deposits')}`}>
              <span className="ml-3">Deposits Management</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/withdrawals" className={`flex items-center p-2 rounded-lg ${isActive('/admin/withdrawals')}`}>
              <span className="ml-3">Withdrawals Management</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AdminSidebar;
