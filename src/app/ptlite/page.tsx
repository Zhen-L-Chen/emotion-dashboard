"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// COLORS
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const dimensions = [
  {
    id: "message-context",
    name: "Message Context",
    participants: 52,
    score: 8.4,
    variance: 2.4,
    responseLength: 78,
    color: "#ef4444",
    valence: { positive: 78, neutral: 20, negative: 2 },
    intraDissonance: true,
    insights: [
      { text: "TV commercial", weight: 100, count: 45 },
      { text: "online video ad", weight: 88, count: 38 },
      { text: "social media", weight: 72, count: 31 },
      { text: "YouTube pre-roll", weight: 65, count: 28 },
      { text: "streaming platform", weight: 58, count: 24 },
      { text: "context confusion", weight: 45, count: 18 }
    ],
    verbatims: [
      { text: "I'd expect to see this during prime time TV, maybe during a nature documentary.", sentiment: "neutral", participant: "P001" },
      { text: "This feels like a YouTube ad that would play before travel videos.", sentiment: "positive", participant: "P015" },
      { text: "Perfect for social media - Instagram or Facebook video ads.", sentiment: "positive", participant: "P032" },
      { text: "Would fit well on streaming services like Netflix or Hulu.", sentiment: "positive", participant: "P047" },
      { text: "Could see this in a movie theater before an adventure film.", sentiment: "neutral", participant: "P019" },
      { text: "This is clearly meant for TV but also feels too intimate for broadcast - more like a personal story that should be on social media instead.", sentiment: "dissonant", participant: "P023", flag: "intra-dissonance" },
      { text: "It's perfect for streaming platforms because it's cinematic, but actually it's too casual and should be on YouTube or TikTok.", sentiment: "dissonant", participant: "P041", flag: "intra-dissonance" },
      { text: "Definitely a premium TV commercial - wait, no, this feels more like user-generated content for Instagram.", sentiment: "dissonant", participant: "P038", flag: "intra-dissonance" }
    ],
    audioComments: [
      { id: 1, participant: "P001", duration: "0:45", sentiment: "positive", text: "I'd expect to see this during prime time TV..." },
      { id: 2, participant: "P015", duration: "1:12", sentiment: "positive", text: "This feels like a YouTube ad that would play..." },
      { id: 3, participant: "P032", duration: "0:38", sentiment: "neutral", text: "Perfect for social media - Instagram or Facebook..." },
      { id: 4, participant: "P047", duration: "0:52", sentiment: "positive", text: "Would fit well on streaming services like Netflix..." },
      { id: 5, participant: "P019", duration: "1:05", sentiment: "positive", text: "Could see this in a movie theater before an adventure..." }
    ]
  },
  {
    id: "clarity-comprehension",
    name: "Clarity & Comprehension",
    participants: 48,
    score: 7.6,
    variance: 2.8,
    responseLength: 92,
    color: "#fbbf24",
    valence: { positive: 72, neutral: 23, negative: 5 },
    intraDissonance: true,
    insights: [
      { text: "electric vehicle promotion", weight: 100, count: 44 },
      { text: "nostalgic revival", weight: 85, count: 36 },
      { text: "environmental message", weight: 78, count: 32 },
      { text: "family adventure", weight: 68, count: 28 },
      { text: "modern technology", weight: 55, count: 22 },
      { text: "message confusion", weight: 42, count: 20 }
    ],
    verbatims: [
      { text: "It's clearly promoting the electric version of the classic VW Bus - bringing back the hippie van but with zero emissions.", sentiment: "positive", participant: "P005" },
      { text: "The message is about combining nostalgia with modern electric technology for eco-conscious families.", sentiment: "positive", participant: "P012" },
      { text: "They're saying you can have the freedom and adventure of the original Bus, but now it's electric and better for the planet.", sentiment: "positive", participant: "P028" },
      { text: "A bit confusing at first - wasn't sure if it was retro or modern until I saw the electric charging.", sentiment: "ambivalent", participant: "P033" },
      { text: "The '100% Electric' text makes it very clear this is about their new EV, not just nostalgia.", sentiment: "positive", participant: "P044" },
      { text: "This is obviously about electric cars, but wait, is it actually promoting the old gas version? The nostalgia is confusing the electric message.", sentiment: "dissonant", participant: "P017", flag: "intra-dissonance" },
      { text: "Crystal clear environmental message about going electric - actually, no, I think it's more about lifestyle than environment. Or maybe both? I'm not sure.", sentiment: "dissonant", participant: "P029", flag: "intra-dissonance" },
      { text: "The message is simple: electric VW Bus. But then again, maybe it's about family values? Or adventure? Actually, I have no idea what they're selling.", sentiment: "dissonant", participant: "P051", flag: "intra-dissonance" }
    ],
    charts: [
      {
        type: "pie",
        title: "Message Understanding",
        data: [
          { name: "Electric Vehicle Focus", value: 42 },
          { name: "Nostalgia + Modern Tech", value: 35 },
          { name: "Environmental Benefits", value: 23 }
        ]
      }
    ]
  },
  {
    id: "emotional-resonance",
    name: "Emotional Resonance",
    participants: 55,
    score: 8.7,
    variance: 2.6,
    responseLength: 105,
    color: "#22c55e",
    valence: { positive: 91, neutral: 7, negative: 2 },
    intraDissonance: true,
    insights: [
      { text: "nostalgic", weight: 100, count: 48 },
      { text: "optimistic", weight: 92, count: 42 },
      { text: "adventurous", weight: 85, count: 38 },
      { text: "hopeful", weight: 78, count: 35 },
      { text: "free-spirited", weight: 71, count: 31 },
      { text: "peaceful", weight: 64, count: 27 },
      { text: "emotionally conflicted", weight: 38, count: 21 }
    ],
    verbatims: [
      { text: "Made me feel nostalgic for road trips and simpler times, but also excited about the future.", sentiment: "ambivalent", participant: "P003" },
      { text: "The moment with the family loading up felt especially powerful - reminded me of my childhood camping trips.", sentiment: "positive", participant: "P014" },
      { text: "Felt hopeful that we can have adventure without harming the environment.", sentiment: "positive", participant: "P025" },
      { text: "The silent electric motor in nature felt peaceful and right.", sentiment: "positive", participant: "P036" },
      { text: "Got emotional seeing the classic design - my parents had one of these in the 70s.", sentiment: "positive", participant: "P042" },
      { text: "The combination of retro vibes with clean technology made me feel optimistic about electric cars.", sentiment: "positive", participant: "P048" },
      { text: "I love the nostalgia but hate that they're ruining it with electric - wait, actually I love that it's electric because it's better for the planet.", sentiment: "dissonant", participant: "P021", flag: "intra-dissonance" },
      { text: "This makes me feel so peaceful and calm, but also really anxious about whether electric cars are actually reliable enough for adventures.", sentiment: "dissonant", participant: "P034", flag: "intra-dissonance" },
      { text: "Absolutely love everything about this - the family, the adventure, the environment. Actually, I hate how it makes me feel guilty about my gas car.", sentiment: "dissonant", participant: "P049", flag: "intra-dissonance" }
    ],
    charts: [
      {
        type: "bar",
        title: "Emotional Response Intensity",
        data: [
          { name: "Nostalgia", value: 87 },
          { name: "Optimism", value: 82 },
          { name: "Adventure", value: 78 },
          { name: "Peace", value: 74 },
          { name: "Freedom", value: 80 }
        ]
      }
    ]
  },
  {
    id: "relevance-identification",
    name: "Relevance & Identification",
    participants: 49,
    score: 6.8,
    variance: 2.9,
    responseLength: 88,
    color: "#3b82f6",
    valence: { positive: 58, neutral: 25, negative: 17 },
    intraDissonance: true,
    insights: [
      { text: "families with kids", weight: 100, count: 35 },
      { text: "eco-conscious consumers", weight: 88, count: 31 },
      { text: "outdoor enthusiasts", weight: 75, count: 27 },
      { text: "nostalgic millennials", weight: 68, count: 24 },
      { text: "affluent households", weight: 52, count: 18 },
      { text: "not for me", weight: 45, count: 16 },
      { text: "identity confusion", weight: 35, count: 17 }
    ],
    verbatims: [
      { text: "This is definitely for families who want to go on adventures but care about the environment.", sentiment: "positive", participant: "P007" },
      { text: "Feels made for people like me - millennial parents who grew up hearing about the original VW Bus.", sentiment: "positive", participant: "P018" },
      { text: "This is for wealthy eco-warriors who can afford a premium electric vehicle.", sentiment: "ambivalent", participant: "P026" },
      { text: "Not really for me - I'm not the camping type and this seems expensive.", sentiment: "negative", participant: "P037" },
      { text: "Perfect for outdoorsy families who want to reduce their carbon footprint.", sentiment: "positive", participant: "P043" },
      { text: "Aimed at people who have kids and disposable income for weekend getaways.", sentiment: "neutral", participant: "P050" },
      { text: "This is totally for me - I'm exactly the target audience. Actually, wait, I don't have kids or go camping, so maybe it's not for me at all.", sentiment: "dissonant", participant: "P011", flag: "intra-dissonance" },
      { text: "Definitely not my demographic - I'm single and live in the city. But I actually really want this car now, so maybe it is for me?", sentiment: "dissonant", participant: "P024", flag: "intra-dissonance" },
      { text: "Perfect for families like mine who love adventure. Except we never actually go camping and prefer hotels, so this is completely irrelevant.", sentiment: "dissonant", participant: "P039", flag: "intra-dissonance" }
    ]
  },
  {
    id: "memorability-distinctiveness",
    name: "Memorability & Distinctiveness",
    participants: 51,
    score: 8.2,
    variance: 1.6,
    responseLength: 82,
    color: "#8b5cf6",
    valence: { positive: 84, neutral: 14, negative: 2 },
    insights: [
      { text: "iconic design", weight: 100, count: 44 },
      { text: "silent electric motor", weight: 82, count: 36 },
      { text: "family loading scene", weight: 75, count: 32 },
      { text: "natural setting", weight: 68, count: 29 },
      { text: "retro-modern contrast", weight: 61, count: 26 }
    ],
    verbatims: [
      { text: "The iconic VW Bus shape is instantly memorable - you can't mistake it for anything else.", sentiment: "positive", participant: "P008" },
      { text: "What stuck with me was how quiet it was in nature - very different from gas car ads.", sentiment: "positive", participant: "P016" },
      { text: "The scene of the family packing up for adventure really stayed with me.", sentiment: "positive", participant: "P027" },
      { text: "Unlike other EV ads that focus on tech, this one felt more about lifestyle and values.", sentiment: "positive", participant: "P035" },
      { text: "The contrast between the retro design and modern electric technology is unique.", sentiment: "positive", participant: "P046" },
      { text: "Most car ads show city driving or performance - this was all about peaceful outdoor experiences.", sentiment: "neutral", participant: "P052" }
    ],
    charts: [
      {
        type: "bar",
        title: "Most Memorable Elements",
        data: [
          { name: "Iconic VW Design", value: 82 },
          { name: "Silent Operation", value: 71 },
          { name: "Family Adventure", value: 68 },
          { name: "Natural Setting", value: 65 },
          { name: "Electric Technology", value: 59 }
        ]
      }
    ]
  },
  {
    id: "brand-attribution-fit",
    name: "Brand Attribution & Fit",
    participants: 47,
    score: 9.1,
    variance: 0.8,
    responseLength: 71,
    color: "#14b8a6",
    valence: { positive: 94, neutral: 6, negative: 0 },
    insights: [
      { text: "obviously Volkswagen", weight: 100, count: 46 },
      { text: "perfect brand fit", weight: 95, count: 43 },
      { text: "authentic to VW heritage", weight: 88, count: 39 },
      { text: "consistent with brand values", weight: 82, count: 36 },
      { text: "natural evolution", weight: 75, count: 32 }
    ],
    verbatims: [
      { text: "100% Volkswagen - the Bus design is unmistakably theirs, nobody else could make this ad.", sentiment: "positive", participant: "P009" },
      { text: "Perfect fit with VW's heritage of practical, family-friendly vehicles with character.", sentiment: "positive", participant: "P020" },
      { text: "This feels authentic to what Volkswagen represents - accessible, reliable, and thoughtful design.", sentiment: "positive", participant: "P031" },
      { text: "Exactly what I'd expect from VW - taking their classic and making it relevant for today.", sentiment: "positive", participant: "P040" },
      { text: "The brand fit is perfect - VW has always been about the journey, not just the destination.", sentiment: "positive", participant: "P045" },
      { text: "This honors their past while showing their commitment to an electric future.", sentiment: "positive", participant: "P053" }
    ]
  },
  {
    id: "improvement",
    name: "Improvement",
    participants: 44,
    score: 7.3,
    variance: 2.7,
    responseLength: 96,
    color: "#f97316",
    valence: { positive: 45, neutral: 42, negative: 13 },
    intraDissonance: true,
    insights: [
      { text: "show more tech features", weight: 100, count: 28 },
      { text: "include pricing info", weight: 85, count: 22 },
      { text: "longer adventure scenes", weight: 72, count: 18 },
      { text: "more diverse families", weight: 68, count: 16 },
      { text: "charging infrastructure", weight: 55, count: 14 },
      { text: "nothing to change", weight: 48, count: 12 },
      { text: "contradictory suggestions", weight: 32, count: 14 }
    ],
    verbatims: [
      { text: "Would love to see more of the interior tech and features - what makes it modern inside?", sentiment: "neutral", participant: "P010" },
      { text: "Should include some pricing or availability info - when can I actually buy one?", sentiment: "neutral", participant: "P022" },
      { text: "Could show more of the actual adventure - maybe them at the campsite or hiking.", sentiment: "neutral", participant: "P030" },
      { text: "Would be nice to see more diverse families represented in the ad.", sentiment: "ambivalent", participant: "P041" },
      { text: "Maybe show them charging it somewhere to address range anxiety.", sentiment: "neutral", participant: "P047" },
      { text: "Honestly, I wouldn't change much - it perfectly captures the essence of what this vehicle represents.", sentiment: "positive", participant: "P054" },
      { text: "They should show more technology features, but also keep it simple and not focus on tech. More adventure scenes but also shorter overall.", sentiment: "dissonant", participant: "P013", flag: "intra-dissonance" },
      { text: "Perfect as is, don't change anything. Actually, they need to completely redo it with more diversity and pricing info and tech features.", sentiment: "dissonant", participant: "P032", flag: "intra-dissonance" },
      { text: "Make it longer to show more adventure, but also make it shorter because it's too long. Add pricing but keep it aspirational without prices.", sentiment: "dissonant", participant: "P044", flag: "intra-dissonance" }
    ]
  }
];

