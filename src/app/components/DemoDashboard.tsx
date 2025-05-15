"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Clock, Phone } from "lucide-react";
import Image from "next/image";
import EmotionalJourneyMap from "./EmotionalJourneyMap";

import { leadData } from "../data/leadData"; // Import leadData from shared data file

// Helper function to get satisfaction level based on NPS and emotion score
const getSatisfactionLevel = (nps: number, score: number): "Satisfied" | "Neutral" | "To Improve" => {
  if (nps >= 8 || score >= 80) return "Satisfied";
  if (nps >= 5 || score >= 50) return "Neutral";
  return "To Improve";
};

// Updated emotion timelines to include all Ekman emotions for all leads with verbatims for emotions above 50
const emotionTimelines: Record<string, Array<{time: string; Joy: number; Trust: number; Fear: number; Anger: number; Sadness: number; Disgust: number; Surprise: number; verbatims?: Record<string, string[]>}>> = {
  // Sarah M - Trust
  "482": [
    { 
      time: "Start", 
      Joy: 0.1, 
      Trust: 0.3, 
      Fear: 0.0, 
      Anger: 0.0, 
      Sadness: 0.0, 
      Disgust: 0.0, 
      Surprise: 0.2 
    },
    { 
      time: "Middle", 
      Joy: 0.4, 
      Trust: 0.6, 
      Fear: 0.0, 
      Anger: 0.0, 
      Sadness: 0.0, 
      Disgust: 0.0, 
      Surprise: 0.1,
      verbatims: {
        "Trust": ["I'm starting to see the value in your security approach.", "The transparency in your process is building my confidence."]
      }
    },
    { 
      time: "Objection", 
      Joy: 0.2, 
      Trust: 0.2, 
      Fear: 0.2, 
      Anger: 0.1, 
      Sadness: 0.0, 
      Disgust: 0.0, 
      Surprise: 0.0 
    },
    { 
      time: "Close", 
      Joy: 0.6, 
      Trust: 0.8, 
      Fear: 0.0, 
      Anger: 0.0, 
      Sadness: 0.0, 
      Disgust: 0.0, 
      Surprise: 0.3,
      verbatims: {
        "Trust": ["I feel completely secure with your company handling my data.", "Your security measures are impressive and reassuring."],
        "Joy": ["I'm happy we found a solution that works so well for our needs."]
      }
    },
  ],
  // Ali R - Joy
  "391": [
    { 
      time: "Start", 
      Joy: 0.3, 
      Trust: 0.2, 
      Fear: 0.0, 
      Anger: 0.0, 
      Sadness: 0.0, 
      Disgust: 0.0, 
      Surprise: 0.4 
    },
    { 
      time: "Middle", 
      Joy: 0.5, 
      Trust: 0.4, 
      Fear: 0.0, 
      Anger: 0.0, 
      Sadness: 0.0, 
      Disgust: 0.0, 
      Surprise: 0.2,
      verbatims: {
        "Joy": ["I'm really enjoying how intuitive this is!", "This makes my daily tasks so much more pleasant."]
      }
    },
    { 
      time: "Objection", 
      Joy: 0.4, 
      Trust: 0.3, 
      Fear: 0.1, 
      Anger: 0.0, 
      Sadness: 0.0, 
      Disgust: 0.0, 
      Surprise: 0.0 
    },
    { 
      time: "Close", 
      Joy: 0.7, 
      Trust: 0.5, 
      Fear: 0.0, 
      Anger: 0.0, 
      Sadness: 0.0, 
      Disgust: 0.0, 
      Surprise: 0.1,
      verbatims: {
        "Joy": ["I'm absolutely thrilled with the final solution!", "Using this product brings me joy every day."],
        "Trust": ["I feel confident in the reliability of your service."]
      }
    },
  ],
  // David C - Fear
  "177": [
    { time: "Start", Joy: 0.1, Trust: 0.1, Fear: 0.2, Anger: 0.0, Sadness: 0.0, Disgust: 0.0, Surprise: 0.0 },
    { time: "Middle", Joy: 0.0, Trust: 0.0, Fear: 0.4, Anger: 0.1, Sadness: 0.2, Disgust: 0.0, Surprise: 0.0 },
    { time: "Objection", Joy: 0.0, Trust: 0.0, Fear: 0.6, Anger: 0.2, Sadness: 0.1, Disgust: 0.0, Surprise: 0.0 },
    { time: "Close", Joy: 0.0, Trust: 0.0, Fear: 0.5, Anger: 0.1, Sadness: 0.2, Disgust: 0.0, Surprise: 0.0 },
  ],
  // Emily K - Sadness
  "294": [
    { time: "Start", Joy: 0.1, Trust: 0.2, Fear: 0.0, Anger: 0.0, Sadness: 0.3, Disgust: 0.0, Surprise: 0.0 },
    { time: "Middle", Joy: 0.0, Trust: 0.1, Fear: 0.1, Anger: 0.0, Sadness: 0.5, Disgust: 0.0, Surprise: 0.0 },
    { time: "Objection", Joy: 0.0, Trust: 0.0, Fear: 0.2, Anger: 0.1, Sadness: 0.6, Disgust: 0.0, Surprise: 0.0 },
    { time: "Close", Joy: 0.0, Trust: 0.3, Fear: 0.0, Anger: 0.0, Sadness: 0.4, Disgust: 0.0, Surprise: 0.0 },
  ],
  // Michael P - Joy
  "513": [
    { time: "Start", Joy: 0.4, Trust: 0.3, Fear: 0.0, Anger: 0.0, Sadness: 0.0, Disgust: 0.0, Surprise: 0.1 },
    { time: "Middle", Joy: 0.6, Trust: 0.2, Fear: 0.0, Anger: 0.0, Sadness: 0.0, Disgust: 0.0, Surprise: 0.0 },
    { time: "Objection", Joy: 0.5, Trust: 0.3, Fear: 0.1, Anger: 0.0, Sadness: 0.0, Disgust: 0.0, Surprise: 0.0 },
    { time: "Close", Joy: 0.8, Trust: 0.4, Fear: 0.0, Anger: 0.0, Sadness: 0.0, Disgust: 0.0, Surprise: 0.2 },
  ],
  // Jessica T - Disgust
  "629": [
    { time: "Start", Joy: 0.0, Trust: 0.1, Fear: 0.0, Anger: 0.0, Sadness: 0.0, Disgust: 0.2, Surprise: 0.0 },
    { time: "Middle", Joy: 0.0, Trust: 0.0, Fear: 0.0, Anger: 0.1, Sadness: 0.0, Disgust: 0.4, Surprise: 0.0 },
    { time: "Objection", Joy: 0.0, Trust: 0.0, Fear: 0.0, Anger: 0.2, Sadness: 0.0, Disgust: 0.6, Surprise: 0.0 },
    { time: "Close", Joy: 0.0, Trust: 0.0, Fear: 0.0, Anger: 0.1, Sadness: 0.1, Disgust: 0.5, Surprise: 0.0 },
  ],
  // Robert L - Anger
  "735": [
    { 
      time: "Start", 
      Joy: 0.0, 
      Trust: 0.0, 
      Fear: 0.0, 
      Anger: 0.3, 
      Sadness: 0.0, 
      Disgust: 0.1, 
      Surprise: 0.0 
    },
    { 
      time: "Middle", 
      Joy: 0.0, 
      Trust: 0.0, 
      Fear: 0.0, 
      Anger: 0.5, 
      Sadness: 0.0, 
      Disgust: 0.2, 
      Surprise: 0.0,
      verbatims: {
        "Anger": ["This is getting frustrating. I've asked for help multiple times.", "I'm irritated by the lack of clear communication."]
      }
    },
    { 
      time: "Objection", 
      Joy: 0.0, 
      Trust: 0.0, 
      Fear: 0.1, 
      Anger: 0.7, 
      Sadness: 0.0, 
      Disgust: 0.1, 
      Surprise: 0.0,
      verbatims: {
        "Anger": ["I'm furious about being charged without warning!", "This is completely unacceptable and disrespectful."]
      }
    },
    { 
      time: "Close", 
      Joy: 0.0, 
      Trust: 0.0, 
      Fear: 0.0, 
      Anger: 0.6, 
      Sadness: 0.0, 
      Disgust: 0.0, 
      Surprise: 0.0,
      verbatims: {
        "Anger": ["I'm still angry about how this situation was handled.", "The lack of accountability is infuriating."]
      }
    },
  ],
  // Sophia W - Surprise
  "846": [
    { 
      time: "Start", 
      Joy: 0.1, 
      Trust: 0.1, 
      Fear: 0.0, 
      Anger: 0.0, 
      Sadness: 0.0, 
      Disgust: 0.0, 
      Surprise: 0.5,
      verbatims: {
        "Surprise": ["Wow, I wasn't expecting such a comprehensive solution!", "This is much more advanced than I anticipated."]
      }
    },
    { 
      time: "Middle", 
      Joy: 0.3, 
      Trust: 0.2, 
      Fear: 0.0, 
      Anger: 0.0, 
      Sadness: 0.0, 
      Disgust: 0.0, 
      Surprise: 0.7,
      verbatims: {
        "Surprise": ["I'm completely blown away by the capabilities!", "I had no idea this was even possible."]
      }
    },
    { 
      time: "Objection", 
      Joy: 0.5, 
      Trust: 0.3, 
      Fear: 0.0, 
      Anger: 0.0, 
      Sadness: 0.0, 
      Disgust: 0.0, 
      Surprise: 0.4 
    },
    { 
      time: "Close", 
      Joy: 0.7, 
      Trust: 0.4, 
      Fear: 0.0, 
      Anger: 0.0, 
      Sadness: 0.0, 
      Disgust: 0.0, 
      Surprise: 0.2,
      verbatims: {
        "Joy": ["I'm delighted with the final solution!", "This has exceeded my expectations in every way."]
      }
    },
  ],
  // Daniel H - Fear
  "957": [
    { time: "Start", Joy: 0.0, Trust: 0.0, Fear: 0.3, Anger: 0.0, Sadness: 0.1, Disgust: 0.0, Surprise: 0.0 },
    { time: "Middle", Joy: 0.0, Trust: 0.0, Fear: 0.4, Anger: 0.0, Sadness: 0.2, Disgust: 0.0, Surprise: 0.0 },
    { time: "Objection", Joy: 0.0, Trust: 0.0, Fear: 0.6, Anger: 0.1, Sadness: 0.1, Disgust: 0.0, Surprise: 0.0 },
    { time: "Close", Joy: 0.0, Trust: 0.1, Fear: 0.5, Anger: 0.0, Sadness: 0.0, Disgust: 0.0, Surprise: 0.0 },
  ],
  // Olivia G - Joy
  "368": [
    { time: "Start", Joy: 0.2, Trust: 0.2, Fear: 0.0, Anger: 0.0, Sadness: 0.0, Disgust: 0.0, Surprise: 0.0 },
    { time: "Middle", Joy: 0.4, Trust: 0.3, Fear: 0.0, Anger: 0.0, Sadness: 0.0, Disgust: 0.0, Surprise: 0.1 },
    { time: "Objection", Joy: 0.3, Trust: 0.2, Fear: 0.1, Anger: 0.0, Sadness: 0.0, Disgust: 0.0, Surprise: 0.0 },
    { time: "Close", Joy: 0.6, Trust: 0.4, Fear: 0.0, Anger: 0.0, Sadness: 0.0, Disgust: 0.0, Surprise: 0.0 },
  ],
  // Leo B - Sadness
  "119": [
    { time: "Start", Joy: 0.0, Trust: 0.1, Fear: 0.0, Anger: 0.0, Sadness: 0.4, Disgust: 0.0, Surprise: 0.0 },
    { time: "Middle", Joy: 0.0, Trust: 0.0, Fear: 0.1, Anger: 0.0, Sadness: 0.5, Disgust: 0.0, Surprise: 0.0 },
    { time: "Objection", Joy: 0.0, Trust: 0.0, Fear: 0.2, Anger: 0.1, Sadness: 0.6, Disgust: 0.0, Surprise: 0.0 },
    { time: "Close", Joy: 0.0, Trust: 0.0, Fear: 0.1, Anger: 0.0, Sadness: 0.5, Disgust: 0.0, Surprise: 0.0 },
  ],
  // Nina F - Surprise
  "204": [
    { time: "Start", Joy: 0.0, Trust: 0.0, Fear: 0.0, Anger: 0.0, Sadness: 0.0, Disgust: 0.0, Surprise: 0.4 },
    { time: "Middle", Joy: 0.1, Trust: 0.2, Fear: 0.0, Anger: 0.0, Sadness: 0.0, Disgust: 0.0, Surprise: 0.6 },
    { time: "Objection", Joy: 0.2, Trust: 0.4, Fear: 0.0, Anger: 0.0, Sadness: 0.0, Disgust: 0.0, Surprise: 0.3 },
    { time: "Close", Joy: 0.3, Trust: 0.5, Fear: 0.0, Anger: 0.0, Sadness: 0.0, Disgust: 0.0, Surprise: 0.2 },
  ],
};

