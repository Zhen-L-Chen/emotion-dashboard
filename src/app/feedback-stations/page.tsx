'use client';

import React from 'react';
import Link from 'next/link';

export default function FeedbackStationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 py-8 sm:py-12">
      <div className="max-w-2xl mx-auto text-center w-full">
        {/* Back Button */}
        <div className="mb-6 sm:mb-8">
          <Link 
            href="/dashboard-selector" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm sm:text-base"
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
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6">
            Coming Soon
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
            Feedback Stations
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
            We're building something amazing for collecting and analyzing feedback. 
            Our new feedback stations will revolutionize how you gather insights 
            and understand your audience.
          </p>

          {/* Features Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
            <div className="p-4 sm:p-5 bg-blue-50 rounded-xl">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Real-time Collection</h3>
              <p className="text-xs sm:text-sm text-gray-600">Instant feedback capture and processing</p>
            </div>

            <div className="p-4 sm:p-5 bg-purple-50 rounded-xl sm:col-span-2 lg:col-span-1">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Smart Analytics</h3>
              <p className="text-xs sm:text-sm text-gray-600">AI-powered insights and trends</p>
            </div>

            <div className="p-4 sm:p-5 bg-green-50 rounded-xl sm:col-start-1 sm:col-end-3 lg:col-start-auto lg:col-end-auto">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Secure & Private</h3>
              <p className="text-xs sm:text-sm text-gray-600">Enterprise-grade security</p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-6 sm:mb-8">
            <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
              <span>Development Progress</span>
              <span>75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 sm:h-3 rounded-full transition-all duration-500" style={{width: '75%'}}></div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-3 sm:space-y-4">
            <p className="text-sm sm:text-base text-gray-600">
              Want to be notified when we launch?
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm sm:text-base">
              Get Notified
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 sm:mt-8 mb-4 sm:mb-6 text-gray-500 text-xs sm:text-sm">
          Expected launch: Q2 2025
        </p>
      </div>
    </div>
  );
}
