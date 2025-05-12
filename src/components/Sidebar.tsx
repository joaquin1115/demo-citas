import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { 
  Home, 
  FileText, 
  Calendar, 
  Stethoscope, 
  Users, 
  Settings,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { user } = useUser();
  const location = useLocation();

  if (!user) return null;

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/',
      icon: <Home size={20} />,
      roles: ['patient', 'admin', 'medical']
    },
    {
      title: 'Historias Clínicas',
      path: '/medical-records',
      icon: <FileText size={20} />,
      roles: ['patient', 'admin', 'medical']
    },
    {
      title: 'Citas Médicas',
      path: '/appointments',
      icon: <Calendar size={20} />,
      roles: ['patient', 'admin', 'medical']
    },
    {
      title: 'Servicios Médicos',
      path: '/medical-services',
      icon: <Stethoscope size={20} />,
      roles: ['medical']
    },
    {
      title: 'Gestión de Accesos',
      path: '/access-management',
      icon: <Users size={20} />,
      roles: ['admin']
    },
    {
      title: 'Configuración',
      path: '/settings',
      icon: <Settings size={20} />,
      roles: ['patient', 'admin', 'medical']
    }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user.currentRole)
  );

  return (
    <aside className={`fixed inset-y-0 left-0 z-20 transform transition-transform duration-300 ease-in-out bg-white border-r border-gray-200 ${
      isOpen ? 'w-64' : 'w-20'
    } hidden md:block`}>
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between h-16 border-b border-gray-200 px-4">
          <Link to="/" className={`flex items-center ${!isOpen && 'justify-center'}`}>
            <Stethoscope className="h-6 w-6 text-blue-600" />
            {isOpen && <span className="ml-2 text-xl font-bold text-gray-900">EsSalud</span>}
          </Link>
          <button
            onClick={onToggle}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {filteredMenuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  title={!isOpen ? item.title : undefined}
                >
                  <span className={`${isActive(item.path) ? 'text-blue-500' : 'text-gray-500'}`}>
                    {item.icon}
                  </span>
                  {isOpen && <span className="ml-3">{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {isOpen && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <img 
                src={user.avatarUrl || "https://i.pravatar.cc/150?img=1"} 
                alt={user.name} 
                className="h-8 w-8 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;