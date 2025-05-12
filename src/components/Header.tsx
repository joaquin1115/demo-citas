import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, UserRole } from '../contexts/UserContext';
import { 
  Bell, 
  User, 
  LogOut, 
  ChevronDown, 
  UserCog, 
  Users, 
  Stethoscope,
  CheckCircle,
  Menu
} from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout, switchRole, switchProfile } = useUser();
  const navigate = useNavigate();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleRoleSwitch = (role: UserRole) => {
    switchRole(role);
    setShowRoleMenu(false);
  };

  const handleProfileSwitch = (profileId: string) => {
    switchProfile(profileId);
    setShowProfileMenu(false);
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'patient':
        return <User size={16} />;
      case 'admin':
        return <UserCog size={16} />;
      case 'medical':
        return <Stethoscope size={16} />;
      default:
        return <User size={16} />;
    }
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

  const getCurrentProfileName = () => {
    const currentProfile = user.profiles.find(profile => profile.id === user.currentProfileId);
    return currentProfile?.name || user.name;
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
    <header className="bg-white border-b border-gray-200 shadow-sm z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <button 
            onClick={onMenuClick}
            className="p-2 rounded-full hover:bg-gray-100 md:mr-4"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center">
            <img 
              src="images/logo.png" 
              alt="EsSalud" 
              className="h-8 mr-2"
            />
            <span className="text-2xl font-bold text-essalud-blue">
              EsSalud
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
          </button>

          {/* Role Switcher */}
          <div className="relative">
            <button 
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center space-x-1 px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <div className="flex items-center">
                {getRoleIcon(user.currentRole)}
                <span className="ml-2 mr-1">{getRoleLabel(user.currentRole)}</span>
                <ChevronDown size={16} />
              </div>
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1 animate-fade-in">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm text-gray-600">Rol actual: {getRoleLabel(user.currentRole)} {getRoleEmoji(user.currentRole)}</p>
                  <p className="text-xs text-gray-500 mt-1">Cambiar a:</p>
                </div>
                {user.roles.filter(role => role !== user.currentRole).map(role => (
                  <button
                    key={role}
                    onClick={() => handleRoleSwitch(role)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center"
                  >
                    {getRoleIcon(role)}
                    <span className="ml-2">{getRoleLabel(role)}</span>
                    <span className="ml-2">{getRoleEmoji(role)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Profile Switcher - Only show if user is in patient role and has multiple profiles */}
          {user.currentRole === 'patient' && user.profiles.length > 1 && (
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-1 px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center">
                  <Users size={16} />
                  <span className="ml-2 mr-1">{getCurrentProfileName()}</span>
                  <ChevronDown size={16} />
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1 animate-fade-in">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm text-gray-600">Perfil actual: {getCurrentProfileName()}</p>
                    <p className="text-xs text-gray-500 mt-1">Cambiar a:</p>
                  </div>
                  {user.profiles.filter(profile => profile.id !== user.currentProfileId).map(profile => (
                    <button
                      key={profile.id}
                      onClick={() => handleProfileSwitch(profile.id)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center"
                    >
                      <User size={16} />
                      <span className="ml-2">{profile.name}</span>
                      {profile.isCurrentUser && <span className="ml-2">(tú)</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* User menu */}
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
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
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