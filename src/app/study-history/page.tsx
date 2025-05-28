'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Calendar, 
  Download, 
  Eye, 
  Copy, 
  Trash2, 
  Filter, 
  Search,
  MessageSquare,
  Zap,
  Heart,
  MoreVertical,
  CheckCircle,
  Clock,
  Play
} from 'lucide-react';
import Footer from '../components/Footer';

// Mock study data
const MOCK_STUDIES = {
  conversational: [
    {
      id: 'conv-001',
      title: 'Spring \'25 Pre-Launch Study',
      subtitle: 'New Product Launch / Gen Z Audience',
      startDate: '2025-03-15',
      endDate: '2025-03-22',
      status: 'completed',
      participants: 45,
      type: 'conversational'
    },
    {
      id: 'conv-002',
      title: 'Brand Perception Deep Dive',
      subtitle: 'Brand Health / Millennials 25-35',
      startDate: '2025-02-10',
      endDate: '2025-02-17',
      status: 'completed',
      participants: 38,
      type: 'conversational'
    },
    {
      id: 'conv-003',
      title: 'Customer Journey Mapping',
      subtitle: 'UX Research / All Demographics',
      startDate: '2025-05-20',
      endDate: null,
      status: 'active',
      participants: 12,
      type: 'conversational'
    }
  ],
  ptlite: [
    {
      id: 'pt-001',
      title: 'VW ID.BUZZ Campaign Test',
      subtitle: 'Creative Testing / Auto Enthusiasts',
      startDate: '2025-04-01',
      endDate: '2025-04-03',
      status: 'completed',
      participants: 52,
      type: 'ptlite'
    },
    {
      id: 'pt-002',
      title: 'Summer Campaign Concepts',
      subtitle: 'Ad Creative / Young Families',
      startDate: '2025-05-15',
      endDate: null,
      status: 'active',
      participants: 28,
      type: 'ptlite'
    }
  ],
  emotional: [
    {
      id: 'emo-001',
      title: 'Sales Call Emotion Tracking',
      subtitle: 'Sales Training / B2B Prospects',
      startDate: '2025-04-20',
      endDate: '2025-04-25',
      status: 'completed',
      participants: 24,
      type: 'emotional'
    }
  ]
};

const DASHBOARD_CONFIG = {
  conversational: {
    title: 'Conversational Study',
    icon: MessageSquare,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  ptlite: {
    title: 'PT Lite',
    icon: Zap,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200'
  },
  emotional: {
    title: 'Emotional Dashboard',
    icon: Heart,
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200'
  }
};

function StudyHistoryContent() {
  const [studies, setStudies] = useState<any[]>([]);
  const [filteredStudies, setFilteredStudies] = useState<any[]>([]);
  const [dashboardType, setDashboardType] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const type = searchParams.get('type') || 'conversational';
    setDashboardType(type);
    
    const studyData = MOCK_STUDIES[type as keyof typeof MOCK_STUDIES] || [];
    setStudies(studyData);
    setFilteredStudies(studyData);
  }, [searchParams]);

  useEffect(() => {
    let filtered = [...studies];

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(study => study.status === filterStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(study => 
        study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case 'oldest':
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredStudies(filtered);
  }, [studies, filterStatus, sortBy, searchTerm]);

  const config = DASHBOARD_CONFIG[dashboardType as keyof typeof DASHBOARD_CONFIG];
  const IconComponent = config?.icon || MessageSquare;

  const handleDeleteStudy = (studyId: string) => {
    setStudies(prev => prev.filter(study => study.id !== studyId));
    setShowDeleteModal(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </span>
        );
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Play className="w-3 h-3 mr-1" />
            Active
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Clock className="w-3 h-3 mr-1" />
            Draft
          </span>
        );
    }
  };

  if (!config) {
    return <div>Loading...</div>;
  }

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
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${config.color} flex items-center justify-center mr-4`}>
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{config.title} Studies</h1>
                <p className="text-gray-600">Manage and review your study history</p>
              </div>
            </div>
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

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search studies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Studies Grid */}
        {filteredStudies.length === 0 ? (
          <div className="text-center py-12">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${config.color} flex items-center justify-center mx-auto mb-4 opacity-50`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No studies found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first study'
              }
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`bg-gradient-to-r ${config.color} text-white py-2 px-6 rounded-lg font-medium hover:shadow-md transition-all`}
              onClick={() => {
                const routes = {
                  conversational: '/conversational-study-dashboard',
                  ptlite: '/ptlite',
                  emotional: '/emotion-dashboard'
                };
                router.push(routes[dashboardType as keyof typeof routes]);
              }}
            >
              Create New Study
            </motion.button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`${config.bgColor} ${config.borderColor} border-2 rounded-xl shadow-sm hover:shadow-md transition-all p-6`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{study.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{study.subtitle}</p>
                    {getStatusBadge(study.status)}
                  </div>
                  <div className="relative">
                    <button className="p-1 hover:bg-white rounded transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {formatDate(study.startDate)}
                      {study.endDate && ` - ${formatDate(study.endDate)}`}
                      {study.status === 'active' && ' - Ongoing'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{study.participants}</span> participants
                  </div>
                </div>

                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-white text-gray-700 py-2 px-3 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Results
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white text-gray-700 py-2 px-3 rounded-lg text-sm border border-gray-300 hover:bg-gray-50 transition-all"
                  >
                    <Copy className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white text-gray-700 py-2 px-3 rounded-lg text-sm border border-gray-300 hover:bg-gray-50 transition-all"
                  >
                    <Download className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white text-red-600 py-2 px-3 rounded-lg text-sm border border-gray-300 hover:bg-red-50 transition-all"
                    onClick={() => setShowDeleteModal(study.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Study</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this study? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteStudy(showDeleteModal)}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-all"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}

export default function StudyHistoryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StudyHistoryContent />
    </Suspense>
  );
}
