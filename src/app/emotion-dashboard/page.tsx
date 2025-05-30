'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Footer from '../components/Footer';

const emotionData = [
  { time: "Intro", Joy: 0.2, Trust: 0.5, Frustration: 0.1 },
  { time: "Pitch", Joy: 0.6, Trust: 0.3, Frustration: 0.0 },
  { time: "Objection", Joy: 0.1, Trust: 0.2, Frustration: 0.6 },
  { time: "Close", Joy: 0.5, Trust: 0.6, Frustration: 0.1 },
];

export default function EmotionDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-light text-gray-900 mb-8">Emotion Dashboard</h1>
        
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h2 className="text-xl font-light mb-4">Emotion Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={emotionData}>
              <XAxis dataKey="time" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Line type="monotone" dataKey="Joy" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="Trust" stroke="#82ca9d" strokeWidth={2} />
              <Line type="monotone" dataKey="Frustration" stroke="#ff6b6b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
