'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  MessageSquare, 
  ArrowLeft,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  PlayCircle,
  Filter,
  ChevronDown
} from 'lucide-react';
import Footer from '../components/Footer';

export default function ConversationalStudies() {
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

  const studies = [
    {
      id: 'lait-bio',
      name: 'Lait Bio Study',
      description: 'Understanding consumer perception of organic dairy products and brand positioning in the health-conscious market segment.',
      status: 'completed',
      startDate: '2025-05-01',
      endDate: '2025-06-15',
      participants: 450,
      completion: 100,
      route: '/conversational-study-dashboard',
      lastActivity: '3 days ago'
    },
    {
      id: 'product-research',
      name: 'Product Research',
      description: 'Deep dive into customer needs and preferences for next-generation product development initiatives.',
      status: 'active',
      startDate: '2025-04-01',
      endDate: '2025-07-20',
      participants: 320,
      completion: 65,
      route: '/product-research-dashboard',
      lastActivity: '2 hours ago'
    },
    {
      id: 'market-analysis',
      name: 'Market Analysis',
      description: 'Comprehensive analysis of market trends, competitor positioning, and consumer behavior patterns.',
      status: 'active',
      startDate: '2025-05-15',
      endDate: '2025-08-01',
      participants: 280,
      completion: 45,
      route: '/market-analysis-dashboard',
      lastActivity: '1 hour ago'
    }
  ];

  const activeStudies = studies.filter(s => s.status === 'active');
  const completedStudies = studies.filter(s => s.status === 'completed');

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
                Studies
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
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 helvetica-title">
                  Conversational Studies™
                </h1>
                <p className="text-gray-600">Understand what really matters to consumers</p>
              </div>
            </div>
            
            {/* Date Filter */}
            <div className="relative">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          {/* Left Side - Ongoing Studies */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ongoing Studies</h2>
            <div className="space-y-6">
              {activeStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                >
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <div className="flex items-center">
                        <PlayCircle className="w-3 h-3 mr-1" />
                        Active
                      </div>
                    </span>
                    <span className="text-xs text-gray-500">{study.lastActivity}</span>
                  </div>

                  {/* Study Info */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{study.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{study.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm text-gray-500">{study.completion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${study.completion}%` }}
                      />
                    </div>
                  </div>

                  {/* Study Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {study.participants} participants
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      Ends: {new Date(study.endDate).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    className="w-full py-2 px-4 rounded-lg font-medium transition-all bg-gray-100 hover:bg-gray-200 text-gray-700"
                  >
                    Coming Soon
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side - Completed Studies */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Completed Studies</h2>
            <div className="space-y-6">
              {completedStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    if (study.route === '/conversational-study-dashboard') {
                      router.push(study.route);
                    }
                  }}
                >
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      <div className="flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </div>
                    </span>
                    <span className="text-xs text-gray-500">{study.lastActivity}</span>
                  </div>

                  {/* Study Info */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{study.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{study.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm text-gray-500">{study.completion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${study.completion}%` }}
                      />
                    </div>
                  </div>

                  {/* Study Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {study.participants} participants
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      Ended: {new Date(study.endDate).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    className="w-full py-2 px-4 rounded-lg font-medium transition-all bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (study.route === '/conversational-study-dashboard') {
                        router.push(study.route);
                      }
                    }}
                  >
                    View Dashboard
                  </button>
                </motion.div>
              ))}
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{studies.length}</div>
              <div className="text-sm text-gray-600">Total Studies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {studies.filter(s => s.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">Active Studies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {studies.reduce((sum, s) => sum + s.participants, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Participants</div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}