const themeData = [
  {
    theme: "Test Drive Feel",
    emotion: "Excitement",
    verbatims: [
      "The moment I got in, I felt like I was in the future!",
      "It's surprisingly smooth and fun to drive.",
    ],
  },
  {
    theme: "Price Concerns",
    emotion: "Frustration",
    verbatims: [
      "Honestly, I thought it would be more affordable.",
      "Is there a rebate for first-time EV buyers?",
    ],
  },
  {
    theme: "Safety Features",
    emotion: "Trust",
    verbatims: [
      "I love that it has automatic emergency braking.",
      "Knowing it detects blind spots makes me feel more confident.",
    ],
  },
  {
    theme: "Customer Service Experience",
    emotion: "Satisfaction",
    verbatims: [
      "The sales representative was incredibly knowledgeable and patient.",
      "I appreciated how they followed up after our initial conversation.",
      "They answered all my questions without being pushy.",
    ],
  },
  {
    theme: "Product Comparison",
    emotion: "Curiosity",
    verbatims: [
      "How does this model compare to your competitors in terms of range?",
      "I'm interested in understanding the differences between the trim levels.",
      "Can you explain why your battery technology is better than others?",
    ],
  },
];

// Helper function to get emotion icon
const getEmotionIcon = (emotion: string) => {
  switch(emotion) {
    case "Joy":
      return <span className="inline-block text-yellow-500">😊</span>;
    case "Trust":
      return <span className="inline-block text-green-500">🤝</span>;
    case "Fear":
      return <span className="inline-block text-purple-500">😨</span>;
    case "Anger":
      return <span className="inline-block text-red-500">😠</span>;
    case "Sadness":
      return <span className="inline-block text-blue-500">😢</span>;
    case "Disgust":
      return <span className="inline-block text-green-700">🤢</span>;
    case "Surprise":
      return <span className="inline-block text-pink-500">😲</span>;
    default:
      return <span className="inline-block text-gray-500">😐</span>;
  }
};

