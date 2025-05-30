'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Zap, 
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

export default function PTLite() {
  const [userEmail, setUserEmail] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const router = useRouter();

  useEffect(() => {
    // For testing purposes, we'll bypass the login check
    // and set a default email
    setUserEmail('zhen@paperminds.ai');
    
    // Uncomment the code below to enable login check
    /*
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const email = localStorage.getItem('userEmail');
    
    if (!isLoggedIn || !email) {
      router.push('/login');
      return;
    }

    setUserEmail(email);
    */
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('hasSeenInsightsUnlock');
    router.push('/login');
  };

  const studies = [
    {
      id: 'volkswagen-campaign',
      name: 'Volkswagen Campaign',
      description: 'Pre-test of the new Volkswagen ID.BUZZ electric vehicle campaign targeting eco-conscious families and nostalgic millennials.',
      status: 'active',
      startDate: '2025-05-10',
      endDate: '2025-06-10',
      participants: 350,
      completion: 75,
      route: '/ptlite-dashboard',
      lastActivity: '1 hour ago'
    },
    {
      id: 'creative-validation',
      name: 'Creative Validation',
      description: 'Validation testing for new creative concepts across multiple product categories to determine market readiness.',
      status: 'completed',
      startDate: '2025-04-15',
      endDate: '2025-05-25',
      participants: 280,
      completion: 100,
      route: '/ptlite-dashboard',
      lastActivity: '5 days ago'
    },
    {
      id: 'summer-campaign',
      name: 'Summer Campaign',
      description: 'Testing of summer promotional materials for effectiveness, emotional resonance, and brand alignment before launch.',
      status: 'active',
      startDate: '2025-05-20',
      endDate: '2025-06-20',
      participants: 210,
      completion: 40,
      route: '/ptlite-dashboard',
      lastActivity: '3 hours ago'
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
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 helvetica-title">
                  PT Lite™
                </h1>
                <p className="text-gray-600">Quick creative testing insights</p>
              </div>
            </div>
            
            {/* Date Filter */}
            <div className="relative">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ongoing Tests</h2>
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
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
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
                        className="bg-amber-500 h-2 rounded-full transition-all duration-300"
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Completed Tests</h2>
            <div className="space-y-6">
              {completedStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    if (study.route === '/ptlite-dashboard') {
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
                    className="w-full py-2 px-4 rounded-lg font-medium transition-all bg-amber-500 hover:bg-amber-600 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (study.route === '/ptlite-dashboard') {
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{studies.length}</div>
              <div className="text-sm text-gray-600">Total Tests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {studies.filter(s => s.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">Active Tests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {studies.reduce((sum, s) => sum + s.participants, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Participants</div>
            </div>
          </div>
        </motion.div>

        {/* Feature Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200 p-6"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/2">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Creative Testing</h3>
              <p className="text-gray-700 mb-4">
                PT Lite™ provides rapid insights into creative effectiveness across seven key dimensions:
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  Message Context
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                  Clarity & Comprehension
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Emotional Resonance
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Relevance & Identification
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Memorability & Distinctiveness
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                  Brand Attribution & Fit
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  Improvement
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-xs h-48 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/volks.png"
                  alt="PT Lite Example"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <div className="text-xs font-medium">Example Test</div>
                    <div className="text-sm font-bold">Volkswagen ID.BUZZ Campaign</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}
