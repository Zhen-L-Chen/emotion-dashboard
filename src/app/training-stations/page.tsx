'use client';

import React from 'react';
import Link from 'next/link';

export default function TrainingStationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 py-8 sm:py-12">
      <div className="max-w-2xl mx-auto text-center w-full">
        {/* Back Button */}
        <div className="mb-6 sm:mb-8">
          <Link 
            href="/dashboard-selector" 
            className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors duration-200 text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 border border-white/20">
          {/* Icon */}
          <div className="mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <svg 
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-6">
            Coming Soon
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
            Training Stations
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
            We're developing comprehensive training modules and interactive learning experiences. 
            Our training stations will provide personalized education paths and skill development 
            programs tailored to your needs.
          </p>

          {/* Features Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
            <div className="p-4 sm:p-5 bg-green-50 rounded-xl">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Interactive Learning</h3>
              <p className="text-xs sm:text-sm text-gray-600">Hands-on training modules and simulations</p>
            </div>

            <div className="p-4 sm:p-5 bg-blue-50 rounded-xl sm:col-span-2 lg:col-span-1">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Personalized Paths</h3>
              <p className="text-xs sm:text-sm text-gray-600">AI-driven curriculum adaptation</p>
            </div>

            <div className="p-4 sm:p-5 bg-purple-50 rounded-xl sm:col-start-1 sm:col-end-3 lg:col-start-auto lg:col-end-auto">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Certification Ready</h3>
              <p className="text-xs sm:text-sm text-gray-600">Industry-recognized credentials</p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-6 sm:mb-8">
            <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
              <span>Development Progress</span>
              <span>60%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
              <div className="bg-gradient-to-r from-green-500 to-blue-600 h-2 sm:h-3 rounded-full transition-all duration-500" style={{width: '60%'}}></div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-3 sm:space-y-4">
            <p className="text-sm sm:text-base text-gray-600">
              Ready to enhance your skills?
            </p>
            <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm sm:text-base">
              Join Waitlist
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 sm:mt-8 mb-4 sm:mb-6 text-gray-500 text-xs sm:text-sm">
          Expected launch: Q3 2025
        </p>
      </div>
    </div>
  );
}
