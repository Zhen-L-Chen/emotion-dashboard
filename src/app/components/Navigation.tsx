'use client';

import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  Home, 
  BarChart3, 
  TrendingUp, 
  Settings, 
  LogOut,
  User
} from 'lucide-react';

interface NavigationProps {
  userEmail?: string;
  showInsights?: boolean;
}

export default function Navigation({ userEmail, showInsights = false }: NavigationProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('hasSeenInsightsUnlock');
    router.push('/login');
  };

  const navItems = [
    {
      name: 'Home',
      icon: Home,
      path: '/dashboard-selector',
      active: pathname === '/dashboard-selector'
    },
    {
      name: 'Studies',
      icon: BarChart3,
      path: '/study-history',
      active: pathname.startsWith('/study-history')
    },
    ...(showInsights ? [{
      name: 'Insights',
      icon: TrendingUp,
      path: '/pooled-insights',
      active: pathname === '/pooled-insights'
    }] : []),
    {
      name: 'Settings',
      icon: Settings,
      path: '/settings',
      active: pathname === '/settings'
    }
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation Links */}
          <div className="flex items-center space-x-8">
            <button
              onClick={() => router.push('/dashboard-selector')}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <div className="relative w-24 h-8">
                <Image 
                  src="/paperminds_logo_small.png" 
                  alt="Paperminds Logo" 
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </button>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.name === 'Studies') {
                      router.push('/study-history');
                    } else {
                      router.push(item.path);
                    }
                  }}
                  className={`flex items-center transition-colors ${
                    item.active 
                      ? 'text-orange-600 font-medium' 
                      : 'text-gray-600 hover:text-orange-600'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
            </div>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center space-x-4">
            {userEmail && (
              <div className="hidden sm:flex items-center text-sm text-gray-700">
                <User className="w-4 h-4 mr-2" />
                {userEmail}
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200 py-2">
          <div className="flex justify-around">
            {navItems.map((item) => {
              return (
                <button
                  key={item.name}
                  onClick={() => router.push(item.path)}
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                    item.active 
                      ? 'text-orange-600 bg-orange-50' 
                      : 'text-gray-600 hover:text-orange-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xs">{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
