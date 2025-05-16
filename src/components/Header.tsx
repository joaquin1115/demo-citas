import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, UserRole } from '../contexts/UserContext';
import { 
  Bell, 
  User, 
  LogOut, 
  ChevronDown,
  UserCog,
  Stethoscope,
  Menu
} from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout, switchRole } = useUser();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleRoleSwitch = (role: UserRole) => {
    switchRole(role);
    setShowUserMenu(false);
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'patient':
        return 'Paciente';
      case 'admin':
        return 'Asistente Administrativo';
      case 'medical':
        return 'Personal Médico';
      default:
        return role;
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'medical':
        return <Stethoscope size={16} className="mr-2" />;
      case 'admin':
        return <UserCog size={16} className="mr-2" />;
      default:
        return <User size={16} className="mr-2" />;
    }
  };

  const getRoleEmoji = (role: UserRole) => {
    switch (role) {
      case 'patient':
        return '👤';
      case 'admin':
        return '🧾';
      case 'medical':
        return '👨‍⚕️';
      default:
        return '👤';
    }
  };

  return (
    <header className="bg-essalud-light border-b border-gray-200 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <button 
          onClick={onMenuClick}
          className="p-2 rounded-full hover:bg-gray-100 md:mr-4"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
          </button>

          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2"
            >
              <img
                src={user.avatarUrl || 'https://i.pravatar.cc/150?img=1'}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
              <ChevronDown size={16} />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>

                <div className="py-2 border-b border-gray-100">
                  <div className="px-4 py-2 flex items-center bg-gray-50">
                    {getRoleIcon(user.currentRole)}
                    <span className="text-sm font-medium">{getRoleLabel(user.currentRole)}</span>
                    <span className="ml-2">{getRoleEmoji(user.currentRole)}</span>
                  </div>
                  
                  {user.roles.length > 1 && (
                    <>
                      <p className="px-4 py-1 text-xs text-gray-500 mt-2">Cambiar rol a:</p>
                      {user.roles.filter(role => role !== user.currentRole).map(role => (
                        <button
                          key={role}
                          onClick={() => handleRoleSwitch(role)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center"
                        >
                          {getRoleIcon(role)}
                          <span>{getRoleLabel(role)}</span>
                          <span className="ml-2">{getRoleEmoji(role)}</span>
                        </button>
                      ))}
                    </>
                  )}
                </div>

                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="mr-2" />
                    Cerrar sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;