export default function DemoDashboard() {
  const [selectedLeadId, setSelectedLeadId] = useState("482");
  const [expandedTheme, setExpandedTheme] = useState<number | null>(null);
  const [filterEmotion, setFilterEmotion] = useState<string | null>(null);
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);
  const [selectedDataPoint, setSelectedDataPoint] = useState<{time: string, emotion: string} | null>(null);
  const [dateRange, setDateRange] = useState<{start: string, end: string}>({
    start: "2025-05-01",
    end: "2025-05-31"
  });
  const [satisfactionFilter, setSatisfactionFilter] = useState<"Satisfied" | "Neutral" | "To Improve" | null>(null);
  
  const selectedTimeline = emotionTimelines[selectedLeadId] || emotionTimelines["482"];
  
  // Apply all filters
  const filteredLeads = leadData
    .filter(lead => {
      // Apply emotion filter if active
      if (filterEmotion && lead.emotion !== filterEmotion) return false;
      
      // Apply date range filter
      if (lead.date < dateRange.start || lead.date > dateRange.end) return false;
      
      // Apply satisfaction filter if active
      if (satisfactionFilter) {
        const satisfaction = getSatisfactionLevel(lead.nps, lead.score);
        if (satisfaction !== satisfactionFilter) return false;
      }
      
      return true;
    });

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:gap-6 sm:p-6 md:grid-cols-2 xl:grid-cols-3 min-h-screen" 
      style={{ 
        background: 'linear-gradient(135deg, #f9f5eb 0%, #f5f0e0 50%, #f9f5eb 100%)',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      }}>
      <div className="col-span-full bg-[#f9f5eb] rounded-lg border border-black/10">
        <div className="p-4 sm:p-6">
          <motion.div
            className="flex items-center mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image 
              src="/paperminds_logo_small.png" 
              alt="PaperMinds Logo" 
              width={120}
              height={30}
              style={{ width: 'auto', height: 'auto', maxHeight: '2.5rem' }}
              priority
            />
            <motion.span 
              className="ml-2 inline-block"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              <Sparkles className="h-6 w-6 text-amber-500" />
            </motion.span>
          </motion.div>
          <p className="text-xs sm:text-sm text-black/70 mb-2 sm:mb-4">Track emotional readiness and drill into each lead's journey.</p>
        </div>
      </div>

      <div className="col-span-full md:col-span-2 bg-[#f9f5eb] rounded-lg border border-black/10">
        <div className="p-3 sm:p-4">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-semibold text-black font-serif">Leads by Emotional Score</h2>
            </div>
            
            {/* Filter controls */}
            <div className="flex flex-col space-y-3">
              {/* Emotion filter */}
              <div className="flex flex-wrap gap-1">
                {["Joy", "Trust", "Fear", "Anger", "Sadness", "Disgust", "Surprise"].map(emotion => {
                  // Get emotion-specific colors
                  const getEmotionButtonColors = (emotion: string) => {
                    switch(emotion) {
                      case "Joy": return filterEmotion === emotion ? 'bg-yellow-500 text-white border-yellow-600' : 'bg-[#f9f5eb] text-black border-black/20 hover:bg-yellow-100';
                      case "Trust": return filterEmotion === emotion ? 'bg-green-500 text-white border-green-600' : 'bg-[#f9f5eb] text-black border-black/20 hover:bg-green-100';
                      case "Fear": return filterEmotion === emotion ? 'bg-purple-500 text-white border-purple-600' : 'bg-[#f9f5eb] text-black border-black/20 hover:bg-purple-100';
                      case "Anger": return filterEmotion === emotion ? 'bg-red-500 text-white border-red-600' : 'bg-[#f9f5eb] text-black border-black/20 hover:bg-red-100';
                      case "Sadness": return filterEmotion === emotion ? 'bg-blue-500 text-white border-blue-600' : 'bg-[#f9f5eb] text-black border-black/20 hover:bg-blue-100';
                      case "Disgust": return filterEmotion === emotion ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-[#f9f5eb] text-black border-black/20 hover:bg-emerald-100';
                      case "Surprise": return filterEmotion === emotion ? 'bg-pink-500 text-white border-pink-600' : 'bg-[#f9f5eb] text-black border-black/20 hover:bg-pink-100';
                      default: return filterEmotion === emotion ? 'bg-gray-500 text-white border-gray-600' : 'bg-[#f9f5eb] text-black border-black/20 hover:bg-gray-100';
                    }
                  };
                  
                  return (
                    <motion.button
                      key={emotion}
                      onClick={() => setFilterEmotion(filterEmotion === emotion ? null : emotion)}
                      className={`px-2 py-1 text-xs rounded-md border ${getEmotionButtonColors(emotion)}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {getEmotionIcon(emotion)} {emotion}
                    </motion.button>
                  );
                })}
              </div>
              
              {/* Date range filter */}
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-black/70">Date Range:</span>
                <input 
                  type="date" 
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  className="border border-black/20 rounded px-2 py-1 bg-[#f9f5eb]"
                />
                <span>to</span>
                <input 
                  type="date" 
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  className="border border-black/20 rounded px-2 py-1 bg-[#f9f5eb]"
                />
              </div>
              
              {/* Satisfaction filter */}
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-black/70">Satisfaction:</span>
                <div className="flex space-x-1">
                  <button
                    onClick={() => setSatisfactionFilter(satisfactionFilter === "Satisfied" ? null : "Satisfied")}
                    className={`px-2 py-1 rounded-md border ${
                      satisfactionFilter === "Satisfied" 
                        ? 'bg-green-500 text-white border-green-600' 
                        : 'bg-[#f9f5eb] text-black/80 border-black/20 hover:bg-green-100'
                    }`}
                  >
                    Satisfied
                  </button>
                  <button
                    onClick={() => setSatisfactionFilter(satisfactionFilter === "Neutral" ? null : "Neutral")}
                    className={`px-2 py-1 rounded-md border ${
                      satisfactionFilter === "Neutral" 
                        ? 'bg-amber-500 text-white border-amber-600' 
                        : 'bg-[#f9f5eb] text-black/80 border-black/20 hover:bg-amber-100'
                    }`}
                  >
                    Neutral
                  </button>
                  <button
                    onClick={() => setSatisfactionFilter(satisfactionFilter === "To Improve" ? null : "To Improve")}
                    className={`px-2 py-1 rounded-md border ${
                      satisfactionFilter === "To Improve" 
                        ? 'bg-red-500 text-white border-red-600' 
                        : 'bg-[#f9f5eb] text-black/80 border-black/20 hover:bg-red-100'
                    }`}
                  >
                    To Improve
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-2 mt-4">
            <p className="text-xs text-black/60">Showing {filteredLeads.length} leads</p>
            <p className="text-xs text-black/60 italic">Scroll to see more</p>
          </div>
          <div className="relative">
            <div className="h-64 overflow-y-auto pr-2">
              <AnimatePresence>
                <ul className="text-sm space-y-2">
                {filteredLeads.map(lead => (
                  <motion.li
                    key={lead.id}
                    className={`border border-black/10 p-3 rounded-lg bg-[#f9f5eb] cursor-pointer transition ${
                      selectedLeadId === lead.id ? "bg-amber-50/50 border-amber-300/70" : "hover:bg-amber-50/20"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: parseInt(lead.id) * 0.05 % 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div 
                      className="cursor-pointer"
                      onClick={() => setSelectedLeadId(lead.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <strong className="text-black">{lead.name}</strong> 
                          <span className="text-gray-800 ml-1">— {getEmotionIcon(lead.emotion)} {lead.emotion}, Score: {lead.score}/100</span>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(lead.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {lead.duration}
                          </div>
                          <div className={`text-xs font-medium px-2 py-0.5 rounded-md border ${
                            lead.nps >= 9 ? 'bg-green-100 text-green-800 border-green-200' : 
                            lead.nps >= 7 ? 'bg-green-50 text-green-700 border-green-100' :
                            lead.nps >= 4 ? 'bg-amber-50 text-amber-700 border-amber-100' :
                            'bg-red-50 text-red-700 border-red-100'
                          }`}>
                            NPS: {lead.nps}
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent triggering the parent onClick
                              setExpandedLeadId(expandedLeadId === lead.id ? null : lead.id);
                            }}
                            className="text-black/40 hover:text-black/60 focus:outline-none"
                            aria-label={expandedLeadId === lead.id ? "Collapse" : "Expand"}
                          >
                            {expandedLeadId === lead.id ? "−" : "+"}
                          </button>
                        </div>
                      </div>
                      <div className="text-gray-800 mt-1">Emotional Path: {lead.trend}</div>
                      {lead.hasContact && (
                        <div className="mt-1 space-y-1">
                          {lead.contactInfo && (
                            <div className="text-xs flex items-center text-amber-700">
                              <Mail className="h-3 w-3 mr-1" />
                              {lead.contactInfo}
                            </div>
                          )}
                          {lead.phone && (
                            <div className="text-xs flex items-center text-amber-700">
                              <Phone className="h-3 w-3 mr-1" />
                              {lead.phone}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Expanded verbatims section */}
                    <AnimatePresence>
                      {expandedLeadId === lead.id && lead.verbatims && lead.verbatims.length > 0 && (
                        <motion.div 
                          className="mt-3 pt-3 border-t border-black/10"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h4 className="text-xs font-medium text-gray-700 mb-2">Verbatims:</h4>
                          <ul className="space-y-2">
                            {lead.verbatims.map((verbatim, idx) => (
                              <li key={idx} className="text-xs text-black/70 pl-2 border-l-2 border-gray-300">
                                "{verbatim}"
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                ))}
                </ul>
              </AnimatePresence>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#f9f5eb] to-transparent pointer-events-none flex justify-center items-end pb-1">
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-full md:col-span-1 bg-[#f9f5eb] rounded-lg border border-black/10">
        <div className="p-3 sm:p-4">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-black font-serif">Emotion Timeline: {leadData.find(l => l.id === selectedLeadId)?.name}</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart 
              data={selectedTimeline}
              onClick={(data) => {
                if (data && data.activePayload && data.activePayload.length > 0) {
                  const payload = data.activePayload[0].payload;
                  const emotion = data.activePayload[0].name;
                  const value = data.activePayload[0].value;
                  
                  // Only set selected data point if emotion value is above 0.5 (50%)
                  if (value > 0.5) {
                    setSelectedDataPoint({
                      time: payload.time,
                      emotion: emotion
                    });
                  } else {
                    setSelectedDataPoint(null);
                  }
                }
              }}
            >
              <XAxis dataKey="time" />
              <YAxis domain={[0, 1]} />
              <Tooltip 
                formatter={(value, name) => [
                  `${(Number(value) * 100).toFixed(0)}%`, 
                  name
                ]}
              />
              <Line type="monotone" dataKey="Joy" stroke="#f59e0b" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Trust" stroke="#84cc16" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Fear" stroke="#8b5cf6" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Anger" stroke="#ef4444" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Sadness" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Disgust" stroke="#10b981" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Surprise" stroke="#ec4899" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
          
          {selectedDataPoint && selectedTimeline.find(point => 
            point.time === selectedDataPoint.time && 
            point.verbatims && 
            point.verbatims[selectedDataPoint.emotion]
          ) && (
            <motion.div 
              className="mt-4 p-3 bg-[#f9f5eb] rounded-lg border border-black/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-black/80">
                  {selectedDataPoint.emotion} Verbatims at {selectedDataPoint.time}
                </h3>
                <button 
                  onClick={() => setSelectedDataPoint(null)}
                  className="text-black/40 hover:text-black/60"
                >
                  ✕
                </button>
              </div>
              <ul className="text-xs space-y-1 text-black/70">
                {selectedTimeline
                  .find(point => point.time === selectedDataPoint.time)
                  ?.verbatims?.[selectedDataPoint.emotion]
                  ?.map((verbatim, i) => (
                    <li key={i} className="pl-2 border-l-2 border-amber-300">"{verbatim}"</li>
                  ))
                }
              </ul>
            </motion.div>
          )}
        </div>
      </div>

      <div className="col-span-full bg-[#f9f5eb] rounded-lg border border-black/10">
        <div className="p-3 sm:p-4">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-black font-serif">Emotional Themes from the Conversation</h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <AnimatePresence>
              {themeData.map((theme, idx) => {
                // Define color based on emotion
                const getEmotionColor = (emotion: string) => {
                  switch(emotion) {
                    case "Excitement": return "bg-purple-100 border-purple-300 hover:bg-purple-50";
                    case "Frustration": return "bg-red-100 border-red-300 hover:bg-red-50";
                    case "Trust": return "bg-green-100 border-green-300 hover:bg-green-50";
                    case "Satisfaction": return "bg-blue-100 border-blue-300 hover:bg-blue-50";
                    case "Curiosity": return "bg-amber-100 border-amber-300 hover:bg-amber-50";
                    default: return "bg-gray-100 border-gray-300 hover:bg-gray-50";
                  }
                };
                
                const emotionColor = getEmotionColor(theme.emotion);
                
                return expandedTheme === idx ? (
                  // Expanded view
                  <motion.div
                    key={idx}
                    onClick={() => setExpandedTheme(null)}
                    className={`cursor-pointer p-2 sm:p-3 rounded-lg border transition-all duration-200 w-full md:w-[90%] mx-auto ${emotionColor}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center">
                      <strong className="text-base font-medium text-black">{theme.theme}</strong>
                      <span className="text-xs font-medium px-2 py-1 rounded-md bg-[#f9f5eb] text-black/70 border border-black/10">
                        {theme.emotion}
                      </span>
                    </div>
                    <ul className="mt-2 sm:mt-3 text-xs sm:text-sm list-disc list-inside space-y-1 sm:space-y-2 text-black/80">
                      {theme.verbatims.map((v, i) => (
                        <li key={i} className="pl-2">"{v}"</li>
                      ))}
                    </ul>
                  </motion.div>
                ) : (
                  // Collapsed view (small box)
                  <motion.div
                    key={idx}
                    onClick={() => setExpandedTheme(idx)}
                    className={`cursor-pointer px-2 py-1 sm:px-3 sm:py-2 rounded-md border transition-all duration-200 ${emotionColor}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <strong className="text-xs sm:text-sm font-medium text-black/80">{theme.theme}</strong>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="col-span-full">
        <EmotionalJourneyMap />
      </div>

      <div className="col-span-full bg-[#f9f5eb] rounded-lg border border-black/10">
        <div className="p-3 sm:p-4">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-black">Conversion Summary</h2>
          <p className="text-xs sm:text-sm mb-1 sm:mb-2 text-black/70">Emotion-based lead scoring improved conversion rates by 37% over static funnels.</p>
          <p className="text-xs sm:text-sm text-black/70">Estimated revenue lift: <strong className="text-black">$18,200/month</strong></p>
          <motion.button 
            className="mt-3 sm:mt-4 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-amber-500 text-white rounded-md hover:bg-amber-600 border border-amber-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Report
          </motion.button>
        </div>
      </div>
    </div>
  );
}
