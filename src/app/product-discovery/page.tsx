'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import DemoDashboard from '../components/DemoDashboard';
import Navigation from '../components/Navigation';

export default function ProductDiscoveryPage() {
  const [userEmail, setUserEmail] = useState('');
  const [isInsightsUnlocked, setIsInsightsUnlocked] = useState(false);
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
    
    // Check if insights are unlocked
    const hasSeenUnlock = localStorage.getItem('hasSeenInsightsUnlock');
    if (hasSeenUnlock) {
      setIsInsightsUnlocked(true);
    }
  }, [router]);

  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #f9f5eb 0%, #f5f0e0 50%, #f9f5eb 100%)'
    }}>
      <Navigation userEmail={userEmail} showInsights={isInsightsUnlocked} />
      
      {/* Header with back button */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.push('/welcome-stations')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Welcome Stations
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Product Discovery Dashboard</h1>
          <p className="text-gray-600 text-sm">Explore emotional insights and customer journey analytics</p>
        </div>
      </div>

      {/* DemoDashboard Component */}
      <DemoDashboard />
    </div>
  );
}
