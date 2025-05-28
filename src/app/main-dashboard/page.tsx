'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MainDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new dashboard selector
    router.push('/dashboard-selector');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f5eb] via-[#f5f0e0] to-[#f9f5eb] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