export default function PTLiteDashboard() {
  const [selectedDimension, setSelectedDimension] = useState<string | null>("message-context");
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  
  useEffect(() => {
    console.log("Dimension changed to:", selectedDimension);
  }, [selectedDimension]);

  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    };
  }, [currentAudio]);

  const maxScore = 10;
  const maxVariance = 3;

  return (
    <div className="min-h-screen bg-[#f5f0e6] p-4 sm:p-6" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <div className="relative w-full flex justify-center sm:justify-start mb-6 sm:mb-0">
        <div className="relative w-[120px] h-[40px] sm:w-[150px] sm:h-[50px] sm:absolute sm:top-4 sm:left-4">
          <Image 
            src="/paperminds_logo_small.png" 
            alt="Paperminds Logo" 
            fill
            sizes="(max-width: 640px) 120px, 150px"
            priority
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
      <div className="mt-4 sm:mt-12"></div>
      
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-black mb-6 sm:mb-8" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
        CS Pre-test Light Dashboard
      </h1>

      {/* Tested Creative Asset Section */}
      <div className="max-w-6xl mx-auto mb-6 sm:mb-8">
        <div className="bg-[#f5f0e6] rounded-xl shadow-lg border-2 border-gray-400 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-700 to-gray-600 text-white p-3 sm:p-4">
            <h2 className="text-base sm:text-lg font-bold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              Tested Creative Asset
            </h2>
            <p className="text-xs sm:text-sm opacity-90 mt-1" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Volkswagen ID.BUZZ - 100% Electric Campaign</p>
          </div>
          
          <div className="p-3 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
              {/* Image on the left */}
              <div className="lg:w-2/3">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <Image 
                      src="/volks.png" 
                      alt="Volkswagen ID.BUZZ Advertisement" 
                      width={800}
                      height={500}
                      className="w-full h-auto object-cover"
                      priority
                    />
                  </div>
                  
                  {/* Performance metrics overlay */}
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white bg-opacity-90 rounded-lg p-2 sm:p-3 shadow-lg">
                    <div className="text-[10px] sm:text-xs font-bold text-gray-700 mb-1" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Overall Score</div>
                    <div className="text-lg sm:text-2xl font-bold text-green-600" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>7.9/10</div>
                    <div className="text-[10px] sm:text-xs text-gray-600" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Strong Performance</div>
                  </div>
                </div>
              </div>
              
              {/* Interactive cards stacked on the right */}
              <div className="lg:w-1/3 flex flex-col gap-3 sm:gap-4">
                <motion.div 
                  className="bg-orange-50 p-4 rounded-lg cursor-pointer hover:bg-orange-100 transition-all border border-gray-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center mb-2">
                    <span className="font-medium text-sm text-black" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Performance Metrics</span>
                  </div>
                  <div className="text-xs text-black" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                    Brand Attribution: 9.1/10<br/>
                    Emotional Resonance: 8.7/10<br/>
                    Memorability: 8.2/10
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-orange-50 p-4 rounded-lg cursor-pointer hover:bg-orange-100 transition-all border border-gray-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center mb-2">
                    <span className="font-medium text-sm text-black" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Emotional Valence</span>
                  </div>
                  <div className="text-xs text-black" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                    Positive: 89%<br/>
                    Neutral: 8%<br/>
                    Negative: 3%
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-orange-50 p-4 rounded-lg cursor-pointer hover:bg-orange-100 transition-all border border-gray-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center mb-2">
                    <span className="font-medium text-sm text-black" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Audio Recordings</span>
                  </div>
                  <div className="h-80 overflow-y-auto border border-gray-300 rounded-lg p-2 bg-white">
                    <div className="space-y-3">
                      {dimensions.map((dimension) => {
                        // Map dimension IDs to audio file names
                        const getAudioFileName = (dimensionId: string) => {
                          switch(dimensionId) {
                            case "message-context": return "Message Context.mp3";
                            case "clarity-comprehension": return "Clarity & Comprehension.mp3";
                            case "emotional-resonance": return "Emotional Resonance.mp3";
                            case "relevance-identification": return "Relevance & Identification.mp3";
                            case "memorability-distinctiveness": return "Memorability & Distinctiveness.mp3";
                            case "brand-attribution-fit": return "Brand Attribution & Fit.mp3";
                            case "improvement": return "Improvement.mp3";
                            default: return null;
                          }
                        };

                        const audioFileName = getAudioFileName(dimension.id);
                        if (!audioFileName) return null;

                        const playAudio = () => {
                          // If this audio is currently playing, stop it
                          if (playingAudio === audioFileName && currentAudio) {
                            currentAudio.pause();
                            currentAudio.currentTime = 0;
                            setCurrentAudio(null);
                            setPlayingAudio(null);
                            return;
                          }

                          // If another audio is playing, stop it first
                          if (currentAudio) {
                            currentAudio.pause();
                            currentAudio.currentTime = 0;
                          }

                          // Create and play new audio
                          const audio = new Audio(`/${audioFileName}`);
                          
                          // Set up event listeners
                          audio.addEventListener('ended', () => {
                            setCurrentAudio(null);
                            setPlayingAudio(null);
                          });

                          audio.addEventListener('error', (error) => {
                            console.error('Error playing audio:', error);
                            setCurrentAudio(null);
                            setPlayingAudio(null);
                          });

                          // Update state and play
                          setCurrentAudio(audio);
                          setPlayingAudio(audioFileName);
                          
                          audio.play().catch(error => {
                            console.error('Error playing audio:', error);
                            setCurrentAudio(null);
                            setPlayingAudio(null);
                          });
                        };
                        
                        return (
                          <div key={dimension.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                            {/* Play button */}
                            <button 
                              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                              style={{ 
                                backgroundColor: dimension.color
                              }}
                              onMouseEnter={(e) => {
                                const target = e.target as HTMLButtonElement;
                                target.style.backgroundColor = dimension.color + 'dd';
                              }}
                              onMouseLeave={(e) => {
                                const target = e.target as HTMLButtonElement;
                                target.style.backgroundColor = dimension.color;
                              }}
                              onClick={playAudio}
                            >
                              {playingAudio === audioFileName ? (
                                // Pause icon when playing
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                // Play icon when not playing
                                <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                            
                            {/* Dimension details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <div 
                                  className="w-2 h-2 rounded-full" 
                                  style={{ backgroundColor: dimension.color }}
                                />
                                <span className="text-xs font-medium text-gray-700" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                                  {dimension.name}
                                </span>
                              </div>
                              <p className="text-xs text-gray-600" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                                Click to listen
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content - Dimensions on left, Dimension card on right */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 max-w-6xl mx-auto">
        {/* Dimensions list on the left */}
        <div className="lg:w-1/4 p-2 sm:p-4">
          <h2 className="text-lg font-bold text-black mb-4" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Dimensions</h2>
          <div className="flex flex-row lg:flex-col gap-2 sm:gap-3 overflow-x-auto pb-2 lg:pb-0 lg:sticky lg:top-4">
            {dimensions.map((dimension) => (
              <div 
                key={dimension.id} 
                className={`flex-shrink-0 lg:flex-shrink flex items-center cursor-pointer px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 hover:bg-orange-50 ${
                  selectedDimension === dimension.id 
                    ? 'shadow-lg' 
                    : ''
                }`}
                style={{ 
                  boxShadow: selectedDimension === dimension.id ? '0 4px 12px rgba(0,0,0,0.15)' : '0 1px 2px rgba(0,0,0,0.05)', 
                  height: 'auto',
                  minHeight: '50px',
                  minWidth: '220px',
                  width: 'auto',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  backgroundColor: selectedDimension === dimension.id ? dimension.color + '20' : 'transparent',
                  fontFamily: 'Helvetica, Arial, sans-serif'
                }}
                onClick={() => {
                  console.log("Setting dimension to:", dimension.id);
                  setSelectedDimension(dimension.id);
                }}
              >
                <div 
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-full mr-2" 
                  style={{ backgroundColor: dimension.color + 'cc', aspectRatio: "1 / 1" }}
                />
                <span className="text-xs sm:text-sm font-medium text-black" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>{dimension.name}</span>
                {(dimension.variance > 2.0 || dimension.intraDissonance) && <span className="ml-1 text-red-500 text-xs" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>⚠</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Dimension card on the right */}
        <div className="lg:w-3/4 p-2 sm:p-4">
          {dimensions.map((dimension) => (
            <motion.div
              key={dimension.id}
              layout
              className={`bg-[#f5f0e6] border-2 border-gray-400 rounded-xl shadow p-3 sm:p-5 transition-all duration-300 ${
                selectedDimension === dimension.id ? 'opacity-100 scale-100' : 'hidden'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                <div className="flex-1">
                  <motion.h2 
                    className="text-base sm:text-lg font-bold text-black mb-2" 
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {dimension.name}
                    {dimension.intraDissonance && (
                      <span className="ml-2 text-red-500 text-sm" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                        ⚠ Self-Contradiction Detected
                      </span>
                    )}
                  </motion.h2>
                </div>
                <div className="text-xs sm:text-sm text-gray-600 sm:ml-4 mt-2 sm:mt-0" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  Score: {dimension.score.toFixed(1)}/10 | Consensus: {Math.round(100 - (dimension.variance / 3) * 100)}%
                  {dimension.valence && (
                    <span className="block sm:inline sm:ml-2">| Valence: {dimension.valence.positive}% pos</span>
                  )}
                </div>
              </div>
              
              {/* Clean definition without labels - full width */}
              <motion.div 
                className="mb-4 p-4 bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 rounded-lg border border-amber-200 shadow-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="text-sm text-gray-800 leading-relaxed" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  {dimension.id === "message-context" && (
                    <>
                      <div className="mb-3 text-base font-medium text-gray-900 italic">"Does this ad feel like it belongs wherever I'm seeing it?"</div>
                      <div className="text-sm text-gray-700 leading-relaxed">If an ad shows up in the wrong place or format, it can confuse or annoy. This checks whether the channel and setting make sense for the message.</div>
                    </>
                  )}
                  {dimension.id === "clarity-comprehension" && (
                    <>
                      <div className="mb-3 text-base font-medium text-gray-900 italic">"Do people get what we're trying to say, and do they get it the way we meant it?"</div>
                      <div className="text-sm text-gray-700 leading-relaxed">A great-looking ad means nothing if it's misunderstood. This identifies whether the message is clear or confusing.</div>
                    </>
                  )}
                  {dimension.id === "emotional-resonance" && (
                    <>
                      <div className="mb-3 text-base font-medium text-gray-900 italic">"Did this land emotionally, and did it work for us?"</div>
                      <div className="text-sm text-gray-700 leading-relaxed">Emotion drives attention, memory, and action. This shows whether people felt something and whether that feeling helps or hurts the message.</div>
                    </>
                  )}
                  {dimension.id === "relevance-identification" && (
                    <>
                      <div className="mb-3 text-base font-medium text-gray-900 italic">"Does this feel like it's meant for someone like me?"</div>
                      <div className="text-sm text-gray-700 leading-relaxed">If people don't feel personally connected, they're less likely to care. This checks how well the message connects with the intended audience.</div>
                    </>
                  )}
                  {dimension.id === "memorability-distinctiveness" && (
                    <>
                      <div className="mb-3 text-base font-medium text-gray-900 italic">"What stuck? And did this feel fresh or generic?"</div>
                      <div className="text-sm text-gray-700 leading-relaxed">People forget most ads quickly. This tests whether anything stands out and how unique or familiar it feels compared to others.</div>
                    </>
                  )}
                  {dimension.id === "improvement" && (
                    <>
                      <div className="mb-3 text-base font-medium text-gray-900 italic">"Where does it fall flat, and how could we make it better?"</div>
                      <div className="text-sm text-gray-700 leading-relaxed">This surfaces weak spots and opportunities to refine the creative before launch, based on direct audience feedback.</div>
                    </>
                  )}
                  {dimension.id === "brand-attribution-fit" && (
                    <>
                      <div className="mb-3 text-base font-medium text-gray-900 italic">"Does this feel like it came from us, and does it match how people already see us?"</div>
                      <div className="text-sm text-gray-700 leading-relaxed">An ad should not only be recognizable but also feel aligned with the brand's tone, values, and image. This checks both recognition and fit.</div>
                    </>
                  )}
                </div>
              </motion.div>
              <div className="mt-2">
                <strong className="text-black text-xs sm:text-sm" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Lexicon:</strong>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2 sm:mt-3">
                  {dimension.insights.map((insight, i) => {
                    // Calculate color intensity based on weight
                    const hue = dimension.color.startsWith('#') ? dimension.color : '#fbbf24';
                    
                    return (
                      <motion.div 
                        key={`${selectedDimension}-${i}`} 
                        className="relative px-3 py-2 rounded-full flex items-center justify-center cursor-help text-xs sm:text-sm w-full"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ 
                          scale: 1, 
                          opacity: 1,
                        }}
                        transition={{ 
                          duration: 0.5, 
                          delay: i * 0.1 + 0.2,
                        }}
                        style={{ 
                          fontWeight: insight.weight > 60 ? 'bold' : 'normal',
                          border: '1px solid rgba(0,0,0,0.1)',
                          boxShadow: insight.weight > 70 ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                          color: 'black',
                          fontFamily: 'Helvetica, Arial, sans-serif',
                          minHeight: '36px',
                          maxWidth: '100%'
                        }}
                        whileHover={{ scale: 1.02 }}
                      >
                        {/* Background fill animation */}
                        <motion.div 
                          key={`fill-${selectedDimension}-${i}`}
                          className="absolute inset-0 rounded-full"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1, delay: i * 0.1 + 0.5 }}
                          style={{ 
                            backgroundColor: `${hue}${Math.round((insight.weight / 100) * 99)}`,
                            zIndex: -1
                          }}
                        />
                        
                        {/* Insight text */}
                        <span className="z-10 text-center truncate px-1">{insight.text}</span>
                        
                        {/* Tooltip with count */}
                        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-xs rounded py-1 px-2 pointer-events-none bottom-full left-1/2 transform -translate-x-1/2 mb-1 whitespace-nowrap" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                          <div>Mentions: {insight.count}</div>
                          <div>Weight: {insight.weight}%</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              
              {/* Verbatims Section */}
              {dimension.verbatims && (
                <div className="mt-4">
                  <strong className="text-black text-xs sm:text-sm" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Participant Verbatims:</strong>
                  <div className="mt-2 space-y-2">
                    {dimension.verbatims.map((verbatim, i) => (
                      <motion.div 
                        key={`verbatim-${selectedDimension}-${i}`}
                        className={`relative p-3 bg-white rounded-lg border shadow-sm ${
                          verbatim.flag === 'intra-dissonance' ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                      >
                        {/* Participant ID and Warning in top-right corner */}
                        <div className="absolute top-2 right-2 flex items-center gap-1">
                          {verbatim.flag === 'intra-dissonance' && (
                            <span className="text-red-500 text-xs" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                              ⚠
                            </span>
                          )}
                          {verbatim.participant && (
                            <span className="text-[9px] text-gray-400 font-mono" style={{ fontFamily: 'Monaco, monospace' }}>
                              {verbatim.participant}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-start gap-3 pr-12">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                            verbatim.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                            verbatim.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                            verbatim.sentiment === 'ambivalent' ? 'bg-yellow-100 text-yellow-800' :
                            verbatim.sentiment === 'dissonant' ? 'bg-red-200 text-red-900' :
                            'bg-gray-100 text-gray-800'
                          }`} style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                            {verbatim.sentiment}
                          </span>
                          <p className="text-sm text-gray-700 flex-1" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                            "{verbatim.text}"
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Charts Section */}
              {dimension.charts && dimension.charts.map((chart, chartIndex) => (
                <div key={chartIndex} className="mt-4 sm:mt-6">
                  <h3 className="text-xs sm:text-sm font-bold text-black mb-2 sm:mb-3" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>{chart.title}</h3>
                  <div>
                    <div className="h-[200px] sm:h-[250px] w-full">
                      {chart.type === 'bar' ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={chart.data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 10, fontFamily: 'Helvetica, Arial, sans-serif' }} />
                            <YAxis tick={{ fontSize: 10, fontFamily: 'Helvetica, Arial, sans-serif' }} />
                            <Tooltip />
                            <Bar dataKey="value" name="Score" fill={dimension.color} animationDuration={1500} />
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={chart.data}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              nameKey="name"
                              animationDuration={1500}
                              animationBegin={0}
                            >
                              {chart.data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-600 mt-1 sm:mt-2 italic" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                      {chart.type === 'bar' 
                        ? "This chart shows the distribution of scores across different metrics for better comparative analysis."
                        : "This chart illustrates the proportional breakdown of responses, showing relative importance in the overall assessment."}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Performance Overview Graph at the bottom */}
      <div className="relative w-full h-[300px] sm:h-[400px] border border-black/10 rounded-xl mt-8 sm:mt-12 mb-6 sm:mb-8 bg-[#f5f0e6] max-w-5xl mx-auto">
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-black/10" />
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-black/10" />
        <div className="absolute top-2 left-2 text-[10px] sm:text-xs text-black/50" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>High Consensus ↑</div>
        <div className="absolute bottom-2 left-2 text-[10px] sm:text-xs text-black/50" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Low Consensus ↓</div>
        <div className="absolute top-[40%] right-2 text-[10px] sm:text-xs text-black/50" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Performance Score ↔</div>

        {dimensions.map((dimension, i) => {
          const left = `${10 + (dimension.score / maxScore) * 80}%`;
          // Convert variance to consensus (higher variance = lower consensus, so invert the calculation)
          const consensus = Math.round(100 - (dimension.variance / 3) * 100);
          const top = `${10 + ((100 - consensus) / 100) * 80}%`;

          return (
            <motion.div
              key={dimension.id}
              className="absolute cursor-pointer group"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: "50%",
                left,
                top,
                transform: "translate(-50%, -50%)",
                backgroundColor: selectedDimension === dimension.id 
                  ? dimension.color
                  : dimension.color + 'cc',
                border: selectedDimension === dimension.id 
                  ? `4px solid ${dimension.color}`
                  : `3px solid ${dimension.color}`,
              }}
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.9 }}
              transition={{ duration: 0.9, delay: i * 0.15 }}
              whileHover={{ scale: 1.2 }}
              onClick={() => {
                console.log("Setting dimension to:", dimension.id);
                setSelectedDimension(dimension.id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
