import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { 
  Home, 
  FileText, 
  Calendar, 
  Stethoscope, 
  Users, 
  Settings
} from 'lucide-react';

const Sidebar: React.FC = () => {
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
    <aside className="w-64 bg-white border-r border-gray-200 fixed inset-y-0 left-0 z-20 transform transition-transform duration-300 ease-in-out hidden md:block">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <Link to="/" className="flex items-center">
            <Stethoscope className="h-6 w-6 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">MedConnect</span>
          </Link>
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
                >
                  <span className={`mr-3 ${isActive(item.path) ? 'text-blue-500' : 'text-gray-500'}`}>
                    {item.icon}
                  </span>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
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
      </div>
    </aside>
  );
};

export default Sidebar;