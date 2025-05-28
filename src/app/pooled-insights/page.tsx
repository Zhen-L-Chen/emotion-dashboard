'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  ArrowLeft, 
  TrendingUp, 
  Download, 
  Filter,
  Heart,
  MessageSquare,
  Users,
  BarChart3,
  Zap,
  Calendar,
  Info
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import Footer from '../components/Footer';

// Mock aggregated data across all studies
const POOLED_DATA = {
  topEmotions: [
    { emotion: 'Joy', frequency: 342, percentage: 28.5, color: '#22c55e' },
    { emotion: 'Trust', frequency: 298, percentage: 24.8, color: '#3b82f6' },
    { emotion: 'Excitement', frequency: 256, percentage: 21.3, color: '#f59e0b' },
    { emotion: 'Curiosity', frequency: 189, percentage: 15.7, color: '#8b5cf6' },
    { emotion: 'Frustration', frequency: 87, percentage: 7.2, color: '#ef4444' },
    { emotion: 'Confusion', frequency: 30, percentage: 2.5, color: '#6b7280' }
  ],
  
  behavioralPatterns: [
    { pattern: 'Early Engagement Drop', studies: 8, impact: 'High', description: 'Users lose interest within first 30 seconds' },
    { pattern: 'Emotional Peak at 45s', studies: 12, impact: 'Medium', description: 'Consistent emotional high point across content' },
    { pattern: 'Trust Building Phase', studies: 15, impact: 'High', description: 'Trust increases significantly after initial skepticism' },
    { pattern: 'Call-to-Action Hesitation', studies: 6, impact: 'Medium', description: 'Pause before taking action, regardless of content type' }
  ],

  messageResonance: [
    { message: 'Authenticity & Transparency', score: 8.7, studies: 18, trend: 'up' },
    { message: 'Environmental Responsibility', score: 8.4, studies: 12, trend: 'up' },
    { message: 'Family Values', score: 8.1, studies: 15, trend: 'stable' },
    { message: 'Innovation & Technology', score: 7.8, studies: 20, trend: 'up' },
    { message: 'Nostalgia & Heritage', score: 7.5, studies: 9, trend: 'down' },
    { message: 'Luxury & Status', score: 6.9, studies: 7, trend: 'down' }
  ],

  performanceComparison: [
    { metric: 'Emotional Resonance', ptlite: 8.2, conversational: 7.8, emotional: 8.9 },
    { metric: 'Message Clarity', ptlite: 7.6, conversational: 8.4, emotional: 7.1 },
    { metric: 'Brand Attribution', ptlite: 9.1, conversational: 8.7, emotional: 8.3 },
    { metric: 'Memorability', ptlite: 8.0, conversational: 7.5, emotional: 8.6 },
    { metric: 'Purchase Intent', ptlite: 6.8, conversational: 7.2, emotional: 7.9 }
  ],

  timelineData: [
    { month: 'Jan', studies: 2, avgScore: 7.2, participants: 89 },
    { month: 'Feb', studies: 3, avgScore: 7.6, participants: 142 },
    { month: 'Mar', studies: 4, avgScore: 8.1, participants: 198 },
    { month: 'Apr', studies: 6, avgScore: 8.3, participants: 267 },
    { month: 'May', studies: 3, avgScore: 8.0, participants: 156 }
  ]
};

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#6b7280'];

export default function PooledInsightsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [selectedStudyTypes, setSelectedStudyTypes] = useState(['all']);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in and has access to insights
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
  }, [router]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f5eb] via-[#f5f0e0] to-[#f9f5eb]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/dashboard-selector')}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center mr-4">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Pooled Insights</h1>
                <p className="text-gray-600">Cross-study analytics and market-wide patterns</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </button>
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
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center">
              <Filter className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Timeframe</label>
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="3months">Last 3 Months</option>
                  <option value="6months">Last 6 Months</option>
                  <option value="1year">Last Year</option>
                  <option value="all">All Time</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Study Types</label>
                <select
                  value={selectedStudyTypes[0]}
                  onChange={(e) => setSelectedStudyTypes([e.target.value])}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="ptlite">PT Lite Only</option>
                  <option value="conversational">Conversational Only</option>
                  <option value="emotional">Emotional Only</option>
                </select>
              </div>
            </div>

            <div className="ml-auto bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center">
              <Info className="w-4 h-4 text-emerald-600 mr-2" />
              <div className="text-xs text-emerald-700">
                <div className="font-medium">Data from 18 studies</div>
                <div>542 total participants</div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <Heart className="w-8 h-8 text-rose-500" />
              <span className="text-2xl font-bold text-gray-900">8.3</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Avg Emotional Score</h3>
            <p className="text-xs text-green-600 mt-1">↑ 12% vs last period</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-gray-900">542</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Total Participants</h3>
            <p className="text-xs text-green-600 mt-1">↑ 28% vs last period</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-8 h-8 text-emerald-500" />
              <span className="text-2xl font-bold text-gray-900">18</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Studies Completed</h3>
            <p className="text-xs text-green-600 mt-1">↑ 5 this quarter</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-amber-500" />
              <span className="text-2xl font-bold text-gray-900">94%</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Positive Sentiment</h3>
            <p className="text-xs text-green-600 mt-1">↑ 3% vs last period</p>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Recurring Emotions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Top Recurring Emotions</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={POOLED_DATA.topEmotions}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ emotion, percentage }) => `${emotion}: ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="frequency"
                    nameKey="emotion"
                  >
                    {POOLED_DATA.topEmotions.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Performance Comparison */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Performance by Study Type</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={POOLED_DATA.performanceComparison}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fontSize: 10 }} />
                  <Radar name="PT Lite" dataKey="ptlite" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
                  <Radar name="Conversational" dataKey="conversational" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                  <Radar name="Emotional" dataKey="emotional" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Message Resonance Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Message Resonance Heatmap</h3>
          <div className="space-y-4">
            {POOLED_DATA.messageResonance.map((message, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{message.message}</h4>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(message.trend)}
                      <span className="text-lg font-bold text-gray-900">{message.score}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(message.score / 10) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600">{message.studies} studies • Trend: {message.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Behavioral Patterns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Behavioral Patterns</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {POOLED_DATA.behavioralPatterns.map((pattern, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{pattern.pattern}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(pattern.impact)}`}>
                    {pattern.impact}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{pattern.description}</p>
                <p className="text-xs text-gray-500">Observed in {pattern.studies} studies</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Study Performance Over Time</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={POOLED_DATA.timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="studies" fill="#3b82f6" name="Studies" />
                <Line yAxisId="right" type="monotone" dataKey="avgScore" stroke="#22c55e" strokeWidth={3} name="Avg Score" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Export Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-6 text-center"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-2">Export Your Insights</h3>
          <p className="text-gray-600 mb-6">Download comprehensive reports in multiple formats</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all">
              Download PDF Report
            </button>
            <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all">
              Export CSV Data
            </button>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all">
              Generate Executive Summary
            </button>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}
