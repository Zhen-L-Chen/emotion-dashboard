"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

// COLORS
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const themes = [
  {
    id: "freins",
    name: "Freins, tensions, résistances",
    participants: 62,
    valence: -1.3,
    tension: 0.9,
    responseLength: 85,
    color: "#ef4444",
    lexicon: [
      { text: "trop cher", weight: 100, count: 42 },
      { text: "inutile", weight: 75, count: 31 },
      { text: "pas confiance", weight: 60, count: 25 },
      { text: "faux bio", weight: 40, count: 17 }
    ],
    verbatims: [
      "Je ne vois pas la différence de goût, c'est du marketing.",
      "C'est trop cher pour ce que c'est, ça me frustre.",
      "On ne sait pas si c'est vraiment bio, il y a tellement de fausses promesses.",
      "Je trouve ça absurde de payer plus pour quelque chose qui devrait être standard."
    ],
    charts: [
      {
        type: "bar",
        title: "Freins perçus à l'achat de lait bio",
        data: [
          { name: "Prix élevé", value: 68 },
          { name: "Scepticisme", value: 42 },
          { name: "Goût similaire", value: 37 },
          { name: "Disponibilité", value: 25 },
          { name: "Habitudes", value: 18 }
        ]
      },
      {
        type: "pie",
        title: "Répartition des préoccupations",
        data: [
          { name: "Économiques", value: 45 },
          { name: "Qualité", value: 30 },
          { name: "Confiance", value: 25 }
        ]
      }
    ]
  },
  {
    id: "lait",
    name: "Le lait dans l'univers bio",
    participants: 51,
    valence: 0.1,
    tension: 0.8,
    responseLength: 65,
    color: "#fbbf24",
    lexicon: [
      { text: "naturel", weight: 100, count: 38 },
      { text: "transformé", weight: 80, count: 30 },
      { text: "chimique", weight: 60, count: 23 },
      { text: "marketing", weight: 40, count: 15 }
    ],
    verbatims: [
      "C'est difficile de croire que le lait puisse être bio, c'est contradictoire.",
      "Bio ou pas, ça reste un produit industriel et transformé.",
      "Le lait bio me semble incohérent avec les valeurs écologiques qu'il prétend défendre.",
      "Je ressens un malaise quand on parle de 'lait biologique', c'est un oxymore pour moi."
    ],
    charts: [
      {
        type: "pie",
        title: "Perception du lait comme produit naturel ou transformé",
        data: [
          { name: "Produit transformé", value: 58 },
          { name: "Produit naturel", value: 27 },
          { name: "Indécis", value: 15 }
        ]
      },
      {
        type: "bar",
        title: "Facteurs influençant la perception",
        data: [
          { name: "Marketing", value: 62 },
          { name: "Médias", value: 48 },
          { name: "Expérience", value: 35 },
          { name: "Entourage", value: 28 }
        ]
      }
    ]
  },
  {
    id: "changer",
    name: "Ce qui pourrait changer la donne",
    participants: 45,
    valence: 1.2,
    tension: 0.2,
    responseLength: 45,
    color: "#22c55e",
    lexicon: [
      { text: "essayer", weight: 100, count: 35 },
      { text: "offre", weight: 80, count: 28 },
      { text: "preuve", weight: 60, count: 21 },
      { text: "dégustation", weight: 40, count: 14 }
    ],
    verbatims: [
      "Une dégustation pourrait me convaincre.",
      "S'il y avait une promo, je l'essaierais."
    ],
    charts: [
      {
        type: "bar",
        title: "Conditions pour reconsidérer le lait bio",
        data: [
          { name: "Prix plus accessible", value: 64 },
          { name: "Preuves scientifiques", value: 47 },
          { name: "Dégustation", value: 39 },
          { name: "Transparence", value: 35 },
          { name: "Innovation", value: 28 }
        ]
      },
      {
        type: "pie",
        title: "Importance des facteurs de décision",
        data: [
          { name: "Économique", value: 55 },
          { name: "Santé", value: 30 },
          { name: "Environnement", value: 15 }
        ]
      }
    ]
  },
  {
    id: "experience",
    name: "Expérience vécue",
    participants: 48,
    valence: 0.4,
    tension: 0.3,
    responseLength: 70,
    color: "#3b82f6",
    lexicon: [
      { text: "déjà goûté", weight: 100, count: 36 },
      { text: "déçu", weight: 75, count: 27 },
      { text: "agréable", weight: 50, count: 18 },
      { text: "aucun effet", weight: 30, count: 11 }
    ],
    verbatims: [
      "Je l'ai déjà goûté, ce n'était pas mauvais.",
      "J'ai arrêté, je n'ai pas vu de différence."
    ],
    charts: [
      {
        type: "pie",
        title: "Expérience antérieure de consommation de lait bio",
        data: [
          { name: "A essayé puis abandonné", value: 45 },
          { name: "Consommateur régulier", value: 22 },
          { name: "Jamais essayé", value: 33 }
        ]
      },
      {
        type: "bar",
        title: "Raisons d'abandon",
        data: [
          { name: "Prix", value: 58 },
          { name: "Goût", value: 32 },
          { name: "Disponibilité", value: 25 },
          { name: "Doutes", value: 18 }
        ]
      }
    ]
  },
  {
    id: "rapport",
    name: "Votre rapport au bio",
    participants: 39,
    valence: 0.8,
    tension: 0.1,
    responseLength: 95,
    color: "#8b5cf6",
    lexicon: [
      { text: "valeurs", weight: 100, count: 33 },
      { text: "cohérent", weight: 80, count: 26 },
      { text: "engagé", weight: 60, count: 20 },
      { text: "responsable", weight: 40, count: 13 }
    ],
    verbatims: [
      "Je choisis bio parce que ça correspond à mes valeurs.",
      "J'essaie d'acheter responsable autant que possible."
    ],
    charts: [
      {
        type: "bar",
        title: "Motivations à acheter bio",
        data: [
          { name: "Santé", value: 72 },
          { name: "Environnement", value: 65 },
          { name: "Qualité", value: 58 },
          { name: "Éthique", value: 47 },
          { name: "Goût", value: 39 }
        ]
      },
      {
        type: "pie",
        title: "Fréquence d'achat de produits bio",
        data: [
          { name: "Régulier", value: 42 },
          { name: "Occasionnel", value: 38 },
          { name: "Rare", value: 20 }
        ]
      }
    ]
  },
  {
    id: "perceptions",
    name: "Perceptions sensorielles et émotionnelles",
    participants: 34,
    valence: 0.0,
    tension: 0.7,
    responseLength: 55,
    color: "#14b8a6",
    lexicon: [
      { text: "lait d'amande", weight: 100, count: 29 },
      { text: "écologie", weight: 75, count: 22 },
      { text: "remplacement", weight: 50, count: 15 },
      { text: "moins gras", weight: 30, count: 9 }
    ],
    verbatims: [
      "J'utilise maintenant du lait d'avoine, plus léger et moins problématique.",
      "Je pense que les laits végétaux sont plus écologiques et cohérents.",
      "Le lait me rappelle des sensations désagréables, je préfère l'éviter.",
      "Je ressens un conflit entre mes souvenirs d'enfance liés au lait et ce que je sais maintenant."
    ],
    charts: [
      {
        type: "pie",
        title: "Représentation dominante du lait",
        data: [
          { name: "Santé", value: 42 },
          { name: "Habitude", value: 28 },
          { name: "Plaisir", value: 18 },
          { name: "Nécessité", value: 12 }
        ]
      },
      {
        type: "bar",
        title: "Alternatives considérées",
        data: [
          { name: "Lait d'amande", value: 48 },
          { name: "Lait d'avoine", value: 42 },
          { name: "Lait de soja", value: 35 },
          { name: "Lait de coco", value: 22 }
        ]
      }
    ]
  }
];

