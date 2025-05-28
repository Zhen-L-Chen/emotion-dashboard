'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  MessageSquare, 
  Brain, 
  Heart, 
  BarChart3, 
  Settings, 
  LogOut, 
  Home,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import Footer from '../components/Footer';

// Mock data for study counts
const STUDY_COUNTS = {
  conversational: 3,
  ptlite: 2,
  emotional: 1
};

const TOTAL_STUDIES = Object.values(STUDY_COUNTS).reduce((sum, count) => sum + count, 0);
const INSIGHTS_UNLOCK_THRESHOLD = 5;

export default function DashboardSelector() {
  const [userEmail, setUserEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isInsightsUnlocked, setIsInsightsUnlocked] = useState(false);
  const [showUnlockBanner, setShowUnlockBanner] = useState(false);
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
    
    // Extract first name from email and capitalize it
    const emailParts = email.split('@')[0];
    const firstNameFromEmail = emailParts.split('.')[0]; // Handle emails like first.last@domain.com
    const capitalizedFirstName = firstNameFromEmail.charAt(0).toUpperCase() + firstNameFromEmail.slice(1).toLowerCase();
    setFirstName(capitalizedFirstName);

    // Check if insights should be unlocked
    if (TOTAL_STUDIES >= INSIGHTS_UNLOCK_THRESHOLD) {
      setIsInsightsUnlocked(true);
      
      // Show unlock banner if this is the first time reaching threshold
      const hasSeenUnlock = localStorage.getItem('hasSeenInsightsUnlock');
      if (!hasSeenUnlock) {
        setShowUnlockBanner(true);
        localStorage.setItem('hasSeenInsightsUnlock', 'true');
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('hasSeenInsightsUnlock');
    router.push('/login');
  };

  // Time-bound products (left side)
  const timeBoundProducts = [
    {
      id: 'conversational',
      title: 'Conversational Studies™',
      description: 'Understand what really matters to consumers',
      icon: MessageSquare,
      studyCount: STUDY_COUNTS.conversational,
      route: '/conversational-studies',
      subCards: [
        { name: 'Lait Bio Study', status: 'active', endDate: '2025-06-15' },
        { name: 'Product Research', status: 'completed', endDate: '2025-05-20' },
        { name: 'Market Analysis', status: 'active', endDate: '2025-07-01' }
      ]
    },
    {
      id: 'ptlite',
      title: 'PT Lite™',
      description: 'Quick creative testing insights',
      icon: Zap,
      studyCount: STUDY_COUNTS.ptlite,
      route: '/pt-lite',
      subCards: [
        { name: 'Volkswagen Campaign', status: 'active', endDate: '2025-06-10' },
        { name: 'Creative Validation', status: 'completed', endDate: '2025-05-25' }
      ]
    }
  ];

  // Ongoing stations (right side)
  const ongoingStations = [
    {
      id: 'welcome',
      title: 'Welcome Stations™',
      description: 'Guide users\' decisions and spark engagement.',
      icon: Home,
      route: '/welcome-stations',
      subCards: [
        { name: 'Onboarding Flow', status: 'running', participants: 1250 },
        { name: 'Product Discovery', status: 'running', participants: 890 },
        { name: 'User Journey', status: 'paused', participants: 0 }
      ]
    },
    {
      id: 'feedback',
      title: 'Feedback Stations™',
      description: 'Capture what moves customers or employees',
      icon: Heart,
      route: '/feedback-stations',
      subCards: [
        { name: 'Customer Satisfaction', status: 'running', participants: 2100 },
        { name: 'Employee Pulse', status: 'running', participants: 450 },
        { name: 'Product Feedback', status: 'running', participants: 780 }
      ]
    },
    {
      id: 'training',
      title: 'Training Stations™',
      description: 'Train minds and spark action one meaningful conversation at a time',
      icon: Brain,
      route: '/training-stations',
      subCards: [
        { name: 'Sales Training', status: 'running', participants: 320 },
        { name: 'Leadership Development', status: 'running', participants: 150 },
        { name: 'Product Knowledge', status: 'running', participants: 680 }
      ]
    }
  ];

  const progressPercentage = Math.min((TOTAL_STUDIES / INSIGHTS_UNLOCK_THRESHOLD) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f5eb] via-[#f5f0e0] to-[#f9f5eb]">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div 
                className="relative w-20 h-6 sm:w-24 sm:h-8 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => router.push('/')}
              >
                <Image 
                  src="/paperminds_logo_small.png" 
                  alt="Paperminds Logo" 
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </div>

            {/* Navigation Links - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-8">
              <button className="flex items-center text-gray-900 hover:text-orange-600 transition-colors">
                Home
              </button>
              <button className="flex items-center text-gray-600 hover:text-orange-600 transition-colors">
                Studies
              </button>
              {isInsightsUnlocked && (
                <button 
                  className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
                  onClick={() => router.push('/pooled-insights')}
                >
                  Insights
                </button>
              )}
              <button className="flex items-center text-gray-600 hover:text-orange-600 transition-colors">
                Settings
              </button>
            </div>

            {/* User Info & Logout - Responsive */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-xs sm:text-sm text-gray-700 hidden sm:inline truncate max-w-32 md:max-w-none">{userEmail}</span>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors p-2 sm:p-1"
                title="Logout"
              >
                <LogOut className="w-4 h-4 sm:mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Unlock Banner */}
      {showUnlockBanner && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-sm sm:text-base">🎉 You've unlocked pooled insights from your data lake!</h3>
                <p className="text-xs sm:text-sm opacity-90">Access cross-study analytics and market-wide patterns</p>
              </div>
            </div>
            <button
              onClick={() => setShowUnlockBanner(false)}
              className="text-white hover:text-gray-200 transition-colors self-end sm:self-auto p-1"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8 sm:mb-12 relative overflow-hidden px-4">
          {/* Decorative elements - Hidden on mobile for cleaner look */}
          <motion.div 
            className="absolute w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-orange-200 to-amber-100 opacity-70 -z-10 hidden sm:block"
            style={{ top: '-10px', left: '15%' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          />
          <motion.div 
            className="absolute w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-blue-100 to-teal-100 opacity-70 -z-10 hidden sm:block"
            style={{ bottom: '-15px', right: '20%' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          />
          
          {/* Welcome text with staggered animation */}
          <div className="relative">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-4 inline-block" style={{ fontFamily: 'var(--font-serif)' }}>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                Welcome
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-block"
              >
                back
              </motion.span>
              {firstName && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: 0.3,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="inline-block ml-1"
                >
                  <motion.span 
                    initial={{ color: "#1f2937" }}
                    animate={{ 
                      color: ["#1f2937", "#f97316", "#1f2937"],
                    }}
                    transition={{ 
                      duration: 2.5, 
                      delay: 1,
                      repeat: 0,
                      ease: "easeInOut"
                    }}
                    className="font-light"
                  >
                    , {firstName}
                  </motion.span>
                </motion.span>
              )}
              <motion.span
                initial={{ opacity: 0, y: -20, rotate: -10 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="inline-block"
              >
                !
              </motion.span>
            </h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2"
          >
            Choose your dashboard to explore insights, run studies, or analyze emotional responses.
          </motion.p>
          
          {/* Subtle underline animation */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "120px", opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="h-1 bg-gradient-to-r from-orange-400 to-amber-300 rounded-full mx-auto mt-4"
          />
        </div>

        {/* Progress to Insights Unlock */}
        {!isInsightsUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Progress to Pooled Insights</h3>
              <span className="text-xs sm:text-sm text-gray-600">{TOTAL_STUDIES}/{INSIGHTS_UNLOCK_THRESHOLD} studies completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full"
              />
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              Complete {INSIGHTS_UNLOCK_THRESHOLD - TOTAL_STUDIES} more studies to unlock cross-study analytics and market-wide patterns.
            </p>
          </motion.div>
        )}

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-6 sm:mb-8">
          {/* Left Side - Time-bound Products */}
          <div>
            <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-4 sm:mb-6">Studies</h2>
            <div className="space-y-6">
              {timeBoundProducts.map((product, index) => {
                const IconComponent = product.icon;
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.15 * index,
                      type: "spring",
                      stiffness: 120,
                      damping: 20
                    }}
                    whileHover={{ 
                      y: -6,
                      boxShadow: "0 16px 32px rgba(0,0,0,0.12)",
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-xl font-bold text-gray-900 mb-1 ${product.title.includes('Conversational Studies™') || product.title.includes('PT Lite™') ? 'helvetica-title' : ''}`}>{product.title}</h3>
                        <p className="text-gray-600 text-sm">{product.description}</p>
                      </div>
                    </div>
                    
                    {/* Sub-cards */}
                    <div className="space-y-3 mb-4">
                      {product.subCards.map((subCard, subIndex) => (
                        <div key={subIndex} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{subCard.name}</p>
                            <p className="text-xs text-gray-500">Ends: {subCard.endDate}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            subCard.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {subCard.status}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <button
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-all border border-gray-300"
                      onClick={() => router.push(product.route)}
                    >
                      View
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Ongoing Stations */}
          <div>
            <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-4 sm:mb-6">Ongoing Stations</h2>
            <div className="space-y-6">
              {ongoingStations.map((station, index) => {
                const IconComponent = station.icon;
                return (
                  <motion.div
                    key={station.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.15 * index + 0.1,
                      type: "spring",
                      stiffness: 120,
                      damping: 20
                    }}
                    whileHover={{ 
                      y: -6,
                      boxShadow: "0 16px 32px rgba(0,0,0,0.12)",
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-xl font-bold text-gray-900 mb-1 ${station.title.includes('Welcome Stations™') || station.title.includes('Feedback Stations™') || station.title.includes('Training Stations™') ? 'helvetica-title' : ''}`}>{station.title}</h3>
                        <p className="text-gray-600 text-sm">{station.description}</p>
                      </div>
                    </div>
                    
                    {/* Sub-cards */}
                    <div className="space-y-3 mb-4">
                      {station.subCards.map((subCard, subIndex) => (
                        <div key={subIndex} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{subCard.name}</p>
                            <p className="text-xs text-gray-500">
                              {subCard.status === 'running' ? `${subCard.participants} participants` : 'Paused'}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            subCard.status === 'running' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {subCard.status}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <button
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-all border border-gray-300"
                      onClick={() => router.push(station.route)}
                    >
                      View
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pooled Insights Card (if unlocked) */}
        {isInsightsUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl shadow-lg p-6 sm:p-8 text-center"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Pooled Insights</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-2xl mx-auto px-2">
              Explore aggregated insights across all your studies. Discover recurring emotions, behavioral patterns, and market-wide trends.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2 px-6 sm:py-3 sm:px-8 rounded-lg font-medium hover:shadow-md transition-all text-sm sm:text-base"
              onClick={() => router.push('/pooled-insights')}
            >
              → Explore Insights
            </motion.button>
          </motion.div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
