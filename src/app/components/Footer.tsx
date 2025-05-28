'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white border-t border-gray-200 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          {/* Copyright - Left aligned */}
          <div className="text-sm text-gray-500">
            © 2025 Paperminds
          </div>
          
          {/* Links - Right aligned */}
          <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-600">
            <button 
              className="hover:text-orange-600 transition-colors"
              onClick={() => {/* Mock confidentiality modal */}}
            >
              Confidentiality
            </button>
            <span className="text-gray-300">|</span>
            <button 
              className="hover:text-orange-600 transition-colors"
              onClick={() => {/* Mock terms modal */}}
            >
              Terms of Use
            </button>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
