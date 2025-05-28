'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PTLiteRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Set localStorage items for testing
    if (typeof window !== 'undefined') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', 'zhen@paperminds.ai');
    }
    
    router.replace('/ptlite');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f9f5eb] via-[#f5f0e0] to-[#f9f5eb]">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Redirecting...</h1>
        <p className="text-gray-600">Please wait while we redirect you to the PT Lite page.</p>
      </div>
    </div>
  );
}
