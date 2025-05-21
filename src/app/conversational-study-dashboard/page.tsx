"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

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
    lexicon: ["trop cher", "inutile", "pas confiance", "faux bio"],
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
    lexicon: ["naturel", "transformé", "chimique", "marketing"],
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
    lexicon: ["essayer", "offre", "preuve", "dégustation"],
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
    lexicon: ["déjà goûté", "déçu", "agréable", "aucun effet"],
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
    lexicon: ["valeurs", "cohérent", "engagé", "responsable"],
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
    lexicon: ["lait d'amande", "écologie", "remplacement", "moins gras"],
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
  
  useEffect(() => {
    console.log("Theme changed to:", selectedTheme);
  }, [selectedTheme]);

  const maxValence = 2;
  const maxTension = 1;

  return (
    <div className="min-h-screen bg-[#f5f0e6] p-6" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <div className="absolute top-4 left-4" style={{ width: '120px', height: '40px', position: 'relative' }}>
        <Image 
          src="/paperminds_logo_small.png" 
          alt="Paperminds Logo" 
          fill
          sizes="120px"
          priority
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="mt-12"></div>
      <h1 className="text-3xl font-bold text-center text-black font-serif mb-8">
        Lait Bio Québec
      </h1>

      <div className="relative w-full h-[400px] border border-black/10 rounded-xl mb-12 bg-[#f5f0e6]">
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-black/10" />
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-black/10" />
        <div className="absolute top-2 left-2 text-xs text-black/50">Tension élevée ↑</div>
        <div className="absolute bottom-2 left-2 text-xs text-black/50">Tension faible ↓</div>
        <div className="absolute top-[40%] right-2 text-xs text-black/50">Valence ↔</div>

        {themes.map((theme, i) => {
          const size = 30 + theme.responseLength * 0.7;
          const left = `${50 + (theme.valence / maxValence) * 45}%`;
          const top = `${50 - (theme.tension / maxTension) * 45}%`;

          return (
            <motion.div
              key={theme.id}
              className="absolute flex items-center justify-center text-center cursor-pointer group"
              style={{
                width: size,
                height: size,
                borderRadius: "50%",
                aspectRatio: "1 / 1",
                left,
                top,
                transform: "translate(-50%, -50%)",
                backgroundColor: theme.color + 'cc',
                border: selectedTheme === theme.id ? "3px solid white" : "none",
                boxShadow: selectedTheme === theme.id ? "0 0 10px rgba(0,0,0,0.3)" : "none"
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
                className="absolute whitespace-nowrap bg-black/70 text-white px-2 py-1 rounded text-xs pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ top: '100%', marginTop: '8px' }}
              >
                {theme.name}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mb-8 p-4 max-w-3xl mx-auto">
        <div className="grid grid-cols-3 gap-4 w-full">
          {themes.map((theme) => (
            <div 
              key={theme.id} 
              className={`flex items-center cursor-pointer px-4 py-2 rounded-full border transition-all duration-200 hover:bg-gray-100 hover:scale-105 ${
                selectedTheme === theme.id 
                  ? 'border-gray-500 bg-gray-100 scale-105' 
                  : 'border-gray-300'
              }`}
              onClick={() => {
                console.log("Setting theme to:", theme.id);
                setSelectedTheme(theme.id);
              }}
              style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
            >
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: theme.color + 'cc', aspectRatio: "1 / 1" }}
              />
              <span className="text-sm font-medium text-black">{theme.name}</span>
              {theme.tension > 0.5 && <span className="ml-1 text-red-500 text-xs">⚠</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6 max-w-3xl mx-auto">
        {themes.map((theme) => (
          <motion.div
            key={theme.id}
            layout
            className={`bg-[#f5f0e6] border-2 border-gray-400 rounded-xl shadow p-5 transition-all duration-300 ${
              selectedTheme === theme.id ? 'opacity-100 scale-100' : 'hidden'
            }`}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-black">{theme.name}</h2>
              <div className="text-sm text-gray-600">
                Valence: {theme.valence > 0 ? "+" : ""}{theme.valence.toFixed(1)} | Tension: {theme.tension.toFixed(1)}
              </div>
            </div>
            <div className="mt-2">
              <strong className="text-black text-sm">Lexique émotionnel :</strong>
              <div className="flex flex-wrap gap-2 mt-1">
                {theme.lexicon.map((word, i) => (
                  <span key={i} className="px-2 py-1 bg-amber-100 text-black rounded-full text-xs">
                    {word}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <strong className="text-black text-sm">Verbatims clés :</strong>
              <ul className="list-disc list-inside text-gray-700 text-sm mt-1 space-y-1">
                {theme.verbatims.map((v, i) => (
                  <li key={i}>"{v}"</li>
                ))}
              </ul>
            </div>
            
            {/* Charts Section */}
            {theme.charts && theme.charts.map((chart, chartIndex) => (
              <div key={chartIndex} className="mt-6">
                <h3 className="text-sm font-bold text-black mb-3">{chart.title}</h3>
                <div className="h-[250px] w-full">
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
                        <Bar dataKey="value" fill={theme.color} animationDuration={1500} />
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
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
