'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Heart, 
  ArrowLeft,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  PlayCircle,
  Filter,
  ChevronDown,
  Sparkles,
  BarChart3,
  MessageSquare,
  Target
} from 'lucide-react';
import Footer from '../components/Footer';

export default function WelcomeStations() {
  const [userEmail, setUserEmail] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const email = localStorage.getItem('userEmail');
    
    if (!isLoggedIn || !email) {
      router.push('/login');
      return;
    }

    setUserEmail(email);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('hasSeenInsightsUnlock');
    router.push('/login');
  };

  const stations = [
    {
      id: 'product-discovery',
      name: 'Product Discovery',
      description: 'Explore emotional insights and customer journey analytics to understand what drives your customers\' decisions.',
      status: 'active',
      startDate: '2025-05-01',
      endDate: '2025-07-15',
      participants: 1250,
      completion: 85,
      route: '/components/DemoDashboard',
      lastActivity: '1 hour ago',
      icon: BarChart3,
      color: 'blue'
    },
    {
      id: 'customer-feedback',
      name: 'Customer Feedback Hub',
      description: 'Centralized platform for collecting, analyzing, and acting on customer feedback across all touchpoints.',
      status: 'active',
      startDate: '2025-04-15',
      endDate: '2025-08-01',
      participants: 890,
      completion: 72,
      route: '/feedback-stations',
      lastActivity: '30 minutes ago',
      icon: MessageSquare,
      color: 'green'
    },
    {
      id: 'training-center',
      name: 'Training Center',
      description: 'Interactive learning modules and skill development programs designed to enhance team capabilities.',
      status: 'active',
      startDate: '2025-05-10',
      endDate: '2025-09-01',
      participants: 650,
      completion: 60,
      route: '/training-stations',
      lastActivity: '2 hours ago',
      icon: Target,
      color: 'purple'
    },
    {
      id: 'welcome-experience',
      name: 'Welcome Experience',
      description: 'Onboarding and orientation programs to help new users and team members get started effectively.',
      status: 'completed',
      startDate: '2025-03-01',
      endDate: '2025-04-30',
      participants: 420,
      completion: 100,
      route: '/welcome-experience-dashboard',
      lastActivity: '1 week ago',
      icon: Heart,
      color: 'pink'
    }
  ];

  const activeStations = stations.filter(s => s.status === 'active');
  const completedStations = stations.filter(s => s.status === 'completed');

  const getColorClasses = (color: string, isActive: boolean = false) => {
    const colors = {
      blue: isActive ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800',
      green: isActive ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800',
      purple: isActive ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-800',
      pink: isActive ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-800'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleStationClick = (station: typeof stations[0]) => {
    if (station.route === '/components/DemoDashboard') {
      // For DemoDashboard, we need to navigate to a page that renders the component
      router.push('/product-discovery');
    } else {
      router.push(station.route);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f5eb] via-[#f5f0e0] to-[#f9f5eb]">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="relative w-24 h-8">
                <Image 
                  src="/paperminds_logo_small.png" 
                  alt="Paperminds Logo" 
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
                onClick={() => router.push('/dashboard-selector')}
              >
                Home
              </button>
              <button className="flex items-center text-gray-900 hover:text-orange-600 transition-colors">
                Welcome Stations
              </button>
              <button className="flex items-center text-gray-600 hover:text-orange-600 transition-colors">
                Settings
              </button>
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">{userEmail}</span>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <button
            onClick={() => router.push('/dashboard-selector')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 helvetica-title">
                  Welcome Stations™
                </h1>
                <p className="text-gray-600">Your gateway to understanding and engagement</p>
              </div>
            </div>
            
            {/* Date Filter */}
            <div className="relative">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
                <option value="thisQuarter">This Quarter</option>
                <option value="lastQuarter">Last Quarter</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
          {/* Left Side - Active Stations */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Stations</h2>
            <div className="space-y-6">
              {activeStations.map((station, index) => {
                const IconComponent = station.icon;
                return (
                  <motion.div
                    key={station.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => handleStationClick(station)}
                  >
                    {/* Status Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getColorClasses(station.color, true)}`}>
                        <div className="flex items-center">
                          <PlayCircle className="w-3 h-3 mr-1" />
                          Active
                        </div>
                      </span>
                      <span className="text-xs text-gray-500">{station.lastActivity}</span>
                    </div>

                    {/* Station Info */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(station.color)}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{station.name}</h3>
                        <p className="text-gray-600 text-sm line-clamp-3">{station.description}</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm text-gray-500">{station.completion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            station.color === 'blue' ? 'bg-blue-500' :
                            station.color === 'green' ? 'bg-green-500' :
                            station.color === 'purple' ? 'bg-purple-500' :
                            'bg-pink-500'
                          }`}
                          style={{ width: `${station.completion}%` }}
                        />
                      </div>
                    </div>

                    {/* Station Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {station.participants} participants
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        Ends: {new Date(station.endDate).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button 
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                        station.id === 'product-discovery' 
                          ? 'bg-blue-500 hover:bg-blue-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStationClick(station);
                      }}
                    >
                      {station.id === 'product-discovery' ? 'Explore Dashboard' : 'View Station'}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Completed Stations */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Completed Stations</h2>
            <div className="space-y-6">
              {completedStations.map((station, index) => {
                const IconComponent = station.icon;
                return (
                  <motion.div
                    key={station.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => handleStationClick(station)}
                  >
                    {/* Status Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        <div className="flex items-center">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </div>
                      </span>
                      <span className="text-xs text-gray-500">{station.lastActivity}</span>
                    </div>

                    {/* Station Info */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(station.color)}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{station.name}</h3>
                        <p className="text-gray-600 text-sm line-clamp-3">{station.description}</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm text-gray-500">{station.completion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${station.completion}%` }}
                        />
                      </div>
                    </div>

                    {/* Station Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {station.participants} participants
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        Ended: {new Date(station.endDate).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button 
                      className="w-full py-2 px-4 rounded-lg font-medium transition-all bg-gray-100 hover:bg-gray-200 text-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        // For completed stations, show coming soon
                      }}
                    >
                      Coming Soon
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-white rounded-lg border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Station Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">{stations.length}</div>
              <div className="text-sm text-gray-600">Total Stations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {stations.filter(s => s.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">Active Stations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stations.reduce((sum, s) => sum + s.participants, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Participants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(stations.reduce((sum, s) => sum + s.completion, 0) / stations.length)}%
              </div>
              <div className="text-sm text-gray-600">Average Completion</div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}