export default function ConversationalStudyDashboard() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>("freins");
  const [userEmail, setUserEmail] = useState('');
  const [isInsightsUnlocked, setIsInsightsUnlocked] = useState(false);
  
  useEffect(() => {
    console.log("Theme changed to:", selectedTheme);
  }, [selectedTheme]);

  useEffect(() => {
    // Check if user is logged in and get email
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    }
    
    // Check if insights are unlocked (you can adjust this logic as needed)
    const hasSeenUnlock = localStorage.getItem('hasSeenInsightsUnlock');
    if (hasSeenUnlock) {
      setIsInsightsUnlocked(true);
    }
  }, []);

  const maxValence = 2;
  const maxTension = 1;

  return (
    <div className="min-h-screen bg-[#f5f0e6] flex flex-col" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <Navigation userEmail={userEmail} showInsights={isInsightsUnlocked} />
      <div className="flex-1 p-3 sm:p-4 lg:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-black font-serif mb-6 sm:mb-8">
        Thème conversationnel - lait bio du Québec
      </h1>

      {/* Main content - Themes on left, Theme card on right */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 max-w-6xl mx-auto">
        {/* Themes list on the left */}
        <div className="lg:w-1/4 p-2 sm:p-4">
          <div className="flex flex-row lg:flex-col gap-2 sm:gap-3 overflow-x-auto pb-2 lg:pb-0 lg:sticky lg:top-4">
            {themes.map((theme) => (
              <div 
                key={theme.id} 
                className={`flex-shrink-0 lg:flex-shrink flex items-center cursor-pointer px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 hover:bg-orange-50 ${
                  selectedTheme === theme.id 
                    ? 'shadow-lg' 
                    : ''
                }`}
                style={{ 
                  boxShadow: selectedTheme === theme.id ? '0 4px 12px rgba(0,0,0,0.15)' : '0 1px 2px rgba(0,0,0,0.05)', 
                  height: 'auto',
                  minHeight: '50px',
                  minWidth: '220px',
                  width: 'auto',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  backgroundColor: selectedTheme === theme.id ? theme.color + '20' : 'transparent'
                }}
                onClick={() => {
                  console.log("Setting theme to:", theme.id);
                  setSelectedTheme(theme.id);
                }}
              >
                <div 
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-full mr-2" 
                  style={{ backgroundColor: theme.color + 'cc', aspectRatio: "1 / 1" }}
                />
                <span className="text-xs sm:text-sm font-medium text-black">{theme.name}</span>
                {theme.tension > 0.5 && <span className="ml-1 text-red-500 text-xs">⚠</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Theme card on the right */}
        <div className="lg:w-3/4 p-2 sm:p-4">
          {themes.map((theme) => (
            <motion.div
              key={theme.id}
              layout
              className={`bg-[#f5f0e6] border-2 border-gray-400 rounded-xl shadow p-3 sm:p-5 transition-all duration-300 ${
                selectedTheme === theme.id ? 'opacity-100 scale-100' : 'hidden'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <h2 className="text-base sm:text-lg font-bold text-black mb-1 sm:mb-0">{theme.name}</h2>
                <div className="text-xs sm:text-sm text-gray-600">
                  Valence: {theme.valence > 0 ? "+" : ""}{theme.valence.toFixed(1)} | Tension: {theme.tension.toFixed(1)}
                </div>
              </div>
              <div className="mt-2">
                <strong className="text-black text-xs sm:text-sm">Lexique émotionnel :</strong>
                <div className="flex flex-wrap gap-3 sm:gap-6 mt-2 sm:mt-3">
                  {theme.lexicon.map((word, i) => {
                    // Calculate size based on weight (from 0.9 to 1.2)
                    const sizeScale = 0.9 + (word.weight / 100) * 0.3;
                    // Calculate color intensity based on weight
                    const hue = theme.color.startsWith('#') ? theme.color : '#fbbf24';
                    
                    return (
                      <motion.div 
                        key={`${selectedTheme}-${i}`} 
                        className={`relative px-3 py-1.5 rounded-full flex items-center cursor-help text-sm sm:text-base`}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ 
                          scale: sizeScale, 
                          opacity: 1,
                        }}
                        transition={{ 
                          duration: 0.5, 
                          delay: i * 0.1 + 0.2,
                        }}
                        style={{ 
                          fontWeight: word.weight > 60 ? 'bold' : 'normal',
                          border: '1px solid rgba(0,0,0,0.1)',
                          boxShadow: word.weight > 70 ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                          color: 'black',
                          overflow: 'hidden',
                          margin: '4px 2px'
                        }}
                        whileHover={{ scale: sizeScale * 1.05 }}
                      >
                        {/* Background fill animation */}
                        <motion.div 
                          key={`fill-${selectedTheme}-${i}`}
                          className="absolute inset-0 rounded-full"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1, delay: i * 0.1 + 0.5 }}
                          style={{ 
                            backgroundColor: `${hue}${Math.round((word.weight / 100) * 99)}`,
                            zIndex: -1
                          }}
                        />
                        
                        {/* Word text */}
                        <span className="z-10">{word.text}</span>
                        
                        {/* Tooltip with count */}
                        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-xs rounded py-1 px-2 pointer-events-none bottom-full left-1/2 transform -translate-x-1/2 mb-1">
                          <div>Valeur: {word.count}</div>
                          <div>Poids: {word.weight}%</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-3">
                <strong className="text-black text-xs sm:text-sm">Verbatims clés :</strong>
                <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm mt-1 space-y-1">
                  {theme.verbatims.map((v, i) => (
                    <li key={i}>"{v}"</li>
                  ))}
                </ul>
              </div>
              
              {/* Charts Section */}
              {theme.charts && theme.charts.map((chart, chartIndex) => (
                <div key={chartIndex} className="mt-4 sm:mt-6">
                  <h3 className="text-xs sm:text-sm font-bold text-black mb-2 sm:mb-3">{chart.title}</h3>
                  <div>
                    <div className="h-[200px] sm:h-[250px] w-full">
                      {chart.type === 'bar' ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={chart.data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                            <YAxis tick={{ fontSize: 10 }} />
                            <Tooltip />
                            <Bar dataKey="value" name="Valeur" fill={theme.color} animationDuration={1500} />
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
                    <p className="text-[10px] sm:text-xs text-gray-600 mt-1 sm:mt-2 italic">
                      {chart.type === 'bar' 
                        ? "Ce graphique montre la distribution des valeurs par catégorie, permettant de comparer facilement leur importance relative."
                        : "Ce graphique illustre la répartition proportionnelle des différentes catégories, montrant leur importance relative dans l'ensemble."}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Big Graph at the bottom */}
      <div className="relative w-full h-[300px] sm:h-[400px] border border-black/10 rounded-xl mt-8 sm:mt-12 mb-6 sm:mb-8 bg-[#f5f0e6] max-w-5xl mx-auto">
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-black/10" />
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-black/10" />
        <div className="absolute top-2 left-2 text-[10px] sm:text-xs text-black/50">Tension élevée ↑</div>
        <div className="absolute bottom-2 left-2 text-[10px] sm:text-xs text-black/50">Tension faible ↓</div>
        <div className="absolute top-[40%] right-2 text-[10px] sm:text-xs text-black/50">Valence ↔</div>

        {themes.map((theme, i) => {
          const left = `${50 + (theme.valence / maxValence) * 45}%`;
          const top = `${50 - (theme.tension / maxTension) * 45}%`;

          return (
            <motion.div
              key={theme.id}
              className="absolute flex items-center justify-center text-center cursor-pointer group"
              style={{
                width: 'clamp(40px, 10vw, 60px)',
                height: 'clamp(40px, 10vw, 60px)',
                borderRadius: "50%",
                aspectRatio: "1 / 1",
                left,
                top,
                transform: "translate(-50%, -50%)",
                backgroundColor: selectedTheme === theme.id 
                  ? theme.color + '40'  // Much lighter version when selected
                  : theme.color + 'cc', // Original opacity when not selected
              }}
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.9 }}
              transition={{ duration: 0.9, delay: i * 0.15 }}
              whileHover={{ scale: 1.08 }}
              onClick={() => {
                console.log("Setting theme to:", theme.id);
                setSelectedTheme(theme.id);
              }}
            >
              <div
                className="absolute whitespace-nowrap bg-black/70 text-white px-2 py-1 rounded text-[10px] sm:text-xs pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ top: '100%', marginTop: '8px' }}
              >
                {theme.name}
              </div>
            </motion.div>
          );
        })}
      </div>
      </div>
      
      <Footer />
    </div>
  );
}
