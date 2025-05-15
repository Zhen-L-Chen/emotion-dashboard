'use client';

import dynamic from "next/dynamic";
import { useMemo, useEffect, useState } from "react";
import { leadData } from "../data/leadData"; // Import leadData from shared data file

interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

interface SankeyNode {
  id: string;
  nodeColor?: string;
}

// Extract emotion transitions for Sankey input
const emotionFlows = leadData.flatMap(lead => {
  const parts = lead.trend.split("→").map((p: string) => p.trim());
  const edges: SankeyLink[] = [];
  for (let i = 0; i < parts.length - 1; i++) {
    edges.push({ source: parts[i], target: parts[i + 1], value: 1 });
  }
  return edges;
});

// Aggregate flows
const sankeyLinks = Array.from(
  emotionFlows.reduce((map: Map<string, SankeyLink>, { source, target, value }: SankeyLink) => {
    const key = `${source}|${target}`;
    if (!map.has(key)) {
      map.set(key, { source, target, value: 0 });
    }
    const existingLink = map.get(key)!;
    existingLink.value += value;
    return map;
  }, new Map()).values()
);

const sankeyNodes: SankeyNode[] = Array.from(
  new Set(sankeyLinks.flatMap(link => [link.source, link.target]))
).map(name => ({ id: name }));

const ResponsiveSankey = dynamic(() => import("@nivo/sankey").then(mod => mod.ResponsiveSankey), { ssr: false });

export default function EmotionalJourneyMap() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSmallScreen(window.innerWidth < 480);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const topPaths = useMemo(() => {
    return [...sankeyLinks]
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
      .map(link => `${link.source} → ${link.target} (${link.value})`);
  }, []);

  return (
    <div className="w-full bg-[#f9f5eb] rounded-xl shadow-md p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold text-black mb-1 font-serif">Emotional Journey Map</h2>
      <p className="text-xs sm:text-sm text-gray-700 mb-3">
        This map shows emotional pathways observed in the last 7 days of conversations. Click on a link to explore key transitions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="col-span-1 md:col-span-2">
          <div className="h-[300px] sm:h-[400px] md:h-[500px]">
            <ResponsiveSankey
              data={{ nodes: sankeyNodes, links: sankeyLinks }}
              margin={isMobile 
                ? { top: 10, right: 40, bottom: 10, left: 40 } 
                : { top: 20, right: 100, bottom: 20, left: 100 }
              }
              align="justify"
              colors={{ scheme: 'category10' }}
              nodeOpacity={1}
              nodeThickness={isMobile ? 10 : 14}
              nodeInnerPadding={isMobile ? 2 : 3}
              nodeSpacing={isMobile ? 16 : 24}
              nodeBorderWidth={1}
              nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
              linkOpacity={0.4}
              linkHoverOpacity={0.6}
              linkHoverOthersOpacity={0.1}
              enableLinkGradient={true}
              labelPosition="outside"
              labelOrientation="horizontal"
              labelPadding={isMobile ? 5 : 10}
              labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
              enableLabels={!isSmallScreen}
              animate={true}
              theme={{
                tooltip: {
                  container: {
                    background: '#ffffff',
                    color: '#333333',
                    fontSize: '12px',
                    borderRadius: '4px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                    padding: '6px 9px'
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="text-xs sm:text-sm text-gray-800">
          <h3 className="font-semibold text-black mb-1">📌 Top Emotional Transitions</h3>
          <ul className="list-disc list-inside space-y-1">
            {topPaths.map((path, idx) => (
              <li key={idx} className="break-words">{path}</li>
            ))}
          </ul>

          <div className="mt-3 sm:mt-4">
            <h4 className="font-semibold text-black mb-1">🔍 Interpretation Tip</h4>
            <p>
              High-value flows (thicker paths) indicate journeys with more leads. Look for transitions that consistently end in <strong>Joy</strong> or <strong>Trust</strong> — these are your most promising user journeys.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
