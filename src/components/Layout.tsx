import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { LogOut, Users, Shield, Layout as LayoutIcon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="glass-effect fixed top-0 w-full z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link
                to="/dashboard"
                className={`flex items-center px-4 text-gray-700 hover:text-indigo-600 transition-colors ${
                  isActive('/dashboard') ? 'text-indigo-600 font-semibold' : ''
                }`}
              >
                <LayoutIcon className="w-5 h-5 mr-2" />
                Dashboard
              </Link>
              <Link
                to="/users"
                className={`flex items-center px-4 text-gray-700 hover:text-indigo-600 transition-colors ${
                  isActive('/users') ? 'text-indigo-600 font-semibold' : ''
                }`}
              >
                <Users className="w-5 h-5 mr-2" />
                Users
              </Link>
              <Link
                to="/roles"
                className={`flex items-center px-4 text-gray-700 hover:text-indigo-600 transition-colors ${
                  isActive('/roles') ? 'text-indigo-600 font-semibold' : ''
                }`}
              >
                <Shield className="w-5 h-5 mr-2" />
                Roles
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-medium">
                    {currentUser?.name.charAt(0)}
                  </span>
                </div>
                <span className="text-gray-700">{currentUser?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-16">
        {children}
      </main>
    </div>
  );
}